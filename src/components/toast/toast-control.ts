
/**
 * toast controller
 *
 * a module-level singleton, mirroring spinner-control.ts: any code can import
 * `toast` and fire a notification imperatively, without a context or a ref to
 * the host. the <Toaster /> component (mounted once in Root) renders whatever
 * is in the store.
 *
 * errors persist until the user dismisses or acts on them; success toasts
 * auto-dismiss. the message is a caller-supplied, already-localized string --
 * the store carries no i18n keys.
 */

import { createStore, produce } from "solid-js/store";

export type ToastVariant = 'error' | 'success';

export interface ToastAction {
  /** button text, already localized */
  label: string;
  /** what the button does; the toast is dismissed first, then this runs */
  run: () => void;
}

export interface ToastOptions {
  /** an optional single action button (Retry / Undo / ...) */
  action?: ToastAction;
  /** override the auto-dismiss delay in ms; 0 means persist until dismissed */
  duration?: number;
}

export interface Toast {
  id: number;
  variant: ToastVariant;
  message: string;
  action?: ToastAction;
}

/** how long a success toast stays up before it dismisses itself */
const SUCCESS_DURATION = 4000;

const [items, setItems] = createStore<Toast[]>([]);

// a plain incrementing counter -- ids only need to be unique within a session,
// and Date.now()/Math.random() aren't wanted here.
let seq = 0;

const timers = new Map<number, ReturnType<typeof setTimeout>>();

function dismiss(id: number) {
  const timer = timers.get(id);
  if (timer !== undefined) {
    clearTimeout(timer);
    timers.delete(id);
  }
  setItems(list => list.filter(toast => toast.id !== id));
}

function push(variant: ToastVariant, message: string, options?: ToastOptions): number {
  const id = ++seq;

  setItems(produce(list => {
    list.push({ id, variant, message, action: options?.action });
  }));

  // errors persist (duration 0); success auto-dismisses. an explicit duration
  // overrides either default.
  const duration = options?.duration ?? (variant === 'success' ? SUCCESS_DURATION : 0);
  if (duration > 0) {
    timers.set(id, setTimeout(() => dismiss(id), duration));
  }

  return id;
}

export const toast = {
  /** a persistent error notification, optionally with a Retry-style action */
  error: (message: string, options?: ToastOptions) => push('error', message, options),
  /** a success notification that auto-dismisses */
  success: (message: string, options?: ToastOptions) => push('success', message, options),
  dismiss,
  /** the live store, for the <Toaster /> host to render */
  items,
};
