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

// licensed faces kept out of git (MB Type: Concourse + Triplicate). the glob is
// empty in a checkout without them, and their trials then aren't listed. it
// takes the stylesheet's url and links it by hand: a globbed css import is
// counted but never injected here
const mbtype_css = Object.values(import.meta.glob<string>('../../style/font-candidates/mbtype/*.css',
  { eager: true, query: '?url', import: 'default' }));
const has_mbtype = mbtype_css.length > 0;
if (typeof document !== 'undefined') {
  for (const href of mbtype_css) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.append(link);
  }
}

/*
 * typeface trials (dev only). switches the chrome, mono and grid faces app-wide
 * at runtime, so candidates can be compared in the real app rather than in a
 * mock. the faces are declared in style/font-trials.css; this module owns the
 * family names and sets the tokens.
 *
 * a trial overrides --interface-font and --mono-font-family inline on <html>
 * (beating app.css's :root), which TREB's own interface follows too
 * (--treb-default-font, style/treb-fonts.css), and points the cells at its
 * grid family through --trial-grid-font. TREB reads its fonts once per
 * UpdateTheme(), and a canvas never loads a face by itself, so the faces are
 * loaded first and the sheet repainted after.
 *
 * the grid face can be picked apart from the chrome (activeGridTrial: a trial
 * id, or SAME_AS_UI to use the UI trial's own grid face). both choices persist
 * in localStorage, so they follow reloads and navigation.
 * imported only behind import.meta.env.DEV (app.tsx) and from /dev-test/fonts.
 */

export interface FontTrial {
  /** '' is the base: whatever app.css and the imported grid CSS say */
  id: string;
  label: string;
  note: string;
  /** a family name, or a whole stack (anything with a comma) used as is */
  chrome: string;
  mono: string;
  grid: string;
}

// the fallbacks app.css puts after each face
const SANS_FALLBACK = `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
const MONO_FALLBACK = `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;

// TREB's own .treb-font-stack-default (treb-bundle.css), what the grid draws
// with when no grid CSS is imported; TREB quotes "sans-serif", which makes it
// a family name rather than the generic, so it's unquoted here
const TREB_DEFAULT_STACK = `calibri, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif`;

export const font_trials: FontTrial[] = [
  { id: '', label: 'Fira (imported)', note: 'The faces app.css and spreadsheet.tsx import today: Mozilla\'s Fira Sans with Fira Mono.',
    chrome: 'Fira Sans', mono: 'Fira Mono', grid: 'RAW-Default' },
  { id: 'inter', label: 'Inter', note: 'riskamp.com\'s face (rsms\'s build, ss04 in the grid), with Fira Mono.',
    chrome: 'Trial Inter', mono: 'Fira Mono', grid: 'Trial Inter Grid' },
  { id: 'figtree', label: 'Figtree', note: 'Erik Kennedy\'s geometric Figtree, with Fira Mono (it has no mono of its own).',
    chrome: 'Trial Figtree', mono: 'Fira Mono', grid: 'Trial Figtree Grid' },
  { id: 'system', label: 'System defaults', note: 'No web font: the system stack app.css falls back to for the chrome and mono, and TREB\'s own default stack (Calibri first) for the grid.',
    chrome: SANS_FALLBACK, mono: MONO_FALLBACK, grid: TREB_DEFAULT_STACK },
  ...(has_mbtype ? [
    { id: 'concourse-3', label: 'Concourse 3', note: 'Matthew Butterick\'s Concourse at its light text weight, Concourse Tab in the grid, Triplicate Code for mono. Licensed; local files only.',
      chrome: 'Trial Concourse 3', mono: 'Trial Triplicate 3', grid: 'Trial Concourse 3 Grid' },
    { id: 'concourse-4', label: 'Concourse 4', note: 'Concourse one step heavier (regular weight), with Concourse Tab and Triplicate Code to match. Licensed; local files only.',
      chrome: 'Trial Concourse 4', mono: 'Trial Triplicate 4', grid: 'Trial Concourse 4 Grid' },
  ] : []),
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

const STORAGE_KEY = 'dev-font-trial';
const GRID_STORAGE_KEY = 'dev-font-trial-grid';

/** the grid choice that follows the UI trial (each trial's own grid face) */
export const SAME_AS_UI = 'same';

const [activeTrial, setActiveTrial] = createSignal('');
const [activeGridTrial, setActiveGridTrial] = createSignal(SAME_AS_UI);
export { activeTrial, activeGridTrial };

/** a family name, quoted for a font shorthand or a font-family value; a stack
 *  (FontTrial's fields can be one) passes through as is */
export const quoted = (family: string) => family.includes(',') ? family : `'${family}'`;

function readStorage(key: string): string|null {
  try {
    return localStorage.getItem(key);
  }
  catch {
    return null;
  }
}

/** undefined removes the key; '' (the base trial's id) is a value */
function writeStorage(key: string, value: string|undefined) {
  try {
    if (value !== undefined) {
      localStorage.setItem(key, value);
    }
    else {
      localStorage.removeItem(key);
    }
  }
  catch { /* private window etc.: the trial just won't persist */ }
}

/** a face with app.css's fallbacks after it; a stack is already complete */
const withFallback = (family: string, fallback: string) =>
  family.includes(',') ? family : `${quoted(family)}, ${fallback}`;

const findTrial = (id: string) => font_trials.find(entry => entry.id === id) || font_trials[0];

/** restore the stored choices; true if there were any */
export function restoreFontTrial(): boolean {
  const ui = readStorage(STORAGE_KEY);
  const grid = readStorage(GRID_STORAGE_KEY);
  if (!ui && grid === null) {
    return false;
  }
  setActiveTrial(findTrial(ui || '').id);
  setActiveGridTrial(grid === null || (grid !== SAME_AS_UI && !font_trials.some(entry => entry.id === grid)) ? SAME_AS_UI : grid);
  void applyFontTrial();
  return true;
}

/** switch the chrome and mono faces; the grid keeps its own choice */
export function setFontTrial(id: string) {
  setActiveTrial(findTrial(id).id);
  writeStorage(STORAGE_KEY, activeTrial() || undefined);
  return applyFontTrial();
}

/** switch the grid face alone: a trial id, or SAME_AS_UI to follow the UI */
export function setGridTrial(id: string) {
  setActiveGridTrial(id === SAME_AS_UI ? SAME_AS_UI : findTrial(id).id);
  writeStorage(GRID_STORAGE_KEY, activeGridTrial() === SAME_AS_UI ? undefined : activeGridTrial());
  return applyFontTrial();
}

/** switch everything to one trial (the "Use in app" button on /dev-test/fonts) */
export async function useFontTrial(id: string) {
  setActiveGridTrial(SAME_AS_UI);
  writeStorage(GRID_STORAGE_KEY, undefined);
  return setFontTrial(id);
}

/** the trial whose grid face the sheet draws with now */
export const gridTrial = () => findTrial(activeGridTrial() === SAME_AS_UI ? activeTrial() : activeGridTrial());

async function applyFontTrial() {

  const ui = findTrial(activeTrial());
  const grid = gridTrial();
  const root = document.documentElement;

  if (ui.id || grid.id) {
    root.dataset.fontTrial = `${ui.id || 'base'}/${grid.id || 'base'}`;
    root.style.setProperty('--interface-font', withFallback(ui.chrome, SANS_FALLBACK));
    root.style.setProperty('--mono-font-family', withFallback(ui.mono, MONO_FALLBACK));
    root.style.setProperty('--trial-grid-font', quoted(grid.grid));
  }
  else {
    delete root.dataset.fontTrial;
    for (const property of ['--interface-font', '--mono-font-family', '--trial-grid-font']) {
      root.style.removeProperty(property);
    }
  }

  // the four faces TREB asks for in the cells (cf. spreadsheet.tsx), and the
  // interface face its canvas headers use (--treb-default-font, treb-fonts.css)
  await Promise.all([
    ...['400', '700', 'italic 400', 'italic 700'].map(face => document.fonts.load(`${face} 20px ${quoted(grid.grid)}`)),
    document.fonts.load(`400 20px ${quoted(ui.chrome)}`),
  ]);

  const sheet = await waitForSheet();
  if (sheet && gridTrial() === grid && findTrial(activeTrial()) === ui) {
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
