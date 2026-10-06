import { For } from 'solid-js';
import { activeTrial, font_trials, quoted, setFontTrial, type FontTrial } from './font-trials';
import style from './font-specimens.module.css';

// /dev-test/fonts (routes/dev-test/fonts.tsx loads it). Typeface trials side
// by side: each candidate's chrome, grid and mono faces on the same samples,
// plus a button that switches the whole app to it (as the floating switcher
// does). The grid sample is DOM, not
// TREB's canvas -- for the real thing, switch and open a document.

const GRID_ROWS: [string, string, string][] = [
  ['Revenue', '1,284,330.00', '12.5%'],
  ['Cost of sales', '−611,872.45', '−4.1%'],
  ['Ærøskøbing', '0.0012', '1.0%'],
  ['Łódź, Kraków', '98,765.43', '0.0%'],
  ['Göteborg', '10.00', '11.1%'],
];

// the round-vs-straight 6 and 9 (and 0/8) that blur together in long columns:
// in the grid face, once large and once at the grid's 14px
const DIGITS = '6,869.96 3,580.69 9,606.38 8,086.90';

function Specimen(props: { trial: FontTrial }) {
  const family = (name: string) => `${quoted(name)}, sans-serif`;
  return (
    <section classList={{ [style.card]: true, [style.active]: activeTrial() === props.trial.id }}>
      <header>
        <div>
          <h2 style={{ 'font-family': family(props.trial.chrome) }}>{props.trial.label}</h2>
          <p>{props.trial.note}</p>
        </div>
        <button type='button' class='control-button' disabled={activeTrial() === props.trial.id}
            onClick={() => setFontTrial(props.trial.id)}>
          {activeTrial() === props.trial.id ? 'In use' : 'Use in app'}
        </button>
      </header>

      <div class={style.chrome} style={{ 'font-family': family(props.trial.chrome) }}>
        <div class={style.menus}>
          <span>File</span><span>Monte Carlo</span><span>Tools</span><span>Help</span>
          <span class={style.semibold}>Run simulation</span>
        </div>
        <p class={style.prose}>
          Run 10,000 trials of the model and summarise each output: mean, standard deviation and
          the 5th and 95th percentiles. <i>Results update as the simulation runs.</i>
        </p>
        <p class={style.glyphs}>Il1| O0o rn m — 0123456789 · «Ça va ?» · „Zażółć”</p>
      </div>

      <div class={style.digits} style={{ 'font-family': family(props.trial.grid) }}>
        <span class={style.large}>{DIGITS}</span>
        <span>{DIGITS}</span>
      </div>

      <table class={style.grid} style={{ 'font-family': family(props.trial.grid) }}>
        <tbody>
          <For each={GRID_ROWS}>{row =>
            <tr><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td></tr>
          }</For>
          <tr class={style.total}><td>Total</td><td>672,567.43</td><td>8.2%</td></tr>
          <tr class={style.note}><td>Forecast</td><td>701,000.00</td><td>4.2%</td></tr>
        </tbody>
      </table>

      <pre class={style.mono} style={{ 'font-family': `${quoted(props.trial.mono)}, monospace` }}>
        <code>=NORM.INV(RAND(), B4, B5) <b>// 0O 1lI</b>{'\n'}<i>sheet.SetRange('A1:C10', values);</i></code>
      </pre>
    </section>
  );
}

export default function FontSpecimens() {
  return (
    <div class={style.page}>
      <main class={style.main}>
        <div>
          <h1>Typeface trials</h1>
          <p>
            Chrome (13px, with a prose line at 14px), grid (14px, TREB's default size; regular,
            bold and italic) and mono for each candidate. <b>Use in app</b> switches the whole app
            and persists across reloads; the floating switcher at the bottom of each page does the
            same, and appears whenever a trial is on or the URL has <code>?fonts</code>.
          </p>
        </div>
        <div class={style.cards}>
          <For each={font_trials}>{trial => <Specimen trial={trial} />}</For>
        </div>
      </main>
    </div>
  );
}
