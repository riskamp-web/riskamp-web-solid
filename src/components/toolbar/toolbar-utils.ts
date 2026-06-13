
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { bootstrap_icons, fa_light, fa_regular, fa_solid, fa_thin, lucide, phosphor_regular } from 's5-icon-lib';

import type { I18N } from '~/i18n/i18n';
import { ToolbarCommands, type ColorCommand, type ToolbarColorCommandKeys, type ToolbarCommand, type ToolbarCommandKey } from './toolbar-commands';

export interface Separator {
  type: 'separator';
}

export interface Spacer {
  type: 'spacer';
}

export interface Placeholder {
  type: 'placeholder';
  placeholder: string;
}

export interface Label {
  type: 'label';
  label: keyof I18N;
}

export interface Icon {
  type: 'icon';
  icon: string;
  title?: keyof I18N;
}

export interface ButtonControl {
  type: 'button';
  command: ToolbarCommand & { key: ToolbarCommandKey };
}

export interface ColorButtonControl {
  type: 'color-button';
  command: ColorCommand & { key: ToolbarCommandKey };
}

export interface SplitButtonControl {
  type: 'split-button';
  commands: [ToolbarCommand & { key: ToolbarCommandKey }, ToolbarCommand & { key: ToolbarCommandKey }];
}

export interface TextButtonControl {
  type: 'text-button';
  command: ToolbarCommand & { key: ToolbarCommandKey };
  override_text?: string;
}

export interface CompositeMenuControl {
  type: 'composite-menu';
  commands: (ToolbarCommand & { key: ToolbarCommandKey })[];
  active: number;
  icons?: boolean;
  text?: boolean;
  horizontal?: boolean;
  group_icon?: string;
}

/** more controls, hidden */
export interface MoreControl {
  type: 'more',
  // commands: (ToolbarCommand & { key: ToolbarCommandKey })[];
  controls: Exclude<Control, MoreControl>[];
}

export interface ComboBoxControl {
  type: 'combo-box';
  command: ToolbarCommand & { key: ToolbarCommandKey },
  text?: string;
  placeholder?: string;
  values?: ({value: string, label:string}|'separator')[];
  width?: 'narrow'|'wide';
}

export type Control 
  = ButtonControl
  | TextButtonControl
  | CompositeMenuControl
  | SplitButtonControl
  | ColorButtonControl
  | ComboBoxControl
  | Placeholder
  | Separator
  | Spacer
  | MoreControl
  | Label
  | Icon
  ;

export type SteppedGroup = {
  type: 'steps';
  steps: {
    step?: number;
    controls: Control[];
  }[];
};

export type Tab = {
  label: keyof I18N;
  groups: (SteppedGroup|Control[])[];
};

export type ToolbarMenu = {
  label: keyof I18N;
  items?: ((ToolbarCommand & { key: ToolbarCommandKey }) | 'separator')[];
};

export type ToolbarConfig = { 
  tabs: Tab[],
  trailer?: ButtonControl[],
  menus?: ToolbarMenu[];
};

export function WrapCommand(key: ToolbarCommandKey): ToolbarCommand & {key: ToolbarCommandKey} {
  return {...ToolbarCommands[key], key};
}

export function button(command: ToolbarCommandKey): ButtonControl {
  return { type: 'button', command: WrapCommand(command) };
}

export function textbutton(command: ToolbarCommandKey): TextButtonControl {
  return { type: 'text-button', command: WrapCommand(command) };
}

export function splitbutton(command1: ToolbarCommandKey, command2: ToolbarCommandKey): SplitButtonControl {
  return { type: 'split-button', commands: [WrapCommand(command1), WrapCommand(command2)] };
}

export function colorbutton(command: ToolbarColorCommandKeys): ColorButtonControl {
  return { type: 'color-button', command: {...ToolbarCommands[command], key: command } };
}

/*
function label(label: keyof I18N): Label {
  return {
    type: 'label',
    label,
  }
}
*/

export function textmenu(commands: ToolbarCommandKey[], active = 0, icons?: boolean): CompositeMenuControl {
  return { 
    type: 'composite-menu', 
    commands: commands.map(key => WrapCommand(key)),
    active,
    icons,
    text: true,
   };
}

export function iconmenu(commands: ToolbarCommandKey[], active = 0, horizontal = false): CompositeMenuControl {
  return { 
    type: 'composite-menu', 
    commands: commands.map(key => WrapCommand(key)),
    active,
    text: false,
    icons: true,
    horizontal,
   };
}

export function more(controls: Exclude<Control, MoreControl>[]): MoreControl {
  return {
    type: 'more',
    // commands: commands.map(key => WrapCommand(key)),
    controls,
  }
}

export function separator(): Separator {
  return { type: 'separator' };
}

export function spacer(): Spacer {
  return { type: 'spacer' };
}
