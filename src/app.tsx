import { Title } from "@solidjs/meta";
import { createRouter, useNavigate, type RouteSectionProps } from "@solidjs/router";
import { lazy, Loading } from "solid-js";

import "./reset.css";
import "./app.css";
import '~/style/markdown.css';
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

import { RouteStats } from './lib/stats';

// SOLID2: sidebars stage -- restore with the AI/notes sidebars. it drags in
// treb-llm-support, which nothing on the default route needs yet.
//
// import { formatConfig } from '~/lib/raw-llm-support';
// formatConfig.collapsibleCodeBlocks = false;

// SOLID2: backstage stage -- a hand-written table for now, so only the default
// route (and its imports) is in the module graph. switch to filesystem-routing
// (`createRouter({ routes: fileRoutes(pageRoutes) })`) when the other routes
// are ported.
const Router = createRouter({
  routes: [
    { path: '/*document_path', component: lazy(() => import('./routes/[...document_path]')) },
  ],
});

function Root(props: RouteSectionProps) {

  setNavigator(useNavigate());
  InitAppData();

  return (
    <HistoryProvider>
      <Title>RiskAMP Web</Title>
      <Loading>
        <RouteStats/>
        {props.children}
      </Loading>
      <Spinner />
      <Toaster />
      <ConfirmDialog />
    </HistoryProvider>
  );
}

export default function App() {
  return <Router>{(props) => <Root {...props} />}</Router>;
}
