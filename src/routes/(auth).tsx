
import { ParentProps } from 'solid-js';
import { useLayoutContext } from '~/components/layout-context';
import { Link, Title } from "@solidjs/meta";
import * as auth from '~/lib/auth';

import { Toolbar } from '~/components/toolbar/account-toolbar';

export default function Layout(props: ParentProps) {

  const { title } = useLayoutContext();

  return <>
      <main class="fixed">
        <Toolbar title={title()} />
        {props.children}
      </main>
    </>;
}