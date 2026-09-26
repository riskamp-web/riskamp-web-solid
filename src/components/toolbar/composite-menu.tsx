
import { Switch, Match, For, Show } from 'solid-js';
import style from './toolbar.module.css';
import { t } from '~/i18n/i18n';

import '~/components/tabs.css';

import { CompositeMenuControl } from './toolbar-utils';
import { ToolbarCommand } from './toolbar-commands';
import { MenuButton } from '../menu-button/menu-button';
import { CommandMessage, CompositeKey, StateOf, toolbarState, UpdateToolbarState } from './toolbar-store';

export function CompositeMenu(props: {
  item: CompositeMenuControl,
  HandleCommand: (event: Event, command: ToolbarCommand) => void|Promise<void>,
}) {

  // the active (last used) entry lives in the store, not on the control, so
  // it survives this component remounting (stepped groups swap controls as
  // the toolbar width changes).

  const key = CompositeKey(props.item);
  const activeIndex = () => toolbarState.composite[key] ?? props.item.active;
  const active = () => props.item.commands[activeIndex()];

  function Select(event: Event, command: ToolbarCommand, index: number) {
    UpdateToolbarState(draft => {
      draft.composite[key] = index;
    });
    props.HandleCommand(event, CommandMessage(command));
  }

  return <>
    <MenuButton>
      <MenuButton.Static>
        <div class="flex-row gap-0_5">
          <Show when={props.item.group_icon}>
            <div innerHTML={props.item.group_icon}></div> 
          </Show>
          <button class={
                    active().icon ?
                      style['toolbar-button'] :
                      [style['text-button'], style['toolbar-button'], style['composite-label']].join(' ')
                  } 
                  title={active().icon ? t(active().title) : undefined }
                  onclick={e => props.HandleCommand(e, CommandMessage(active()))}>
            <Switch>
              <Match when={active().icon}>
                <span innerHTML={active().icon || ''} />
              </Match>
              <Match when={true}>
                <span>{t(active().title)}</span>
              </Match>
            </Switch>
          </button>
        </div>
      </MenuButton.Static>
      <MenuButton.Menu>
        <menu classList={{
                [style.horizontal]: props.item.horizontal,
              }}>
          <Switch>
            
            <Match when={props.item.icons && props.item.text}>
              <menu classList={{ [style.text]: true, [style.overflow]: true }}>
                <For each={props.item.commands}>
                  {(subitem, index) => <li>
                    <button classList={{ [style['menu-item']]: true, [style['composite']]: true }} 
                            onclick={e => Select(e, subitem, index())}>
                      <div innerHTML={subitem.icon || ''} />
                      <div>{t(subitem.title)}</div>
                    </button>
                  </li>}
                </For>
              </menu>
            </Match>

            <Match when={props.item.text}>
              <menu classList={{ [style.text]: true, [style.overflow]: true }}>
                <For each={props.item.commands}>
                  {(subitem, index) => <li>
                    <button class={style['menu-item']} 
                            onclick={e => Select(e, subitem, index())}>
                      {t(subitem.title)}
                    </button>
                  </li>}
                </For>
              </menu>
            </Match>

            <Match when={props.item.icons}>
              <For each={props.item.commands}>
                {(subitem, index) => <li>
                  <button classList={{
                            [style['toolbar-button']]: true,
                            [style.active]: !!StateOf(subitem).value,
                          }} 
                          title={t(subitem.title)}
                          onclick={e => Select(e, subitem, index())}
                          innerHTML={subitem.icon || ''} />
                </li>}
              </For>
            </Match>

          </Switch>
        </menu>
      </MenuButton.Menu>
    </MenuButton>
  </>;
}
