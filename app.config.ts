
import { defineConfig } from "@solidjs/start/config";
import type { Plugin } from 'vite';
import { join } from 'node:path';
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
// the client chunk under `_build/assets/` and 404s (silently falling back to
// English). Emit the catalogues to exactly that location so the import
// resolves. The proper fix — static specifiers in riskamp-web itself — is
// deferred to a major bump there so we don't break other consumers.
function riskampLanguages(): Plugin {
  const dir = new URL('./node_modules/riskamp-web/dist/languages/', import.meta.url);
  let emit = false;
  return {
    name: 'riskamp-languages',
    apply: 'build',
    configResolved(config) {
      // only the browser (client) build produces the `_build/assets/` chunk the
      // relative import resolves against; skip the ssr/server passes.
      emit = !config.build.ssr;
    },
    generateBundle() {
      if (!emit) return;
      for (const file of readdirSync(dir)) {
        if (!file.endsWith('.mjs')) continue;
        this.emitFile({
          type: 'asset',
          fileName: `assets/languages/${file}`, // relative to the client outDir → _build/assets/languages/
          source: readFileSync(new URL(file, dir)),
        });
      }
    },
  };
}

export default defineConfig({
  ssr: false,
  server: {
    preset: "cloudflare-pages-static",
  },
  vite: {
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
      dedupe: ["solid-js", "solid-js/web", "solid-js/store"],
    },
    worker: {
      format: 'es',
    },
    assetsInclude: ['**/*.wasm'],
    plugins: [riskampLanguages()],
  },
});