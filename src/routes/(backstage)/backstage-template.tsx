
import { onCleanup } from 'solid-js';
import { useLayoutContext } from '~/components/layout-context';

export default function Template() {

  const { setTitle } = useLayoutContext();

  // set title takes keys from the i18n module

  setTitle('sign-in.page.title');
  onCleanup(() => setTitle(undefined)); // reset

  return <>
      Content here
    </>;

}

