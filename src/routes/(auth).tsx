
import { ParentProps } from 'solid-js';
import { LayoutProvider, useLayoutContext } from '~/components/layout-context';

import { Toolbar } from '~/components/toolbar/account-toolbar';

function Layout(props: ParentProps) {
  const { title } = useLayoutContext();
  return <>
      <main class="fixed">
        <Toolbar title={title()} />
        {props.children}
      </main>
    </>;
}

export default function LayoutWithContext(props: ParentProps) {
  return <>
      <LayoutProvider>
        <Layout {...props} />
      </LayoutProvider>
    </>;
}
