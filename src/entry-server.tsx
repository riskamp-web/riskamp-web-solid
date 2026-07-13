// src/entry-server.tsx
import { createHandler, StartServer } from "@solidjs/start/server";
import { persistentData } from './lib/app-data';

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
