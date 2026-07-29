# backstage redesign

A from-scratch redesign of the backstage pages (documents, account, auth), starting
with **documents** and then **sign in**. Documents is still UI/UX against canned data —
nothing there touches the document service. **Sign in is wired**: it posts to
`/api/login` through `~/lib/auth`.

## Containment

**The pages live in `src/routes/(backstage)/`; the code and data they run on live in
`src/backstage/`.** Several design passes are expected, and keeping the redesign to those
two directories keeps the blast radius small and the whole thing reversible.

The split exists because the data outlives the page. The document store is module-level, so
it survives leaving `/documents` — which means signing out has to be *able* to empty it, and
`sign-out.tsx` can't sensibly reach into another route's folder for that. Anything that
isn't markup, styling or route-shaped belongs in `src/backstage/`.

Within that, on purpose:

- theme tokens are declared locally (scoped to `.page` in `backstage.module.css`)
  rather than added to `src/app.css`
- strings are hardcoded English; extracting them into `~/i18n` waits until the design
  settles. `'documents-page.title'` and `'sign-in.page.title'` are existing keys, so the
  toolbar titles are already localized
- glyphs the app icon set lacks live in `backstage-icons.tsx` rather than being added to
  `~/components/icon-sets` (see "Icons" below — documents now draws from the app set, and
  what's left local is only what that set has no name for)

Promoting any of those out of here is deliberate later work, not cleanup to do in
passing.

Two deliberate exceptions so far, both by request. The **route guard** lives in
`src/routes/(backstage).tsx` and `src/components/layout-context.tsx` — a check that has to
be shared by every backstage page can't live inside any one of them. And the documents
page's **saved view** lives in `persistentData` in `src/lib/app-data.ts`, which is where
this app already keeps things that outlive a component. Both are described below.

## Files

The pages, in `src/routes/(backstage)/`:

| file | what it holds |
| --- | --- |
| `documents.tsx` | the documents page |
| `documents.module.css` | the table and the version list |
| `sign-in.tsx` | the sign-in page |
| `sign-in.module.css` | the page tint, title block, password reveal, links row |
| `sign-out.tsx` | logs out and leaves |
| `backstage.module.css` | shared shell: theme tokens, rail/content/panel, control and form primitives. The consolidation point for the next backstage page |
| `backstage-icons.tsx` | the few glyphs the app icon set has no name for |

What they run on, in `src/backstage/`:

| file | what it holds |
| --- | --- |
| `documents-store.ts` | the row and history shapes, and the two stores themselves |
| `documents-data.ts` | the loaders, the path/folder/name/format/sort helpers, and the saved view |
| `documents-sample.ts` | the canned document set and its canned history |
| `documents-sample2.ts` | a dump of **real** rows from the live account, for reference — not wired to anything |
| `dev-access.ts` | `requireAuth()` — the guard declaration plus its dev-only bypasses |

`documents-store.ts` holds the state and `documents-data.ts` holds the behaviour, so the
sample fixture can import the shapes without importing the loader that imports it back.
The page imports from `documents-data`, which re-exports the types and stores — one import
site, not two.

**`documents-sample2.ts` is the one to check a change against.** It's real data, and it
carries the shapes the canned set doesn't: `@owner`-prefixed paths, 81 of 83 documents at
the owner's root, names with spaces and mixed case, addresses stored in the name field, and
no `starred` or `versions` at all. Temporarily pointing `sample()` at it is how the path,
name and optional-field handling in this pass was checked.

`(backstage)` is a pathless route group, so the pages serve `/documents`, `/sign-in` and
`/sign-out` — the second is the path the toolbar's signed-out link already points at.

## The route guard

Backstage pages come in two kinds: some need a session (documents), some only make sense
without one (sign in, and later forgot password / create account). A page says which it is
during render, next to its title:

```tsx
const { setTitle, setRequires } = useLayoutContext();
setTitle('documents-page.title');
setRequires('signed-in');        // or 'signed-out'
```

Documents goes through `requireAuth('signed-in')` from `dev-access.ts` instead, which is
`setRequires` plus the dev bypass below.

`src/routes/(backstage).tsx` turns that plus `loggedIn()` into a redirect — `/sign-in` for
a page that needs a session, `/` for one that needs none — and gates `props.children`
behind it, so a blocked page never renders. A page that declares nothing renders either
way. `<Navigate>` replaces rather than pushes, so Back doesn't return to the blocked page
and bounce again.

Three things worth knowing before touching it:

- **The declaration is keyed by the path that made it**, in `layout-context.tsx`, and
  pages deliberately don't clear it on cleanup the way they clear the title. A route
  component can't pass props up to its layout, so the page pushes during render — but if
  it also reset on unmount, the guard would disown the page, the cleanup would clear the
  requirement, the guard would allow it again, and it would remount and re-declare,
  forever. Keying to the path makes a stale declaration stop counting the moment the
  location changes.
- **The guard is live**, because `loggedIn()` is a signal. Losing the session while on
  `/documents` bounces you out mid-visit, and signing in on `/sign-in` would land you on
  `/` even if the page didn't navigate there itself. Both agree on `/`, so a successful
  sign-in produces one history entry, not two.
- **An expired-but-refreshable token reads as signed out**, on purpose. `GetInitialSession`
  reports empty and kicks off a background re-auth; a `/documents` visit in that window
  goes to `/sign-in` and then, once re-auth lands, to `/`. Refresh is a two-day path that
  normally happens on `/`, so this is left to sort itself out.

### The dev bypass

Documents is UI/UX against canned data, so signing in for every look at it is friction —
but the guard has to be real. `dev-access.ts` resolves that: **`/documents?dev` opens the
page without a session, on the dev server only.** The parameter's presence is what counts
(`?dev`, `?dev=1`, `?dev=anything` all work), because `?dev` with no value parses to `''`
and a truthiness test would reject the bare form.

- **A production build doesn't contain it.** The check starts at `import.meta.env.DEV`,
  which Vite replaces statically, so the branch — query read and warning text included —
  is dropped from the bundle. Same mechanism as `src/routes/icons.tsx`. The `DEV` test is
  written twice, once inside `devBypass()` and once at the head of the `requireAuth`
  condition: with it only in the callee, the minifier reduces the call to `false` but keeps
  the branch around it, which leaves the bypass unreachable rather than absent. Verified by
  grepping `dist/` for the warning after a build — that's the check worth repeating if this
  file is refactored.
- **It skips the guard, it doesn't fake a session.** `loggedIn()` is still false, so the
  toolbar renders its signed-out state and anything genuinely needing a token would still
  fail. That's fine for a page on canned data, and worth remembering before wiring this one
  to the document service.
- **It works by not declaring**, which is already how the guard says "renders either way"
  (`sign-out.tsx` declares nothing). So `(backstage).tsx` and `layout-context.tsx` know
  nothing about it, and only the pages that call `requireAuth` can be bypassed.
- Bypassing logs a `[dev] sign-in check bypassed via ?dev` warning, so a page that renders
  when you expected a redirect explains itself.

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
- **Rows have a hairline separator.** With eight columns, tracking one record across the
  table is otherwise hard work.
- **The Version column is the version *number*, not a count of the history.** The number
  comes free with the list query; a count would need a fetch per row, which is exactly what
  the history store exists to avoid.
- **Access and Version are centred — with a caveat.** The sort caret keeps its box whether
  or not it's showing (it fades with `opacity`), so a centred header button centres the
  label *and* the caret together, leaving the label left of centre. The row values take the
  same offset so each lines up under its heading. That padding is derived from the caret
  and nothing else, deliberately: the offset is the same whatever the heading says, so it
  needs no retuning when these labels are translated — which anything fitted to a measured
  label width would.
- **Columns drop in reverse order of usefulness** as the container narrows: version first
  (it's reference detail, and the panel shows it), then folder, then access.
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
- **The card's centre sits on the top third, not the middle** — a form centred in a tall
  window reads as low. Two flex spacers split the free space 1:2 and the card takes back
  a sixth of its own height, which lands the centre on the third at any card or window
  size. The column's bottom padding is twice its top for the same reason: any other ratio
  biases the result. The compensation is gated at `min-height: 840px`, since below roughly
  1.5x the card height it would push the card's top under the toolbar with no scroll to
  reach it; shorter windows keep the plain 1:2 placement, a little lower and never clipped.
- **The page draws its own top hairline.** The toolbar has no bottom edge of its own — it
  relies on being darker than the page, which works against white but not against the
  light tint, where the two are within a few percent and the boundary vanishes. Since the
  toolbar is outside the containment boundary, the fix is a `border-top` on the page, in
  the same `--bs-border` the rail and content header use.
- **Remember me is present but `visibility: hidden`.** There's no opt-out to offer yet —
  sessions are always remembered — but one is coming, so the row holds its space and
  nothing shifts when it lands. `visibility` rather than `display` also keeps it out of
  the tab order and the accessibility tree, which is where a control that does nothing
  belongs.
- **Visible labels, not placeholder labels.** The i18n keys from the old page used
  placeholders; a label that vanishes when you type isn't a label.
- **Validation runs on submit, not by disabling the button.** A disabled submit doesn't
  say which field it's waiting on. Field messages carry `aria-invalid` and focus moves to
  the first offender; the form-level failure is a `role='alert'` banner above the fields.
- **`auth.Login` does the work.** It posts to `/api/login`, and the token comes back as
  an `Authorization` response header that `UpdateAuth` → `StoreToken` stores on the way
  through — so the session is a side effect of the request and the page only has to route
  onward. Success is `Login` resolving true *and* `loggedIn()` being set; true without a
  session means the response carried no token, which is a different failure from a
  rejected credential.
- **A rejected credential and an unreachable server read differently.** `Login` resolves
  false for the first and throws for the second, so the banner says "Incorrect username or
  password" or "Can't reach the server" accordingly. Verified against the live API: a bad
  credential returns 403 and lands on the first message.
- **Failure keeps the identifier and clears the password**, and doesn't disclose which
  half was wrong.
- **The pending state is a label swap** ("Signing in…") plus `aria-busy` and disabled
  controls. No spinner: it would be a new glyph and a new animation for something the
  label already says.
- **Success lands on `/`** (`DESTINATION` in `sign-in.tsx`). There's no post-sign-in
  redirect target yet — nothing links here with one — so it's a constant rather than a
  `?redirect=` parameter that nothing sets.
- The "Forgot password" and "Create account" links point at `/forgot-password` and
  `/create-account`, which **don't exist yet** — those pages are still in `archive/`
  awaiting their own pass, so the links 404 until then. Left as real links rather than
  inert text so the page doesn't have to change when they land.

## The document store

The rows live in a module-level Solid store in `~/backstage/documents-store`, not in the
page, so they're fetched once rather than once per visit — leave `/documents` and come back
and the list (including anything you starred) is still there.

That lifetime is why the store sits outside the route folder: signing out needs to be able
to call `flushDocuments()`, since otherwise the next person to sign in on this browser would
see the last one's documents until something refetched. **`sign-out.tsx` doesn't call it
yet** — the store is only reachable from there, not yet wired.

```ts
documents            // the store: read it, and write through setDocuments
loaded()             // has it been filled?
failed()             // did the last attempt to fill it fail?
loadDocuments()      // fill it, unless it's already filled. returns nothing
flushDocuments()     // empty it and mark it unloaded (takes histories with it)
refreshDocuments()   // flush, then load
```

- **`loaded()` is a flag, not a length check.** An account with no documents is a real
  state: `[]` means loaded and empty, and treating that as "not loaded yet" would refetch
  forever. It also drives the page's loading skeleton, so the page no longer keeps a
  `loading` signal of its own.
- **`loadDocuments()` returns nothing.** The store is the result. It's safe to call on
  every mount, and concurrent calls share one fetch rather than starting two.
- **The loader has to work without an owner.** `refreshDocuments()` is the kind of thing an
  event handler calls, where `useContext` finds nothing — which is why `devBypass()` reads
  `window.location` rather than the router's `useLocation`.

### When the load fails

An empty list and a failed fetch both leave the store empty and mean opposite things — "you
have no documents" versus "we couldn't ask" — so `failed()` separates them and the page
draws its own state for it: **"Couldn't load your documents"**, with a **Try again** that
calls `refreshDocuments()`.

- **A failure is `failed()`, not a rejected promise.** `loadDocuments()` catches, logs the
  cause to the console, and leaves the store *unloaded* — so remounting the page retries by
  itself, and no caller has to wrap the call in a `try`.
- **The state is a flag, not the error.** Nothing downstream can say anything specific about
  the cause yet, and half-reporting one reads worse than reporting none. The message stays
  unspecific on purpose; the console keeps the detail.
- **The failure state has to come before the skeleton** in the page's `<Switch>`. A failed
  load leaves `loaded()` false, so a `!loaded()` skeleton above it would run forever.
- **`?fail` forces one**, on the dev server, the same way `?dev` skips the guard —
  `/documents?dev&fail`. An error state nobody can reach is an error state nobody has
  checked. It's dropped from production builds along with the rest of `dev-access.ts`.

## The saved view

Narrow the list, sort it, open a document, come back — and it's the same list. The page's
view state (scope, folder, search text, sort column and direction) is stored **outside the
page**, because a route component's state dies with it and opening a document unmounts the
whole thing.

It lives in `persistentData.documents_view` in `~/lib/app-data` — the app's existing
persistence, rather than a new mechanism next to it. `savedView()` and `saveView()` in
`documents-data.ts` are the only things that touch it; the page reads once during render to
seed its signals and writes from one effect.

- **The second deliberate exception to containment**, after the route guard, and by request.
  `DocumentsView` is declared in `app-data.ts` and typed against `DocumentScope` / `SortKey`
  / `SortDirection`, imported `import type` from `~/backstage/documents-data` so nothing is
  pulled in at runtime and there's no import cycle. `app-data.ts` also carries
  `documents_sort` / `documents_asc` / `documents_filter` from the **old** skeleton page —
  those are dead and due to be removed; don't extend them.
- **Persistent, not session.** It survives a reload as well as a navigation. There's nothing
  in it worth losing and nothing private in it.
- **Everything read back is validated.** It's JSON from `localStorage`, possibly written by
  an older build, so an unrecognised scope or sort key falls back to its default rather than
  putting the page in a state it can't draw. That's what `SORT_KEYS` / `SCOPE_KEYS` /
  `DEFAULT_VIEW` exist for — a union type checks nothing at runtime. Adding a field means
  adding its guard.
- **Saving is one effect reading all five**, so no handler has to remember to save, and the
  whole object is replaced rather than patched a field at a time.
- **A saved folder is dropped if it no longer exists.** Folders are derived from paths, so
  the last document leaving one deletes it, and a rail selection matching nothing draws an
  empty list with no visible cause. The check waits for `loaded()` — before that, *every*
  folder is missing.
- **What's open and what's ticked are not saved.** The detail panel and the checkbox
  selection are about what you're doing, not what you're looking at; restoring them would
  read as the page having acted on its own.
- **The restore has to beat the page's first render**, and does: `InitAppData()` runs in the
  root's `onMount` in `app.tsx`, while `/documents` is a lazily-loaded route chunk that
  hasn't rendered yet — verified by reloading straight onto `/documents`, which comes back
  with the saved view rather than the defaults. Worth knowing, because if that order ever
  changed the page would seed from the defaults and then save them over what was stored. The
  fix would be to move the `localStorage` read in `app-data.ts` from `InitAppData()` to
  module scope; the app is `ssr: false`, so there's no hydration mismatch to worry about.
  Not done now because nothing needs it.

## Version history

History is a **second store**, keyed by path, not a field on the row — because it arrives
separately. The list query returns the current version *number* and nothing else, so the
history is fetched per document when something asks for it.

```ts
histories                // path -> { status, versions }
historyOf(path)          // the entry, or undefined if nobody has asked
loadHistory(path)        // fetch it, unless it's there or already on its way
retryHistory(path)       // drop the entry and fetch again
flushHistories()         // drop them all
```

- **History is what the current version superseded — the active version isn't in it.** The
  service returns the *older* versions; the current number comes with the row. So the
  section is headed **Older versions**, nothing in the list is tagged "current", every entry
  gets the same actions, and a document on v1 has an empty history rather than a
  one-row one. The canned `sampleHistory()` matches: it starts at `version - 1`.
- **Newest first, sorted on the way into the store.** The service returns oldest first, and
  `newestFirst()` in `loadHistory()` reverses it, so the panel renders whatever it's handed
  in one order and the canned and real sources can't disagree. It sorts on the version
  *number*, not the timestamp — that's the field guaranteed to increase.
- **The entry is a tagged record, not a bare array.** `'loading' | 'ready' | 'failed'` are
  three states that render differently, and *absent* is a fourth — nobody has asked yet.
  That's what makes `loadHistory()` idempotent: an entry in any state means return early,
  so the panel can call it on every open without tracking what it has fetched.
- **A failed entry stays put** rather than being deleted, so the panel can say the fetch
  failed instead of sitting on a spinner forever. `retryHistory()` is the explicit way out.
- **Keyed by the lowercased path** (`historyKey()`), matching how the service resolves
  paths — so `/Finance/Model` and `/finance/model` can't become two entries.
- **A store, not a `Map`.** A `Map` mutated in place is invisible to the reactive system
  and the panel would never re-render when the fetch lands.
- **`flushDocuments()` flushes histories too.** They're keyed by path, so rows and the
  history cached against them have to be dropped together, or the second describes
  documents the first no longer holds. Anything that *changes* a path — rename, move — has
  the same obligation.
- **The panel is what triggers the fetch**, from a `createEffect` on the open document, and
  reads back through a memo on the store. It draws skeleton bars while loading (shaped like
  the list they become, so nothing jumps when it lands) and an inline **Try again** on
  failure.
- **`?fail-history` forces that failure** — `/documents?dev&fail-history`. It's a separate
  flag from `?fail` on purpose: that one fails the document *list*, which leaves no rows, so
  no panel, so no way to reach the state this is meant to show.

### The fetch is stubbed

`historySource()` is canned data on a timer — deliberately slower than the list, since the
loading state is unreachable if the data arrives before the panel opens. **The real call
already exists** in `~/docs/SVELTE-documents` (`DocumentHistory`): `POST
/api/document-history` with `{ path }`, returning `HistoryEntry[]`, which is
`DocumentVersion[]` under another name. Swapping it in means replacing that function body
and nothing above it.

## Icons

The documents page draws from the app icon set, `~/components/icon-sets`. That set ships
SVG markup as **strings**, so an icon is an element with the markup inside it rather than a
component:

```tsx
<span class={bs.icon} innerHTML={icons.star} />   // via the local <Icon name='star' />
```

- **`.icon` fixes the box at 20px** and sizes the SVG to fill it, so a glyph that arrives at
  another size can't shift a row. The empty states override it to 34px in CSS — there's no
  `size` prop to pass any more.
- **Selectors have to match the wrapper, not the SVG.** Rules that were `& > svg` are now
  `& > :is(svg, .icon)`, which covers both the wrapper and the local components. Watch the
  module boundary here: `.icon` is declared in `backstage.module.css`, so writing `.icon` in
  `documents.module.css` silently matches nothing — that's why the sort caret carries its own
  local `.sort-caret` class.
- **The star's filled state is CSS**, not a prop: the set's star is an outline, and
  `.starred svg path { fill: currentColor }` beats the `fill="none"` attribute on the path.
- **What's still local**, in `backstage-icons.tsx`: `Globe` and `Sheet` (plus `Eye`/`EyeOff`
  for sign-in). The set has no public/private pair — private uses `lock_cells` for now — and
  its only document glyph is `new_spreadsheet`, whose plus is right for the New document
  button and wrong for the "All documents" scope and the Open actions. Each is a stand-in: as
  the set grows a name, the page should switch and the local component should go.

## Data model

The document's **path is its identity**. There is no opaque id in the URL.

### The shape of a path

A path is **`@owner/folder/slug`** — the account handle, then zero or more folder
segments, then the document's slug. There's no leading slash: the path is everything after
the origin, and `documentUrl()` supplies the slash.

```
@dwerner/gort/horn     ownerOf -> @dwerner    folderOf -> /gort    slugOf -> horn
@dwerner/bubbles       ownerOf -> @dwerner    folderOf -> ''       slugOf -> bubbles
```

- **The owner segment is not a folder.** Every one of an account's documents sits under it,
  so treating it as one would file the whole list inside a single folder that never tells
  you anything, and push every real folder down a level. `folderOf()` strips it, and the
  rail is built from what's left — so a folder path is owner-relative and a document
  directly under the owner has no folder at all. In the real data that's 81 of 83 rows, and
  exactly one real folder.
- **The Folder column shows the owner tag for those rows**, held back at 50% opacity, so
  the column reads as a location rather than as missing data while a real folder path still
  stands out. Its negative margin cancels the pill's own padding so the *text* lines up
  with the plain paths above and below it.
- `pathFor(owner, folder, name)` reassembles one.

### Names

`name` is the document name with its own casing, and is **not reliable**. The old save UI
asked for a name and a slug separately, almost nobody filled the name in, and what's there
is frequently the address rather than a name.

- **A name that restates the document's own address has its folder stripped.** Real rows
  carry `name: "gort/horn"` for `@dwerner/gort/horn`, which renders as a folder sitting in
  the title. `trimAddressName()` drops it — matching against *this document's* path, not by
  looking for a `/`, because **names legitimately contain slashes**: `LLM pricing
  10/15/2024` is a real name, and any "take the last segment" rule would show it as `2024`.
- **The name's own segment is kept, not the slug**, so typed casing survives. Falling back
  to the slug would turn `Bubbles` into `bubbles`.
- `'Unnamed document'` is a **sentinel**, not a name — probably generated by the back end.
  It's treated as unnamed.
- **Unnamed documents show their slug, in monospace.** Deliberately not prettified:
  un-slugifying can't recover `VaR` from `var`, and shouldn't pretend to. Monospace marks
  the value as an address rather than a badly-cased name, and makes the documents still
  needing a name easy to spot — which matters for migrating the existing set. They are
  *not* dimmed; muted text would read as disabled.

`slugify()` folds diacritics via `NFD` before applying the separator rule, so
`Análisis de Riesgo` → `analisis-de-riesgo` rather than `an-lisis-de-riesgo`. Note the real
data does **not** obey it — live slugs contain spaces, `+`, `#` and mixed case (`I have
space ++`, `multivariate.pert.p`), so anything that re-derives a slug on rename will
rewrite addresses that currently work.

### Optional fields

`starred` and `versions` are both **optional**, because the list query returns neither.
Absent means "not starred" and "history not fetched" respectively — read them through
`isStarred()` on the page and the history store below, never directly.

### Rename

**Rename is currently not implemented.** The inline rename in the detail panel was removed
in favour of a single dialog covering the name *and* the folder, which isn't built yet; the
row menu's "Rename…" is an inert placeholder. `pathFor()` and `findPathCollision()` are
left in place for it.

What the removed implementation had settled, worth keeping when the dialog lands:

- **Rename is a move.** The path derives from the name, so committing a rename writes both
  fields. Old URLs break — accepted, and arguably desirable, since a stale link resolving
  to replaced content would be worse.
- **Collisions block the save.** Paths are compared case-insensitively, matching how the
  loader resolves them. No silent `-2` disambiguation.
- Naming a legacy document whose slug already matches leaves its address untouched, which
  is the common migration case.
- **It has to invalidate version history**, which is keyed by path — see below.

## Open questions

None of these block the current page.

1. **The rename dialog**, which is the next piece of work. One dialog covering the name and
   the folder together, replacing the inline rename that was removed. See "Rename" above for
   what the removed one had settled, and note the live slugs don't obey `slugify()` — a
   dialog that re-derives the slug will rewrite addresses that currently work, so it
   probably shouldn't.
2. **Documents whose `name` is exactly their slug.** Twelve of the real rows carry the
   address in the name field without a folder (`project-cost-comparison`, `COUNTIFS`).
   They're the same legacy artifact as `gort/horn`, but they currently render as ordinary
   names rather than getting the monospace no-name treatment. Deferred by the user: it's a
   design call, and flipping it restyles twelve rows. Nothing renders wrongly either way.
3. **Folder naming.** Folders are derived from paths — there's no folder table, so a
   folder has nowhere to store a cased name. Recommendation: the segment *is* the name —
   sanitize with the same slugifier, lowercase, and show it raw in the rail. The
   alternative is folder metadata, which brings back empty folders and a table that was
   deliberately avoided.
4. **Save flow.** Recommendation: separate folder picker and name field, with typing
   `finance/` into the name field splitting that segment into the folder control as an
   accelerator — so the parse is visible and rename stays distinct from move.
5. **Header widths under i18n.** The Version track is 86px and Access 92px; both are close
   to what their heading plus the caret needs, and `.sort-button { max-width: 100% }` with
   `.cell`'s `text-overflow: ellipsis` means a longer translated heading truncates rather
   than overflows. `minmax()` tracks, or simply more slack, would be the durable fix.

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
the canned store), zero-results search, multi-select, the slide-over, and widths around
1400 / 860 / 760 / 500px for the container-query breakpoints — the table should never
scroll horizontally, and version should drop before folder. Star, access and delete mutate
the local store; rename, duplicate and move are placeholders.

The saved view is worth exercising both ways round: narrow the list (a folder or a scope,
some search text, a sort other than Modified), leave for `/` and come back with the Back
button — the same list should be there — and then reload the page, which goes through
`localStorage` rather than memory. `localStorage.getItem('app-data')` shows what was stored.

The detail panel's Older versions section has three states worth seeing: the skeleton bars (open
a document you haven't opened before — the entry is cached after that, so reload to get it
back), the loaded list, and `/documents?dev&fail-history` for the failure plus its **Try
again**.

**Check anything touching paths, names or optional fields against the real data**, by
pointing `sample()` in `documents-data.ts` at `documents-sample2.ts` for a moment. The
canned set is too well-behaved to catch the interesting cases: it has no address-in-name
rows, no absent `starred`/`versions`, and its folders are deep where the real account's are
almost entirely flat.

The guard is worth exercising in all four combinations: signed out, `/documents` should
land on `/sign-in` and `/sign-in` should render; signed in, `/sign-in` should land on `/`
and `/documents` should render. `localStorage.removeItem('auth')` plus a reload is the
signed-out state. Signed out, `/documents?dev` should render the page with the bypass
warning in the console — and a production build shouldn't contain that warning at all
(`npm run build`, then grep `dist/` for it). `/documents?dev&fail` should land on the
failure state; Try again re-runs the load (skeleton, then the same failure), and dropping
`fail` from the address bar before pressing it again is enough to recover, since the flag is
read fresh each time.

Dropping the session mid-visit can be driven from the console — in dev,
`import('/@fs/<repo>/src/lib/auth/index.ts')` resolves to the same module instance the app
is using, so `ClearTokens()` from there bounces a live `/documents` to `/sign-in`.

Then `/sign-in`, which talks to the real `auth.riskamp.com`: submit empty (two field
messages, focus on the first), a bad credential (pending label, then the banner, password
cleared and focused), and a real one (lands on `/`, with the token in `localStorage.auth`). Also the reveal toggle, the Caps Lock hint, keyboard-only tab order,
and ~380px for the edge-to-edge card.

Two states are awkward to reach by hand, and both can be driven by swapping `window.fetch`
in the console: rejecting the promise exercises the unreachable-server banner, and
resolving a `Response` with an `Authorization: Bearer <jwt>` header exercises the success
path without a credential — `decodeJwt` doesn't verify, so a hand-built token with a
future `exp` and a `username` is enough. Clear `localStorage.auth` afterwards. Likewise a
synthetic `CapsLock` keypress doesn't set the modifier state in an automated browser; the
hint has to be checked by hand or by dispatching a `KeyboardEvent` with
`modifierCapsLock: true`.
