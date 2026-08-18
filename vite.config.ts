import { fileRoutes } from "filesystem-routing/vite";
import { defineConfig } from "vite";
import solid from "@solidjs/vite-plugin";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// Solid 2.0 start mode (client / SPA — omit `ssr` to keep the app fully
// client-rendered). The plugin generates the entries around src/App.tsx,
// wrapped in src/Document.tsx, and `vite build` prerenders the shell into
// dist/client/index.html, emitting a purely static dist/client.
export default defineConfig({
  plugins: [
    // `extensions` also compiles the `?pick=` route modules fileRoutes emits.
    solid({ start: true, extensions: [".jsx", ".tsx"] }),
    fileRoutes({ types: true }),
  ],
  server: {
    fs: {
      allow: [
        "package.json",
        "search",
        ".",
        join(process.cwd(), "../RAW/dist"),
      ],
    },
  },
  resolve: {
    // the `~/*` path alias (mirrors tsconfig paths). SolidStart used to provide
    // this; on plain Vite we wire it explicitly so it resolves in every
    // environment (client + the start-mode SSR shell, dev and build alike).
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
    dedupe: ["solid-js", "@solidjs/web"],
  },
  worker: {
    format: "es",
  },
  assetsInclude: ["**/*.wasm"],
});
