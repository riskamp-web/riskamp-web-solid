import { createSignal, type JSX } from 'solid-js';
import { ConfirmDialog } from '~/components/dialogs/confirm-dialog/confirm-dialog';
import { AwaitSignal } from '~/lib/await-signal';
import { formatJSX, t } from '~/i18n/i18n';

// TEMPORARY demo route for exercising ConfirmDialog by hand. Delete before commit.
export default function ConfirmDemo() {

  const [open, setOpen] = createSignal(false);
  const [result, setResult] = createSignal<boolean>();
  const [answer, setAnswer] = createSignal<boolean>();

  // which case to open: the save-as overwrite strings, or the generic defaults.
  const [message, setMessage] = createSignal<string | JSX.Element>('');
  const [overwrite, setOverwrite] = createSignal(true);

  const name = '@dwerner/finance/portfolio-var';

  // mirror a real caller: open, await the close, normalize (only `true` is Yes).
  async function run() {
    setOpen(true);
    await AwaitSignal(open, o => !o);
    setAnswer(result() === true);
  }

  function openOverwrite() {
    setAnswer(undefined);
    setOverwrite(true);
    // JSX message: bold the path *inside* the translated sentence via formatJSX.
    setMessage(formatJSX(t('save-as-dialog.overwrite-confirm-message'), {
      name: <strong>{name}</strong>,
    }));
    void run();
  }

  function openGeneric() {
    setAnswer(undefined);
    setOverwrite(false);
    setMessage('Do the thing? This uses the generic title and button defaults.');
    void run();
  }

  return (
    <main style="padding: 2rem; font-family: system-ui; display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
      <h1>ConfirmDialog demo</h1>

      <p style="max-width: 40rem; color: #555;">
        Check: modal (backdrop blocks the page), drag the header to move it, <strong>no</strong>
        resize grip, Escape → <code>false</code>, the X → <code>false</code>, Cancel → <code>false</code>,
        Confirm → <code>true</code>, and the dynamic <code>{'{name}'}</code> renders in the message.
        The two buttons open it with different <code>title</code>/<code>confirm</code> keys.
      </p>

      <div style="display: flex; gap: .75rem;">
        <button class="button-primary" onclick={openOverwrite}>Open (overwrite case)</button>
        <button onclick={openGeneric}>Open (generic defaults)</button>
      </div>

      <pre id="result" style="background: #f4f4f4; padding: 1rem; border-radius: 6px;">
        {answer() === undefined ? '(no answer yet)' : `answer === ${answer()}`}
      </pre>

      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        setResult={setResult}
        message={message()}
        title={overwrite() ? 'save-as-dialog.overwrite-confirm-title' : undefined}
        confirm={overwrite() ? 'save-as-dialog.overwrite' : undefined} />
    </main>
  );
}
