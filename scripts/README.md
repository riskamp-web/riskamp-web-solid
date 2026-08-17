# scripts

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
