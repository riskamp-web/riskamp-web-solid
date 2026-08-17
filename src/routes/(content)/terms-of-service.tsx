import style from './content.module.css';
import text from './terms-of-service.md?raw';
import { renderContent } from './render-content';
import { onCleanup } from 'solid-js';
import { useLayoutContext } from '~/components/layout-context';

const rendered = renderContent(text);

export default function Page() {

  const { setTitle, setUserPanel } = useLayoutContext();
  setTitle('terms-of-use.page.title');
  setUserPanel(true);
  onCleanup(() => {
    setTitle(undefined);
    setUserPanel(false);
  });

  return <div class={style['text-page']}>
    <div class={style.body} innerHTML={rendered}></div>
  </div>;
}
