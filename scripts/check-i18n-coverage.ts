/**
 * check-i18n-coverage.ts
 * ----------------------
 * Validates every translation catalogue in `src/i18n/lang/` against the
 * canonical English one, `en.ts`.
 *
 * WHY THIS EXISTS
 *   The i18n type system is derived from `export type I18N = typeof en`, and a
 *   catalogue is written `satisfies DeepPartial<I18N>`. That catches a key a
 *   translation *invents* — but `DeepPartial` makes every level optional, so it
 *   is blind to the failures that actually accumulate as strings are added and
 *   edited:
 *
 *     - a MISSING key. Perfectly valid TypeScript; the loader falls back to
 *       English, so the ui shows a half-translated screen and nothing complains.
 *     - a placeholder dropped or renamed while translating (`{count}` ->
 *       `{total}`, or nothing at all). `format()` renders an unmatched name as
 *       the literal `{count}`, so the mistake reaches the ui.
 *     - a nested EXTRA key. `satisfies` compares the object's shape, and a
 *       typo'd path inside an otherwise-valid nested object still satisfies it:
 *       the key is never read and the english string shows through.
 *
 *   It also checks registration: a catalogue sitting in `src/i18n/lang/` but
 *   absent from the `languages` array in `i18n.ts` is unreachable from the
 *   picker *and* from browser auto-detection, while a `languages` entry with no
 *   file falls back to English at load with only a console 404.
 *
 * WHAT IT CHECKS
 *   Per locale:
 *     1. coverage      every key in en.ts exists in the locale
 *     2. extras        the locale has no key en.ts does not
 *     3. empty         no leaf value is an empty string
 *     4. placeholders  the {…} names match the english value exactly
 *   Once, across the catalogue set:
 *     5. registration  every catalogue is in `languages`, and every
 *                      `languages` code has a catalogue
 *
 *   A missing key is allowed *by design* — the loader falls back to english —
 *   but a complete catalogue is the house standard (es and fr are both full
 *   mirrors), so this treats any gap as a failure. Pass locale codes to check a
 *   subset while a translation is still in progress.
 *
 * RUN
 *   npm run check:i18n-coverage                  # all locales, non-zero on failure (CI-ready)
 *   tsx scripts/check-i18n-coverage.ts de pt     # only these
 */

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

type StringTree = { [key: string]: string | StringTree };

const HERE = dirname(fileURLToPath(import.meta.url));
const LANG_DIR = join(HERE, '..', 'src', 'i18n', 'lang');
const I18N_FILE = join(HERE, '..', 'src', 'i18n', 'i18n.ts');
const CANONICAL = 'en';

/** flatten a catalogue to dotted-path -> value. */
function flatten(node: StringTree, prefix = '', out = new Map<string, string>()): Map<string, string> {
  for (const [key, value] of Object.entries(node)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') out.set(path, value);
    else flatten(value, path, out);
  }
  return out;
}

/** the {name} tokens a value uses. */
function placeholders(value: string): Set<string> {
  return new Set([...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1]));
}

/** every catalogue file, by code, excluding the canonical one. */
function catalogueCodes(): string[] {
  return readdirSync(LANG_DIR)
    .filter((file) => file.endsWith('.ts'))
    .map((file) => file.slice(0, -'.ts'.length))
    .filter((code) => code !== CANONICAL)
    .sort();
}

/**
 * the codes in the `languages` array of i18n.ts. Block comments are stripped
 * first: the not-yet-translated locales are listed there as commented-out
 * entries, and those must not count as registered.
 */
function registeredCodes(): string[] {
  const source = readFileSync(I18N_FILE, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const codes = [...source.matchAll(/\{\s*code:\s*'([a-z]{2})'/g)].map((match) => match[1]);
  return [...new Set(codes)];
}

/** import a catalogue by path — `tsx` transpiles the .ts on the fly. */
async function loadTree(code: string): Promise<StringTree> {
  const url = pathToFileURL(join(LANG_DIR, `${code}.ts`)).href;
  return ((await import(url)) as { default: StringTree }).default;
}

/** one line, capped, so a very broken catalogue doesn't bury the rest. */
function preview(items: string[], limit = 25): string {
  const head = items.slice(0, limit).join(', ');
  return items.length > limit ? `${head}, … (+${items.length - limit} more)` : head;
}

// ---- main -----------------------------------------------------------------

const requested = process.argv.slice(2).filter((arg) => !arg.startsWith('-'));
const catalogues = catalogueCodes();
const locales = requested.length ? requested : catalogues;

const en = flatten(await loadTree(CANONICAL));
console.log(`canonical src/i18n/lang/en.ts: ${en.size} strings`);
console.log(`checking ${locales.length} locale(s): ${locales.join(', ')}\n`);

const failures: string[] = [];

for (const locale of locales) {

  if (locale === CANONICAL) {
    failures.push(locale);
    console.error(`✗ ${CANONICAL}: the canonical catalogue cannot be checked against itself`);
    continue;
  }

  if (!catalogues.includes(locale)) {
    failures.push(locale);
    console.error(`✗ ${locale}: src/i18n/lang/${locale}.ts not found`);
    continue;
  }

  const tree = flatten(await loadTree(locale));

  const missing = [...en.keys()].filter((key) => !tree.has(key));
  const extra = [...tree.keys()].filter((key) => !en.has(key));
  const empty = [...tree].filter(([, value]) => value === '').map(([key]) => key);

  const mismatched: string[] = [];
  for (const [key, value] of tree) {
    const source = en.get(key);
    if (source === undefined) continue;
    const want = placeholders(source);
    const have = placeholders(value);
    const lost = [...want].filter((name) => !have.has(name));
    const gained = [...have].filter((name) => !want.has(name));
    if (lost.length || gained.length) {
      const show = (set: Set<string>) => `{${[...set].join('} {')}}`;
      mismatched.push(`${key}: en ${show(want)} vs ${locale} ${show(have)}`);
    }
  }

  const problems = missing.length + extra.length + empty.length + mismatched.length;
  if (problems === 0) {
    console.log(`✓ ${locale}: ${tree.size}/${en.size} strings, placeholders OK`);
    continue;
  }

  failures.push(locale);
  console.error(`✗ ${locale}: ${tree.size}/${en.size} strings, ${problems} problem(s)`);
  if (missing.length) console.error(`    ${missing.length} missing: ${preview(missing)}`);
  if (extra.length) console.error(`    ${extra.length} extra: ${preview(extra)}`);
  if (empty.length) console.error(`    ${empty.length} empty: ${preview(empty)}`);
  for (const line of mismatched) console.error(`    placeholder: ${line}`);
}

const registered = registeredCodes();
const unregistered = catalogues.filter((code) => !registered.includes(code));
const fileless = registered.filter((code) => code !== CANONICAL && !catalogues.includes(code));

if (unregistered.length || fileless.length) {
  failures.push('registration');
  if (unregistered.length) {
    console.error(`✗ registration: catalogue(s) missing from the languages array: ${unregistered.join(', ')}`);
  }
  if (fileless.length) {
    console.error(`✗ registration: languages array code(s) with no catalogue: ${fileless.join(', ')}`);
  }
}
else {
  console.log(`✓ registration: ${registered.length} language(s) listed, every catalogue present`);
}

if (failures.length) {
  console.error(`\n✗ ${failures.length} check(s) failed.`);
  process.exit(1);
}

console.log(`\n✓ all ${locales.length} locale(s) complete.`);
process.exit(0);
