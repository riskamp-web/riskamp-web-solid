// src/entry-server.tsx
import { createHandler, StartServer } from "@solidjs/start/server";
import { persistentData } from './lib/app-data';

const description = 'RiskAMP Web brings Monte Carlo simulation and risk analysis to the browser — build probabilistic models, run simulations, and explore the results in a familiar spreadsheet.';

export default createHandler(() => {


  // persistentData.explicit_theme is a reactive field that's
  // persisted in local storage, and set to either "light", "dark",
  // or undefined. undefined implies use system setting. "light"
  // and "dark" are, not surprisingly, explicit themes.

  // we updated TREB to support this definition, although it defaults
  // to "light", so you need to set this field to "system" to get it
  // to react to system values.

  return <StartServer
      document={({ assets, children, scripts }) => (
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

            {/*
            
              this is a little hacky. TREB and RAW by default inject 
              stylesheets when the elements are created. they check if 
              the stylesheet already exists by testing these nodes
              (style[treb-stylesheet], style[riskamp-web-stylesheet]).

              we now generate the stylesheets separately on build, so we 
              can import them statically and they'll be bundled. the 
              injection logic is still there, but we can block it running
              by setting these dummy nodes. TODO: make it an option. 
              
             */}
            <style treb-stylesheet />
            <style riskamp-web-stylesheet />


            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      )}
    />;
});
