# CSS architecture

Where a rule belongs, and the three things that fail silently.

## The carve-out: TREB

The spreadsheet is TREB, which **injects its own stylesheets at runtime**. Those are not
ours and are out of scope. It renders into a highly-specified containing block with its own
resets, so the two mostly don't meet — but there are four places ours reaches across, and
all four look like dead code to a grep:

| Where | What |
|---|---|
| `src/app.css` | `.treb-address-label` repeated ×4 for specificity, to beat TREB's own rule. Commented `/* patch */`. |
| `src/style/riskamp-dialog.css` | `.string` / `.call` / `.identifier` and `[data-highlight-index="N"]`. **TREB writes these into our nodes** — `interactive-components.ts` hands the editors to `sheet.ExternalEditor()`, and TREB does the syntax highlighting. Nothing in our source sets them. |
| `src/style/riskamp-dialog.css` | `--text-reference-color-1..5`, copied off `.treb-main`'s computed style onto the dialog root by that same `Init()`. |
| `trend-forecasting/chart.css`, `quickview-charts.css` | `.chart-column`, `.series-1`, `.scatter-plot`, `.legend` — all emitted by TREB's chart renderer. |

**Never delete a selector here for being "unused" without checking whether TREB generates
it.** An audit that greps for class names will report every one of these as dead.

## Which file owns what

| File | Owns |
|---|---|
| `src/app.css` | **Every token, and every themeable colour in the product.** The only file allowed to hold a colour literal. |
| `src/reset.css` | `box-sizing`, and font inheritance for form elements. Imported first. |
| `src/style/controls.css` | The control recipe: `.input`, `.select`, `.control-button`, and `.riskamp-dialog footer button`. Global classes, because it has to reach global selectors. |
| `src/style/shared.module.css` | Recipes shared **between CSS modules**, via `composes`. See below. |
| `src/style/utility.css` | Atomic helpers (`.flex-row`, `.ellipsis`, …). |
| `src/style/grid-table.css` | The app's list surface. `documents.module.css` restates it locally **on purpose** while the backstage redesign is still moving. |
| `src/style/riskamp-dialog.css` | Dialog chrome. Should eventually move under `src/components/dialogs/`. |
| `*.module.css` | Everything else, next to its component. |

## Tokens

`app.css :root` is the single source of truth. Each colour is defined **once** as
`--x: light-dark(<light>, <dark>)`; which side applies is decided entirely by
`color-scheme`, driven by `data-theme` on `<html>`. Adding a themed token is one line.

Read the canonical token rather than restating its value:

- accent — `--accent`, `--accent-wash`, `--on-accent`
- text — `--text`, `--text-muted`, `--text-faint`
- lines — `--border-hairline` (dividers, chrome edges, cards), `--border-control` (inputs,
  buttons, **menus**)
- surfaces — `--surface`, `--overlay-faint`, `--overlay-faintest`, `--hover`, `--hover-strong`
- metrics — `--control-height` / `-sm`, `--icon-button-size`, `--control-radius`,
  `--surface-radius`, `--radius-pill`, `--transition-fast`
- type — `--base-font-size` (13px, the floor), `--prose-font-size`, `--heading-font-size`
- status — `--danger` (error), `--warning` (caution: important, not critical)

**Deliberately exempt from the one-accent rule:** `--chart-series-*`, `--sidebar-fit-*` and
`--dialog-syntax-*` are data encodings, not chrome. Don't pull them toward the accent.

`--bs-*` in `backstage.module.css` is not a parallel system. After the alias layer was
collapsed, a `--bs-*` name means either a value backstage owns or an **override point**
re-declared further down that file. Details in `src/routes/(backstage)/README.md`.

## Three things that fail silently

**1. `light-dark()` can only wrap a `<color>`, never a whole `box-shadow`.**
`--x: light-dark(1px 10px 18px rgba(…), 1px 10px 18px rgba(…))` is invalid, computes to
`box-shadow: none`, and logs nothing — custom properties accept any text. Put the offsets
outside: `--menu-shadow: 1px 10px 18px 1px light-dark(rgba(…), rgba(…))`. Verify a shadow by
reading computed `boxShadow` (must not be `none`), not `getPropertyValue`, which returns the
raw token text either way.

**2. `composes` only works on a single local class selector.**
`button.label { composes: … }` is a compound selector; postcss rejects it, the module stops
transforming, and the only symptom is a **MIME-type error in the browser console** — the dev
server serves HTML where the JS should be. This is the main limit on how far
`shared.module.css` reaches: a rule keyed off `.dialog-buttons > button` or
`.copy-header button` cannot compose without restructuring its selector, which would change
specificity. Those keep their local copies.

Other `composes` notes: use a **relative** path (`../../style/shared.module.css`) — the `~`
alias is a JS-resolver alias and isn't wired for it. And `composes` does **not** raise
specificity; the cascade follows stylesheet source order. Vite emits `shared.module.css`
before its importers, which is what lets a consumer override a composed declaration.

**3. CSS module class names are hashed per file.**
Writing `.icon` in `documents.module.css` when it's declared in `backstage.module.css`
matches nothing, silently, and `tsc` can't see it. `composes` is the sanctioned way across
that boundary when the rule is genuinely shared; otherwise give the second file its own
class.

## Also worth knowing

- **No `color-mix()`.** It doesn't render reliably in the Safari we target. Derive colours
  with relative syntax: `rgb(from var(--x) r g b / .09)`. To vary alpha per theme, wrap the
  pair: `light-dark(rgb(from var(--x) r g b / .09), rgb(from var(--x) r g b / .15))` — inside
  each arm the token has already resolved.
- **Focus is drawn by the browser.** Don't add an `outline` and don't remove one from
  anything operable. The two surviving `outline: none` are `<dialog>` elements that take
  focus as containers; both say so in a comment.

## Verifying a change

A dev server runs on `http://localhost:5173` — reuse it, don't restart it. `/documents?dev`
bypasses the route guard (dev builds only).

For anything meant to be a no-op, compare rather than inspect: capture `getComputedStyle`
for every element across the properties you touched and both themes, `git stash`, capture
again, and **classify every difference**. That's what proved the token collapse changed
nothing (79/79 elements identical) and reduced a riskier pass to exactly two intended change
signatures out of 2,051 elements. Eyeballing a sample would have missed both answers.

Also check: braces balance, no `var()` left dangling (`--max-tabs` and TREB's
`--text-reference-color-N` are the two intentional exceptions), routes return 200, and the
console is clean.
