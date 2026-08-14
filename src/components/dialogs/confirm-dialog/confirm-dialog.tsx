
import { Show, type Setter } from 'solid-js';
import { Dialog } from '~/components/dialogs/dialog-base/dialog';
import { t } from '~/i18n/i18n';
import { confirmDialog } from './confirm-control';
import style from './confirm-dialog.module.css';

/**
 * The global confirm/alert dialog host: modal, movable, not resizable. Mounted
 * once in Root (next to <Spinner/> and <Toaster/>); driven imperatively via the
 * `confirmDialog` singleton -- callers don't place this component or own its
 * state, they just `await confirmDialog.confirm({...})`.
 *
 * In `confirm` mode it shows a primary + cancel button; Escape and the close box
 * resolve to `false` (only the primary button resolves `true`). In `alert` mode
 * it shows a single acknowledge button (defaults to "OK"); alert callers await
 * the void resolution and ignore the value. The message is dynamic; button/title
 * labels are configurable i18n keys with sensible defaults.
 */
export function ConfirmDialog() {

  const request = confirmDialog.request;

  // the base Dialog calls setOpen(false) on both Escape and the close box; route
  // every such non-affirmative dismissal to settle(false). we only ever receive
  // `false` here (the base never sets it true), but the base types the prop as a
  // Setter<boolean>, so present a matching signature.
  const handleSetOpen = ((value: boolean) => {
    if (!value) { confirmDialog.settle(false); }
  }) as Setter<boolean>;

  return (
    <Dialog
      open={confirmDialog.open}
      setOpen={handleSetOpen}
      modal moveable escape closebox resizeable={false}
      class={style['dialog-root']}>

      <header>
        {t(request().title ?? (request().mode === 'alert' ? 'confirm-dialog.alert-title' : 'confirm-dialog.title'))}
      </header>

      <section class={style.message}>{request().message}</section>

      <footer>
        <Show
          when={request().mode === 'alert'}
          fallback={
            <>
              <button class="button-primary" onclick={() => confirmDialog.settle(true)}>
                {t(request().confirm ?? 'confirm-dialog.confirm')}
              </button>
              <button onclick={() => confirmDialog.settle(false)}>
                {t(request().cancel ?? 'confirm-dialog.cancel')}
              </button>
            </>
          }>
          <button class="button-primary" onclick={() => confirmDialog.settle(true)}>
            {t(request().dismiss ?? 'confirm-dialog.ok')}
          </button>
        </Show>
      </footer>

    </Dialog>
  );
}
