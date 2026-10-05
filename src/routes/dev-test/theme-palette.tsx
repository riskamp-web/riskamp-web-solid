import { For, Show, createSignal, type JSX } from 'solid-js';
import style from './theme-palette.module.css';

// Dev-only comparison page for the second-round theme palette: one set of TREB
// theme colours that serves both the spreadsheet (base colours light enough for
// cell fills, plus a highlight yellow) and charts, which draw every series at
// one fixed tint of the theme (-0.25, the picker's first darker row). Two
// candidates differ only in slot 8 (soft rose vs. slate); the first-round
// proposal (/dev-test/palette, which stays as it was) is here for comparison.
//
// Tints follow TREB (treb-base-types/src/theme.ts): a relative change to HSL
// lightness, inverted in dark mode. TREB's positive tints don't match Excel's
// formula, so the lighten toggle shows both. Strings are plain English
// (dev-test convention); colour literals are the page's subject, so they live
// here rather than in app.css.

type PaletteKey = 'rose' | 'slate' | 'previous' | 'office';
type Lighten = 'treb' | 'excel';

/** slots 1, 2, 9, 10 are shared by every candidate (a palette can override 1 and 2) */
const FIXED = { light: '#E8EBEF', dark: '#2B3440', link: '#0477BE', followed: '#8566B8' };

interface Palette { label: string, accents: string[], names: string[], chartTint: number, blurb: string, light?: string, dark?: string }

const PALETTES: Record<PaletteKey, Palette> = {
  rose: {
    label: 'Candidate · rose',
    accents: ['#2E8FD6', '#E07B39', '#9D7FD0', '#F0B716', '#3B9E6C', '#D6738F'],
    names: ['Blue', 'Orange', 'Violet', 'Yellow', 'Green', 'Soft rose'],
    chartTint: -0.25,
    blurb: 'Lighter bases; charts at tint −0.25. Slot 8 is a soft rose in place of raspberry.',
  },
  slate: {
    label: 'Candidate · slate',
    accents: ['#2E8FD6', '#E07B39', '#9D7FD0', '#F0B716', '#3B9E6C', '#7F8C9E'],
    names: ['Blue', 'Orange', 'Violet', 'Yellow', 'Green', 'Slate'],
    chartTint: -0.25,
    blurb: 'As the rose candidate, but slot 8 is a neutral slate (useful for header bands).',
  },
  previous: {
    label: 'Previous proposal',
    accents: ['#0477BE', '#C9622A', '#8566B8', '#B88B0C', '#2A7F5A', '#C2417A'],
    names: ['Logo blue', 'Burnt orange', 'Violet', 'Ochre', 'Green', 'Raspberry'],
    chartTint: 0,
    blurb: 'First-round chart palette, before the round-two change to app.css. Charts draw it at tint 0, as it was rendered.',
  },
  office: {
    label: 'TREB defaults (Office 2013)',
    accents: ['#4472C4', '#ED7D31', '#A5A5A5', '#FFC000', '#5B9BD5', '#70AD47'],
    names: ['Blue', 'Orange', 'Grey', 'Gold', 'Light blue', 'Green'],
    light: '#E7E6E6',
    dark: '#44546A',
    chartTint: 0,
    blurb: 'What TREB ships (theme-defaults.scss), matching Office 2013. Charts draw it at tint 0, as TREB renders it.',
  },
};

/**
 * the picker's ten columns, in TREB's theme index order: index 0 and 1 are the
 * grid's own fill and text, then --treb-theme-color-1..8 (theme.ts LoadTheme).
 * so a stored { theme: N } is --treb-theme-color-(N - 1); the hyperlink slots
 * (9, 10) aren't in the picker.
 */
const slotsOf = (p: Palette, ground: Ground) => [ground.gridFill, ground.gridText, p.light ?? FIXED.light, p.dark ?? FIXED.dark, ...p.accents];
const SLOT_ROLES = ['Grid fill', 'Grid text', 'Light background', 'Dark text', 'Accent 1', 'Accent 2', 'Accent 3', 'Accent 4', 'Accent 5', 'Accent 6'];
const FIRST_ACCENT = 4;

/** the picker's rows, top to bottom (embedded-spreadsheet.ts) */
const TINTS = [0.5, 0.25, 0, -0.25, -0.5];

/** where the page draws: light/dark sheet and chart surfaces */
interface Ground { name: string, dark: boolean, bg: string, ink: string, grid: string, cellInk: string, gridFill: string, gridText: string }
const GROUNDS: Ground[] = [
  { name: 'Light', dark: false, bg: '#ffffff', ink: '#3d424a', grid: '#e6e8ec', cellInk: '#1f2328', gridFill: '#FFFFFF', gridText: '#333333' },
  { name: 'Dark',  dark: true,  bg: '#26282c', ink: '#ccd1d8', grid: '#3a3d43', cellInk: '#e4e7eb', gridFill: '#222222', gridText: '#DDDDDD' },
];

// ---- colour math -------------------------------------------------------------

type RGB = [number, number, number];

const parse = (hex: string): RGB => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const hex = (rgb: RGB) => '#' + rgb.map(v => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('').toUpperCase();

function toHsl([r, g, b]: RGB): RGB {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, s, l];
}

function fromHsl([h, s, l]: RGB): RGB {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  const f = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255];
}

/**
 * TREB's tint: relative HSL lightness, l * (1 + tint), both directions.
 * Excel darkens the same way but lightens toward white, l * (1 - tint) + tint.
 * dark mode inverts the tint (TintedColor in theme.ts).
 */
function tinted(base: string, tint: number, lighten: Lighten, dark = false) {
  if (dark) tint = -tint;
  if (!tint) return base.toUpperCase();
  const [h, s, l] = toHsl(parse(base));
  const next = tint < 0 || lighten === 'treb' ? l * (1 + tint) : l * (1 - tint) + tint;
  return hex(fromHsl([h, s, Math.min(1, Math.max(0, next))]));
}

const toLinear = (c: number) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const toSrgb = (c: number) => {
  c = Math.min(1, Math.max(0, c));
  return (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055) * 255;
};

const luminance = (h: string) => {
  const [r, g, b] = parse(h).map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

function oklab(h: string): RGB {
  const [r, g, b] = parse(h).map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
  ];
}
/** OKLab distance, x100 */
const deltaE = (a: string, b: string) => 100 * Math.hypot(...oklab(a).map((v, i) => v - oklab(b)[i]) as RGB);

// Machado, Oliveira & Fernandes (2009), severity 1.0, applied in linear RGB
const CVD: [string, number[][] | null][] = [
  ['Normal vision', null],
  ['Protanopia',   [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]]],
  ['Deuteranopia', [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]]],
  ['Tritanopia',   [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]]],
];

function simulate(h: string, m: number[][] | null) {
  if (!m) return h;
  const rgb = parse(h).map(toLinear);
  return hex(m.map(row => toSrgb(row[0] * rgb[0] + row[1] * rgb[1] + row[2] * rgb[2])) as RGB);
}

/** closest pair of colours, optionally adjacent pairs only */
function closest(colours: string[], adjacentOnly: boolean) {
  let best = { d: Infinity, i: 0, j: 0 };
  for (let i = 0; i < colours.length; i++) {
    for (let j = i + 1; j < colours.length; j++) {
      if (adjacentOnly && j !== i + 1) continue;
      const d = deltaE(colours[i], colours[j]);
      if (d < best.d) best = { d, i, j };
    }
  }
  return best;
}

// ---- charts (same samples as /dev-test/palette) ---------------------------------

const W = 460;

/** a bar with a 4px rounded top, square at the baseline */
function Bar(props: { x: number, y: number, w: number, h: number, fill: string }) {
  const r = () => Math.min(4, props.w / 2, props.h);
  const d = () => {
    const { x, y, w, h } = props;
    return `M${x},${y + h} V${y + r()} Q${x},${y} ${x + r()},${y} H${x + w - r()} Q${x + w},${y} ${x + w},${y + r()} V${y + h} Z`;
  };
  return <Show when={props.h > 0}><path fill={props.fill} d={d()} /></Show>;
}

function GridLines(props: { ground: Ground, ticks: number[], max: number, left: number, right: number, top: number, height: number, format?: (v: number) => string }) {
  return <For each={props.ticks}>{v => {
    const y = props.top + props.height - v / props.max * props.height;
    return <>
      <line x1={props.left} x2={props.right} y1={y} y2={y} stroke={props.ground.grid} />
      <text x={props.left - 6} y={y + 4} text-anchor='end' fill={props.ground.ink}>{props.format ? props.format(v) : v}</text>
    </>;
  }}</For>;
}

const HIST = [0.04, 0.44, 3.16, 8.12, 15.74, 18.70, 17.78, 13.86, 9.08, 5.96, 3.34, 1.74, 1.04, 0.56];

function Histogram(props: { ground: Ground, series: string[] }) {
  const H = 210, L = 44, R = 8, T = 10, B = 34, max = 20;
  const pw = W - L - R, ph = H - T - B, bw = pw / HIST.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role='img' aria-label='Histogram of simulated NPV, 5,000 trials'>
      <GridLines ground={props.ground} ticks={[0, 5, 10, 15, 20]} max={max} left={L} right={W - R} top={T} height={ph} format={v => `${v}%`} />
      <For each={HIST}>{(v, i) => {
        const h = v / max * ph;
        const tail = i() < 3 || i() >= 11;
        return <Bar x={L + i() * bw + 1} y={T + ph - h} w={bw - 2} h={h} fill={tail ? props.series[1] : props.series[0]} />;
      }}</For>
      <For each={['0.4M', '1.0M', '1.6M', '2.2M', '2.8M']}>{(label, k) =>
        <text x={L + k() * 3 * bw} y={H - B + 16} text-anchor='middle' fill={props.ground.ink}>{label}</text>
      }</For>
      <For each={[[3.17, 'P5'], [10.5, 'P95']] as const}>{([at, label]) => <>
        <line x1={L + at * bw} x2={L + at * bw} y1={T} y2={T + ph} stroke={props.ground.ink} stroke-dasharray='3 3' />
        <text x={L + at * bw + 4} y={T + 10} fill={props.ground.ink}>{label}</text>
      </>}</For>
      <text x={L + pw / 2} y={H - 2} text-anchor='middle' fill={props.ground.ink}>Project NPV</text>
    </svg>
  );
}

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
const PACKAGES = ['Design', 'Build', 'Test', 'Deploy', 'Train', 'Support'];
const COSTS = [[42, 35, 28, 22, 18, 12], [48, 38, 31, 25, 16, 14], [45, 41, 34, 21, 19, 17], [52, 44, 30, 27, 22, 15]];

function Grouped(props: { ground: Ground, series: string[] }) {
  const H = 200, L = 32, R = 8, T = 10, B = 24, max = 60;
  const pw = W - L - R, ph = H - T - B;
  const gw = pw / QUARTERS.length, inner = gw * 0.82, bw = inner / 6;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role='img' aria-label='Grouped column chart, six work packages by quarter'>
      <GridLines ground={props.ground} ticks={[0, 20, 40, 60]} max={max} left={L} right={W - R} top={T} height={ph} />
      <For each={QUARTERS}>{(q, gi) => {
        const gx = L + gi() * gw + (gw - inner) / 2;
        return <>
          <For each={COSTS[gi()]}>{(v, si) => {
            const h = v / max * ph;
            return <Bar x={gx + si() * bw + 1} y={T + ph - h} w={bw - 2} h={h} fill={props.series[si()]} />;
          }}</For>
          <text x={L + gi() * gw + gw / 2} y={H - 6} text-anchor='middle' fill={props.ground.ink}>{q}</text>
        </>;
      }}</For>
    </svg>
  );
}

const CASES: { label: string, series: number, values: number[] }[] = [
  { label: 'P90',    series: 2, values: [0, 5, 11, 18, 26, 35, 44, 53, 62, 71, 80, 90] },
  { label: 'Base',   series: 0, values: [0, 4, 9, 15, 22, 30, 37, 45, 52, 60, 67, 75] },
  { label: 'Stress', series: 1, values: [0, 3, 6, 10, 14, 19, 24, 28, 33, 37, 42, 46] },
];

function Lines(props: { ground: Ground, series: string[] }) {
  const H = 180, L = 32, R = 44, T = 10, B = 24, max = 100;
  const pw = W - L - R, ph = H - T - B, n = 12;
  const px = (i: number) => L + i / (n - 1) * pw;
  const py = (v: number) => T + ph - v / max * ph;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role='img' aria-label='Line chart, cumulative cash under three cases'>
      <GridLines ground={props.ground} ticks={[0, 25, 50, 75, 100]} max={max} left={L} right={L + pw} top={T} height={ph} />
      <For each={CASES}>{c => {
        const colour = () => props.series[c.series];
        const end = c.values[n - 1];
        return <>
          <path d={c.values.map((v, i) => `${i ? 'L' : 'M'}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(' ')}
              fill='none' stroke={colour()} stroke-width='2' stroke-linejoin='round' />
          <circle cx={px(n - 1)} cy={py(end)} r='4' fill={colour()} stroke={props.ground.bg} stroke-width='2' />
          <text x={px(n - 1) + 8} y={py(end) + 4} fill={props.ground.ink}>{c.label}</text>
        </>;
      }}</For>
      <For each={['Jan', 'Apr', 'Jul', 'Oct']}>{(m, k) =>
        <text x={px(k() * 3)} y={H - 6} text-anchor='middle' fill={props.ground.ink}>{m}</text>
      }</For>
    </svg>
  );
}

// ---- spreadsheet mock --------------------------------------------------------

/** a cell fill as the document stores it: theme slot (0-based) + tint */
interface Fill { theme: number, tint: number }
interface Cell { text: string, fill?: Fill, bold?: boolean, num?: boolean }

// TREB theme indices (see slotsOf): yellow is the fill button's default, theme 7
const YELLOW = 7, BLUE = 4, SLOT8 = 9;

// a small assumptions table: header band in accent 1 +0.5, inputs in pale
// yellow (+0.5), one cell flagged with full highlight yellow (tint 0), and a
// total row in slot 8 +0.5
const MODEL: Cell[][] = [
  [{ text: 'Assumption', bold: true, fill: { theme: BLUE, tint: 0.5 } }, { text: 'Low', bold: true, fill: { theme: BLUE, tint: 0.5 } }, { text: 'Likely', bold: true, fill: { theme: BLUE, tint: 0.5 } }, { text: 'High', bold: true, fill: { theme: BLUE, tint: 0.5 } }, { text: 'Mean', bold: true, fill: { theme: BLUE, tint: 0.5 } }],
  [{ text: 'Units sold' }, { text: '8,000', num: true, fill: { theme: YELLOW, tint: 0.5 } }, { text: '11,000', num: true, fill: { theme: YELLOW, tint: 0.5 } }, { text: '15,000', num: true, fill: { theme: YELLOW, tint: 0.5 } }, { text: '11,333', num: true }],
  [{ text: 'Unit price' }, { text: '42.00', num: true, fill: { theme: YELLOW, tint: 0.5 } }, { text: '48.00', num: true, fill: { theme: YELLOW, tint: 0 } }, { text: '51.00', num: true, fill: { theme: YELLOW, tint: 0.5 } }, { text: '47.00', num: true }],
  [{ text: 'Unit cost' }, { text: '21.50', num: true, fill: { theme: YELLOW, tint: 0.5 } }, { text: '24.00', num: true, fill: { theme: YELLOW, tint: 0.5 } }, { text: '29.00', num: true, fill: { theme: YELLOW, tint: 0.5 } }, { text: '24.83', num: true }],
  [{ text: 'Margin', bold: true, fill: { theme: SLOT8, tint: 0.5 } }, { text: '', fill: { theme: SLOT8, tint: 0.5 } }, { text: '', fill: { theme: SLOT8, tint: 0.5 } }, { text: '', fill: { theme: SLOT8, tint: 0.5 } }, { text: '251,252', num: true, bold: true, fill: { theme: SLOT8, tint: 0.5 } }],
];

function Sheet(props: { ground: Ground, slots: string[], lighten: Lighten }) {
  const fill = (f?: Fill) => f ? tinted(props.slots[f.theme], f.tint, props.lighten, props.ground.dark) : undefined;
  return (
    <div class={style.sheet}>
      <table style={{ color: props.ground.cellInk, '--sheet-grid': props.ground.grid }}>
        <tbody>
          <For each={MODEL}>{row =>
            <tr>
              <For each={row}>{cell =>
                <td class={cell.num ? style.num : undefined} style={{ background: fill(cell.fill), 'font-weight': cell.bold ? 600 : undefined }}>{cell.text}</td>
              }</For>
            </tr>
          }</For>
        </tbody>
      </table>

      {/* every accent as a fill with ordinary text, at the three tints people pick most */}
      <table class={style.fills} style={{ color: props.ground.cellInk, '--sheet-grid': props.ground.grid }}>
        <tbody>
          <For each={[0.5, 0.25, 0]}>{t =>
            <tr>
              <th>{t ? `+${t}` : '0'}</th>
              <For each={[4, 5, 6, 7, 8, 9]}>{slot =>
                <td style={{ background: tinted(props.slots[slot], t, props.lighten, props.ground.dark) }}>Text</td>
              }</For>
            </tr>
          }</For>
        </tbody>
      </table>
    </div>
  );
}

// ---- picker mock ---------------------------------------------------------------

function Picker(props: { ground: Ground, slots: string[], lighten: Lighten, chartTint: number }) {
  return (
    <div class={style.picker} style={{ background: props.ground.bg, color: props.ground.ink }}>
      <span class={style['ground-label']}>{props.ground.name}</span>
      <div class={style['picker-grid']}>
        <For each={TINTS}>{t => <>
          <span class={style['picker-tint']} data-chart={t === props.chartTint || undefined}>
            {t > 0 ? `+${t}` : t}
          </span>
          <For each={props.slots}>{(base, i) => {
            const c = () => tinted(base, t, props.lighten, props.ground.dark);
            return <span class={style['picker-cell']} data-chart={(t === props.chartTint && i() >= FIRST_ACCENT) || undefined}
                style={{ background: c() }} title={`${SLOT_ROLES[i()]} · tint ${t} · ${c()}`} />;
          }}</For>
        </>}</For>
      </div>
    </div>
  );
}

// ---- page ------------------------------------------------------------------

function Figure(props: { caption: string, children: JSX.Element }) {
  return <figure class={style.figure}><figcaption>{props.caption}</figcaption>{props.children}</figure>;
}

function Toggle<T extends string>(props: { label: string, value: T, options: [T, string][], onChange: (v: T) => void }) {
  return (
    <div class={style.toggle} role='group' aria-label={props.label}>
      <For each={props.options}>{([value, label]) =>
        <button type='button' aria-pressed={props.value === value} onClick={() => props.onChange(value)}>{label}</button>
      }</For>
    </div>
  );
}

const fmt = (n: number) => n.toFixed(1);

export default function ThemePalette() {

  const [key, setKey] = createSignal<PaletteKey>('rose');
  const [lighten, setLighten] = createSignal<Lighten>('treb');

  const palette = () => PALETTES[key()];

  /** chart series: the six accents at the palette's chart tint (inverted in dark mode) */
  const series = (ground: Ground) => palette().accents.map(a => tinted(a, palette().chartTint, lighten(), ground.dark));

  return (
    <div class={style.page}>
      <main class={style.main}>

        <header class={style.header}>
          <div>
            <h1>Theme palette, round two</h1>
            <p class={style.lede}>
              One set of theme colours for both the spreadsheet and charts. The base colours are
              light enough for cell fills and include a highlight yellow. Charts draw every series
              at one fixed tint, −0.25, which is the picker's first darker row.
              The first-round spec stays at <a href='/dev-test/palette'>/dev-test/palette</a>.
            </p>
          </div>
          <div class={style.controls}>
            <Toggle label='Palette' value={key()} onChange={setKey}
              options={[['rose', 'Rose'], ['slate', 'Slate'], ['previous', 'Previous'], ['office', 'TREB defaults']]} />
            <Toggle label='Lighten formula' value={lighten()} onChange={setLighten}
              options={[['treb', 'TREB lighten'], ['excel', 'Excel lighten']]} />
          </div>
        </header>

        <p class={style.blurb}><b>{palette().label}.</b> {palette().blurb}</p>

        <section>
          <h2>Colour picker</h2>
          <div class={style.grounds}>
            <For each={GROUNDS}>{ground =>
              <Picker ground={ground} slots={slotsOf(palette(), ground)} lighten={lighten()} chartTint={palette().chartTint} />
            }</For>
          </div>
          <p class={style.caption}>
            Columns follow TREB's theme index: grid fill, grid text, then slots 1–8. Rows are the
            five tints the picker offers. The outlined row is the one charts use. Dark mode
            inverts the tint, so its rows run the other way.
          </p>
        </section>

        <section>
          <h2>In the spreadsheet</h2>
          <div class={style.grounds}>
            <For each={GROUNDS}>{ground =>
              <div class={style.ground} style={{ background: ground.bg, color: ground.ink }}>
                <span class={style['ground-label']}>{ground.name}</span>
                <Sheet ground={ground} slots={slotsOf(palette(), ground)} lighten={lighten()} />
              </div>
            }</For>
          </div>
          <p class={style.caption}>
            Header band: accent 1 at +0.5. Inputs: yellow at +0.5. The flagged cell is yellow at
            tint 0, the fill button's default. Total row: accent 6 at +0.5.
          </p>
        </section>

        <section>
          <h2>In charts</h2>
          <div class={style.grounds}>
            <For each={GROUNDS}>{ground =>
              <div class={style.ground} style={{ background: ground.bg, color: ground.ink }}>
                <span class={style['ground-label']}>{ground.name}</span>
                <Figure caption='Simulated NPV, 5,000 trials · tails beyond P5/P95 in series 2'>
                  <Histogram ground={ground} series={series(ground)} />
                </Figure>
                <Figure caption='Cost by work package'>
                  <div class={style.legend}>
                    <For each={PACKAGES}>{(name, i) => <span><i style={{ background: series(ground)[i()] }} />{name}</span>}</For>
                  </div>
                  <Grouped ground={ground} series={series(ground)} />
                </Figure>
                <Figure caption='Cumulative cash ($M)'>
                  <Lines ground={ground} series={series(ground)} />
                </Figure>
              </div>
            }</For>
          </div>
        </section>

        <section>
          <h2>Checks</h2>
          <div class={style.table}>
            <table>
              <thead>
                <tr>
                  <th>Series</th><th>Base</th><th>Chart (light)</th><th>Chart (dark)</th>
                  <th>Black text on base</th><th>Chart on white</th><th>Chart on dark</th>
                </tr>
              </thead>
              <tbody>
                <For each={palette().accents}>{(base, i) => {
                  const light = () => series(GROUNDS[0])[i()], dark = () => series(GROUNDS[1])[i()];
                  const ratio = (v: number) => <td class={style.num} data-fail={v < 3 || undefined}>{fmt(v)}</td>;
                  return (
                    <tr>
                      <td>{i() + 1} · {palette().names[i()]}</td>
                      <td><i class={style.dot} style={{ background: base }} />{base}</td>
                      <td><i class={style.dot} style={{ background: light() }} />{light()}</td>
                      <td><i class={style.dot} style={{ background: dark() }} />{dark()}</td>
                      {ratio(contrast(base, '#000000'))}
                      {ratio(contrast(light(), GROUNDS[0].bg))}
                      {ratio(contrast(dark(), GROUNDS[1].bg))}
                    </tr>
                  );
                }}</For>
              </tbody>
            </table>
          </div>

          <div class={style.cvd}>
            <For each={CVD}>{([label, matrix]) => {
              const sim = () => series(GROUNDS[0]).map(c => simulate(c, matrix));
              const any = () => closest(sim(), false), adjacent = () => closest(sim(), true);
              return (
                <div class={style['cvd-row']}>
                  <span>{label}</span>
                  <For each={sim()}>{c => <span class={style.swatch} style={{ background: c }} />}</For>
                  <span class={style.delta}>
                    closest ΔE {fmt(any().d)} ({any().i + 1}/{any().j + 1}) · adjacent {fmt(adjacent().d)}
                  </span>
                </div>
              );
            }}</For>
          </div>
          <p class={style.caption}>
            Contrast ratios under 3:1 are marked. ΔE is OKLab distance ×100 between the light-mode chart colours,
            after simulating colour blindness (Machado et al. 2009, full severity). Numbers in brackets are series.
          </p>
        </section>

        <section class={style.notes}>
          <h2>Notes</h2>
          <p>
            <b>Yellow is the limit.</b> At −0.25 it only just clears the 3:1 contrast minimum
            for chart marks on white, so the base can't get any lighter without breaking the
            chart rule.
          </p>
          <p>
            <b>TREB lightens differently from Excel.</b> TREB uses <code>l × (1 + t)</code>,
            Excel uses <code>l × (1 − t) + t</code>. Darker tints match, lighter ones don't, so a
            light fill changes colour when exported to Excel. With TREB's formula, any base above
            HSL lightness ≈ 0.67 turns white at +0.5; that's why violet sits at 0.66. Switch the
            toggle to see Excel's version.
          </p>
          <p>
            <b>Previous proposal, blue and violet.</b> The first-round check only compared adjacent
            series. Blue and violet (series 1 and 3) are close to identical under deuteranopia. The
            candidates fix this by separating them in lightness.
          </p>
        </section>

      </main>
    </div>
  );
}
