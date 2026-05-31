
import { createMutable, createStore } from 'solid-js/store';
import { spinner } from '~/components/spinner/spinner-control';
import { persistentData, sessionData } from '~/lib/app-data';
import { createEffect, on } from 'solid-js';
import { GenericToolCall, IndexedToolResult, type TypedChatMessages } from 'treb-llm-support';

import { tools as TREB_tools, raw_tools, Models, Stream, /* ReplayStream, */ Format, /* ExecuteToolCall , type ExternalUI */ RAWExecuteToolCall, 
  type RAWExternalUI,  AddUserChatMessage, IsClientSideErrorMessage, FindModel, IsNotItemReference, IsNotClientSideErrorMessage, AbortStream } from '~/lib/raw-llm-support';

import worker_script from 'treb-llm-support/src/llm-worker.ts?worker';
import system_prompt from '~/lib/raw-llm-support/system-prompt.md?raw';

import type { SearchResult } from 'minisearch';
import { SpreadsheetType } from '~/lib/spreadsheet-type';

/*
export const [messages, setMessages] = createStore<TypedChatMessages>({
  type: 'generic',
  messages: [],
});
*/

export const messages = createMutable<TypedChatMessages>({
  type: 'generic',
  messages: [],
});

let llm_streaming_worker: Worker|undefined;
let docs_search_worker: Worker|undefined;
let search_resolver: ((results: SearchResult[]) => void) | undefined;

let sheet: SpreadsheetType|undefined;

export function InitMessages(sheet_instance?: SpreadsheetType) {

  sheet = sheet_instance;

  (window as any).messages = messages;

  const json = localStorage.getItem('chat');
  if (json) {
    try {
      const parsed = JSON.parse(json);
      Object.assign(messages, parsed);
    }
    catch {
      //
    }
  }

  //
  // we could maybe toll this somehow to reduce unecessary serialization/writes
  //
  createEffect(
    on(() => JSON.stringify(messages), value => {
      localStorage.setItem('chat', value);    
  }, { defer: true }));

  if (!llm_streaming_worker) {
    llm_streaming_worker = new worker_script();
  }

  if (!docs_search_worker) {
    docs_search_worker = new Worker(
      new URL('~/lib/docs-search-worker.ts', import.meta.url), 
      { type: 'module' }
    );
  }
  
  if (docs_search_worker) {
    docs_search_worker.onmessage = (message) => {
      if (search_resolver) {
        const temp = search_resolver;
        search_resolver = undefined;
        temp((message.data || []) as SearchResult[]);
      }
      // ...
    };
  }


}

function FormatSearchResults(results?: SearchResult[]) {
  if (!results) {
    return `Search returned no results.`;
  }

  return `Search returned ${results.length} result${results.length === 1 ? '' : 's'}:\n\n---\n\n` +
    results.map(result => {
      const text: string[] = [];
      text.push(`# ${result.title || 'No title'}\n`);
      text.push(`From section: ${result.section || '(not provided)'}\n`);
      text.push(`External link: https://docs.riskamp.com/help/${result.slug}\n`);
      text.push(`Score: ${result.score}\n`);
      text.push(`Matched terms: ${Object.keys(result.match).toString()}\n`);
      text.push('\n');
      text.push(result.content);
      return text.join('');
    }).join('\n\n---\n\n');
  
}

async function SearchDocs(query: string, combine?: 'AND'|'OR') {

  const worker = docs_search_worker;
  if (!worker) {
    throw new Error('missing docs search worker');
  }

  return new Promise<SearchResult[]>(resolve => {
    search_resolver = resolve;
    worker.postMessage({query, combine});
  });

}

async function ProcessToolCalls(tool_calls: GenericToolCall[], partial?: boolean): Promise<IndexedToolResult[]> {

  // ok process
  if (sheet) {
    const external_ui: RAWExternalUI = {
      Screenshot: async (sheet: any) => {
        return (await sheet.Screenshot('webp', undefined, false)) || '';
      },

      SearchDocumentation: async (query: string, combine?: "AND" | "OR" | undefined) => {
        const results = await SearchDocs(query, combine);
        return FormatSearchResults(results);
      },

      RunSimulation: async (options) => {
        const { trials, sampling, seed, screen_updates } = options;
        sheet?.RunSimulation(trials, {
          lhs: sampling !== 'standard',
          seed,
          stepped: screen_updates,
        });
      },

    };

    const content: (IndexedToolResult|undefined)[] = await Promise.all(tool_calls.filter(test => !!test).map(async (call) => {

      if (!call) {
        return;
      }  

      try {
        if (!sheet) {
          throw new Error('missing sheet');
        }

        const content = await RAWExecuteToolCall(sheet, external_ui, 
      
          /** dummy with old shape*/
          {
            type: 'tool_use',
            name: call.name,
            input: call.params,
            id: '',
            call_id: '',
          },

          partial,

        );

        return {
          index: call.index,
          ...content,
        };

      }
      catch (err) {
        return {
          index: call.index,
          content: err?.toString() || 'unknown error',
          type: 'error',
        } ;
      }

    }));
    
    // console.info("content", content);
    return content.filter((test): test is IndexedToolResult => !!test);

  }
  
  return [];

};


async function StreamChatMessages() {

  if (messages.messages.length) {

    if (persistentData.llm_model && llm_streaming_worker) {
      const worker = llm_streaming_worker;
      const assigned = persistentData.llm_model;
      const api_key = persistentData.llm_api_keys[persistentData.llm_model.provider.name] || '';

      spinner.show();

      try {
        await Stream({
            worker, 
            model: assigned,
            api_key,
            system_prompt,
            messages,
            tools: [
              ...raw_tools,
              ...TREB_tools,
            ],
            tool_call_fn: ProcessToolCalls,
          });
      }
      catch (err) {
        console.error(err);
      }

      spinner.hide();

    }

  }
  
}


export async function SendMessage(text: string) {

  text = text.trim();
  if (!text) {
    return;
  }

  const model = persistentData.llm_model;
  if (!model) {
    return;
  }

  const api_key = persistentData.llm_api_keys[model.provider.name];
  if (!api_key) {
    return;
  }

  // make sure the store is the correct type, and if not, flush it

  if (model.provider.api !== messages.type) {
    const api = model.provider.api === 'openai-chat-completion' ? 'generic' : model.provider.api;

    // flush
    const replacement: TypedChatMessages = {
      type: api, messages: [],
    };
    Object.assign(messages, replacement);
    
  }

  AddUserChatMessage(messages, text);

  return StreamChatMessages();

  /*
  if (text && persistentData.llm_model)

  const timeout = setTimeout(() => {
    spinner.hide();
  }, 10000);

  spinner.show(() => {
    console.info("BOON");
    clearTimeout(timeout);
    spinner.hide();
  });
  */

}



