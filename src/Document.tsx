import type { ParentProps } from "solid-js";
import { HydrationScript } from "@solidjs/web";
import { persistentData } from './lib/app-data';

const description = 'RiskAMP Web brings Monte Carlo simulation and risk analysis to the browser — build probabilistic models, run simulations, and explore the results in a familiar spreadsheet.';

// The document shell — the new index.html. Picked up by the src/Document.*
// convention, it wraps the app in the plugin's generated entries and renders
// the full <html>. In client mode this is compiled only into the prerendered
// static shell and <HydrationScript /> is stripped; it activates under SSR.
//
// persistentData.explicit_theme is a reactive field persisted in local storage,
// set to "light", "dark", or undefined (undefined => use system setting). TREB
// defaults to "light", so we pass "system" when unset to react to system values.
export default function Document(props: ParentProps) {
  return (
    <html lang="en" data-theme={persistentData.explicit_theme || 'system'}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/touch-icon.png" />

        {/* SEO */}
        <meta name="description" content={description} />
        <link rel="canonical" href="https://web.riskamp.com/" />

        {/* browser chrome — matches the app toolbar bar in each scheme */}
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f4f5f6" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1e1f22" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RiskAMP Web" />
        <meta property="og:title" content="RiskAMP Web" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://web.riskamp.com/" />
        <meta property="og:image" content="https://web.riskamp.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="RiskAMP Web" />

        {/* Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RiskAMP Web" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://web.riskamp.com/og-image.png" />

        {/* link relations to the policy pages */}
        <link rel="privacy-policy" href="/privacy-policy" />
        <link rel="terms-of-service" href="/terms-of-service" />

        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
