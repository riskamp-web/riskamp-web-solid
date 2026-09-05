
# Overview

This is a rewrite (v6) of RiskAMP web. RiskAMP web is a web spreadsheet 
intended for running Monte Carlo simulations. 

We use TREB as the underlying spreadsheet component. It's a full embedded
spreadsheet with ~96% function coverage and extensive support for styling.

RiskAMP web overwrites the TREB toolbar and adds a number of tools for 
MC and statistical analysis. 

# Documentation

Working in the repo? [`CLAUDE.md`](CLAUDE.md) is the operating manual — the
repo-wide conventions, invariants, and planned work.

The detailed docs live next to the code they describe. This is the map:

| Doc | Covers |
|---|---|
| [`src/routes/(backstage)/README.md`](<src/routes/(backstage)/README.md>) | The backstage pages — documents, sign-in, create-account, password recovery. Page architecture, the document and version-history stores, the path/name data model, i18n, and the **dev affordances**: `/documents?dev` opens a signed-in page without a session (dev server only), and `?fail` / `?fail-history` force the load-failure states — e.g. `/documents?dev&fail-history`. |
| [`src/style/README.md`](src/style/README.md) | CSS architecture — which file owns what, `src/app.css` as the single source of every token/colour, and the three things that fail silently (notably the TREB carve-out: selectors TREB generates that look like dead code). |
| `src/docs/` | Reference dumps from prior/related implementations (the Svelte-era documents API in `SVELTE-documents.ts`, the local-cache design). Not wired to anything — the source of truth when wiring the real endpoints. |

