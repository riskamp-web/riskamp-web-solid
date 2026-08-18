

import { onMount } from '~/lib/solid-compat';
import { For, Show, Switch, Match } from 'solid-js';
import { InitMessages, messages, streaming } from './util';
import { t, format } from '~/i18n/i18n';
import type { SpreadsheetType } from '~/lib/spreadsheet-type';
import style from './ai-sidebar.module.css';
import { Format, AnthropicChatMessages, IsClientSideErrorMessage, IsNotItemReference, GeminiChatMessages, GPTResponsesChatMessages } from '~/lib/raw-llm-support';
import type { ClientSideErrorMessage } from '~/lib/raw-llm-support';
import DOMPurify from 'dompurify';

interface Props {
  sheet?: SpreadsheetType;
}

type AnthropicMessage = Exclude<AnthropicChatMessages['messages'][number], ClientSideErrorMessage>;
type GeminiMessage = Exclude<GeminiChatMessages['messages'][number], ClientSideErrorMessage>;
type GPTMessage = Exclude<GPTResponsesChatMessages['messages'][number], ClientSideErrorMessage>;

/**
 * ephemeral activity label for the in-progress turn. we only persist user /
 * assistant text blocks; thinking + tool steps are surfaced here as a
 * transient status ("Thinking…", "Running <tool>…") derived from the last
 * part of the last message. it clears the moment the model emits answer text
 * or the stream ends.
 */
/** "Running <tool>…", or a generic "Working…" when the tool is unnamed. */
function runningLabel(name?: string): string {
  return name
    ? format(t('llm-chat.activity.running'), { tool: name })
    : t('llm-chat.activity.working');
}

function activity(): string | null {
  if (!streaming()) {
    return null;
  }

  const list = messages.messages;
  const last = list[list.length - 1];

  if (!last) {
    return t('llm-chat.activity.thinking');   // stream started, nothing generated yet
  }
  if (IsClientSideErrorMessage(last)) {
    return null;                              // errors are persistent blocks, not activity
  }

  switch (messages.type) {

    case 'anthropic': {
      const item = last as AnthropicMessage;
      if (!Array.isArray(item.content)) {
        return t('llm-chat.activity.thinking');   // a bare string is a user message
      }
      const part = item.content[item.content.length - 1];
      if (!part) {
        return t('llm-chat.activity.thinking');
      }
      switch (part.type) {
        case 'text': return null;
        case 'thinking': return t('llm-chat.activity.thinking');
        case 'tool_use': return runningLabel(part.name);
        default: return t('llm-chat.activity.working');
      }
    }

    case 'gemini': {
      const item = last as GeminiMessage;
      const parts = item.parts;
      const part = parts?.[parts.length - 1];
      if (!part) {
        return t('llm-chat.activity.thinking');
      }
      if (part.text) {
        return null;
      }
      if (part.functionCall) {
        return runningLabel(part.functionCall.name);
      }
      return t('llm-chat.activity.working');
    }

    case 'openai-responses': {
      const item = last as GPTMessage;
      if (!item.type || item.type === 'message') {
        return null;              // answer text (or a reference) -> not activity
      }
      if (item.type === 'reasoning') {
        return t('llm-chat.activity.thinking');
      }
      if (item.type === 'function_call') {
        return runningLabel(item.name);
      }
      return t('llm-chat.activity.working');
    }

  }

  return t('llm-chat.activity.working');
}

export function ChatMessages(props: Props) {

  onMount(() => {
    InitMessages(props.sheet);
  });

  return <>
      <Switch>
        <Match when={messages.type === 'anthropic'}>
          <For each={(messages as AnthropicChatMessages).messages}>
            {item => {

              if (IsClientSideErrorMessage(item)) {
                return <div classList={{ [style.message]: true, [style.error]: true }}>
                    <div class={style.part}>
                      {item.message || t('llm-chat.error.unknown')}
                    </div>
                  </div>;
              }

              const role = item.role;

              // array content: render only text parts. a message with no text
              // part (e.g. a lone tool_use) renders nothing -- no empty wrapper.
              if (Array.isArray(item.content)) {
                const content = item.content;
                return <Show when={content.some(part => part.type === 'text')}>
                    <div classList={{ [style.message]: true, [style[role]]: true }}>
                      <For each={content}>
                        {part => part.type === 'text'
                          ? <div classList={{ [style.part]: true, [style.md]: true }}
                                 innerHTML={DOMPurify.sanitize(Format(part.text))} />
                          : null}
                      </For>
                    </div>
                  </Show>;
              }

              // string content: user text
              return <div classList={{ [style.message]: true, [style[role]]: true }}>
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
                      {item.message || t('llm-chat.error.unknown')}
                    </div>
                  </div>;
              }

              const classes: Record<string, boolean> = { [style.message]: true };
              if (item.role) {
                classes[style[item.role]] = true;
              }

              const parts = item.parts;
              return <Show when={parts?.some(part => !!part.text)}>
                  <div classList={classes}>
                    <For each={parts}>
                      {part => part.text
                        ? <div classList={{ [style.part]: true, [style.text]: true, [style.md]: true }}
                               innerHTML={DOMPurify.sanitize(Format(part.text || ''))} />
                        : null}
                    </For>
                  </div>
                </Show>;

            }}
          </For>
        </Match>

        <Match when={messages.type === 'openai-responses'}>
          <For each={(messages as GPTResponsesChatMessages).messages}>
            {item => {

              if (IsClientSideErrorMessage(item)) {
                return <div classList={{ [style.message]: true, [style.error]: true }}>
                    <div class={style.part}>
                      {item.message || t('llm-chat.error.unknown')}
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
                  if (Array.isArray(item.content)) {
                    const content = item.content;
                    return <Show when={content.some(part => part.type === 'output_text')}>
                        <div classList={{ [style.message]: true, [style[item.role]]: true }}>
                          <For each={content}>
                            {part => part.type === 'output_text'
                              ? <div classList={{ [style.part]: true, [style.md]: true }}
                                     innerHTML={DOMPurify.sanitize(Format(part.text || ''))} />
                              : null}
                          </For>
                        </div>
                      </Show>;
                  }
                }
                // item reference: nothing to persist
                return null;
              }

              // non-message items (reasoning / function_call / …) are surfaced
              // as ephemeral activity, not persistent blocks.
              return null;

            }}
          </For>
        </Match>

        <Match when={true}>
          <div>{t('llm-chat.error.unknown-type')}</div>
        </Match>
      </Switch>

      <Show when={activity()}>
        {label => <div class={style.activity}>{label()}</div>}
      </Show>
    </>;

}
