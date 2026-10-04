import { For, Show, createSignal, type JSX } from 'solid-js';
import style from './palette.module.css';

// Dev-only reference page for the proposed TREB theme palette -- the spec that
// src/style/proposed-theme-palette.css implements. Shows the ten theme slots
// (proposed vs. the Office 2013 defaults TREB ships), the same sample charts on
// the app's light and dark surfaces, and a colour-vision simulation of the six
// series. Strings are plain English (dev-test convention).
//
// Colour literals live here in TS, not in CSS: they're the *subject* of the page
// (two palettes and the two surfaces they're tested against), not theme colours,
// so they stay out of app.css. Everything else reads app.css tokens.

type Mode = 'proposed' | 'office';

const SLOTS: { role: string, name?: string, office: string, proposed: string }[] = [
  { role: 'Light background', office: '#E7E6E6', proposed: '#E8EBEF' },
  { role: 'Dark text',        office: '#44546A', proposed: '#2B3440' },
  { role: 'Accent 1',         office: '#4472C4', proposed: '#0477BE', name: 'Logo blue' },
  { role: 'Accent 2',         office: '#ED7D31', proposed: '#C9622A', name: 'Burnt orange' },
  { role: 'Accent 3',         office: '#A5A5A5', proposed: '#8566B8', name: 'Violet' },
  { role: 'Accent 4',         office: '#FFC000', proposed: '#2A7F5A', name: 'Green' },
  { role: 'Accent 5',         office: '#5B9BD5', proposed: '#B88B0C', name: 'Ochre' },
  { role: 'Accent 6',         office: '#70AD47', proposed: '#C2417A', name: 'Raspberry' },
  { role: 'Hyperlink',        office: '#0563C1', proposed: '#0477BE' },
  { role: 'Followed link',    office: '#954F72', proposed: '#8566B8' },
];

/** the two app surfaces the series must work on (app.css --surface, light/dark) */
interface Ground { name: string, bg: string, ink: string, grid: string }
const GROUNDS: Ground[] = [
  { name: 'App · light', bg: '#ffffff', ink: '#3d424a', grid: '#e6e8ec' },
  { name: 'App · dark',  bg: '#26282c', ink: '#ccd1d8', grid: '#3a3d43' },
];

// ---- charts -----------------------------------------------------------------

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

// the walkthrough model's NPV histogram: percent of 5,000 trials per 200k bin from 400k
const HIST = [0.04, 0.44, 3.16, 8.12, 15.74, 18.70, 17.78, 13.86, 9.08, 5.96, 3.34, 1.74, 1.04, 0.56];

function Histogram(props: { ground: Ground, series: string[] }) {
  const H = 210, L = 44, R = 8, T = 10, B = 34, max = 20;
  const pw = W - L - R, ph = H - T - B, bw = pw / HIST.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role='img' aria-label='Histogram of simulated NPV, 5,000 trials'>
      <GridLines ground={props.ground} ticks={[0, 5, 10, 15, 20]} max={max} left={L} right={W - R} top={T} height={ph} format={v => `${v}%`} />
      <For each={HIST}>{(v, i) => {
        const h = v / max * ph;
        // bins wholly below P5 (~1.03M) or above P95 (~2.50M)
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

// ---- colour-vision simulation ----------------------------------------------
// Machado, Oliveira & Fernandes (2009), severity 1.0, applied in linear RGB

const CVD: [string, number[][]][] = [
  ['Protanopia',   [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]]],
  ['Deuteranopia', [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]]],
  ['Tritanopia',   [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]]],
];

const toLinear = (c: number) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const toSrgb = (c: number) => {
  c = Math.min(1, Math.max(0, c));
  return Math.round((c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055) * 255);
};

function simulate(hex: string, m: number[][]) {
  const n = parseInt(hex.slice(1), 16);
  const rgb = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(toLinear);
  return `rgb(${m.map(row => toSrgb(row[0] * rgb[0] + row[1] * rgb[1] + row[2] * rgb[2])).join(',')})`;
}

// ---- page ------------------------------------------------------------------

function Figure(props: { caption: string, children: JSX.Element }) {
  return <figure class={style.figure}><figcaption>{props.caption}</figcaption>{props.children}</figure>;
}

export default function PaletteSpec() {

  const [mode, setMode] = createSignal<Mode>('proposed');
  const other = (): Mode => mode() === 'proposed' ? 'office' : 'proposed';
  const series = () => SLOTS.slice(2, 8).map(s => s[mode()]);

  return (
    <div class={style.page}>
      <main class={style.main}>

        <header class={style.header}>
          <div>
            <h1>Proposed chart palette</h1>
            <p class={style.lede}>
              Replacement for TREB's theme colours (the Office 2013 defaults). Slots 3–8 become
              chart series 1–6, and series 1 is the logo blue. Implemented, unimported,
              in <code>src/style/proposed-theme-palette.css</code>.
            </p>
          </div>
          <div class={style.toggle} role='group' aria-label='Palette'>
            <button type='button' aria-pressed={mode() === 'proposed'} onClick={() => setMode('proposed')}>Proposed</button>
            <button type='button' aria-pressed={mode() === 'office'} onClick={() => setMode('office')}>Office today</button>
          </div>
        </header>

        <section>
          <h2>Theme slots</h2>
          <div class={style.slots}>
            <For each={SLOTS}>{(slot, i) =>
              <div class={style.slot}>
                <div class={style.chip}>
                  <span style={{ background: slot[mode()] }} />
                  <span style={{ background: slot[other()] }} title={other() === 'office' ? 'Office today' : 'Proposed'} />
                </div>
                <div class={style.meta}>
                  <span class={style.num}>
                    Slot {i() + 1}
                    <Show when={i() >= 2 && i() <= 7}> <span class={style.tag}>series {i() - 1}</span></Show>
                  </span>
                  <span class={style.role}>{mode() === 'proposed' && slot.name ? slot.name : slot.role}</span>
                  <span class={style.hex}>
                    <b>{slot[mode()]}</b> · {mode() === 'proposed' ? 'was' : 'proposed'} {slot[other()]}
                  </span>
                </div>
              </div>
            }</For>
          </div>
        </section>

        <section>
          <h2>In charts</h2>
          <div class={style.grounds}>
            <For each={GROUNDS}>{ground =>
              <div class={style.ground} style={{ background: ground.bg, color: ground.ink }}>
                <span class={style['ground-label']}>{ground.name}</span>
                <Figure caption='Simulated NPV, 5,000 trials · tails beyond P5/P95 in series 2'>
                  <Histogram ground={ground} series={series()} />
                </Figure>
                <Figure caption='Cost by work package'>
                  <div class={style.legend}>
                    <For each={PACKAGES}>{(name, i) => <span><i style={{ background: series()[i()] }} />{name}</span>}</For>
                  </div>
                  <Grouped ground={ground} series={series()} />
                </Figure>
                <Figure caption='Cumulative cash ($M)'>
                  <Lines ground={ground} series={series()} />
                </Figure>
              </div>
            }</For>
          </div>
        </section>

        <section>
          <h2>Colour-vision simulation, series 1–6</h2>
          <div class={style.cvd}>
            <div class={style['cvd-row']}>
              <span>Normal vision</span>
              <For each={series()}>{c => <span class={style.swatch} style={{ background: c }} />}</For>
            </div>
            <For each={CVD}>{([label, matrix]) =>
              <div class={style['cvd-row']}>
                <span>{label}</span>
                <For each={series()}>{c => <span class={style.swatch} style={{ background: simulate(c, matrix) }} />}</For>
              </div>
            }</For>
          </div>
        </section>

        <section class={style.notes}>
          <p>
            The proposed series pass every check of the dataviz palette validator on both app
            surfaces (<code>#ffffff</code> and <code>#26282c</code>): adjacent series stay at
            least ΔE 13.7 apart under simulated colour blindness, each colour has at least 3:1
            contrast against both backgrounds, and none is grey enough to read as neutral.
            Order matters: the separation check is on adjacent series.
          </p>
          <p>
            TREB's dark theme only overrides slots 1 and 2, so the six series colours are shared
            by both modes.
          </p>
        </section>

      </main>
    </div>
  );
}
