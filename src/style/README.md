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
| `trend-forecasting/chart.css` | `.chart-column`, `.series-1`, `.scatter-plot`, `.legend` — all emitted by TREB's chart renderer. |

**Never delete a selector here for being "unused" without checking whether TREB generates
it.** An audit that greps for class names will report every one of these as dead.

## Which file owns what

| File | Owns |
|---|---|
| `src/app.css` | **Every token, and every themeable colour in the product.** The only file allowed to hold a colour literal. |
| `src/reset.css` | `box-sizing`, and font inheritance for form elements. Imported first. |
| `src/style/controls.css` | The control recipe: `.input`, `.select`, `.control-button`, and `.riskamp-dialog footer button`. Global classes, because it has to reach global selectors. |
| `src/style/shared.module.css` | Recipes shared **between CSS modules**, applied as a second class at the element. See below. |
| `src/style/utility.css` | Atomic helpers (`.flex-row`, `.ellipsis`, …). |
| `src/style/grid-table.css` | The app's list surface. `documents.module.css` restates it locally **on purpose** while the backstage redesign is still moving. |
| `src/style/riskamp-dialog.css` | Dialog chrome. Should eventually move under `src/components/dialogs/`. |
| `src/style/proposed-theme-palette.css` | **Superseded, not imported**: the first-round palette proposal. The adopted theme colours live in `app.css` (see *Theme colours and charts* below); kept only as the reference behind `/dev-test/palette`. |
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

## Theme colours and charts

TREB's theme colours (`--treb-theme-color-1..10`) are set in `app.css`. One theme drives
both the sheet and the charts, so changing a theme colour changes both. **Don't give
charts a palette of their own**, and don't adjust single colours.

- **Bases (tint 0) are for the sheet:** light enough for cell fills behind black text. Slot
  6 is the highlight yellow.
- **Charts use one fixed tint of the theme:** every series is its accent at tint −0.25,
  the picker's first darker row. `.treb-chart-container` computes it with
  `hsl(from var(--treb-theme-color-N) h s calc(l * 0.75))`. That is exactly how TREB
  applies a negative tint (`l × (1 + t)`). TREB inverts tints in dark mode, so there it's
  a +0.25 lightening, `l + (1 − l) × 0.25`.
- **TREB's theme index is offset by two.** Index 0 is the grid fill, 1 is the grid text,
  then the slots follow, so a stored `{ theme: N }` is `--treb-theme-color-(N − 1)`. The
  fill button's default, `theme: 7`, is slot 6. That's why the yellow lives there (it's
  also Office's yellow slot).
- **Tints follow Excel's formula:** darker is `l × (1 + t)`, lighter is `l + (1 − l) × t`
  (toward white, never clips). TREB used `l × (1 + t)` for both until 2026-10, which
  under-lightened mid-tone bases and clipped light ones to white. If the chart CSS is
  ever touched, keep it in step with `ColorFunctions.Lighten` (`treb-base-types/src/color.ts`).
- **The colour picker uses Excel's tint rows, not TREB's.** Accents and text get
  +80/+60/+40/−25/−50; the grid fill, grid text and background columns get Excel's own
  steps. The table is in `toolbar/color-picker-tints.ts`, which also resolves the swatches
  with a copy of TREB's tint math until TREB exposes its resolver (CLAUDE.md, planned work).
  In dark mode the +80 row is barely visible: inverted, it lands at about the dark grid's
  own lightness (#1E1E1E, not black). That's expected, not a bug.
- **Limits:** Excel compatibility caps the theme at six accents.
- **Spec and comparison:** `/dev-test/theme-palette` shows the candidates, the previous
  proposal and TREB's Office 2013 defaults, with picker, sheet and chart mocks and
  contrast and colour-vision checks.
- **Open:** the trend-forecasting dialog's chart still reads `--chart-series-N-color`,
  which `ApplyThemeColors()` (`toolbar/theme.ts`) copies from TREB's untinted applied
  theme colours. It isn't on the −0.25 rule yet.

`--bs-*` in `backstage.module.css` is not a parallel system. After the alias layer was
collapsed, a `--bs-*` name means either a value backstage owns or an **override point**
re-declared further down that file. Details in `src/routes/(backstage)/README.md`.

## Two things that fail silently

**1. `light-dark()` can only wrap a `<color>`, never a whole `box-shadow`.**
`--x: light-dark(1px 10px 18px rgba(…), 1px 10px 18px rgba(…))` is invalid, computes to
`box-shadow: none`, and logs nothing — custom properties accept any text. Put the offsets
outside: `--menu-shadow: 1px 10px 18px 1px light-dark(rgba(…), rgba(…))`. Verify a shadow by
reading computed `boxShadow` (must not be `none`), not `getPropertyValue`, which returns the
raw token text either way.

**2. CSS module class names are hashed per file.**
Writing `.icon` in `documents.module.css` when it's declared in `backstage.module.css`
matches nothing, silently, and `tsc` can't see it. For a rule that is genuinely shared, put
it in `shared.module.css` and apply both classes at the element (see below); otherwise give
the second file its own class.

## Shared recipes

`shared.module.css` holds rules more than one module states identically — `bare-button`,
`floating-menu`, `truncate`, `micro-label`, `pill`, `mouse-mask`. A consumer imports it
alongside its own module and puts **both classes on the element**, recipe first:

```tsx
import style from './my-thing.module.css';
import shared from '../../style/shared.module.css';

<button classList={{[shared['bare-button']]: true, [style['my-button']]: true}}>
```

Use `classList`, not string interpolation. It skips keys that evaluate to `undefined`, so a
typo'd recipe name adds nothing instead of writing the text `undefined` into the attribute;
it skips empty-string keys, so a forwarded `props.class || ''` is safe. **Don't put `class`
and `classList` on the same element** — on the client they're independent operations, and a
dynamic `class` can clobber the toggles.

This replaced `composes:`, which did the same joining inside the stylesheet. It was dropped
because the relationship was invisible from the markup and it failed badly: `composes` only
worked on a single local class selector, and a compound one made postcss reject the entire
module, with no symptom but a MIME-type error in the console.

Two things carry over. A second class does **not** raise specificity — the cascade follows
stylesheet source order, and a consumer overrides a recipe only because `shared.module.css`
is emitted before its importers. And a recipe applied at N call sites has to be remembered at
all N; where that count is high, write the declarations out locally instead. `.cell` in
`documents.module.css` is the standing example, at fifteen sites.

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
