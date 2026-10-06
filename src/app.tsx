import { MetaProvider, Title } from "@solidjs/meta";
import { Router, RouteSectionProps } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { lazy, onMount, Suspense } from "solid-js";

import "./reset.css";
import "./app.css";
// Fira Sans + Fira Mono (--interface-font / --mono-font-family). alternatives:
// style/plex-sans.css with @fontsource/ibm-plex-mono, or style/geist-sans.css
import '~/style/fira-sans.css';
import '~/style/markdown.css';
import '~/style/riskamp-dialog.css';
import '~/style/controls.css';
import '~/style/utility.css';
import '~/style/grid-table.css';

import { Spinner } from '~/components/spinner/spinner';
import { Toaster } from '~/components/toast/toast';
import { ConfirmDialog } from '~/components/dialogs/confirm-dialog/confirm-dialog';
import { useNavigate } from '@solidjs/router';
import { setNavigator } from '~/lib/navigate';
import { InitAppData } from './lib/app-data';
import { HistoryProvider } from './components/history-context';
import { formatConfig } from '~/lib/raw-llm-support';

import { RouteStats } from './lib/stats';

// render markdown fenced code as plain, always-visible blocks app-wide (the AI
// chat and notes sidebars). the treb-llm-support default keeps the legacy
// collapsible <details> disclosure for its other clients; this opts this app
// out of it. see treb-llm-support/src/md.ts (formatConfig).
formatConfig.collapsibleCodeBlocks = false;

// dev-only typeface switcher (components/font-trial). the DEV guard is what
// keeps it out of a production build: there the branch is dead code, so the
// chunk -- and the trial font files it pulls in -- is never even emitted.
const FontTrialSwitcher = import.meta.env.DEV ? lazy(() => import('~/components/font-trial/font-trial')) : undefined;



function Root(props: RouteSectionProps) {
  
  setNavigator(useNavigate());

  onMount(() => {
    InitAppData();
  });

  return (
    <HistoryProvider>
      <MetaProvider>
        <Title>RiskAMP Web</Title>
        <Suspense>
          <RouteStats/>
          {props.children}
        </Suspense>
        <Spinner />
        <Toaster />
        <ConfirmDialog />
        {FontTrialSwitcher && <FontTrialSwitcher />}
      </MetaProvider>
    </HistoryProvider>
  );
}

export default function App() {
  return (
    <Router root={Root}>
      <FileRoutes />
    </Router>
  );
}
