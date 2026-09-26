/**
 * spinner controller
 *
 * show() and hide() drive the <Spinner /> host's <dialog> directly rather
 * than through a signal and an effect, so the overlay is up (and gone) by the
 * time they return. that makes focus deterministic: the spinner is modal, so
 * it takes focus while it's up; hide() puts focus back where show() found it,
 * and a caller that wants focus somewhere else can move it right after hide().
 */

type EscapeFunction = () => void;

let escape_function: EscapeFunction|undefined = undefined;

/** the host's <dialog>, handed over when <Spinner /> mounts */
let dialog: HTMLDialogElement|undefined;

let visible = false;

/** what had focus when the spinner went up */
let restore: Element|null = null;

function BlockKeys(event: KeyboardEvent) {

  if (event.key === 'Escape' && escape_function) {
    escape_function();
  }

  event.stopPropagation();
  event.preventDefault();
}

function Open() {
  restore = document.activeElement;
  dialog?.showModal();
}

function Close() {
  dialog?.close();

  // focus() is a no-op on something that has since become unfocusable (e.g.
  // a button in a dialog that closed while we were up)
  const target = restore;
  restore = null;
  if (target instanceof HTMLElement && target.isConnected) {
    target.focus({ preventScroll: true });
  }
}

export const spinner = {
  show: (escape?: EscapeFunction) => {
    escape_function = escape;
    if (!visible) {
      visible = true;
      Open();
    }
    window.addEventListener('keydown', BlockKeys)
  },
  hide: () => {
    if (visible) {
      visible = false;
      Close();
    }
    escape_function = undefined;
    window.removeEventListener('keydown', BlockKeys)
  },
  /** called by <Spinner /> on mount (and with undefined on cleanup) */
  attach: (element?: HTMLDialogElement) => {
    dialog = element;
    if (dialog && visible) {
      Open();
    }
  },
};
