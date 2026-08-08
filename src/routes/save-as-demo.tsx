import { createSignal, For } from 'solid-js';
import { SaveAsDialog, type SaveAsResult } from '~/components/dialogs/save-as-dialog/save-as-dialog';
import type { BackstageDocument } from '~/backstage/documents-store';
import { ACCESS_PRIVATE } from '~/backstage/documents-data';

// TEMPORARY demo route for exercising SaveAsDialog by hand. Delete before commit.
export default function SaveAsDemo() {

  const [open, setOpen] = createSignal(true);
  const [result, setResult] = createSignal<SaveAsResult>();

  // toggle these to try the rename/move seed path (initialName / initialFolder / ignoreId)
  const [rename, setRename] = createSignal(false);

  const owner = () => '@dwerner';
  const documents = (): BackstageDocument[] => ([
    { id: 1, userid: 1, name: 'Portfolio VaR', path: '@dwerner/finance/portfolio-var', status: 0, access: 0, created: 0, modified: 0, version: 1 },
    { id: 2, userid: 1, name: 'Capital Plan', path: '@dwerner/finance/reports/capital-plan', status: 0, access: 0, created: 0, modified: 0, version: 1 },
    { id: 3, userid: 1, name: 'Bubbles', path: '@dwerner/bubbles', status: 0, access: 0, created: 0, modified: 0, version: 1 },
  ]);

  return (
    <main style="padding: 2rem; font-family: system-ui; display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
      <h1>SaveAsDialog demo</h1>

      <p style="max-width: 40rem; color: #555;">
        Try: a plain name (<code>My Report</code>), a full path in the Name field
        (<code>finance/reports/My Report</code> — the Folder field shadows), and a collision
        (<code>finance/Portfolio VaR</code>). Toggle "rename mode" to seed the fields and exclude
        doc #1 from the collision check.
      </p>

      <div style="max-width: 40rem;">
        <strong>Existing documents (any of these paths collides):</strong>
        <ul style="font-family: ui-monospace, monospace; color: #555; margin: .4rem 0 0;">
          <For each={documents()}>{doc =>
            <li>#{doc.id} — {doc.path}</li>
          }</For>
        </ul>
        <p style="color: #555; margin: .4rem 0 0;">
          The <em>collision</em> case: type <code>finance/Portfolio VaR</code> into Name → it
          normalizes to <code>@dwerner/finance/portfolio-var</code>, which is doc #1's path. The
          path still renders, a warning appears below it, and Save becomes <strong>Overwrite</strong>
          (overwriting is allowed; a confirmation step will come later, in the caller). Turn on
          rename mode (ignoreId = 1) and the warning disappears — a document never collides with
          itself.
        </p>
      </div>

      <label style="display: flex; gap: .5rem; align-items: center;">
        <input type="checkbox" checked={rename()} onchange={e => setRename(e.currentTarget.checked)} />
        rename mode (seed "Portfolio VaR" in /finance, private, ignoreId = 1)
      </label>

      <button class="button-primary" onclick={() => setOpen(true)}>Open dialog</button>

      <pre id="result" style="background: #f4f4f4; padding: 1rem; border-radius: 6px;">{result() ? JSON.stringify(result(), null, 2) : '(no result yet)'}</pre>

      <SaveAsDialog
        open={open}
        setOpen={setOpen}
        owner={owner}
        documents={documents}
        initialName={rename() ? 'Portfolio VaR' : undefined}
        initialFolder={rename() ? '/finance' : undefined}
        initialAccess={rename() ? ACCESS_PRIVATE : undefined}
        ignoreId={rename() ? 1 : undefined}
        onSave={setResult} />
    </main>
  );
}
