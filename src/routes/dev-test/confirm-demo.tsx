
import { createSignal } from '~/lib/solid-compat';
import { confirmDialog } from '~/components/dialogs/confirm-dialog/confirm-control';
import { formatJSX, t } from '~/i18n/i18n';

// Dev-only demo route for exercising the global confirm/alert dialog by hand.
// Lives under /dev-test, which the dev-test.tsx layout gates to the dev server.
export default function ConfirmDemo() {

  const [answer, setAnswer] = createSignal<boolean>();

  const name = '@dwerner/finance/portfolio-var';

  // the save-as overwrite case: custom title/confirm keys + a JSX message that
  // bolds the path inside the translated sentence via formatJSX.
  async function openOverwrite() {
    setAnswer(undefined);
    const ok = await confirmDialog.confirm({
      message: formatJSX(t('save-as-dialog.overwrite-confirm-message'), {
        name: <strong>{name}</strong>,
      }),
      title: 'save-as-dialog.overwrite-confirm-title',
      confirm: 'save-as-dialog.overwrite',
    });
    setAnswer(ok);
  }

  // generic confirm: default title + button labels.
  async function openGeneric() {
    setAnswer(undefined);
    const ok = await confirmDialog.confirm({
      message: 'Do the thing? This uses the generic title and button defaults.',
    });
    setAnswer(ok);
  }

  // alert mode: single acknowledge button; default 'OK' label + 'Alert' title.
  async function openAlert() {
    setAnswer(undefined);
    await confirmDialog.alert({
      message: 'Heads up -- this is an alert. One button, default "OK", no Cancel.',
    });
    setAnswer(undefined);
  }

  // alert mode with a custom dismiss-button label (reusing an existing i18n key).
  async function openAlertCustom() {
    setAnswer(undefined);
    await confirmDialog.alert({
      message: 'Alert with a custom dismiss label (the button reads "Close").',
      dismiss: 'dialog-close-label', // -> "Close"
    });
    setAnswer(undefined);
  }

  return (
    <main style="padding: 2rem; font-family: system-ui; display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
      <h1>Confirm/alert dialog demo</h1>

      <p style="max-width: 40rem; color: #555;">
        Check: modal (backdrop blocks the page), drag the header to move it, <strong>no</strong>
        resize grip, Escape → <code>false</code>, the X → <code>false</code>, Cancel → <code>false</code>,
        Confirm → <code>true</code>, and the dynamic <code>{'{name}'}</code> renders in the message.
        Each button calls the global <code>confirmDialog</code> singleton programmatically.
      </p>

      <div style="display: flex; gap: .75rem; flex-wrap: wrap;">
        <button class="button-primary" onclick={openOverwrite}>Open (overwrite case)</button>
        <button onclick={openGeneric}>Open (generic defaults)</button>
        <button onclick={openAlert}>Open (alert, default OK)</button>
        <button onclick={openAlertCustom}>Open (alert, custom label)</button>
      </div>

      <pre id="result" style="background: #f4f4f4; padding: 1rem; border-radius: 6px;">
        {answer() === undefined ? '(no answer yet)' : `answer === ${answer()}`}
      </pre>
    </main>
  );
}
