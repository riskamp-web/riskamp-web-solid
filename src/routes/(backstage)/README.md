# backstage redesign

A from-scratch redesign of the backstage pages (documents, account, auth), starting
with **documents** and then **sign in**. Everything here is UI/UX against canned data —
nothing is wired to auth or the document service yet.

## Containment

**Every change stays inside `src/routes/(backstage)/`.** Several design passes are
expected, and containment keeps the blast radius small and the redesign reversible.
That means, on purpose:

- theme tokens are declared locally (scoped to `.page` in `backstage.module.css`)
  rather than added to `src/app.css`
- strings are hardcoded English; extracting them into `~/i18n` waits until the design
  settles. `'documents-page.title'` and `'sign-in.page.title'` are existing keys, so the
  toolbar titles are already localized
- glyphs the app icon set lacks (star, folder, search, trash…) live in
  `backstage-icons.tsx` rather than being added to `~/components/icon-sets`

Promoting any of those out of here is deliberate later work, not cleanup to do in
passing.

## Files

| file | what it holds |
| --- | --- |
| `documents.tsx` | the documents page |
| `documents.module.css` | the table, the version list, the rename field |
| `sign-in.tsx` | the sign-in page, including the canned credential |
| `sign-in.module.css` | the page tint, title block, password reveal, links row, demo note |
| `backstage.module.css` | shared shell: theme tokens, rail/content/panel, control and form primitives. The consolidation point for the next backstage page |
| `backstage-icons.tsx` | local inline SVG icons |
| `documents-data.ts` | canned documents plus the path/folder/format/sort helpers |

`(backstage)` is a pathless route group, so the files serve `/documents` and `/sign-in` —
the latter is the path the toolbar's signed-out link already points at.

## Design decisions

Settled with the user across several passes. The reasoning matters more than the values.

- **Accent is the logo blue**, `light-dark(#0477be, #2a91d8)` — the same pair `app.css`
  already uses for `--dialog-border-color`. One accent, no second brand color.
- **Focus is drawn by the browser.** Nothing in this directory sets an outline. Controls
  are built so the native ring lands correctly: the search box is a single `<input>`
  carrying its own border and padding, with the icon and clear button positioned over
  that padding, so the ring wraps the whole control rather than a box inside it.
- **Nothing below 13px** except the all-caps column and section labels, which sit at
  12px via `--bs-label-size`.
- **Secondary text is one step down from primary, not three.** Roughly 10:1 contrast
  against the surface in both themes. If something seems to need to be fainter than
  `--bs-text-faint`, it probably wants `--bs-text-muted`; the faint token is used in
  exactly one place.
- **The detail panel covers the list, it doesn't push it.** Pushing re-lays-out every
  row, and when you're reading the panel the list behind it matters less.
- **Access is a text-only pill.** Public is the default, so it reads as the quiet one;
  private carries the weight. No icons — one state with an icon and one without reads as
  an inconsistency rather than a distinction.
- **Rows have a hairline separator.** With seven columns, tracking one record across the
  table is otherwise hard work.
- Minimal and subtle over loud and busy, generally.

## Sign in

- **The methods on the page are the ones the backend has.** `~/lib/auth` offers
  username-or-email + password (`/api/login`), plus email-based account creation and
  recovery. There are no SSO providers, so no "continue with…" buttons are drawn — a
  button that can't be wired to anything is a promise the page can't keep.
- **Centred card, no rail.** The page tints itself with `--bs-rail-background` so the
  card has a ground to sit on; both values are existing tokens. Below 420px the card
  drops its border and goes edge-to-edge — a card with a 20px gutter either side stops
  being a card and starts being a frame.
- **The page draws its own top hairline.** The toolbar has no bottom edge of its own — it
  relies on being darker than the page, which works against white but not against the
  light tint, where the two are within a few percent and the boundary vanishes. Since the
  toolbar is outside the containment boundary, the fix is a `border-top` on the page, in
  the same `--bs-border` the rail and content header use.
- **Visible labels, not placeholder labels.** The i18n keys from the old page used
  placeholders; a label that vanishes when you type isn't a label.
- **Validation runs on submit, not by disabling the button.** A disabled submit doesn't
  say which field it's waiting on. Field messages carry `aria-invalid` and focus moves to
  the first offender; the form-level failure is a `role='alert'` banner above the fields.
- **Failure keeps the identifier and clears the password**, and doesn't disclose which
  half was wrong.
- **The pending state is a label swap** ("Signing in…") plus `aria-busy` and disabled
  controls. No spinner: it would be a new glyph and a new animation for something the
  label already says.
- **The canned credential is printed under the form.** A demo you have to guess the
  password for isn't a demo. `duncan` or `duncan@riskamp.com` with `riskamp` succeeds and
  routes to `/documents` — routing only, no session is established. The note goes away
  when this is wired up.
- The "Forgot password" and "Create account" links point at `/forgot-password` and
  `/create-account`, which **don't exist yet** — those pages are still in `archive/`
  awaiting their own pass, so the links 404 until then. Left as real links rather than
  inert text so the page doesn't have to change when they land.

## Data model

The document's **path is its identity**. There is no opaque id in the URL.

- `path` is the **full** slug path — `/finance/portfolio-var`, not the folder. The folder
  is everything before the last segment (`folderOf`).
- `name` is the document name with its own casing, and is **optional**. The old save UI
  asked for a name and a slug separately and almost nobody filled in the name, so most
  existing documents have none.
- **Rename is a move.** The path derives from the name, so committing a rename writes
  both fields. Old URLs break — that's accepted, and arguably desirable, since a stale
  link resolving to replaced content would be worse.
- **Collisions block the save.** Paths are compared case-insensitively, matching how the
  loader resolves them. No silent `-2` disambiguation.
- **Unnamed documents show their slug, in monospace.** Deliberately not prettified:
  un-slugifying can't recover `VaR` from `var`, and shouldn't pretend to. Monospace marks
  the value as an address rather than a badly-cased name, and makes the documents still
  needing a name easy to spot — which matters for migrating the existing set. They are
  *not* dimmed; muted text would read as disabled.
- Naming a legacy document whose slug already matches leaves its address untouched, which
  is the common migration case.

`slugify()` folds diacritics via `NFD` before applying the separator rule, so
`Análisis de Riesgo` → `analisis-de-riesgo` rather than `an-lisis-de-riesgo`.

## Open questions

Neither blocks the current page.

1. **Folder naming.** Folders are derived from paths — there's no folder table, so a
   folder has nowhere to store a cased name. Recommendation: the segment *is* the name —
   sanitize with the same slugifier, lowercase, and show it raw in the rail. The
   alternative is folder metadata, which brings back empty folders and a table that was
   deliberately avoided.
2. **Save flow.** Recommendation: separate folder picker and name field, with typing
   `finance/` into the name field splitting that segment into the folder control as an
   accelerator — so the parse is visible and rename stays distinct from move.

## Gotchas hit while building this

Worth knowing before editing; each of these failed silently.

- **Padding on a subgrid child overflows.** `.table-header` / `.table-body` inherit their
  tracks from `.table`, so padding on them exceeds the inherited track widths and produces
  a horizontal scrollbar. The inset lives on `.table`.
- **A container query never matches the container itself.** `@container bs-page` rules
  can't restyle `.page`; they have to target descendants (`.rail`, `.content`). An
  override written on the container is silently dead.
- **CSS module references are unchecked.** `bs['panel-section']` where the class lives in
  `documents.module.css` resolves to `undefined` and renders no class, with no error. Two
  modules are in play in `documents.tsx` (`bs` and `style`) — check which file a class is
  in. This shipped a broken margin for a whole pass before being caught.

## Verifying

Dev server on 5173, then `/documents`. Worth exercising both themes (toolbar theme
chooser), the loading skeleton, the true-empty state (delete everything — delete works on
the canned store), zero-results search, multi-select, the slide-over, rename including a
deliberate collision, and widths around 1400 / 760 / 500px for the container-query
breakpoints. Star, access, rename and delete mutate the local store; duplicate and move
are placeholders.

Then `/sign-in`: submit empty (two field messages, focus on the first), a wrong password
(pending label, then the banner, password cleared and focused), and the canned credential
by both username and email (lands on `/documents`). Also the reveal toggle, the Caps Lock
hint, keyboard-only tab order, and ~380px for the edge-to-edge card. Note that a synthetic
`CapsLock` keypress doesn't set the modifier state in an automated browser — the hint has
to be checked by hand, or by dispatching a `KeyboardEvent` with `modifierCapsLock: true`.
