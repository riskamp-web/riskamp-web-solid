# scripts

## check-fr-typography.ts

Lints — and optionally fixes — French typographic spacing in the French
translation catalogue, `src/i18n/lang/fr.ts`.

```bash
npm run check:i18n-fr          # report violations, non-zero exit if any (CI-ready)
npm run check:i18n-fr -- --fix    # rewrite fr.ts in place, then re-check
```

### The convention (strict Imprimerie nationale)

French puts a **no-break** space before certain marks, so they never wrap to the
start of a line and read correctly:

| Position | Character |
|---|---|
| before `:` | `U+00A0` NO-BREAK SPACE (full) |
| before `;` `!` `?` | `U+202F` NARROW NO-BREAK SPACE |
| after `«` and before `»` | `U+202F` NARROW NO-BREAK SPACE |

Apply this to any **new** French strings; `--fix` will convert an ordinary space
already in the right position, and `check` will fail CI if one is left behind.

### Why it's safe against the code

The script works on the raw file text and only ever **normalises a space that is
already present** before the mark — it never inserts one into a glued position.
That's the whole trick: a French value colon has a space before it
(`'Remarque : …'`), a key-separator colon does not (`title:`, `about: {`); a
French `?`/`;`/`!` has a space before it, a TypeScript `;` / `!` / `?.` does not.
Acting only on the space-preceded case targets French text and never rewrites a
key or a line of TypeScript. The trade-off: a genuinely *glued* French mark (the
space forgotten entirely) isn't caught — worth it for zero false positives.

Only `fr.ts` needs this — Spanish and English don't use these spaces. Not wired
into CI yet (this repo has none); it's ready to drop in when CI arrives.

## check-i18n-scope.ts

Lints **where** the i18n readers — `t()` and `currentLocale()` — are called.
Both must be called from inside a function, never from a module body.

```bash
npm run check:i18n-scope       # report violations, non-zero exit if any (CI-ready)
tsx scripts/check-i18n-scope.ts [path...]   # check specific dirs/files
```

### The rule

`t()` resolves its key by walking `i18n_instance.strings`, a Solid store — every
segment is a tracked property read. That is what makes a language change repaint
the ui, and it is why *where* the call sits matters:

```ts
const MESSAGE = t('some.key');    // module scope: runs at import, before any
                                  // translation loads -> English, forever
```

Module bodies execute once, at import time. Such a line snapshots English and no
language change will ever move it — and it is valid TypeScript with the right
return type, so neither the compiler nor eslint objects.

The same call inside **module-scope JSX** fails differently for the same reason.
Solid compiles `{t('x')}` into a render effect, so it isn't evaluated at import —
but the effect is *created* at import, with no owner. Solid's dev build warns
(*"computations created outside a `createRoot` or `render` will never be
disposed"*), the effect subscribes to the store, and nothing ever tears it down.
The script reports the two cases separately (`import-time` / `ownerless-jsx`).

Calls from inside a function are always fine. In a tracking scope the read
subscribes and live-updates; outside one — an event handler, say — it's a plain
untracked read returning whatever is current at that moment, which is what a
transient dialog wants anyway.

### What it looks at

`t` and `currentLocale`, the two exports of `src/i18n/i18n.ts` that read reactive
state. `format()` / `formatJSX()` only splice into a string they're handed, and
`K` / `languages` are plain data built at import on purpose, so none of those are
flagged — but `format(t('key'), ...)` still is, via the `t()` inside it. Named,
aliased (`{ t as translate }`) and namespace (`import * as i18n`) imports are all
recognised.

### How it works

Parses every `.ts`/`.tsx` under `src/` with the TypeScript compiler; for each
call to a reader binding it walks up the parent chain. The first function-like
ancestor (including a class property initializer, which runs at construction)
means the call is deferred and fine. Reaching the source file without crossing
one means the call sits in the module body — a violation.

One blind spot, for the record: a module-scope IIFE reads as deferred because of
its arrow function, though it does run at import. Nothing here is written that
way and handling it would cost more than it's worth.

Not wired into CI yet (this repo has none); it's ready to drop in when CI
arrives, alongside `check-fr-typography.ts`.

## check-i18n-coverage.ts

Validates every translation catalogue in `src/i18n/lang/` against the canonical
English one, `en.ts`.

```bash
npm run check:i18n-coverage               # all locales, non-zero exit on failure (CI-ready)
tsx scripts/check-i18n-coverage.ts de pt  # a subset, while translating
```

### What it checks

| # | Check | Why the compiler doesn't catch it |
|---|---|---|
| 1 | **coverage** — every `en.ts` key exists in the locale | a missing key is valid `DeepPartial<I18N>`; the loader falls back to English silently |
| 2 | **extras** — no key `en.ts` doesn't have | `DeepPartial` keeps a typo'd path inside an otherwise-valid nested object satisfying the type; the key is never read |
| 3 | **empty** — no leaf is `''` | an empty string is still a string; the ui just goes blank |
| 4 | **placeholders** — the `{count}`-style names match English exactly | a dropped or renamed name renders literally (`{count}`) or is swallowed by `format()` |
| 5 | **registration** — every catalogue is in the `languages` array, and every code there has a file | an unregistered catalogue is unreachable from the picker and auto-detect; a file-less code 404s and falls back to English |

A missing key is *allowed* by the loader — the fallback is the design — but a
complete catalogue is the house standard (`es.ts`, `fr.ts`, `de.ts`, `pt.ts` and
`nl.ts` are all full 773-string mirrors), so any gap fails the check.

### How it works

Discovers locales from the files in `src/i18n/lang/` (excluding `en.ts`), imports
each with `tsx` (the `import type` at the top of a catalogue is erased, so there is
no runtime dependency on `i18n.ts`), flattens both trees to dotted paths, and
compares key sets and placeholder sets. Registration parses the `languages` array
out of `i18n.ts` with block comments stripped first, so the deliberately
commented-out planned locales don't count as registered.

Deliberately **not** included: *stale* detection — an English value edited after
its translation was generated. That wants per-key provenance or a content hash,
and is the remaining piece of the scaling plan in `CLAUDE.md`.

## convert-policy-pages.ts

Converts the legal pages (**Privacy Policy**, **Terms of Service**) from their
original SvelteKit markup — exported from [Termly](https://termly.io) — into
clean Markdown that the new app renders with `markdown-it`.

```bash
npm run convert-policies
```

### Why this exists

The Termly export is deeply-nested HTML with no semantic headings. Stripping the
tags to plain text loses all structure (headings, lists, the California data
table, links). But every element is tagged with a Termly **`data-custom-class`
role**, and the Terms of Service additionally distinguishes headings by
font-size — together these let us reconstruct real Markdown reliably instead of
guessing.

### Inputs → outputs

| | |
|---|---|
| **Input**  | `src/routes/(content)/OLD_FILES/<page>/+page.svelte` (committed — do not delete) |
| **Output** | `src/routes/(content)/<page>.md` (overwritten in place) |

The generated `.md` is rendered by `src/routes/(content)/render-content.ts`.

### How it works

Reads each `+page.svelte`, strips `<script>`/`<style>`, unwraps Termly's `<bdt>`
editor markers, then walks the `<div data-custom-class="body">` DOM and emits
Markdown:

| Source                                             | Markdown          |
|----------------------------------------------------|-------------------|
| `data-custom-class="title"` / font-size ≥ 22px     | `#` H1            |
| `data-custom-class="subtitle"`                     | `_italic line_`   |
| `data-custom-class="heading_1"` / font-size ≥ 16px | `## ` H2          |
| `data-custom-class="heading_2"`                    | `### ` H3         |
| `data-custom-class="body_text"`                    | paragraph         |
| `<a href>` (non-empty)                             | `[text](href)`    |
| `<ul>`/`<ol>`/`<li>`                               | bullet list (nested) |
| `<table>`                                          | GFM table         |
| `<strong>` / `<em>`                                | `**bold**` / `*italic*` |
| `id="…"` on a heading or paragraph                 | `{#id}` anchor    |

Notable steps:

- **Anchors.** Section headings and a few in-body targets carry a source `id`
  (e.g. `#infocollect`). We emit these as a trailing `{#id}` marker;
  `render-content.ts` has a small `markdown-it` core rule that converts the
  marker into a real element `id` so the Table-of-contents links jump in-page.
- **Data table.** The California "Categories of personal information" table is
  malformed in the export (unclosed `<div>`s, `<tr>` outside `<table>`), so the
  parser yields several table fragments. `stitchTables()` merges any run of
  adjacent table rows back into one table.
- **Empty dangling links.** Termly leaves `<a href="#foo"></a>` links to sections
  that were disabled in this document; those empty anchors are dropped.

### Re-running / editing

Safe to re-run any time — it overwrites the two `.md` files from the committed
`OLD_FILES/` sources. If a legal doc is re-exported from Termly, drop the new
`+page.svelte` into the matching `OLD_FILES/<page>/` folder and run the script.

It doesn't need to be perfect. After a run, sanity-check the output:

- Every `](#id)` link has a matching `{#id}` heading. Quick check:
  ```bash
  M=src/routes/'(content)'/privacy-policy.md
  comm -23 <(grep -oP '\]\(#[\w-]+\)' "$M" | sed 's/](#//;s/)//' | sort -u) \
           <(grep -oP '\{#[\w-]+\}'   "$M" | sed 's/{#//;s/}//'   | sort -u)
  # prints anchor targets with no destination — empty output is good
  ```
- No leftover `****`, `<tag>`, `bdt`, or `{#` text leaked into the `.md`.
- The data table has one header row + one separator row.
