import { onMount } from '~/lib/solid-compat';
import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { Loading, type ParentProps } from 'solid-js';

import { Router } from "./router";

import "./reset.css";
import "./app.css";
import '~/style/riskamp-dialog.css';
import '~/style/controls.css';
import '~/style/utility.css';
import '~/style/grid-table.css';

import { Spinner } from '~/components/spinner/spinner';
import { Toaster } from '~/components/toast/toast';
import { ConfirmDialog } from '~/components/dialogs/confirm-dialog/confirm-dialog';
import { setNavigator } from '~/lib/navigate';
import { InitAppData } from './lib/app-data';
import { HistoryProvider } from './components/history-context';
import { formatConfig } from '~/lib/raw-llm-support';

// render markdown fenced code as plain, always-visible blocks app-wide (the AI
// chat and notes sidebars). the treb-llm-support default keeps the legacy
// collapsible <details> disclosure for its other clients; this opts this app
// out of it. see treb-llm-support/src/md.ts (formatConfig).
formatConfig.collapsibleCodeBlocks = false;

// The site-wide layout — rendered as the router root. Runs inside router
// context so it can wire the navigate bridge and boot the app data once.
function Layout(props: ParentProps) {

  setNavigator(useNavigate());

  onMount(() => {
    InitAppData();
  });

  return (
    <HistoryProvider>
      <Title>RiskAMP Web</Title>
      <Loading>{props.children}</Loading>
      <Spinner />
      <Toaster />
      <ConfirmDialog />
    </HistoryProvider>
  );
}

export default function App() {
  return <Router>{(props) => <Layout>{props.children}</Layout>}</Router>;
}
