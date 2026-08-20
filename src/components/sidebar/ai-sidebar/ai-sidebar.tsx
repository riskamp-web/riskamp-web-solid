

import { Register } from '../registry';
import { t } from '~/i18n/i18n';

import '~/components/tabs.css';
import style from './ai-sidebar.module.css';
import { Splitter } from '../../splitter/splitter';
import { persistentData, sessionData, setPersistentData, setSessionData } from '~/lib/app-data';
import { createEffect, createSignal, on, Show } from 'solid-js';
import { produce } from 'solid-js/store';
import { Models, provider_list } from '~/lib/raw-llm-support';
import { icons } from '~/components/icon-sets';
import { confirmDialog } from '~/components/dialogs/confirm-dialog/confirm-control';
import { messages, SendMessage } from './util';
import { ChatMessages } from './chat-messages';
import type { SidebarProps } from '../sidebar-main';

// type ChatMessage = TypedChatMessages['messages'][number];

export function Sidebar(props: SidebarProps) {

  const tab_group = crypto.randomUUID();
  const [split, setSplit] = createSignal(sessionData.llm_tab_split);

  createEffect(on(split, value => {
    setSessionData(produce(s => s.llm_tab_split = value));
  }));
  
  const [selectedModel, setSelectedModel] = createSignal(persistentData.llm_model?.name || '');
  let modelSelect: HTMLSelectElement|undefined;

  function ApplyModel(model: typeof Models[number]) {
    setPersistentData(produce(s => s.llm_model = model));
    setSelectedModel(model.name);
    setApiKey(persistentData.llm_api_keys[model.provider.name] || '');
  }

  async function SelectModel(event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) {
      return;
    }

    // at this point the native select's DOM value has already moved to the new
    // option, but selectedModel() still holds the previously-applied name.
    const newName = event.target.value;
    const previousName = selectedModel();
    const newModel = Models.find(model => model.name === newName);

    // the empty "Choose a model" placeholder (or any unknown value) is a no-op,
    // as before -- we never clear an already-chosen model this way.
    if (!newModel) {
      return;
    }

    // the transcript is typed to the provider's API shape, so it only needs
    // wiping when the provider changes (e.g. Anthropic -> OpenAI); switching
    // between models of the same provider (Opus <-> Sonnet) keeps it. confirm
    // first if there is anything to lose; an empty conversation switches silently.
    const providerChanged = persistentData.llm_model
      ? persistentData.llm_model.provider.name !== newModel.provider.name
      : false;

    if (providerChanged && messages.messages.length > 0) {
      const ok = await confirmDialog.confirm({
        title: 'llm-chat.change-model.title',
        message: t('llm-chat.change-model.message'),
        confirm: 'llm-chat.change-model.confirm',
      });
      if (!ok) {
        // revert the select. the signal already equals previousName, so a signal
        // write would be a no-op -- reset the DOM value directly to resync.
        if (modelSelect) {
          modelSelect.value = previousName;
        }
        return;
      }
      messages.messages = [];
    }

    ApplyModel(newModel);
  }

  const [apiKey, setApiKey] = createSignal('');
  const [revealKey, setRevealKey] = createSignal(false);
  let apiKeyInput: HTMLInputElement|undefined;

  if (persistentData.llm_model) {
    setApiKey(persistentData.llm_api_keys[persistentData.llm_model.provider.name] || '');
  }

  createEffect(on(apiKey, value => {
    if (persistentData.llm_model) {
      setPersistentData(produce(s => s.llm_api_keys[persistentData.llm_model?.provider.name || ''] = value));
    }
  }, { defer: true }));

  let textarea: HTMLTextAreaElement|undefined;

  let scrollContainer: HTMLDivElement|undefined;
  let pinnedToBottom = true;

  // keep the transcript pinned to the bottom as messages stream in, unless the
  // user has scrolled up to read earlier history.
  function TrackScrollPosition() {
    const el = scrollContainer;
    if (el) {
      pinnedToBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    }
  }

  createEffect(on(() => JSON.stringify(messages), () => {
    const el = scrollContainer;
    if (el && pinnedToBottom) {
      requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
    }
  }));

  function LocalSendMessage(event: Event) {
    if (textarea) {
      // sending a message always re-pins to the bottom, even if the user had
      // scrolled up to read earlier history.
      pinnedToBottom = true;
      SendMessage(textarea.value||'');
      textarea.value = '';
    }
  }

  function HandleKey(event: KeyboardEvent) {
    if (event.target instanceof HTMLTextAreaElement) {
      if (event.key === 'Enter') {
        if (event.shiftKey) {
          return;
        }

        event.stopPropagation();
        event.preventDefault();
        // sending a message always re-pins to the bottom, even if the user had
        // scrolled up to read earlier history.
        pinnedToBottom = true;
        SendMessage(event.target.value||'');
        event.target.value = '';
      }
    }
  }

  // the "show settings" determination here is based on heuristics, which
  // is good for the first display, but after that we want to honor user
  // behavior, so it the user clicks a tab, we should remember that

  const show_settings = !(persistentData.llm_model && persistentData.llm_api_keys[persistentData.llm_model.provider.name || '']);

  let initial_tab = show_settings? 1 : 0;
  if (typeof sessionData.llm_tab === 'number') {
    initial_tab = sessionData.llm_tab;
  }

  const [tab, setTab] = createSignal(initial_tab);

  createEffect(on(tab, value => {
    setSessionData('llm_tab', value);
  }));

  // 

  return <div class={style.layout}>
    <div classList={{
      "tab-container": true,
      "height-100": true,
      [style['tab-container']]: true,
    }}>
      <div classList={{
        "tab-pane": true,
        [style['tab-pane']]: true,
      }}>
        <label class="tab">
          <input type="radio" 
                 data-label={t('llm-chat.chat-tab.title')} 
                 name={tab_group} 
                 checked={tab() === 0}
                 onchange={e => { if(e.currentTarget.checked) setTab(0); }}
                 ></input>
        </label>
        <div class="tab-content overflow-hidden">
          <Splitter vertical split={split} setSplit={setSplit} splitter-width={17} min={25} max={75}>
            <div data-top ref={scrollContainer} onScroll={TrackScrollPosition} classList={{
              [style["chat-messages"]]: true,
              "flex-grow": true,
              "overflow-y-scroll": true,
              [style.messages]: true,
            }}>
              
              <ChatMessages sheet={props.sheet()}/>

            </div>
            <div data-bottom class={style.controls}>
              <textarea ref={textarea} wrap="soft" onkeydown={HandleKey}></textarea>
              <div class={style.buttons}>
                <button class="control-button"
                        onclick={() => messages.messages = []}>{t('llm-chat.buttons.clear-conversation')}</button>
                <button class="control-button button-primary"
                        onclick={LocalSendMessage}>{t('llm-chat.buttons.send-message')}</button>
              </div>
            </div>
          </Splitter>
        </div>
      </div>


      <div classList={{
        "tab-pane": true,
        [style['tab-pane']]: true,
      }}>
        <label class="tab">
          <input type="radio" 
                 data-label={t('llm-chat.settings-tab.title')} 
                 name={tab_group} 
                 checked={tab() === 1} 
                 onchange={e => { if(e.currentTarget.checked) setTab(1); }}
                 ></input>
        </label>
        <div class="tab-content">

          <div class={style['settings-layout']}>
            <section>
              <label>{t('llm-chat.label.model')}</label>
              <select ref={modelSelect}
                      class="select"
                      value={selectedModel()}
                      onchange={SelectModel}>
                <option value=''>{t('llm-chat.label.choose-a-model')}</option>
                {provider_list.map(provider => {
                  return <optgroup label={provider.provider.name}>
                    {provider.models.map(model => <option value={model.name}>{model.label}</option>)};
                    </optgroup>;
                })}
              </select>
            </section>
            <section>
              <label>
                <Show when={persistentData.llm_model}><span>{persistentData.llm_model?.provider.name} </span></Show>
                {t('llm-chat.label.api-key')}
              </label>
              <div class={style['key-field']}>
                <input ref={apiKeyInput}
                       type={revealKey() ? 'text' : 'password'}
                       class={`input width-100 ellipsis ${style['key-input']}`}
                       value={apiKey()}
                       onchange={e => setApiKey(e.currentTarget.value || '')}
                       placeholder={t(persistentData.llm_model ? 'llm-chat.label.api-key-placeholder' : 'llm-chat.label.choose-a-model')}></input>
                <button type="button"
                        class={style['key-reveal']}
                        aria-label={t(revealKey() ? 'llm-chat.label.hide-api-key' : 'llm-chat.label.reveal-api-key')}
                        aria-pressed={revealKey()}
                        onclick={() => { setRevealKey(v => !v); apiKeyInput?.focus(); }}
                        innerHTML={revealKey() ? icons.eye_off : icons.eye_on}></button>
              </div>
            </section>
            <Show when={persistentData.llm_model?.provider.website}>
              <section>
                <div class={style['link-entry']}>
                  <label>{t('llm-chat.label.model_information_link')}</label>
                  <a href={persistentData.llm_model?.provider.website} target='_blank' rel='noopener'>{persistentData.llm_model?.provider.name}</a>
                </div>
              </section>
            </Show>

            <p class={style.note}>
              <span class={style['note-heading']}>{t('llm-chat.label.header.important')}</span>
              {t('llm-chat.label.disclaimer').split(/\n/).map(paragraph => <span>{paragraph}</span>)}
            </p>
          </div>

        </div>
      </div>

      <div class={style.trailer}>
        <Show when={persistentData.llm_model && tab() === 0}>
          <span>{persistentData.llm_model?.label || ''}</span>
        </Show>
      </div>

    </div>
    </div>;
}

Register('ai', Sidebar);


