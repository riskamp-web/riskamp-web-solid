/**
 * MenuButton is the control for the toolbar that has a regular button
 * (or a textbox -- TODO) and a separate button with a caret to open the 
 * menu. the anchor encompasses the whole control, to aligh menus.
 */

import { createContext, useContext } from "solid-js";
import { ParentProps } from 'solid-js';
import { icons } from '~/components/icon-sets';
import style from './menu-button.module.css';
import shared from '../../style/shared.module.css';

interface Props {

  /**
   * instead of static content plus a caret button, this type
   * just has a button to open the menu. we repurpose static
   * content for that, and we'll wrap it in a button.
   */
  single_button_style?: boolean;

  onbeforetoggle?: (event: ToggleEvent) => void;
  ontoggle?: (event: ToggleEvent) => void;

}

const Context = createContext<{
  popover_id: string;
  container_id: string;
  inline_style: string;
  single_button_style?: boolean;

  onbeforetoggle?: (event: ToggleEvent) => void;
  ontoggle?: (event: ToggleEvent) => void;
}>();

export function MenuButton(props: ParentProps<Props>) {

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

  return <Context.Provider value={{ 
          popover_id, 
          container_id, 
          inline_style, 
          single_button_style: props.single_button_style,
          onbeforetoggle: props.onbeforetoggle,
          ontoggle: props.ontoggle,
        }}>
      <div class={style.container} 
          id={container_id} 
          style={`anchor-name: --${container_id}`}>{props.children}</div>
    </Context.Provider> ;

}

MenuButton.Static = (props: ParentProps<{class?: string}>) => {
  const ctx = useContext(Context);

  if (ctx?.single_button_style) {
    return <button popovertarget={ctx?.popover_id} class={props.class}>{props.children}</button>;
  }

  return <>
      <div class={style.composite}>
        <div class={style['static-content']}>{props.children}</div>
        <button classList={{[shared['bare-button']]: true, [style['caret-button']]: true}} popovertarget={ctx?.popover_id}>
          <span class={style.caret} innerHTML={icons.caret_down} />
        </button>
      </div>
    </>;
};

MenuButton.Menu = (props: ParentProps<{}>) => {
  const ctx = useContext(Context);
  return <>
      <div classList={{[shared['floating-menu']]: true, [style.menu]: true}}
           popover id={ctx?.popover_id}
           data-anchor={`--${ctx?.container_id}`} 
           onbeforetoggle={ctx?.onbeforetoggle}
           ontoggle={ctx?.ontoggle}
           style={ctx?.inline_style || ''}>
        {props.children}
      </div>
    </>;
};

