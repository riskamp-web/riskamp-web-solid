
import { createEffect, on, type JSX } from 'solid-js';
import { Dialog, type Props as DialogProps } from '~/components/dialogs/dialog-base/dialog';
import { t, type StringKey } from '~/i18n/i18n';
import style from './confirm-dialog.module.css';

interface Props extends DialogProps<boolean> {
  /** the question/body. a plain (already-resolved) string, or JSX when part of
      the message needs markup -- e.g. formatJSX() to bold a path inside a
      translated sentence. we control the strings, so raw HTML isn't a concern. */
  message: string | JSX.Element;

  /** heading label; an i18n key. defaults to a generic 'Are you sure?' */
  title?: StringKey;

  /** affirmative button label; an i18n key. defaults to a generic 'Confirm' */
  confirm?: StringKey;

  /** dismissive button label; an i18n key. defaults to a generic 'Cancel' */
  cancel?: StringKey;

  /** optional convenience channel, fired alongside setResult (parity with SaveAsDialog's onSave) */
  onConfirm?: (result: boolean) => void;
}

/**
 * A generic, reusable confirmation dialog: modal, movable, not resizable.
 * Escape (and the close box) resolve to "No" -- callers read the boolean via
 * setResult and treat only `true` as an affirmative. The message is dynamic;
 * button/title labels are configurable i18n keys with sensible defaults.
 */
export function ConfirmDialog(props: Props) {

  // seed a non-affirmative result on each open, so any dismissal that doesn't set
  // its own result -- the close box (setOpen only) and Escape (undefined) -- still
  // reads as "No". Only the primary button lands a `true`. Callers must not rely on
  // a stale result from a previous open.
  createEffect(on(props.open, value => {
    if (value) {
      props.setResult?.(false);
    }
  }));

  function Close(value: boolean) {
    props.onConfirm?.(value);
    props.setResult?.(value);
    props.setOpen(false);
  }

  return (
    <Dialog {...props} modal moveable escape closebox resizeable={false}
            class={[style['dialog-root'], props.class].filter(Boolean).join(' ')}>

      <header>{t(props.title ?? 'confirm-dialog.title')}</header>

      <section class={style.message}>{props.message}</section>

      <footer>
        <button class="button-primary" onclick={() => Close(true)}>
          {t(props.confirm ?? 'confirm-dialog.confirm')}
        </button>
        <button onclick={() => Close(false)}>
          {t(props.cancel ?? 'confirm-dialog.cancel')}
        </button>
      </footer>

    </Dialog>
  );
}
