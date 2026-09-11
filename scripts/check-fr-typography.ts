/**
 * check-fr-typography.ts
 * ----------------------
 * Lints (and optionally fixes) French typographic spacing in the French
 * translation catalogue, `src/i18n/lang/fr.ts`.
 *
 * WHY THIS EXISTS
 *   French requires a NO-BREAK space before `: ; ! ?` and inside guillemets
 *   `« … »`, so the punctuation never wraps to the start of a line and reads
 *   correctly. The catalogue used to carry ordinary spaces (U+0020) in those
 *   positions — present, but breakable and the wrong character. Nothing enforced
 *   the rule, so new strings drift back to plain spaces. This script is the
 *   enforcement.
 *
 * THE CONVENTION (strict Imprimerie nationale)
 *     before `:`                 ->  U+00A0  NO-BREAK SPACE (full width)
 *     before `;` `!` `?`         ->  U+202F  NARROW NO-BREAK SPACE
 *     after `«` and before `»`   ->  U+202F  NARROW NO-BREAK SPACE
 *
 * HOW IT WORKS — and why it's safe
 *   Operates on the raw file text, line by line (no module import: sidesteps the
 *   `~/` alias, the `\n`-escape mismatch, and the Solid runtime that `i18n.ts`
 *   pulls in). It manages only the space that sits *before* one of these marks
 *   (or *inside* guillemets), never the mark itself or anything after it.
 *
 *   INVARIANT it relies on: the script only ever *normalises a space that already
 *   exists* before the mark (or inside guillemets) — it never inserts one into a
 *   glued position. That is what keeps it safe against code: a value colon has a
 *   space before it (`'Remarque : …'`), a key-separator colon does not (`title:`,
 *   `'report-body':`, `about: {`); a French `;`/`!`/`?` has a space before it,
 *   while a TypeScript `;` (statement terminator), `!` (non-null assertion) or
 *   `?` (optional chaining / ternary) is glued. Acting only on the
 *   space-preceded case therefore targets French text exclusively and never
 *   touches the surrounding TypeScript. The cost is that a *genuinely* glued
 *   French mark (a translator forgetting the space entirely) is not caught — an
 *   acceptable trade for zero false positives on code.
 *
 * MODES
 *   (default) / --check   Report every offending position and exit non-zero if
 *                         any are found. This is the lint / CI entry point.
 *   --fix                 Rewrite the file in place, then re-check. Prints the
 *                         number of corrections.
 *
 * RUN
 *   npm run check:i18n-fr            # check
 *   npm run check:i18n-fr -- --fix      # fix in place
 *   tsx scripts/check-fr-typography.ts [--fix] [path/to/file.ts]
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DEFAULT_TARGET = join(HERE, '..', 'src', 'i18n', 'lang', 'fr.ts');

const NBSP = '\u00A0'; // NO-BREAK SPACE (full) — before ':'
const NNBSP = '\u202F'; // NARROW NO-BREAK SPACE — before ';' '!' '?' and inside « »

/** True for any space-type character this script manages. */
const isSpace = (c: string): boolean => c === ' ' || c === NBSP || c === NNBSP;

/** The no-break space required before a given mark. */
const spaceFor = (mark: string): string => (mark === ':' ? NBSP : NNBSP);

/** Human-readable code point, e.g. "U+0020", for reporting invisible chars. */
const codePoint = (c: string): string =>
  'U+' + (c.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, '0');

interface Violation {
  col: number; // 1-based code-point column of the mark (or the gap for «)
  mark: string; // the punctuation involved
  found: string; // the incorrect space char actually present
}

/**
 * Scan one line: collect violations and build the corrected line in a single
 * pass. Correcting and detecting share this logic so --check and --fix can never
 * disagree.
 */
function processLine(line: string): { fixed: string; violations: Violation[] } {
  const chars = [...line];
  const out: string[] = [];
  const violations: Violation[] = [];

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];

    // Marks that take a no-break space BEFORE them: : ; ! ? »
    if (c === ':' || c === ';' || c === '!' || c === '?' || c === '»') {
      const want = spaceFor(c);

      // Pull any trailing space-type chars we've already emitted.
      let trailing = '';
      while (out.length && isSpace(out[out.length - 1])) trailing = out.pop()! + trailing;

      if (trailing.length > 0) {
        // A space is present -> French text (value colon, or ; ! ? »). Normalise.
        if (trailing !== want) {
          violations.push({ col: i + 1, mark: c, found: trailing });
        }
        out.push(want);
      }
      // Glued (no space): a key colon, statement `;`, `!` assertion, `?.`, etc.
      // Ambiguous or code — leave it untouched.

      out.push(c);
      continue;
    }

    // Opening guillemet: a narrow no-break space goes AFTER it.
    if (c === '«') {
      out.push(c);

      let j = i + 1;
      let following = '';
      while (j < chars.length && isSpace(chars[j])) following += chars[j++];

      if (following.length > 0) {
        if (following !== NNBSP) {
          violations.push({ col: i + 2, mark: '«', found: following });
        }
        out.push(NNBSP);
        i = j - 1; // consume the space(s) we just normalised
      }
      // Glued `«mot` (no space): leave untouched.
      continue;
    }

    out.push(c);
  }

  return { fixed: out.join(''), violations };
}

interface LineReport {
  lineNo: number; // 1-based
  text: string;
  violations: Violation[];
}

function analyse(source: string): { fixed: string; reports: LineReport[]; total: number } {
  const lines = source.split('\n');
  const fixedLines: string[] = [];
  const reports: LineReport[] = [];
  let total = 0;

  lines.forEach((text, idx) => {
    const { fixed, violations } = processLine(text);
    fixedLines.push(fixed);
    if (violations.length) {
      reports.push({ lineNo: idx + 1, text, violations });
      total += violations.length;
    }
  });

  return { fixed: fixedLines.join('\n'), reports, total };
}

function describe(v: Violation): string {
  const where = v.mark === '«' ? `after '«'` : `before '${v.mark}'`;
  return `${codePoint(v.found)} ${where}, expected ${codePoint(spaceFor(v.mark))}`;
}

function printReports(reports: LineReport[], target: string): void {
  const rel = relative(process.cwd(), target);
  for (const r of reports) {
    for (const v of r.violations) {
      console.log(`${rel}:${r.lineNo}:${v.col}  ${describe(v)}`);
    }
    // The offending line, trimmed, for context (invisible spaces won't show,
    // but the surrounding words locate it).
    console.log(`    ${r.text.trim()}`);
  }
}

// ---- main -----------------------------------------------------------------

const args = process.argv.slice(2);
const fix = args.includes('--fix');
const target = args.find((a) => !a.startsWith('--')) ?? DEFAULT_TARGET;
const rel = relative(process.cwd(), target);

const source = readFileSync(target, 'utf8');
const { fixed, reports, total } = analyse(source);

if (fix) {
  if (fixed !== source) {
    writeFileSync(target, fixed, 'utf8');
    console.log(`✓ fixed ${total} French-spacing issue(s) in ${rel}`);
  } else {
    console.log(`✓ ${rel} already uses correct French spacing — nothing to fix`);
  }
  // Re-check the written result: anything remaining is a glued case the pass
  // couldn't resolve on its own.
  const after = analyse(readFileSync(target, 'utf8'));
  if (after.total > 0) {
    console.error(`\n✗ ${after.total} issue(s) still need manual attention:`);
    printReports(after.reports, target);
    process.exit(1);
  }
  process.exit(0);
}

// check mode
if (total === 0) {
  console.log(`✓ ${rel} — French spacing OK`);
  process.exit(0);
}

console.error(`✗ ${total} French-spacing issue(s) in ${rel}:\n`);
printReports(reports, target);
console.error(`\nRun \`npm run check:i18n-fr -- --fix\` to correct them.`);
process.exit(1);
