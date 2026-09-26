
import { defineConfig, type Plugin } from 'vite';
import solid from '@solidjs/vite-plugin';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdirSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

// build-time values baked into the client bundle via `define` (below). read once
// at config load: the two engine versions from their installed package.json, and
// this app's short commit hash. surfaced in the About dialog.
const pkgVersion = (p: string): string =>
  JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8')).version;

const commitHash = (() => {
  try { return execSync('git rev-parse --short HEAD').toString().trim(); }
  catch { return process.env.CF_PAGES_COMMIT_SHA?.slice(0, 7) ?? 'unknown'; }
})();

// riskamp-web loads its language catalogues at runtime with a dynamic
// `import()` of a *computed* path (`./languages/riskamp-web-i18n-<lang>.mjs`,
// in embedded-spreadsheet.ts). Because the specifier is a variable, Rollup
// can't analyse it and leaves the call untouched — so the catalogues are never
// emitted, and at runtime the browser resolves `./languages/...` relative to
// the client chunk under `assets/` and 404s (silently falling back to
// English). Emit the catalogues to exactly that location so the import
// resolves. The proper fix — static specifiers in riskamp-web itself — is
// deferred to a major bump there so we don't break other consumers.
function riskampLanguages(): Plugin {
  const dir = new URL('./node_modules/riskamp-web/dist/i18n/', import.meta.url);
  return {
    name: 'riskamp-languages',
    apply: 'build',
    // only the browser (client) build produces the `assets/` chunk the relative
    // import resolves against; start mode also runs an ssr pass to prerender
    // the document shell, which must not emit them.
    applyToEnvironment: (environment) => environment.name === 'client',
    generateBundle() {
      for (const file of readdirSync(dir)) {
        if (!file.endsWith('.mjs')) continue;
        this.emitFile({
          type: 'asset',
          fileName: `assets/i18n/${file}`, // relative to the client outDir → dist/client/assets/i18n/
          source: readFileSync(new URL(file, dir)),
        });
      }
    },
  };
}

// Solid 2 "start mode" (client): the plugin owns the entries — src/app.tsx is
// the root component, wrapped in the src/Document.tsx shell — and `vite build`
// prerenders that shell into a purely static dist/client (deploy that).
export default defineConfig({
  plugins: [
    solid({ start: true, extensions: ['.jsx', '.tsx'] }),
    riskampLanguages(),
  ],
  define: {
    __RAW_VERSION__:  JSON.stringify(pkgVersion('./node_modules/riskamp-web/package.json')),
    __TREB_VERSION__: JSON.stringify(pkgVersion('./node_modules/@trebco/treb/package.json')),
    __APP_COMMIT__:   JSON.stringify(commitHash),
  },
  server: {
    fs: {
      allow: [
        'package.json',
        'search',
        '.',
        join(process.cwd(), '../RAW/dist'),
      ],
    },
  },
  resolve: {
    // the `~/*` path alias (mirrors tsconfig paths). SolidStart provided this;
    // on plain Vite it's wired explicitly.
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
    dedupe: ['solid-js', '@solidjs/web'],
  },
  worker: {
    format: 'es',
  },
  assetsInclude: ['**/*.wasm'],
});
