import { createStore, flush } from 'solid-js';
import { toolbar_config as base_toolbar_config } from './toolbar-config';

/**
 * the live toolbar config: a module-level store over the static definition in
 * toolbar-config.ts. module level (not per Toolbar instance) because util.ts
 * caches command lists out of it, and the old per-component createMutable
 * wrote through to the same shared object anyway.
 *
 * the state updaters in util.ts are plain mutators; run them inside the
 * setter -- `setToolbarConfig(config => UpdateState(sheet, config))`. note
 * that *any* write to a node of this store is only accepted during a setter
 * call: an assignment outside one is silently dropped, not an error.
 */
export const [toolbarConfig, setToolbarConfig] = createStore(base_toolbar_config);

/**
 * write to the config from an event handler, and make it readable
 * immediately. store writes are staged until the next flush, and the toolbar
 * handlers set a value on a command (a color, a number format) and then
 * dispatch that same command, whose handler reads it back.
 */
export function UpdateToolbarConfig(fn: () => void) {
  setToolbarConfig(() => { fn(); });
  flush();
}
