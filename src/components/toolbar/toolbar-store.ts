
import { createStore, produce } from 'solid-js/store';
import type { Color } from 'riskamp-web';
import { ToolbarCommands, type ListCommand, type ToolbarCommand } from './toolbar-commands';
import type { CompositeMenuControl } from './toolbar-utils';

/**
 * the parts of a command that change at runtime: "hot" state, the
 * combo boxes' text and lists, menu enable/disable, and the color
 * buttons' remembered and resolved colors.
 *
 * the toolbar config and the command definitions are static layout.
 * this state lives here instead, keyed by command key -- the same
 * command can appear in several places (a tab, a "more" menu, a
 * menu), and they all share one entry.
 */
export interface CommandState {
  value?: string|boolean;
  text?: string;
  values?: ListCommand['values'];
  enabled?: boolean;
  active_color?: Color;
}

export interface ToolbarState {
  commands: Record<string, CommandState>;

  /** active (last used) index of each composite menu, by CompositeKey */
  composite: Record<string, number>;
}

/**
 * seed from the command definitions, which carry the initial values.
 * every command gets an entry, so writes never need to create one.
 */
function InitialState(): ToolbarState {
  const commands: Record<string, CommandState> = {};
  for (const command of ToolbarCommands as readonly ToolbarCommand[]) {
    const state: CommandState = {};
    if (typeof command.enabled === 'boolean') {
      state.enabled = command.enabled;
    }
    if (command.type === 'color' && command.active_color) {
      state.active_color = command.active_color;
    }
    commands[command.key] = state;
  }
  return { commands, composite: {} };
}

/**
 * module scope: toolbar state has always been effectively global (the
 * old mutable wrapped the module-level config object).
 */
const [toolbarState, setToolbarState] = createStore<ToolbarState>(InitialState());

export { toolbarState };

/** every write goes through here */
export function UpdateToolbarState(fn: (draft: ToolbarState) => void) {
  setToolbarState(produce(fn));
}

/** current state for a command (reactive when read in a tracking scope) */
export function StateOf(command: ToolbarCommand): CommandState {
  return toolbarState.commands[command.key] || {};
}

/**
 * build the command to dispatch: the static command, its current state,
 * then any values the caller has just chosen.
 *
 * a handler that writes state and then dispatches passes what it wrote
 * as `overrides`, instead of relying on reading the store straight back.
 */
export function CommandMessage<T extends ToolbarCommand>(command: T, overrides?: CommandState): T {
  return { ...command, ...StateOf(command), ...overrides };
}

/** stable key for a composite menu: its command keys */
export function CompositeKey(control: CompositeMenuControl) {
  return control.commands.map(command => command.key).join('|');
}
