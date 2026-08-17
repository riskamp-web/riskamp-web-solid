import style from './content.module.css';
import text from './privacy-policy.md?raw';
import { renderContent } from './render-content';

const rendered = renderContent(text);

export default function Page() {
  return <div class={style['text-page']}>
    <div class={style.body} innerHTML={rendered}>
    </div>
  </div>;
}
