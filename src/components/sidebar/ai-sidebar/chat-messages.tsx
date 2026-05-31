

import { For, Switch, Match, onMount } from 'solid-js';
import { InitMessages, messages } from './util';
import type { SpreadsheetType } from '~/lib/spreadsheet-type';
import style from './ai-sidebar.module.css';
import { Format, AnthropicChatMessages, IsClientSideErrorMessage, IsNotItemReference, GeminiChatMessages, GPTResponsesChatMessages } from '~/lib/raw-llm-support';
import DOMPurify from 'dompurify';
import { OpenAIResponsesChunkMessage } from 'treb-llm-support/src/llm-worker';

interface Props {
  sheet?: SpreadsheetType;
}

export function ChatMessages(props: Props) {

  onMount(() => {
    InitMessages(props.sheet);

    // scroll

  });

  return <>
      <Switch>
        <Match when={messages.type === 'anthropic'}>
          <For each={(messages as AnthropicChatMessages).messages}>
            {item => {

              // let's organize these by logical messages, even if 
              // anthropic can have multiple parts in a message. so
              // there should always be 
              //
              // <div message>
              //   <div part></div part>
              //   <div part></div part>
              //   <div part></div part>
              // </div message>

              if (IsClientSideErrorMessage(item)) {
                return <div classList={{ [style.message]: true, [style.error]: true }}>
                    <div class={style.part}>
                      {item.message || 'unknown error'}
                    </div>
                  </div>;
              }
              const role = item.role;
              if (Array.isArray(item.content)) {
                return <div classList={{ [style.message]: true, [style[role]]: true, }}><For each={item.content}>
                  {item => {
                    if (item.type === 'text') {
                      return <div classList={{ [style.part]: true, [style.md]: true }} 
                                  ref={el => el.innerHTML = DOMPurify.sanitize(Format(item.text))} />
                    }
                    else if (item.type === 'thinking') {
                      return <details open={true} classList={{ [style.part]: true, [style[item.type]]: true }}>
                          <summary>{item.type}</summary>
                          <div classList={{'display-contents': true, [style.md]: true}} 
                              ref={el => el.innerHTML = DOMPurify.sanitize(Format(item.thinking))} />
                        </details>;
                    }
                    else {
                      return <details open={false} classList={{ [style.part]: true, [style[item.type]]: true }}>
                          <summary>{item.type}</summary>
                          <pre>{JSON.stringify(item)}</pre>
                        </details>;
                    }
                  }}
                  </For></div>;
              }
              return <div classList={{ [style.message]: true, [style[role]]: true, }}>
                  <div classList={{ [style.part]: true, [style.text]: true }}>
                    {item.content}
                  </div>
                </div>;

            }}
          </For>
        </Match>
        <Match when={messages.type === 'gemini'}>
          <For each={(messages as GeminiChatMessages).messages}>
            {item => {
              if (IsClientSideErrorMessage(item)) {
                return <div classList={{ [style.message]: true, [style.error]: true }}>
                    <div class={style.part}>
                      {item.message || 'unknown error'}
                    </div>
                  </div>;
              }

              const classes: Record<string, boolean> = { [style.message]: true };
              if (item.role) {
                classes[style[item.role]] = true;
              }
              return <div classList={classes}><For each={item.parts}>
                { part => {
                  if (part.text) {
                    return <div classList={{ [style.part]: true, [style.text]: true, [style.md]: true }}
                      ref={el => el.innerHTML = DOMPurify.sanitize(Format(part.text || ''))} />
                  }
                  else if (part.functionCall) {
                    return <details classList={{ [style.part]: true, [style.functionCall]: true }}>
                        <summary>functionCall</summary>
                        <pre>{JSON.stringify(part.functionCall)}</pre>
                      </details>;
                  }
                  else if (part.functionResponse) {
                    return <details classList={{ [style.part]: true, [style.functionResponse]: true }}>
                        <summary>functionResponse</summary>
                        <pre>{JSON.stringify(part.functionResponse)}</pre>
                      </details>;
                  }
                  return <div class={style.part}>unk</div>
                }}
              </For></div>;

            }}
          </For>
        </Match>
        <Match when={messages.type === 'openai-responses'}>
          <For each={(messages as GPTResponsesChatMessages).messages}>
            {item => {
              if (IsClientSideErrorMessage(item)) {
                return <div classList={{ [style.message]: true, [style.error]: true }}>
                    <div class={style.part}>
                      {item.message || 'unknown error'}
                    </div>
                  </div>;
              }
              if (!item.type || item.type === 'message') {
                if (IsNotItemReference(item)) {
                  if (typeof item.content === 'string') {
                    return <div classList={{ [style.message]: true, [style[item.role]]: true }}>
                        <div classList={{ [style.part]: true, [style.text]: true }}>
                          {item.content}
                        </div>
                      </div>;
                  }
                  else {
                    return <div classList={{ [style.message]: true, [style[item.role]]: true }}>
                        <For each={item.content}>
                          {part => {
                            if (part.type === 'output_text') {
                              return <div classList={{ [style.part]: true, [style.md]: true }}
                                ref={el => el.innerHTML = DOMPurify.sanitize(Format(part.text || ''))} />
                            }
                          }}
                        </For>
                      </div>;
                  }
                }
                else {
                  return <div>(item reference)</div>
                }
              }
              return <div classList={{ [style.message]: true }}>
                  <details classList={{ [style.part]: true }}>
                    <summary>{item.type}</summary>
                    <pre>{JSON.stringify(item)}</pre>
                  </details>
                </div>;
            }}
          </For>
        </Match>
        <Match when={true}>
          <div>unknown type</div>        
        </Match>
      </Switch>
    </>;

}
