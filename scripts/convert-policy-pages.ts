/**
 * convert-policy-pages.ts
 * ------------------------
 * Converts the legal pages exported from Termly (Privacy Policy, Terms of
 * Service) from their original SvelteKit markup into clean Markdown that the new
 * app renders with markdown-it.
 *
 * WHY THIS EXISTS
 *   The raw Termly export is deeply-nested HTML with no semantic headings — the
 *   plaintext you'd get by stripping tags loses all structure (headings, lists,
 *   the California data table, links). But every element is tagged with a Termly
 *   `data-custom-class` ROLE, which lets us reconstruct real Markdown reliably:
 *
 *     data-custom-class      ->  Markdown
 *     ---------------------      -----------------------------
 *     title                  ->  # H1
 *     subtitle               ->  _italic line_ (e.g. "Last updated ...")
 *     heading_1              ->  ## H2   (the numbered sections)
 *     heading_2              ->  ### H3  (sub-sections)
 *     body_text              ->  paragraph
 *     link                   ->  [text](href)
 *
 *   Structural tags map directly: <ul>/<ol>/<li> -> bullets (nesting kept),
 *   <table> -> GFM table, <strong> -> **bold**, <em> -> *italic*, <a> -> link.
 *   Junk wrappers (<span>, <bdt>, presentational <div>s) are unwrapped.
 *
 * INPUT   src/routes/(content)/OLD_FILES/<page>/+page.svelte   (committed)
 * OUTPUT  src/routes/(content)/<page>.md                       (overwritten)
 *
 * RUN     npm run convert-policies
 *
 * KNOWN MANUAL STEP: the California "Categories of personal information" table
 * is malformed in the export (unclosed <div>s, <tr> outside <table>, values
 * wrapped in <bdt> editor markers). The script emits a best-effort table and a
 * `<!-- REVIEW: ... -->` marker above it; verify/finish it by hand. See
 * scripts/README.md.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, HTMLElement, TextNode, type Node } from 'node-html-parser';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(HERE, '..', 'src', 'routes', '(content)');

const PAGES = [
  { src: 'OLD_FILES/privacy-policy/+page.svelte', out: 'privacy-policy.md' },
  { src: 'OLD_FILES/terms-of-service/+page.svelte', out: 'terms-of-service.md' },
];

const HEADING_ROLES: Record<string, string> = {
  title: 'title',
  subtitle: 'subtitle',
  heading_1: 'heading_1',
  heading_2: 'heading_2',
};

const isElement = (n: Node): n is HTMLElement => n instanceof HTMLElement;
const tagOf = (el: HTMLElement) => (el.rawTagName || '').toLowerCase();
const collapseWs = (s: string) => s.replace(/\u00a0/g, " ").replace(/\s+/g, " ");
const clean = (s: string) => collapseWs(s).trim();

/**
 * Wrap inner content in an emphasis marker while keeping any leading/trailing
 * whitespace OUTSIDE the marker — otherwise `<strong>foo </strong>bar` collapses
 * to `**foo**bar` and Markdown glues the words together.
 */
function emphasize(raw: string, marker: string): string {
  const m = raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
  if (!m || !m[2]) return raw;
  const [, lead, core, trail] = m;
  // Termly nests <strong> inside <strong>; don't stack a second identical marker.
  if (core.startsWith(marker) && core.endsWith(marker) && core.length > marker.length * 2) {
    return `${lead}${core}${trail}`;
  }
  return `${lead}${marker}${core}${marker}${trail}`;
}

/**
 * Render inline content (text + emphasis + links), ignoring block structure.
 * In `plain` mode (used for headings) emphasis/links are flattened to text.
 */
function inline(node: Node, plain = false): string {
  if (node instanceof TextNode) return collapseWs(node.text);
  if (!isElement(node)) return '';
  const el = node;
  const inner = () => el.childNodes.map((c) => inline(c, plain)).join('');
  switch (tagOf(el)) {
    case 'br':
      return ' ';
    case 'strong':
    case 'b':
      return plain ? inner() : emphasize(inner(), '**');
    case 'em':
    case 'i':
      return plain ? inner() : emphasize(inner(), '*');
    case 'a': {
      const href = el.getAttribute('href') || '';
      const t = inner().trim();
      if (!t) return ''; // drop Termly's empty dangling-anchor artifacts
      if (plain) return t;
      return href ? `[${t}](${href})` : t;
    }
    default:
      // span, bdt, u, div used inline, etc. -> unwrap
      return inner();
  }
}

const inlineTrim = (node: Node, plain = false) => clean(inline(node, plain));

/** Does this element contain block-level children we should recurse into? */
function hasBlockChildren(el: HTMLElement): boolean {
  return el.childNodes.some(
    (c) => isElement(c) && ['div', 'ul', 'ol', 'table'].includes(tagOf(c)),
  );
}

/** Largest `font-size: Npx` on the element or any descendant (0 if none). */
function maxFontPx(el: HTMLElement): number {
  let max = 0;
  for (const node of [el, ...el.querySelectorAll('*')]) {
    const m = (node.getAttribute('style') || '').match(/font-size:\s*([0-9.]+)px/);
    if (m) max = Math.max(max, parseFloat(m[1]));
  }
  return max;
}

/**
 * The heading role of a leaf block, or 'body' for a normal paragraph.
 * Privacy Policy tags headings with `data-custom-class`; Terms of Service does
 * not — its headings are only distinguishable by a larger font-size (title 26px,
 * sections 19px), so we fall back to that. 15px is body text (incl. bold
 * lead-ins like "In Short:"), so the 16px cutoff keeps those out.
 */
function roleOf(el: HTMLElement): string {
  // The role can be on the block itself (Terms of Service) or a nested span
  // (Privacy Policy) — check self first, then descendants.
  const dc =
    el.getAttribute('data-custom-class') ||
    el.querySelector('[data-custom-class]')?.getAttribute('data-custom-class') ||
    '';
  if (HEADING_ROLES[dc]) return dc;
  if (dc !== 'body_text') {
    const px = maxFontPx(el);
    if (px >= 22) return 'title';
    if (px >= 16) return 'heading_1';
  }
  return 'body';
}

function renderList(list: HTMLElement, depth: number): string {
  const ordered = tagOf(list) === 'ol';
  const pad = '  '.repeat(depth);
  const lines: string[] = [];
  const items = list.childNodes.filter(
    (c): c is HTMLElement => isElement(c) && tagOf(c) === 'li',
  );
  items.forEach((li, i) => {
    const nested = li.childNodes.filter(
      (c): c is HTMLElement => isElement(c) && ['ul', 'ol'].includes(tagOf(c)),
    );
    const text = clean(
      li.childNodes
        .filter((c) => !(isElement(c) && ['ul', 'ol'].includes(tagOf(c))))
        .map(inline)
        .join(''),
    );
    const marker = ordered ? `${i + 1}.` : '-';
    if (text) lines.push(`${pad}${marker} ${text}`);
    for (const sub of nested) lines.push(renderList(sub, depth + 1));
  });
  return lines.join('\n');
}

function renderTable(table: HTMLElement): string {
  const rows = table.querySelectorAll('tr');
  if (!rows.length) return '';
  const cellsOf = (tr: HTMLElement) =>
    tr
      .querySelectorAll('th,td')
      .map((c) => inlineTrim(c).replace(/\|/g, '\\|') || ' ');
  const header = cellsOf(rows[0]);
  const cols = header.length || 1;
  const norm = (r: string[]) => {
    const out = r.slice(0, cols);
    while (out.length < cols) out.push(' ');
    return out;
  };
  const body = rows.slice(1).map((r) => norm(cellsOf(r)));
  return [
    `| ${norm(header).join(' | ')} |`,
    `| ${header.map(() => '---').join(' | ')} |`,
    ...body.map((r) => `| ${r.join(' | ')} |`),
  ].join('\n');
}

function walk(node: HTMLElement, out: string[]): void {
  for (const child of node.childNodes) {
    if (child instanceof TextNode) {
      const t = clean(child.text);
      if (t) out.push(t);
      continue;
    }
    if (!isElement(child)) continue;
    const tag = tagOf(child);
    if (tag === 'script' || tag === 'style' || tag === 'br') continue;
    if (tag === 'ul' || tag === 'ol') {
      const list = renderList(child, 0);
      if (list) out.push(list);
      continue;
    }
    if (tag === 'table') {
      const t = renderTable(child);
      if (t) out.push(t);
      continue;
    }
    if (hasBlockChildren(child)) {
      walk(child, out);
      continue;
    }
    const role = roleOf(child);
    // Flatten inner emphasis for every non-body block (headings + subtitle) so
    // the title/subtitle line reads consistently across documents.
    const text = inlineTrim(child, role !== 'body');
    if (!text) continue;
    // Carry the source anchor id so the TOC / "Learn more" links land here. The
    // id may be on the block or on an inner heading <span> (every id in these
    // docs is a real anchor target, so grabbing the first is safe).
    const id =
      child.getAttribute('id') ||
      child.querySelector('[id]')?.getAttribute('id') ||
      '';
    pushBlock(out, role, text, id);
  }
}

function pushBlock(out: string[], role: string, text: string, id: string): void {
  const anchor = id ? ` {#${id}}` : '';
  switch (role) {
    case 'title':
      out.push(`# ${text}${anchor}`);
      break;
    case 'subtitle':
      out.push(`**${text}**`);
      break;
    case 'heading_1':
      out.push(`## ${text}${anchor}`);
      break;
    case 'heading_2':
      out.push(`### ${text}${anchor}`);
      break;
    default:
      out.push(`${text}${anchor}`);
  }
}

const isTableRow = (line: string) => /^\s*\|/.test(line);
const isSeparatorRow = (line: string) => /^\s*\|(?:\s*:?-{3,}:?\s*\|)+\s*$/.test(line);

/**
 * Stitch table fragments back together. Termly's data table is exported as
 * malformed HTML, so the parser yields several adjacent `<table>`s each with
 * their own header/separator rows and blank lines between. Merge any run of
 * table rows (blank-line-separated included) into one table: keep the first row
 * as the header, synthesise a single separator, and drop stray separators.
 */
function stitchTables(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  for (let i = 0; i < lines.length; ) {
    if (!isTableRow(lines[i])) {
      out.push(lines[i]);
      i++;
      continue;
    }
    const rows: string[] = [];
    while (i < lines.length) {
      if (isTableRow(lines[i])) {
        rows.push(lines[i]);
        i++;
      } else if (lines[i].trim() === '' && isTableRow(lines[i + 1] ?? '')) {
        i++; // swallow blank line between fragments
      } else break;
    }
    const header = rows[0];
    const cols = (header.match(/\|/g)?.length ?? 1) - 1;
    const sep = `|${' --- |'.repeat(Math.max(cols, 1))}`;
    const data = rows.slice(1).filter((r) => !isSeparatorRow(r));
    out.push(header, sep, ...data);
  }
  return out.join('\n');
}

function convert(html: string): string {
  // Unwrap Termly's <bdt> editor markers (keep their text), then parse.
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<\/?bdt[^>]*>/gi, '');
  const root = parse(cleaned, { comment: false });
  const body = root.querySelector('[data-custom-class="body"]');
  if (!body) throw new Error('could not find the document body root');
  const blocks: string[] = [];
  walk(body, blocks);
  const md = blocks.join('\n\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
  return stitchTables(md);
}

for (const page of PAGES) {
  const srcPath = join(CONTENT, page.src);
  const outPath = join(CONTENT, page.out);
  const md = convert(readFileSync(srcPath, 'utf8'));
  writeFileSync(outPath, md);
  const lines = md.split('\n').length;
  console.log(`✓ ${page.src}\n  -> ${page.out} (${lines} lines)`);
}
