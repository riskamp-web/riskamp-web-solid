import MarkdownIt from 'markdown-it';

/**
 * Shared markdown-it renderer for the static legal/content pages
 * (privacy-policy, terms-of-service). The Markdown is generated from the old
 * Termly export by scripts/convert-policy-pages.ts.
 */
const md = new MarkdownIt({ linkify: true, typographer: true });

// External links open in a new tab; in-page (#anchor) links are left alone.
const defaultLinkOpen =
  md.renderer.rules.link_open ??
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const href = tokens[idx].attrGet('href') ?? '';
  if (/^https?:\/\//.test(href)) {
    tokens[idx].attrSet('target', '_blank');
    tokens[idx].attrSet('rel', 'noopener noreferrer');
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};

// Honour explicit `{#id}` anchors emitted by the converter on headings and
// paragraphs, so the in-page table-of-contents / cross-reference links resolve.
const ANCHOR = /\s*\{#([\w-]+)\}\s*$/;
md.core.ruler.push('explicit_anchor_ids', (state) => {
  const { tokens } = state;
  for (let i = 0; i < tokens.length - 1; i++) {
    const open = tokens[i];
    if (open.type !== 'heading_open' && open.type !== 'paragraph_open') continue;
    const inline = tokens[i + 1];
    if (inline.type !== 'inline') continue;
    const match = inline.content.match(ANCHOR);
    if (!match) continue;
    open.attrSet('id', match[1]);
    // Strip the marker and re-tokenise so it never renders as literal text.
    inline.content = inline.content.replace(ANCHOR, '');
    inline.children = [];
    state.md.inline.parse(inline.content, state.md, state.env, inline.children);
  }
});

export function renderContent(markdown: string): string {
  return md.render(markdown);
}
