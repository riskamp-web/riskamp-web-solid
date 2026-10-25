
/**
 * a tiny bars-only histogram for the status bar (the stats panel in the
 * sheet footer). no axes or labels, like the in-cell column sparklines.
 * the caller bins the data; this just draws counts.
 *
 * sized in em so it follows the footer font; colour is set in app.css
 * (.treb-stats-histogram).
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

/** viewbox units per bin: bar plus gap */
const BIN_WIDTH = 4;
const BAR_WIDTH = 3;
const HEIGHT = 16;

export function RenderStatusHistogram(counts: number[], title?: string): SVGElement {

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.classList.add('treb-stats-histogram');
  svg.setAttribute('viewBox', `0 0 ${counts.length * BIN_WIDTH - (BIN_WIDTH - BAR_WIDTH)} ${HEIGHT}`);
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('shape-rendering', 'crispEdges');
  svg.style.width = `${counts.length * .3}em`;

  if (title) {
    const element = document.createElementNS(SVG_NS, 'title');
    element.textContent = title;
    svg.append(element);
  }

  const max = Math.max(...counts);

  counts.forEach((count, index) => {

    // empty bins get a baseline stub, so the range reads as a whole.
    // nonempty bins get at least that much, so a few outliers still show.

    const height = max > 0 ? Math.max(1, count / max * HEIGHT) : 1;

    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('x', String(index * BIN_WIDTH));
    rect.setAttribute('y', String(HEIGHT - height));
    rect.setAttribute('width', String(BAR_WIDTH));
    rect.setAttribute('height', String(height));
    if (!count) {
      rect.classList.add('empty');
    }
    svg.append(rect);

  });

  return svg;

}
