/**
 * DropMenu is the menu-bar menu control. Menus always drop down, are aligned
 * to the bottom left of the button. The button has a caret on the right.
 */

import { ParentProps, JSX, Switch, Match } from 'solid-js';
import { icons } from '~/components/icon-sets';
import style from './drop-menu.module.css';
import shared from '../../style/shared.module.css';

export interface Props {
  label: string|JSX.Element;
  disabled?: boolean;
}

export function DropMenu(props: ParentProps<Props>) {

  const popover_id = crypto.randomUUID();
  const container_id = crypto.randomUUID();

  //
  // style is inlined so it will work with the polyfill (required for firefox)
  // Q: is that still true in 2026? FIXME: check
  //
  const inline_style = [
    `min-width: anchor-size(--${container_id});`,
    `position-anchor: --${container_id};`,
    `top: anchor(--${container_id} bottom);`,
    `left: anchor(--${container_id} left);`,
  ].join(' ');

  return <div class={style["drop-menu"]} id={container_id} style={`anchor-name: --${container_id}`}>

    <button classList={{[style.label]: true, [style.disabled]: props.disabled}} popovertarget={popover_id} >
      <Switch>
        <Match when={typeof props.label === 'string'}>
          <span>
            {props.label}
          </span>
          <span class={style.caret} innerHTML={icons.caret_down} />
        </Match>
        <Match when={true}>
          {props.label}
        </Match>
      </Switch>
    </button>

    <div classList={{[shared['floating-menu']]: true, [style.menu]: true}} popover id={popover_id} data-anchor={`--${container_id}`} style={inline_style}>
      {props.children}
    </div>
    
  </div>;

}
