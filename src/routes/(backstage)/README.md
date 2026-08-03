# backstage redesign

A from-scratch redesign of the backstage pages (documents, account, auth), starting
with **documents**, then **sign in**, then **create account**. Documents and create account
are still UI/UX against canned data — nothing in either touches a service. **Sign in is
wired**: it posts to `/api/login` through `~/lib/auth`.

## Containment

**The pages live in `src/routes/(backstage)/`; the code and data they run on live in
`src/backstage/`.** Several design passes are expected, and keeping the redesign to those
two directories keeps the blast radius small and the whole thing reversible.

The split exists because the data outlives the page. The document store is module-level, so
it survives leaving `/documents` — which means signing out has to be *able* to empty it, and
`sign-out.tsx` can't sensibly reach into another route's folder for that. Anything that
isn't markup, styling or route-shaped belongs in `src/backstage/`.

Within that, on purpose:

- strings are **no longer hardcoded**: both pages are extracted into `~/i18n`, and dates,
  counts, sort order and plural forms follow `currentLocale()` — see "Strings" below
- glyphs the app icon set lacks live in `backstage-icons.tsx` rather than being added to
  `~/components/icon-sets` (see "Icons" below — documents now draws from the app set, and
  what's left local is only what that set has no name for)

Promoting either of those out of here is deliberate later work, not cleanup to do in
passing.

**Tokens are the exception, and that containment is over.** This directory used to declare
a full parallel set of `--bs-*` names on `.page`, and promoting them was listed here as
later work. That work has since been done in the CSS refactor: the sixteen that had become
plain aliases of `src/app.css` are gone, and the rules read `--text`, `--border-hairline`,
`--accent` and the rest directly. Two values were promoted the other way — `--danger`
(the AI chat needs an error colour and a `.page`-scoped token can't reach it) and
`--surface` (one value that had four names across the product).

Eight `--bs-*` survive, and each is now one of exactly two things:

- **a value backstage owns**, because the app has no equivalent — `--bs-raised`,
  `--bs-strong`, `--bs-row-height`, `--bs-inset`, `--bs-label-size`
- **an override point** — `--bs-control-height`, `--bs-rail-width`, `--bs-panel-width`.
  These read from `app.css` and *look* like aliases, but each is re-declared further down
  `backstage.module.css` (the dense list chrome, and the container queries at the bottom),
  so the name is the hook a container reaches for. Collapsing them would break the dense
  chrome and the responsive rail.

Don't add a `--bs-*` that is neither. If backstage wants a value the app already defines,
read the canonical token. Markup, layout and page styling stay contained here as before —
it is only the token layer that is now shared.

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
| `sign-in.module.css` | the password reveal, the caps lock hint, the hidden remember row |
| `create-account.tsx` | the create-account page |
| `create-account.module.css` | the handle preview and the notes under the button |
| `forgot-password.tsx` | asks for an address and promises a link |
| `update-password.tsx` | where that link lands: identifier, token, new password, strength meter |
| `sign-out.tsx` | logs out and leaves |
| `backstage.module.css` | shared shell: theme tokens, rail/content/panel, control and form primitives, the whole single-column card page, the password field, the strength meter and the confirmation. The consolidation point for the next backstage page |
| `backstage-icons.tsx` | the few glyphs the app icon set has no name for |
| `backstage-parts.tsx` | `Icon`, `splice()` and `DevResetLink` — the markup helpers more than one page needs |

What they run on, in `src/backstage/`:

| file | what it holds |
| --- | --- |
| `documents-store.ts` | the row and history shapes, and the two stores themselves |
| `documents-data.ts` | the loaders, the path/folder/name/format/sort helpers, and the saved view |
| `documents-sample.ts` | the canned document set and its canned history |
| `documents-sample2.ts` | a dump of **real** rows from the live account, for reference — not wired to anything |
| `account-validation.ts` | the shared field rules, the password scorer, and the `Message` type |
| `create-account-mock.ts` | a stand-in for `/api/create-account`, and its canned collisions |
| `password-reset-mock.ts` | stand-ins for `/api/recover-account` and `/api/recover`, and the canned tokens |
| `dev-access.ts` | `requireAuth()` and `devResetLink()` — the dev-only affordances |

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
- **`--bs-strong` is the one added colour**, `light-dark(#1a7f37, #3fb950)`, and it exists for
  the password meter's green end — `--danger` and `--warning` couldn't supply a third step.
  The only green in `app.css` is `--dialog-syntax-string-color`, a syntax colour rather than a
  semantic one whose dark value leans teal, and teal was rejected as an accent, so aliasing it
  would smuggle that back in. **The confirmation ticks stay `--accent`**: a green tick is
  conventional and now possible, but the green was added for the meter, and repainting three
  shipped success states with it would dilute it. One line to change if that's wanted.
- **Focus is drawn by the browser.** Nothing in this directory sets an outline. Controls
  are built so the native ring lands correctly: the search box is a single `<input>`
  carrying its own border and padding, with the icon and clear button positioned over
  that padding, so the ring wraps the whole control rather than a box inside it.
- **Nothing below 13px** except the all-caps column and section labels, which sit at
  12px via `--bs-label-size`.
- **Secondary text is one step down from primary, not three.** Roughly 10:1 contrast
  against the surface in both themes. If something seems to need to be fainter than
  `--text-faint`, it probably wants `--text-muted`; the faint token is used in
  exactly one place.
- **The card's action is separated from its footer links.** The submit sits 10px further out
  than `.form`'s gap (`.form-actions`) so it reads as the action rather than as another field,
  and a hairline above `.links` divides it from them — without one, the button and the links
  read as a single group in which the links look like secondary actions on the form. The rule
  spans the content width rather than bleeding to the card's edges, and the space is split
  either side of it. Sign-in needs no `.form-actions`: its hidden remember row already supplies
  that space.
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
- **Centred card, no rail.** The page tints itself with `--toolbar-bar-background` so the
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
- **The page draws its own top hairline**, and this is load-bearing rather than a
  workaround. The toolbar has no bottom edge of its own: against the spreadsheet it
  separates itself by being darker, and a hairline there is a line too many. Against this
  page it can't, because the rail tint now *is* `--toolbar-bar-background` —
  the tint and the toolbar are the same grey, so the `border-top` on `.page-centered` is the
  only boundary between them. (It was briefly moved onto the toolbar and moved back: a line
  under the toolbar is wrong on the main app page, which is the page it would mostly be seen
  on.)
- **Remember me is present but `visibility: hidden`.** There's no opt-out to offer yet —
  sessions are always remembered — but one is coming, so the row holds its space and
  nothing shifts when it lands. `visibility` rather than `display` also keeps it out of
  the tab order and the accessibility tree, which is where a control that does nothing
  belongs.
- **Visible labels, not placeholder labels.** The i18n keys from the old page used
  placeholders; a label that vanishes when you type isn't a label. That's why the new
  labels got their own keys rather than reusing `sign-in.form.*.placeholder` — the English
  matches, the role doesn't.
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
- "Create account" now resolves; "Forgot password" points at `/forgot-password`, which
  **doesn't exist yet** — that page is still in `archive/` awaiting its own pass, so the
  link 404s until then. Left as a real link rather than inert text so the page doesn't
  have to change when it lands.

## Create account

**This page is a mock.** It talks to `~/backstage/create-account-mock`, not to the backend —
documents was built the same way round and for the same reason: the UI/UX is the deliverable
and the wiring lands once the design has settled.

- **It collects an email address and a username, and no password.** The account is created,
  a confirmation link is mailed, and the password is chosen from that link. That's the flow
  the backend already has — `auth.CreateAccount({username, email})` takes exactly these two
  fields — and it's why the last thing above the button is the sentence saying where the
  password went. A page that silently omits a password field looks broken.
- **The subtitle is the explanation, not a restatement of the labels.** Asking for a
  username *as well as* an email address is the unusual thing here, and the reason is that
  the username isn't only a login: it's the first segment of every document address the
  account owns. The old page explained this and it was worth keeping.
- **The client rules are a courtesy; the server is the authority.** The page validates on
  submit to save a round trip, but the mock server runs its own checks and is allowed to
  reject something the page accepted. `RESERVED` in the mock exists specifically to produce
  a verdict the client could not have predicted — otherwise that state would be discovered
  only once the real endpoint was wired up.
- **The username rule is `^[a-z][a-z0-9_-]*$`, 5–30 characters.** The floor is the one rule
  that already existed in the codebase: `CheckAvailability` in `~/lib/auth` refuses to even
  ask the server below five. The character class and the lowercasing are because the name
  becomes the owner segment of a document path — `@dwerner/gort/horn` — which `documentUrl()`
  drops into a URL with no encoding step anywhere, so it has to be URL-safe without escaping
  and case-stable, or `@Duncan` and `@duncan` are two addresses for one account. **The
  30-character ceiling is invented** — no backend number is known for it.
- **Length and characters get separate messages.** Length is the rule people hit by
  accident, and "usernames are at least 5 characters" is actionable without reading a clause
  about character classes. The bounds are spliced in from the constants with `format()`, so
  the message can't drift from the code enforcing it.
- **The email rule is deliberately loose** — one `@`, a dotted domain, no whitespace. A false
  rejection here is unrecoverable (there's no "no, really, send it"), where a false accept
  costs one bounced email that a confirm-by-link flow already absorbs. An RFC-shaped regex
  reliably rejects plus-tags, apostrophes and new TLDs, which is the worse trade.
- **Errors are `Message`s, not keys.** Sign-in holds a bare `StringKey` so nothing is
  translated until it's drawn; this page needs the same *plus* the values some messages
  quote, and it captures them when the verdict is reached rather than reading them back at
  the render site — the field they came from may have been edited since, and "@foo is already
  taken" should keep saying foo. `messageText()` resolves one, and returns `''` for
  `undefined`, so the `<Show>` guards read the same as sign-in's.
- **A field's format error and its collision error share one slot.** They're alternatives,
  not additions — a field can only be wrong one way at a time, and the collision check is
  only reached once the format check passed.
- **Editing a field clears only that field's message**, plus the banner. This diverges from
  sign-in on purpose: there the two messages are one verdict about one credential pair, but
  here the fields fail independently and **failing both at once is a designed state**, so
  wiping the untouched field's message while you fix the other would hide something still
  true and you'd rediscover it on the next submit.
- **The banner is only for failures that aren't about either field** — the unreachable
  server, and a rejection the server didn't attribute. All four of the error conditions this
  page was built for attach to a field; a banner repeating "check the fields below" is noise
  that pushes the fields down.
- **The canned collisions** are `dwerner`, `duncan`, `riskamp`, `testuser`;
  `dwerner@riskamp.com` and `taken@example.com`; and the reserved set is `admin`, `root`,
  `system`, `support`, `help`, `about`, `documents`, `sign-in`. Usernames and emails are two
  independent sets rather than account records — that's what makes the both-at-once state
  reachable at all, and `dwerner` + `dwerner@riskamp.com` gets you there in one submission.
- **Success swaps the card, not the page.** The links row stays rendered in both states —
  both are still exactly the right onward moves once the mail has been sent, and keeping them
  means the card doesn't lose its footing when it changes. The confirmation names the address
  and takes focus (`tabindex='-1'` plus a `queueMicrotask`): the form it was submitted from
  has just left the DOM, so focus would otherwise fall to `<body>` and a screen reader would
  announce nothing at all.
- **"Use a different address" keeps both fields.** The signals outlive the swap, so a typo in
  the address isn't a dead end. It's a bordered button rather than a quiet one — borderless,
  it sits directly above the links row and reads as a third link.
- **The `@username/example` preview shares the username field's message slot.** They answer
  the same question — what your handle will be, or why it can't be — the message is the more
  urgent, and one slot means the card doesn't jump as errors come and go. Empty, it shows the
  old page's literal `@username/example`; the moment you type, it's yours. It's monospace
  because the documents page already uses monospace to mark "this is an address, not a name",
  which is exactly what this is.
- **`splice()` in the page puts an element into a translated string** at its `{placeholder}`.
  `format()` splices values, which is enough when the value is words; it isn't for the terms
  link or the emphasised address, and the alternative is breaking the sentence into two keys
  and concatenating around the element — which is exactly what a translation can't reorder.
- The terms link points at `/terms-of-service`, which **doesn't exist yet**, the same call
  sign-in made for its two links.
- **Nothing here is wired.** `createAccountMock()` never throws, so the unreachable banner is
  reached by throwing from it for a moment — no dev flag was added to `dev-access.ts` for a
  mock page. Swapping in the real call means replacing that one function body, but see the
  open question below: the endpoints as they stand can't report *which* field collided.

## Forgot password

One field, and a confirmation that has to be read carefully.

- **The page must not disclose whether an address has an account.** A form that says "sent!"
  for real addresses and "no such account" for the rest is an account-enumeration oracle that
  anyone can read. So `requestResetMock()` **returns nothing**, the confirmation is identical
  either way, and the real `RecoverAccount`'s boolean should keep being ignored when this is
  wired — it exists for the caller, not for the person reading the screen.
- **That's what the real call's 1.7–3.7s delay defends**, and it's worth knowing before
  "optimising" it away: a request for an unknown address has to take as long as one for a
  known address, or the timing answers what the response refuses to.
- **The confirmation is worded conditionally** — *"If there's an account for {email}, we've
  sent it a link."* A flat "we've sent you a link" would be a lie half the time, and it's the
  reason this can't reuse create-account's `done.body`, which asserts. A translator who
  rewrites that clause into an assertion undoes the defence and nothing would catch it, which
  is why the key carries a comment in `en.ts`.
- **So the page has exactly one error state** beyond its own field check: the request didn't
  complete. There is no `error.rejected`, because there is no attributable rejection — there
  is no verdict at all.

## Update password

Where the recovery link lands, and where a brand-new account chooses its first password —
create-account never asks for one, so both flows end here.

- **It declares no auth requirement**, the only card page that doesn't. **The token is the
  credential here, not the session**: someone signed in on this browser who follows a reset
  link from their inbox must still be able to finish, and `'signed-out'` would bounce them to
  `/` with no way to tell why and no route out but signing out first. Declaring nothing is
  already how the guard says "renders either way" — `sign-out.tsx` does the same — so
  `(backstage).tsx` needs no change. **This is the one thing here that would silently break
  recovery for anyone with a live session, so it's worth re-checking after any guard work.**
- **The first field takes a username *or* an email**, as v1's did, and that resolves a real
  mismatch rather than being indecision: `RecoverAccount` is keyed by **email**, because an
  address is the only thing you can mail to, while `ResetPassword` is keyed by **username**.
  One link has to satisfy both, so the page sends whichever was typed and lets the server
  resolve it. The `?email=` parameter and the field's label deliberately don't match.
- **`?email=` and `?token=` seed the fields, they don't drive them.** Read once during render
  via `useSearchParams` — which this page introduces; nothing else in `src/` used it. Reading
  them reactively would fight typing. Both fields stay **visible and editable** because a link
  truncated by an email client is exactly the failure someone has to be able to repair, and
  hiding a token you can't verify removes the only way to correct it. A repeated parameter
  arrives as an array, so `seed()` takes the first.
- **Focus lands on the first field that's still empty**, so arriving from a link puts you on
  the password and typing the URL by hand puts you at the top.
- **The identifier and the token clear each other's messages**, which neither sibling page
  does. A token verdict is a verdict about the *pair*, so editing either half invalidates it.
  The password is independent and clears on its own.
- The token field has **no standing hint**. One was tried and dropped: it's hard to say
  anything about a token that isn't either obvious or awkwardly phrased, and the subtitle
  already says both fields come from the link.

### The password rule and the meter

- **Minimum 8, and that's the only rule that blocks a submission.** Above it the meter advises
  and never rejects. A rule demanding an upper, a digit and a symbol mostly teaches people to
  end a weak password with `1!`, and it rejects passphrases that are genuinely strong. **The 8
  is invented** — no backend minimum is known, the same honesty `USERNAME_MAX` gets.
- **The scorer is length-dominant**, in `account-validation.ts`. Length is the only input that
  buys entropy at a rate an attacker cares about, so it carries the score; each character
  class is worth about a character and a half, never enough to promote a short password.
- **The repeat penalty is applied to the length, not the score** — `effective = min(length,
  distinct × 2)`. That one expression catches every shape of the problem at once: runs
  (`aaaaaaaa`), alternations (`abababab`) and repeated blocks (`Aa1!Aa1!Aa1!Aa1!`, which is
  sixteen characters and all four classes and scores Fair). A run-length test would miss two
  of the three. The factor is 2 so it can't bite on real text.
- **It has no dictionary and isn't getting one.** `password1` rates Fair, not Strong, which is
  the most that arithmetic can do; knowing it's the first thing anyone would try means
  shipping zxcvbn's several hundred kilobytes to draw one small bar. What the scorer *does*
  guarantee is that the two actively misleading states can't happen — short-but-varied and
  long-but-repetitive both reading as strong.
- **`scorePassword()` returns `undefined` below the minimum**, rather than a fifth "too short"
  level. Under the floor the password is *rejected*, which is the field message's job, and a
  meter rating something unsubmittable invites reading it as permission. The bar draws empty.
- **The meter carries a visible label**, and it is a **caption under the bar at normal
  weight**, not a label above it. Both halves of that were arrived at by getting them wrong:

  - Unlabelled, a 4px line under a field reads as a divider or a smudge rather than as a
    measurement of anything — which is exactly how it was first mistaken. An `sr-only` prefix
    was the first fix and wasn't one; the problem was visual, not aural.
  - Labelled at `.field-block-label`'s 500 weight and placed *above* the bar, it then read as
    the label of a **fourth field** whose input happened to be a thin line, which put the
    field stack's rhythm out. As a 400-weight caption *below* the bar it reads as what it is —
    and that's what lets the meter stay tucked 5px under the password field it describes,
    rather than being spaced off as a block of its own.

  The label is always drawn, so the bar is explained before you've typed enough to fill it; the
  verdict joins it on the right, in a row that holds its height so nothing shifts when one
  appears.
- **The bar itself is decoration and the words are the information.** The track is
  `aria-hidden`, and the label and verdict are real text tied to the input with
  `aria-describedby`. **There is no `aria-live` here and there must not be** — this updates on
  every keystroke, and a live region would announce four states while you type one word.
  `role='meter'` was considered and rejected: unfocused and outside a live region it announces
  nothing at all, so it buys nothing over text that's already in the tree and readable on
  demand.
- **`.meter` is a column, so `.meter-track` must not carry a flex basis.** `flex: 1` there
  applies to the *height* and collapses the track to nothing — which it silently did, since a
  0px bar just looks like a bar that hasn't filled yet.
- **The meter's own `margin-top` takes it to 10px below the input.** `.field`'s 5px gap alone
  lets the bar run into the input's bottom border, so they read as one object — but the meter
  still has to sit closer to its field than the fields sit to each other, or it floats between
  two of them and stops being obviously *about* the password.
- **Four levels, four widths, three colours** — weak `--danger`, fair `--warning`, good and
  strong the new `--bs-strong`. The width does the work the third colour doesn't, which also
  means the meter still reads for anyone who can't separate the red from the green.
- **The meter yields when a message about the field is showing.** The interesting case is the
  server's: it can refuse a password the scorer rates Fair, and a half-full amber bar above a
  red "too easy to guess" is the meter contradicting the authority inside forty pixels. It's
  been overruled, so it stops asserting; editing the field brings it back.

### The canned data

- Tokens: **`demo-token`** works, `expired-token` and `used-token` read as expired and used
  (different messages, because "get a new link" and "check the link" are different actions),
  anything else is invalid, and empty is caught client-side.
- **A token issued for another account reads as invalid**, deliberately — "that token belongs
  to someone else" tells an attacker their guess was otherwise well-formed.
- **`WEAK_PASSWORDS` is `RESERVED`'s counterpart**: `password`, `password1`, `12345678`,
  `letmein1`, `qwertyui`. Every one clears the minimum length, so the page accepts them and
  the server sends them back — which is the state that proves the meter advises rather than
  decides, and the only way to see the meter yield.
- **The password is never trimmed**, anywhere on the path. Leading and trailing spaces are
  legal, and dropping them silently sets a password its owner can't type. Every other field
  on these pages calls `.trim()`, so this is the exception worth knowing about.
- The weak check runs **after** the token is validated: telling someone their password is weak
  before establishing they may set one confirms the token to anyone holding a guess.

### The dev-only reset link

A mock sends no email, so `/update-password` would otherwise be reachable only by typing a URL
with a plausible token in it — and the *link* is the thing under test, since the page's whole
reason for reading a query string is that a mail carries one. So both confirmations carry
`DevResetLink`, in `backstage-parts.tsx`.

**The shape of that function is what keeps it out of production, and it took three attempts.**
`import.meta.env.DEV` is replaced by a literal, so a statement-level early `return` makes
everything below it unreachable and the minifier deletes it — the same `if` `dev-access.ts`
uses. What does *not* work, both verified by grepping `dist/`:

- **`<Show when={import.meta.env.DEV}>`** — children are passed as a prop, so the markup and
  its label are constructed regardless and only the rendering is skipped.
- **`{import.meta.env.DEV && <A/>}` inside JSX** — Solid's compiler wraps the whole expression
  in a `createMemo`, and the minifier can't see into the thunk. This one looks exactly right
  and isn't.

So: test the flag in a *statement*, never in an expression inside JSX. **If `DevResetLink` is
ever edited, re-run the grep** — `npm run build`, then `grep -rl "open the reset link" dist/`,
which must print nothing.

Its label is the one deliberately un-extracted string in this directory — see "Strings".

## The document store

The rows live in a module-level Solid store in `~/backstage/documents-store`, not in the
page, so they're fetched once rather than once per visit — leave `/documents` and come back
and the list (including anything you starred) is still there.

That lifetime is why the store sits outside the route folder: signing out needs to be able
to call `flushDocuments()`, since otherwise the next person to sign in on this browser would
see the last one's documents until something refetched. **`sign-out.tsx` calls it**, after
`Logout()` and before it navigates away.

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

## Strings

All three pages are extracted, one block each at the end of `src/i18n/lang/en.ts` behind a
comment carrying the conventions: `documents-page.*`, `sign-in-page.*` and
`create-account-page.*`. That includes the `aria-label`s and the `sr-only` text — these pages
are the only place in the app that has any, and they're read aloud, so they're as user-facing
as the visible copy. `documents-data.ts`'s date words come from the documents block, and
`create-account-mock.ts`'s verdicts are keys from the create-account one.

**The old pages' keys are still in `en.ts` and are not what these use.**
`documents-table.*`, `sign-in.form.*` and `auth.link.*` belong to the pages in `archive/`
and go when those do. Three of the old keys are live and stay: `documents-page.title`,
`sign-in.page.title` and `create-account.page.title`, all toolbar titles set through
`setTitle`. Both card pages have their own heading key — same words, different job, and the
toolbar's version is the one that would be shortened first.

Each page duplicates the footer-link strings and the unreachable-server sentence rather than
sharing them: one self-contained block per page means a translator can shorten one page's
footer without touching the other's, and deleting a page deletes its block.

**One block breaks that rule on purpose: `backstage-form.*`.** Those are the messages the
shared validators in `account-validation.ts` return, so pointing them at any one page's block
would mean three other pages rendering strings from it — and shortening a message for that
page would silently change them all. It's the block no page owns, and it goes when the last
backstage form does. A page's *own* verdicts stay in its own block: "is already taken" is
create-account's, because only its mock can say it.

`update-password.page.title` is **new**, not an archive leftover, even though it's named the
old way — every toolbar title in the file is. Worth knowing before a sweep deletes the old
keys around it.

**One string in this directory is deliberately not extracted**: `DevResetLink`'s
`[dev] open the reset link` label. A key would ship in `en.ts` and would imply someone should
translate it, and the whole point of that component is that it isn't in the production bundle
at all. The `[dev]` prefix matches `dev-access.ts`'s console-warning convention.

The library is 30 lines and does one thing: `t(key)` returns a string. It has no
interpolation and no plurals, so this pass added the two smallest things that close that
gap, both in `src/i18n/i18n.ts`:

- **`format(text, values)`** splices values into `{braces}`. Values are **named, not
  positional**, so a translation can put them where its own grammar needs them — which is
  the whole reason they're inside the string instead of concatenated around it. An unknown
  name is left as `{name}` rather than blanked, so a typo is visible instead of silent.
- **Plurals are `.one` / `.other` key pairs**, picked in code. A language file can't
  branch. It's the shape `search-panel.search-results.information.result` / `.results`
  already used elsewhere. `formatCount()` in `documents-data.ts` does every pick, and it
  asks **`Intl.PluralRules`** rather than testing `=== 1` — which numbers are singular is
  the locale's business, not English's (French counts 0 as singular). A locale with
  categories we have no keys for — `few`, `many` — lands on `.other`.

Sign-in needed neither helper — nothing on it interpolates or counts.

Five things to know before adding a string here:

- **`t()` at module scope snapshots English.** It's reactive only because it reads a Solid
  store, and that only counts inside a tracking scope. So `SCOPES` holds `StringKey` and
  the render sites call `t(item.label)` — a `label: t(…)` in that array would freeze the
  language for the life of the page. `command-list.ts` used to have exactly that problem;
  it holds keys now, and the palette resolves them where it draws and where it searches.
- **The `update-language` event stays, even with nothing listening.** `i18n.ts` fires a
  window `update-language` CustomEvent on a language change. `command-list.ts` was its last
  consumer, so it currently has no listeners at all — leave it in place regardless. It's
  the only way to tell anything drawn *outside* Solid's reach (markup inserted as static
  HTML, the insert-function button being the example in the code) that the language moved,
  and more of those are coming. Two things to know if you do listen: it fires on a
  `requestAnimationFrame`, so the store is already updated when it lands, and it does
  **not** fire when switching back to English.
- **State holds keys, not text**, for the same reason. Sign-in's three form errors and two
  field messages are `createSignal<StringKey | undefined>()` and get translated where
  they're drawn; storing the translated string would leave a banner in the old language
  after a language change. `t()` already returns `''` for `undefined`, so the `<Show>`
  guards around them are unchanged — and the signals are now type-checked, which a string
  wasn't.
- **A key that doesn't resolve renders as itself**, not as a blank — a path showing through
  in the UI is the signal. `tsc` catches a *typo*: `t()` takes `StringKey`, the union of
  every dotted path through `en.ts` that lands on a string, so a key has to exist to be
  passed. What nothing catches is a string that was never extracted at all.
- **`es.ts` / `fr.ts` are deliberately untouched.** They're partial deltas deep-merged over
  English, so anything they lack falls back — down to the individual key, which is why a
  translation can supply part of a namespace. They carry `satisfies DeepPartial<I18N>`, so
  a key English doesn't have is an error there.

### The locale

`~/i18n` exports **`currentLocale()`**, a signal holding a full tag (`en-us`), set by
`UpdateLanguage()`. Everything `Intl` decides on this page goes through one function,
`intl()` in `documents-data.ts`, which hands back the six objects built for that locale:
short date, long date, time, number, collator, plural rules.

- **Built once per locale, not once per call.** `Intl` objects are expensive enough that a
  collator rebuilt inside a sort comparator is felt on a long list, and the locale changes
  about never. The cache is keyed by the tag, so a stale set can't outlive it.
- **Reading `currentLocale()` inside `intl()` is what makes the page redraw.** Its callers
  run inside the page's JSX and memos, so the read is tracked and a language change
  reformats the dates and re-sorts the list without a reload. Hoisting the read to module
  scope would break that as surely as a module-scope `t()`.
- **A bad tag falls back rather than throwing.** `Intl` rejects a malformed locale with a
  `RangeError`, and `UpdateLanguage` doesn't validate what it's handed (its own TODO). The
  builder catches, logs, and uses the runtime default — a mistyped locale shouldn't blank
  the documents list.
- **Counts are formatted too**, via `formatNumber()` — grouping and digits are locale
  business at four figures and up. Version numbers deliberately aren't: `v7` is closer to
  an identifier than to a quantity.

**`UpdateLanguage()` has rough edges worth knowing before testing against it** — it doesn't
validate the tag, and a language file that doesn't exist rejects rather than falling back,
so `UpdateLanguage('de-de')` throws on the missing `de.ts`. The locale itself is safe: it's
set only once the strings are in the store, so a failed load leaves you on the language you
were already on. Written up as an open TODO, item 9 under "Open questions"; nothing here is
blocked by it, and this page defends itself against a bad tag on its own.

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
  local `.sort-caret` class. There is a sanctioned way across that boundary when the rule is
  genuinely shared: put it in `src/style/shared.module.css` and apply both classes at the
  element — `classList={{[shared.pill]: true, [style['access-pill']]: true}}`. `.table-header`,
  `.owner-tag`, `.access-pill`, `.sort-button` and `.section-label` all do this. `.cell` is the
  deliberate exception: it needs `truncate` at fifteen call sites, so it writes those three
  declarations out locally rather than asking every site to remember the recipe.
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
6. **The account endpoints can't say which field failed.** `CreateAccount` reports nothing but
   `result.ok`; `CheckAvailability` answers with a single value for the username and the email
   *together*; `ResetPassword` is also just `result.ok`. So none of them can distinguish "that
   name is taken" from "that address is registered", or "expired token" from "weak password",
   and none can report two at once. Every mock's per-field result is a shape the backend has to
   be asked for — until it is, a wired page could only say "that didn't work", which is worse
   than the mocks. Also open: `/terms-of-service` has no page and no external URL, so that
   link 404s.
7. **A token in the address bar stays in browser history**, and goes out in `Referer`. The fix
   is one line — `setSearchParams({ token: null }, { replace: true })` after seeding — but it
   makes the dev link single-use on reload, which makes the page harder to work on. Left for
   whoever wires the real endpoint. Related: nobody has decided whether the real mail will
   send `?email=` or `?username=`; the page reads `?email=` and the field accepts either, so
   supporting both is a one-line addition.
8. **Sign-in could use the shared validators.** It still does its own presence-only checks and
   holds bare `StringKey` rather than `Message`, so adopting them means converting three
   signals. Mechanical, but sign-in is the one *wired* page and a regression there costs a real
   sign-in — so not in a pass that was about other pages.
9. **TODO: `UpdateLanguage()` in `~/i18n/i18n.ts` is rough at the edges.** Left open
   deliberately — it's the library's call, not this directory's, and nothing here is
   blocked by it. Three things noticed while wiring the locale up, in rough order of how
   likely they are to bite:

   *(A fourth — it set the locale before loading the language file, so a failed load left
   the app with that language's dates and English text — is fixed: `setCurrentLocale()` now
   runs after the strings are in the store, in both branches. That also made
   `currentLocale()` usable as a "the language changed" dependency, which is how the
   command palette re-runs its search.)*

   - **The rejection is the caller's problem, and there's no caller.** Nothing invokes
     `UpdateLanguage` yet, so today this surfaces as an unhandled promise rejection in the
     console. Whatever ends up wiring the language chooser has to decide what a missing
     language file means to the person who picked it.
   - **The language is the first two characters of the tag** (`locale.substring(0, 2)`),
     so `'not a locale'` asks for `./lang/no.ts`. Its own `// TODO: validate` covers this.
     Note the documents page defends itself independently — `intl()` in `documents-data.ts`
     catches the `RangeError` a malformed tag causes and falls back — because a bad locale
     shouldn't blank the document list.
   - **Only `en`, `es` and `fr` exist**, and the `import()` is a Vite dynamic-import glob
     over `~/i18n/lang/*.ts`, so anything else is a runtime failure rather than a
     compile-time one. A list of the locales that actually ship, checked before the import,
     would turn that into a fallback.

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
  in. This shipped a broken margin for a whole pass before being caught, and caught
  create-account's confirmation icon a pass later (`.sent > .icon` written in the page's own
  module, where `.icon` isn't declared — it draws at the wrong size in the wrong colour and
  reports nothing). `tsc` cannot see any of this. Every promotion into
  `backstage.module.css` means re-*looking* at the pages that lost the rules.
- **A dev-only branch in JSX is not dead code.** `import.meta.env.DEV` is statically replaced,
  but `<Show when={…}>` takes its children as a prop and Solid wraps `{… && <jsx/>}` in a
  memo, so in both forms the markup and its strings stay in the production bundle. Only a
  statement-level `if` gets them removed — see "The dev-only reset link". Both wrong forms
  look right and shipped once each before the `dist/` grep caught them.

## Verifying

Dev server on 5173, then `/documents`. Worth exercising both themes (toolbar theme
chooser), the loading skeleton, the true-empty state (delete everything — delete works on
the canned store), zero-results search, multi-select, the slide-over, and widths around
1400 / 860 / 760 / 500px for the container-query breakpoints — the table should never
scroll horizontally, and version should drop before folder. Star, access and delete mutate
the local store; rename, duplicate and move are placeholders.

No dotted key path should ever show through in the UI — a visible `documents-page.…` is a
key that didn't resolve. The reactivity trap is worth checking directly, from the console,
since it fails silently and only when the language changes. `UpdateLanguage()` is the way in — `setI18nInstance` isn't
exported:

```js
const i18n = await import(module_url('i18n/i18n'));   // see below
await i18n.UpdateLanguage('fr-fr');
```

Dates must reformat (`Jul 20` → `20 juil.`), times must go 24-hour, and the list must
re-sort — all without a reload. If they don't, a `currentLocale()` read is outside a
tracking scope. The *strings* stay English because `fr.ts` has none of these keys; to check
those, temporarily add one to `fr.ts` and watch it appear.

**Getting the module the app is actually using is the hard part**, and getting it wrong
looks exactly like a bug in the page. Two ways to end up talking to a second copy with its
own state, both of which cost time here:

- `/@fs/<repo>/src/…` is a different URL from `/_build/src/…`, so it loads a second module
- once a file has been edited in a dev session, Vite serves it to the app as
  `/_build/src/i18n/i18n.ts?t=<timestamp>`, and importing it *without* the query gets a
  second copy again — a fresh reload doesn't clear this

So resolve the URL the page loaded rather than typing one:

```js
const module_url = (name) => performance.getEntriesByType('resource')
  .map(entry => entry.name).find(url => url.includes(`/_build/src/${name}.ts`));
```

The same applies to any console poking at module state, including the `ClearTokens()`
recipe below.

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
`import(module_url('lib/auth/index'))` (the helper above) resolves to the module instance
the app is using, so `ClearTokens()` from there bounces a live `/documents` to `/sign-in`.

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

Then `/create-account`, which talks to nothing. Walk all four error conditions: an empty
submit (both fields flagged, focus on email), `duncan@nope` (invalid address), `Dun` (too
short — note length is checked before characters, so a short capitalised name reports the
length), `Duncan` (the character rule), `admin` (**reserved** — the verdict the client
couldn't have predicted), `taken@example.com` with a free name (address in use), and
`dwerner` + `dwerner@riskamp.com`, which must produce **two messages from one submit**. Then
fix one field and check the *other* message survives — that's the deliberate divergence from
sign-in's clear-everything. A clean pair gives the pending label, then the confirmation
naming the address, with focus on it; "Use a different address" comes back with both fields
still filled. Watch the handle preview track the username field, and confirm it and the error
message never appear together. Signed in, `/create-account` must bounce to `/`, and `?dev`
must **not** open it — the bypass only covers `'signed-in'`.

Then `/forgot-password`: empty submit, `not-an-email`, then a valid address → the
confirmation. **Check that an address that can't exist behaves identically to a plausible
one** — the two being indistinguishable *is* the non-disclosure property, and it's the only way
to test it. Its single error state (the unreachable banner) needs a temporary `throw` in
`requestResetMock`.

Then `/update-password`. Bare first, with all three fields typed by hand, then via the dev link
off either confirmation — which should arrive with two fields filled and focus on the password.
The token states: `demo-token` works, `expired-token` and `used-token` give their own messages,
garbage is invalid, empty is caught client-side. Then `password1` with a good token, which the
**server** refuses and the meter yields to — that's the state proving the meter only advises.
Fix one of the identifier/token pair and check the other's message clears too.

The meter is worth walking properly, since arithmetic is all it has: `abcdefgh` Weak,
`password1` Fair (**not** Strong), `aaaaaaaaaa` and `abababababab` Weak despite their length,
`Aa1!Aa1!Aa1!Aa1!` Fair despite four classes, `Tr0ub4dor&3` Good, and a real passphrase Strong.
Under 8 characters shows the label and an empty bar but no verdict. Both themes — the three
colours should resolve to `--danger`, `--warning` and `--bs-strong` exactly, and **the empty
track has to be 4px and visible**, since a collapsed one is indistinguishable from an unfilled
one. The card's height must not change between an empty password and a rated one.

Also the reveal toggle, the Caps Lock hint, keyboard-only tab order, and ~380px for the
edge-to-edge card.

**And the guard, in both directions, which is the one thing here that fails silently and
badly**: signed in, `/forgot-password` must bounce to `/` and **`/update-password` must still
render**. A hand-built JWT with a future `exp` in `localStorage.auth` is enough to test it.

**Sign in and create account have to be looked at again after any change to the shared card
rules**, since the page tint, title block, form stack, links row, password field, confirmation
and strength meter all live in `backstage.module.css` now. A class read from the wrong module
renders nothing and reports nothing — the CSS-module gotcha below, which has bitten twice.

Finally `npm run build`, then `grep -rl "open the reset link" dist/`, which must print
nothing. Two plausible-looking forms of that dev guard leave the string in the bundle; see
"The dev-only reset link".
