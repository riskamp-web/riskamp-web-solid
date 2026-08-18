
import { Navigate } from '../components/navigate';
import { createMemo, ParentProps, Show } from 'solid-js';

import { LayoutProvider, useLayoutContext } from '~/components/layout-context';

import { Toolbar } from '~/components/toolbar/account-toolbar';
import { loggedIn } from '~/lib/auth';

/*
 * layout for backstage pages.
 *
 * backstage pages come in two kinds: some need a session (documents), some only
 * make sense without one (sign in, and later forgot password / create account).
 * the page says which it is by calling setRequires during render, next to its
 * setTitle, and the check lives here rather than in each page.
 *
 * this is a SPA (ssr: false) and ~/lib/auth initialises the session from local
 * storage at import, so loggedIn() is already authoritative on first render.
 *
 * not handled on purpose: an expired token that a background re-auth is about to
 * refresh reads as signed out for a moment. refresh is a two-day path and lands
 * on /, so at worst this costs a redirect or two that sorts itself out.
 */

function Layout(props: ParentProps) {

  const { title, requirement, userPanel } = useLayoutContext();

  const redirect = createMemo(() => {
    switch (requirement()) {
      case 'signed-in': return loggedIn() ? undefined : '/sign-in';
      case 'signed-out': return loggedIn() ? '/' : undefined;
      default: return undefined; // a page that declares nothing renders either way
    }
  });

  // loggedIn() is a signal, so this is live: losing the session on /documents
  // bounces you out, and signing in on /sign-in bounces you to / by itself.
  // the toolbar sits outside the gate so the shell doesn't blink on the swap.
  return <>
      <main class="fixed">
        <Toolbar title={title()} account-info={userPanel()} />
        <Show when={redirect()} fallback={props.children}>
          {(href) => <Navigate href={href()} />}
        </Show>
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
