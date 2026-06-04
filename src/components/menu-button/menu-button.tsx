/**
 * MenuButton is the control for the toolbar that has a regular button
 * (or a textbox -- TODO) and a separate button with a caret to open the 
 * menu. the anchor encompasses the whole control, to aligh menus.
 */

import { createContext, useContext } from "solid-js";
import { ParentProps } from 'solid-js';
import style from './menu-button.module.css';

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
        <button class={style['caret-button']} popovertarget={ctx?.popover_id}>
          <svg fill="currentColor" width="1em" height="1em"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M144 256L320 456L496 256L144 256z"/></svg>
        </button>
      </div>
    </>;
};

MenuButton.Menu = (props: ParentProps<{}>) => {
  const ctx = useContext(Context);
  return <>
      <div class={style.menu} 
           popover id={ctx?.popover_id} 
           data-anchor={`--${ctx?.container_id}`} 
           onbeforetoggle={ctx?.onbeforetoggle}
           ontoggle={ctx?.ontoggle}
           style={ctx?.inline_style || ''}>
        {props.children}
      </div>
    </>;
};

