/**
 * check-i18n-scope.ts
 * -------------------
 * Lints *where* the i18n readers — `t()` and `currentLocale()` — are called.
 * Both must be called from inside a function, never from a module body.
 *
 * WHY THIS EXISTS
 *   `t()` resolves a key by walking `i18n_instance.strings`, which is a Solid
 *   store: every segment of the path is a tracked property read. That is what
 *   makes a language change repaint the ui — and it is also what makes *when*
 *   and *where* the call happens matter:
 *
 *     const MESSAGE = t('some.key');          // module scope — runs at import
 *
 *   Module bodies execute once, at import time, before any translation has been
 *   loaded. That line snapshots English and keeps it forever; no language change
 *   will ever move it. It is valid TypeScript with the right return type, so
 *   nothing in the compiler or the linter objects. This script is the check.
 *
 *   The same call inside module-scope JSX is a different failure with the same
 *   root cause. Solid compiles `{t('x')}` into a render effect, so it is not
 *   evaluated at import — but the effect is *created* at import, outside any
 *   `createRoot`/`render`, with no owner. Solid's dev build warns
 *   ("computations created outside a `createRoot` or `render` will never be
 *   disposed"); the effect subscribes to the store and is never torn down.
 *
 *   Calls from inside a function — a component body, an event handler, a
 *   callback — are always fine. In a tracking scope the read subscribes and
 *   updates; outside one (an event handler, say) it is a plain untracked read
 *   that returns whatever is current at that moment, which is what a transient
 *   dialog wants anyway.
 *
 * WHAT COUNTS AS A READER
 *   `t` and `currentLocale`, the two exports of `src/i18n/i18n.ts` that read
 *   reactive state. `format()` / `formatJSX()` only splice into a string they
 *   are handed, and `K` / `languages` are plain data built at import on purpose,
 *   so none of those are flagged. `format(t('key'), …)` is still caught — via
 *   the `t()` inside it.
 *
 * HOW IT WORKS
 *   Parses every `.ts`/`.tsx` under `src/` with the TypeScript compiler and, for
 *   each file, records the local names bound to a reader by an import from the
 *   i18n module — named (`{ t }`), aliased (`{ t as translate }`) and namespace
 *   (`import * as i18n` -> `i18n.t(…)`) forms alike. Every call to one of those
 *   names then walks up its parent chain: the first function-like ancestor means
 *   the call is deferred and the call is fine. Reaching the source file without
 *   crossing one means the call sits in the module body — a violation, reported
 *   as `import-time`, or as `ownerless-jsx` if a JSX expression container was
 *   crossed on the way up.
 *
 *   Blind spot, for the record: a module-scope IIFE (`(() => t('x'))()`) reads
 *   as deferred because of the arrow function, though it does run at import.
 *   Nothing in this repo is written that way and handling it would cost more
 *   than it is worth.
 *
 * RUN
 *   npm run check:i18n-scope                      # exits non-zero on a violation (CI-ready)
 *   tsx scripts/check-i18n-scope.ts [path…]       # check specific dirs/files
 */

import ts from 'typescript';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DEFAULT_TARGET = join(HERE, '..', 'src');

/** Exports of `src/i18n/i18n.ts` that read reactive state. */
const READERS = new Set(['t', 'currentLocale']);

/** Matches the i18n module however it is specified: `~/i18n/i18n`, `../i18n/i18n`, … */
const I18N_MODULE = /(^|\/)i18n\/i18n(\.[jt]sx?)?$/;

/**
 * Node kinds whose body is deferred — a reader call inside one runs when that
 * function is called, not when the module is evaluated. A class property
 * initializer belongs here too: it runs at construction. A `static {}` block
 * deliberately does not — it runs with the class definition, i.e. at import.
 */
const DEFERS = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.ArrowFunction,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.Constructor,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.SetAccessor,
  ts.SyntaxKind.PropertyDeclaration,
]);

type Kind = 'import-time' | 'ownerless-jsx';

interface Violation {
  file: string;
  line: number; // 1-based
  col: number; // 1-based
  kind: Kind;
  text: string; // the call, first line only
  context: string; // the source line, trimmed
}

const EXPLAIN: Record<Kind, string> = {
  'import-time': 'called in the module body — runs at import and snapshots English forever',
  'ownerless-jsx': 'called in module-scope JSX — creates a render effect with no owner, never disposed',
};

/** Every .ts/.tsx file under a directory (or the file itself). */
function collectFiles(target: string): string[] {
  if (statSync(target).isFile()) return [target];

  const found: string[] = [];
  for (const entry of readdirSync(target, { withFileTypes: true })) {
    const path = join(target, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      found.push(...collectFiles(path));
    }
    else if (entry.isFile() && (extname(path) === '.ts' || extname(path) === '.tsx')) {
      found.push(path);
    }
  }
  return found;
}

interface Bindings {
  /** local names imported directly from i18n that resolve to a reader. */
  direct: Set<string>;
  /** local names bound to the whole i18n module by `import * as …`. */
  namespaces: Set<string>;
}

function readerBindings(source: ts.SourceFile): Bindings {
  const direct = new Set<string>();
  const namespaces = new Set<string>();

  source.forEachChild((node) => {
    if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier)) return;
    if (!I18N_MODULE.test(node.moduleSpecifier.text)) return;

    const bindings = node.importClause?.namedBindings;
    if (!bindings) return;

    if (ts.isNamespaceImport(bindings)) {
      namespaces.add(bindings.name.text);
    }
    else {
      for (const element of bindings.elements) {
        // `{ t as translate }` -> propertyName is the export, name is the local.
        const exported = (element.propertyName ?? element.name).text;
        if (READERS.has(exported)) direct.add(element.name.text);
      }
    }
  });

  return { direct, namespaces };
}

/** True if this call expression targets one of the file's reader bindings. */
function callsReader(call: ts.CallExpression, bindings: Bindings): boolean {
  const callee = call.expression;

  if (ts.isIdentifier(callee)) {
    return bindings.direct.has(callee.text);
  }
  if (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression)) {
    return bindings.namespaces.has(callee.expression.text) && READERS.has(callee.name.text);
  }
  return false;
}

/**
 * Walk up from a call to the source file. Returns null when a deferring
 * ancestor is crossed (the call is fine), otherwise which kind of module-scope
 * violation it is.
 */
function classify(call: ts.CallExpression): Kind | null {
  let inJsx = false;

  for (let node: ts.Node | undefined = call.parent; node; node = node.parent) {
    if (DEFERS.has(node.kind)) return null;
    if (ts.isJsxExpression(node)) inJsx = true;
  }

  return inJsx ? 'ownerless-jsx' : 'import-time';
}

function checkFile(path: string): Violation[] {
  const text = readFileSync(path, 'utf8');
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const bindings = readerBindings(source);
  if (bindings.direct.size === 0 && bindings.namespaces.size === 0) return [];

  const violations: Violation[] = [];
  const lines = text.split('\n');

  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && callsReader(node, bindings)) {
      const kind = classify(node);
      if (kind) {
        const { line, character } = source.getLineAndCharacterOfPosition(node.getStart());
        violations.push({
          file: path,
          line: line + 1,
          col: character + 1,
          kind,
          text: node.getText().split('\n')[0],
          context: (lines[line] ?? '').trim(),
        });
      }
    }
    node.forEachChild(visit);
  };
  visit(source);

  return violations;
}

// ---- main -----------------------------------------------------------------

const targets = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
const roots = targets.length ? targets : [DEFAULT_TARGET];

const files = roots.flatMap(collectFiles);
const violations = files.flatMap(checkFile);

if (violations.length === 0) {
  console.log(`✓ ${files.length} file(s) checked — no module-scope i18n reads`);
  process.exit(0);
}

console.error(`✗ ${violations.length} module-scope i18n read(s):\n`);
for (const v of violations) {
  console.error(`${relative(process.cwd(), v.file)}:${v.line}:${v.col}  ${EXPLAIN[v.kind]}`);
  console.error(`    ${v.context}`);
}
console.error(`\nMove the call inside the function that uses it — a component body, an`);
console.error(`event handler, or an accessor — so it resolves against the loaded language.`);
process.exit(1);
