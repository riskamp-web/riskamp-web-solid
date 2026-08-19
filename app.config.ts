
import { defineConfig } from "@solidjs/start/config";
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
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
  },
});