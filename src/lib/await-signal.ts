import { createRoot, createEffect } from 'solid-js';

/**
 * returns a promise that resolves the first time `fn` is truthy, e.g.
 * `await AwaitSignal(() => !open())`. same shape as Solid 2's `until()`, so
 * the port is an import swap: replace this with `until` and delete the file.
 */
export const AwaitSignal = <T>(fn: () => T) => {
  return new Promise<T>((resolve) => {
    createRoot((dispose) => createEffect(() => {
      const val = fn();
      if (val) {
        resolve(val);
        dispose();
      }
    }));
  });
};
