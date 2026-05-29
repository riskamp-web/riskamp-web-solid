
import type { ToolbarCommandKey } from '../toolbar/toolbar-commands';
import './ai-sidebar';
import './search-sidebar';
import { type Component } from 'solid-js';

export const registry: Map<ToolbarCommandKey, Component> = new Map();

export function Register(key: ToolbarCommandKey, fn: Component, pass = 0) {

  // OK initialization gets out of order here, not sure if
  // thats a code optimization thing or a solid thing, but
  // it's annoying. also not sure if this is a safe solution
  // for all browsers

  // client only
  if (typeof self === 'object') {
    if (pass === 0) {
      queueMicrotask(() => {
        Register(key, fn, 1);
      });
      return;
    }
    registry.set(key, fn);
  }

}


