
/**
 * confirm/alert controller
 *
 * a module-level singleton, mirroring spinner-control.ts / toast-control.ts. the
 * confirm/alert dialog has no truly dynamic parameters -- each call passes fixed
 * values plus a promise that only lives for the duration of the modal -- so rather
 * than stamping open/result signals at every call site we expose an imperative,
 * promise-returning API and mount one host (<ConfirmDialog/>) in Root.
 *
 *   const ok = await confirmDialog.confirm({ message, title, confirm, cancel });
 *   await confirmDialog.alert({ message });
 */

import { createSignal } from '~/lib/solid-compat';
import type { JSX } from '@solidjs/web';

import type { StringKey } from '~/i18n/i18n';

export interface ConfirmOptions {
  /** the question/body. a plain (already-resolved) string, or JSX when part of
      the message needs markup -- e.g. formatJSX() to bold a path inside a
      translated sentence. we control the strings, so raw HTML isn't a concern. */
  message: string | JSX.Element;

  /** heading label; an i18n key. defaults to a generic 'Are you sure?'. */
  title?: StringKey;

  /** affirmative button label; an i18n key. defaults to a generic 'Confirm'. */
  confirm?: StringKey;

  /** dismissive button label; an i18n key. defaults to a generic 'Cancel'. */
  cancel?: StringKey;
}

export interface AlertOptions {
  /** the body; see ConfirmOptions.message. */
  message: string | JSX.Element;

  /** heading label; an i18n key. defaults to a generic 'Alert'. */
  title?: StringKey;

  /** acknowledge button label; an i18n key. defaults to a generic 'OK'. */
  dismiss?: StringKey;
}

export interface ConfirmRequest extends ConfirmOptions, AlertOptions {
  mode: 'confirm' | 'alert';
}

const [open, setOpen] = createSignal(false);
const [request, setRequest] = createSignal<ConfirmRequest>({ mode: 'confirm', message: '' });

let pendingResolve: ((value: boolean) => void) | undefined;

function start(mode: 'confirm' | 'alert', options: ConfirmOptions | AlertOptions): Promise<boolean> {
  setRequest({ mode, ...options });
  setOpen(true);
  return new Promise<boolean>(resolve => { pendingResolve = resolve; });
}

// resolve the pending promise and close. idempotent: Escape routes through the
// host's setOpen bridge as settle(false), which can fire after a button already
// settled -- so grab-and-null the resolver before using it, and no-op thereafter.
function settle(value: boolean) {
  const resolve = pendingResolve;
  pendingResolve = undefined;
  setOpen(false);
  resolve?.(value);
}

export const confirmDialog = {
  confirm: (options: ConfirmOptions) => start('confirm', options),
  alert: (options: AlertOptions) => start('alert', options).then(() => {}),

  // consumed by the host component only
  open,
  request,
  settle,
};
