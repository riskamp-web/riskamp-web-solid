import { createSignal } from 'solid-js';
import type { SpreadsheetType } from '~/lib/spreadsheet-type';

import '~/style/font-trials.css';
// the base entry's grid face, RAW-Default -- declared by whichever grid CSS
// spreadsheet.tsx imports (keep these in step), so /dev-test/fonts has it too
import '~/style/fira-grid.css';
import '~/style/geist-sans.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/400-italic.css';
import '@fontsource/ibm-plex-mono/600.css';

/*
 * typeface trials (dev only). switches the chrome, mono and grid faces app-wide
 * at runtime, so candidates can be compared in the real app rather than in a
 * mock. the faces are declared in style/font-trials.css; this module owns the
 * family names and sets the tokens.
 *
 * a trial overrides --interface-font and --mono-font-family inline on <html>
 * (beating app.css's :root), and points TREB's default stack at its grid family
 * through --trial-grid-font. TREB reads its fonts once per UpdateTheme(), and
 * a canvas never loads a face by itself, so the grid faces are loaded first and
 * the sheet repainted after.
 *
 * the choice persists in localStorage, so it follows reloads and navigation.
 * imported only behind import.meta.env.DEV (app.tsx) and from /dev-test/fonts.
 */

export interface FontTrial {
  /** '' is the base: whatever app.css and the imported grid CSS say */
  id: string;
  label: string;
  note: string;
  chrome: string;
  mono: string;
  grid: string;
}

export const font_trials: FontTrial[] = [
  { id: '', label: 'Fira (imported)', note: 'The faces app.css and spreadsheet.tsx import today: Mozilla\'s Fira Sans with Fira Mono.',
    chrome: 'Fira Sans', mono: 'Fira Mono', grid: 'RAW-Default' },
  { id: 'geist', label: 'Geist', note: 'Vercel\'s Geist with Geist Mono.',
    chrome: 'Geist', mono: 'Geist Mono', grid: 'Trial Geist Grid' },
  { id: 'plex', label: 'IBM Plex', note: 'The previous face: Plex Sans (Text for regular) with Plex Mono.',
    chrome: 'Trial Plex', mono: 'IBM Plex Mono', grid: 'Trial Plex Grid' },
  { id: 'atkinson', label: 'Atkinson Hyperlegible', note: 'Atkinson Hyperlegible Next with Atkinson Hyperlegible Mono. Built so similar glyphs can\'t be confused.',
    chrome: 'Trial Atkinson', mono: 'Trial Atkinson Mono', grid: 'Trial Atkinson Grid' },
  { id: 'mona', label: 'Mona Sans', note: 'GitHub\'s Mona Sans with Monaspace Neon, its matched mono.',
    chrome: 'Trial Mona Sans', mono: 'Trial Mona Sans Mono', grid: 'Trial Mona Sans Grid' },
  { id: 'recursive', label: 'Recursive', note: 'Recursive Sans Linear with Recursive Mono: one design, so the pair matches by construction.',
    chrome: 'Trial Recursive', mono: 'Trial Recursive Mono', grid: 'Trial Recursive Grid' },
  { id: 'recursive-casual', label: 'Recursive (casual chrome)', note: 'Recursive with the casual axis on in the chrome only; the grid and mono stay linear.',
    chrome: 'Trial Recursive Casual', mono: 'Trial Recursive Mono', grid: 'Trial Recursive Grid' },
];

// the fallbacks app.css puts after each face
const SANS_FALLBACK = `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
const MONO_FALLBACK = `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;

const STORAGE_KEY = 'dev-font-trial';

const [activeTrial, setActiveTrial] = createSignal('');
export { activeTrial };

/** a family name, quoted for a font shorthand or a font-family value */
export const quoted = (family: string) => `'${family}'`;

export function storedFontTrial(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || '';
  }
  catch {
    return '';
  }
}

export async function setFontTrial(id: string) {

  const trial = font_trials.find(entry => entry.id === id) || font_trials[0];
  setActiveTrial(trial.id);

  try {
    if (trial.id) {
      localStorage.setItem(STORAGE_KEY, trial.id);
    }
    else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  catch { /* private window etc.: the trial just won't persist */ }

  const root = document.documentElement;
  if (trial.id) {
    root.dataset.fontTrial = trial.id;
    root.style.setProperty('--interface-font', `${quoted(trial.chrome)}, ${SANS_FALLBACK}`);
    root.style.setProperty('--mono-font-family', `${quoted(trial.mono)}, ${MONO_FALLBACK}`);
    root.style.setProperty('--trial-grid-font', quoted(trial.grid));
    root.style.setProperty('--treb-default-font', quoted(trial.grid));
  }
  else {
    delete root.dataset.fontTrial;
    for (const property of ['--interface-font', '--mono-font-family', '--trial-grid-font', '--treb-default-font']) {
      root.style.removeProperty(property);
    }
  }

  // the four faces TREB asks for (cf. spreadsheet.tsx)
  await Promise.all(['400', '700', 'italic 400', 'italic 700'].map(face =>
    document.fonts.load(`${face} 20px ${quoted(trial.grid)}`)));

  const sheet = await waitForSheet();
  if (sheet && activeTrial() === trial.id) {
    sheet.UpdateTheme();
  }

}

/**
 * the sheet, once there is one. spreadsheet.tsx publishes it on `self.sheet`
 * (a dev affordance); on a first load the trial can be applied before the
 * sheet exists, so wait a little for it. backstage pages have none.
 */
async function waitForSheet(timeout = 15000): Promise<SpreadsheetType|undefined> {
  const started = Date.now();
  for (;;) {
    const sheet = (self as Window & typeof globalThis & { sheet?: SpreadsheetType }).sheet;
    if (sheet) {
      await sheet.ready;
      return sheet;
    }
    if (Date.now() - started > timeout) {
      return undefined;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}
