import { toast } from '~/components/toast/toast-control';

// TEMPORARY demo route for exercising the toast system by hand. Delete before commit.
export default function ToastDemo() {

  let counter = 0;

  return (
    <main style="padding: 2rem; font-family: system-ui; display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
      <h1>Toast demo</h1>

      <p style="max-width: 40rem; color: #555;">
        Fire each toast variant. Success auto-dismisses (~4s); errors persist until you
        dismiss them with the × or act on them. Check both themes and that multiple
        toasts stack cleanly.
      </p>

      <div style="display: flex; gap: .5rem; flex-wrap: wrap;">
        <button class="button-primary"
          onclick={() => toast.success('Saved “Report.xlsx”')}>
          Show success
        </button>

        <button class="button-primary"
          onclick={() => toast.error('Couldn’t save “Report.xlsx”.')}>
          Show error
        </button>

        <button class="button-primary"
          onclick={() => toast.error('Couldn’t save “Report.xlsx”.', {
            action: { label: 'Retry', run: () => toast.success('Retried!') },
          })}>
          Show error + Retry
        </button>

        <button class="button-primary"
          onclick={() => {
            toast.success(`First (${++counter})`);
            toast.error(`Second (${++counter})`);
            toast.success(`Third (${++counter})`);
          }}>
          Show several
        </button>
      </div>
    </main>
  );
}
