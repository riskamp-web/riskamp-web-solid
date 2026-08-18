import { For } from 'solid-js';

// Index for the dev-only test pages. Add a page under src/routes/dev-test/ and
// give it a line here so it stays discoverable. The dev-test.tsx layout gates
// the whole group to the dev server.
const PAGES: { href: string, title: string, blurb: string }[] = [
  { href: '/dev-test/confirm-demo', title: 'Confirm / alert dialog', blurb: 'The global confirmDialog.confirm() / .alert() singleton — every resolution path.' },
  { href: '/dev-test/save-as-demo', title: 'Save As dialog', blurb: 'SaveAsDialog: plain name, full path in the Name field, collision/overwrite, rename-seed mode.' },
  { href: '/dev-test/toast-demo', title: 'Toast notifications', blurb: 'The toast singleton — success/error variants and the action/Retry button.' },
  { href: '/dev-test/icons', title: 'Icon gallery', blurb: 'Every icon in every set.' },
];

export default function DevTestIndex() {
  return (
    <main style="padding: 2rem; font-family: system-ui; display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
      <h1>Dev test pages</h1>
      <p style="max-width: 40rem; color: #555;">
        Demo and gallery pages for exercising components by hand. This whole
        <code> /dev-test </code> tree is limited to the dev server.
      </p>

      <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: .75rem; max-width: 40rem;">
        <For each={PAGES}>{page =>
          <li>
            <a href={page.href} style="font-size: 1.05rem; font-weight: 600;">{page.title}</a>
            <div style="color: #555; margin-top: .15rem;">{page.blurb}</div>
          </li>
        }</For>
      </ul>
    </main>
  );
}
