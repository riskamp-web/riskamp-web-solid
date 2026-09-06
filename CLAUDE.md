# CLAUDE.md

The operating manual for this repo — repo-wide conventions, invariants, and
planned work, loaded into every session. Keep it lean; deep detail belongs in the
co-located docs, not here.

## Docs

Docs live **next to the code they describe**. `README.md` holds the canonical map
(the doc index) — consult it, and the relevant co-located `README.md`, before
working in an unfamiliar area rather than inferring from the code alone.

## Conventions & invariants

Repo-wide rules that should shape every change. One line each; follow the pointer
for the full story.

- **i18n — `typeof en` is the type source of truth.** `src/i18n/i18n.ts` derives
  the entire type system from `export type I18N = typeof en`; translations are
  `satisfies DeepPartial<I18N>` and fall back to English per key. Never break that
  derivation. Missing/stale keys are invisible to the compiler — mirror `en.ts`
  changes into `es.ts`/`fr.ts`. (→ scaling plan below.)
- **CSS — `src/app.css` is the single source of every token and colour.** Theme
  colours, metrics, and type all resolve from there. (→ `src/style/README.md`.)
- **CSS — TREB generates selectors that look like dead code.** Don't delete CSS
  that appears unused without checking the TREB carve-out. (→ `src/style/README.md`.)
- **Dev affordances (dev server only).** `/documents?dev` opens a signed-in page
  with no session; `?fail` / `?fail-history` force load-failure states (e.g.
  `/documents?dev&fail-history`). (→ `src/routes/(backstage)/README.md`.)
- **`src/docs/` is reference dumps, not live code** — the source of truth when
  wiring the real endpoints, wired to nothing itself.
- **Build — riskamp-web language files are emitted by a plugin; don't remove it.**
  riskamp-web loads its language catalogues via `import()` of a *computed* path,
  which Rollup can't analyse, so a plain prod build emits nothing → runtime 404 →
  silent English fallback. `riskampLanguages()` in `app.config.ts` copies them to
  `_build/assets/languages/` where that import resolves. Keep it until the
  upstream fix lands. (→ planned work below; full story in `app.config.ts`.)

## Planned work

### riskamp-web language loading — static specifiers (upstream, needs a major bump)

**Status:** proposed, deferred. The app-side workaround ships today
(`riskampLanguages()` in `app.config.ts`); this is the real fix, and it lives in
riskamp-web itself (`../RAW`, the `file:` dependency). It requires a **major
version bump there** — other consumers rely on the current output — so it's not
urgent, but it removes the workaround and makes every Vite consumer "just work".

**Problem.** riskamp-web loads a language catalogue with a dynamic `import()` of a
*computed* path (`treb-mc/src/embedded-spreadsheet.ts`:
`const path = \`./languages/riskamp-web-i18n-${language}.mjs\`; mod = await import(path)`).
The variable is deliberate — it stops esbuild (`bundle: true`) from inlining the
catalogues, which must ship as separate files (`CopyFilesPlugin` copies
`i18n/languages` → `dist/languages/`). But the variable also hides the specifier
from Vite/Rollup's built-in dynamic-import analysis, so a consuming Vite **prod**
build emits nothing and the runtime `import()` 404s (dev works — Vite serves the
files straight from `node_modules`). An older riskamp-web wrote the template
literal *directly inside* `import()`, which Vite's `@rollup/plugin-dynamic-import-vars`
globbed and bundled automatically — that's why the Svelte-era app needed no config;
the temporary-variable change (RAW commit `20187e2`) silently regressed it.

**Fix — two coordinated changes in `../RAW`:**

1. **Replace the computed path with a static per-language map of literal
   `import()` specifiers** (the set is fixed and known, ~10 locales):
   `{ fr: () => import('./languages/riskamp-web-i18n-fr.mjs'), … }`. Literal
   specifiers let Vite/Rollup resolve, hash-emit, and rewrite each one — no
   consumer-side plugin needed. This also gives the "filter list to avoid 404s"
   the source's own FIXME asks for.

2. **Mark `./languages/*` external in esbuild** (`esbuild-composite.mjs` —
   add to `external`, or an `onResolve` plugin; cf. the commented-out
   `RewriteIgnoredImports`) so esbuild leaves the now-literal imports pointing at
   the copied `dist/languages/*.mjs` instead of inlining them — preserving the
   separate-files behaviour existing consumers depend on.

**Leave the sibling `treb-i18n-*` import alone** — those files don't ship in the
package, so converting them to literal specifiers would hard-fail a consumer's
build (unresolved module); as a variable it stays a harmless 404 → fallback.

When this lands, delete `riskampLanguages()` and its wiring from `app.config.ts`.

### i18n catalogue scaling — target 1.1 (post-release)

**Status:** agreed, not started. Does **not** block release. Pick this up early
in the 1.1 cycle, before the string sets grow further.

**Problem.** The language catalogues (`src/i18n/lang/{en,es,fr}.ts`) are already
~1,900 lines / ~47KB each and only get larger as features land and locales are
added. Two distinct pains: (1) one giant file per locale → merge conflicts and
poor navigation; (2) no way to see what's missing or *stale* in a translation.

**The constraint to preserve.** The entire type system derives from
`export type I18N = typeof en` in `src/i18n/i18n.ts`. That single source gives us
`K.namespace.key` navigation, autocomplete, and the `satisfies DeepPartial<I18N>`
guard that makes an *invented* key in a translation a compile error. Any change
here must keep `typeof en` intact. What the types **cannot** catch — and the real
scaling risk — is a *missing* key (that's the intended fallback) or a *stale* one
(valid TypeScript, wrong meaning; e.g. a translation left behind after its English
source changed).

**Plan, staged:**

1. **Split each catalogue by namespace (do first — cheap, zero type-safety
   lost).** Turn `en.ts` into an index that composes per-namespace modules
   (`toolbar.ts`, `command-palette.ts` ~480 lines, `documents-page.ts` ~230, …):
   `export default { toolbar, documents, ... }`. `typeof en` still resolves fully
   at compile time — **no build step.** Mirror the same split in `es.ts`/`fr.ts`
   so each feature has three parallel files that diff at a glance. Keep the
   catalogue **central, filed by feature** — do *not* colocate strings next to
   their components (fragments the canonical object and the composed type).

2. **Add a coverage/staleness report (highest-leverage tooling — build this, not
   an editor).** A script that walks `en` and each locale and reports missing
   keys and stale keys (English value changed since the locale was generated; the
   `generated <date>` header is a start, but real detection wants per-key
   provenance or a content hash). Wire into CI. A bespoke translation *editor* is
   high-cost / low-return for a small LLM-assisted team — skip it.

3. **Defer: JSON + codegen.** Only when real human translators or a TMS
   (Crowdin/Lokalise/Weblate) enter the picture — those speak JSON, not TS. It
   trades away the zero-build `typeof en` elegance, so don't pay that cost
   preemptively.

**Adjacent, separate axis:** `format()` does flat `{placeholder}` splicing with
no plural/gender handling. When count-dependent strings need real localization,
adopt ICU MessageFormat. Not part of the file-management work.
