import { MetaProvider, Title } from "@solidjs/meta";
import { Router, RouteSectionProps } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { onMount, Suspense } from "solid-js";

import "./reset.css";
import "./app.css";
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



function Root(props: RouteSectionProps) {
  
  setNavigator(useNavigate());

  onMount(() => {
    InitAppData();
  });

  return (
    <HistoryProvider>
      <MetaProvider>
        <Title>RiskAMP Web</Title>
        <Suspense>{props.children}</Suspense>
        <Spinner />
        <Toaster />
        <ConfirmDialog />
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
