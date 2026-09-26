
import { Switch, Match, For, Show } from 'solid-js';
import style from './toolbar.module.css';
import { t } from '~/i18n/i18n';

import '~/components/tabs.css';

import { CompositeMenuControl } from './toolbar-utils';
import { ToolbarCommand } from './toolbar-commands';
import { MenuButton } from '../menu-button/menu-button';
import { UpdateToolbarConfig } from './toolbar-store';

export function CompositeMenu(props: {
  item: CompositeMenuControl,
  HandleCommand: (event: Event, command: ToolbarCommand) => void|Promise<void>,
}) {
  return <>
    <MenuButton>
      <MenuButton.Static>
        <div class="flex-row gap-0_5">
          <Show when={props.item.group_icon}>
            <div innerHTML={props.item.group_icon}></div> 
          </Show>
          <button class={
                    props.item.commands[props.item.active].icon ?
                      style['toolbar-button'] :
                      [style['text-button'], style['toolbar-button'], style['composite-label']].join(' ')
                  } 
                  title={props.item.commands[props.item.active].icon ? t(props.item.commands[props.item.active].title) : undefined }
                  onClick={e => props.HandleCommand(e, props.item.commands[props.item.active])}>
            <Switch>
              <Match when={props.item.commands[props.item.active].icon}>
                <span innerHTML={props.item.commands[props.item.active].icon || ''} />
              </Match>
              <Match when={true}>
                <span>{t(props.item.commands[props.item.active].title)}</span>
              </Match>
            </Switch>
          </button>
        </div>
      </MenuButton.Static>
      <MenuButton.Menu>
        <menu class={{
                [style.horizontal]: !!props.item.horizontal,
              }}>
          <Switch>
            
            <Match when={props.item.icons && props.item.text}>
              <menu class={{ [style.text]: true, [style.overflow]: true }}>
                <For each={props.item.commands}>
                  {(subitem, index) => <li>
                    <button class={{ [style['menu-item']]: true, [style['composite']]: true }} 
                            onClick={e => {
                              UpdateToolbarConfig(() => { props.item.active = index(); });
                              props.HandleCommand(e, subitem);
                            }}>
                      <div innerHTML={subitem.icon || ''} />
                      <div>{t(subitem.title)}</div>
                    </button>
                  </li>}
                </For>
              </menu>
            </Match>

            <Match when={props.item.text}>
              <menu class={{ [style.text]: true, [style.overflow]: true }}>
                <For each={props.item.commands}>
                  {(subitem, index) => <li>
                    <button class={style['menu-item']} 
                            onClick={e => {
                              UpdateToolbarConfig(() => { props.item.active = index(); });
                              props.HandleCommand(e, subitem);
                            }}>
                      {t(subitem.title)}
                    </button>
                  </li>}
                </For>
              </menu>
            </Match>

            <Match when={props.item.icons}>
              <For each={props.item.commands}>
                {(subitem, index) => <li>
                  <button class={{
                            [style['toolbar-button']]: true,
                            [style.active]: !!subitem.value,
                          }} 
                          title={t(subitem.title)}
                          onClick={e => {
                            UpdateToolbarConfig(() => { props.item.active = index(); });
                            props.HandleCommand(e, subitem);
                          }}
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
