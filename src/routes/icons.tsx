
import { Title } from '@solidjs/meta';
import { lazy, Show } from 'solid-js';

/* Lazy + dynamic import keeps the gallery and every icon set in their own
   chunk. A static import would risk them staying in the main bundle even with
   the DEV guard below, since s5-icon-lib declares no `sideEffects: false`. */
const Gallery = lazy(() => import('~/components/icon-sets/gallery'));

/** Dev-only page listing every icon in every set. */
export default function IconsRoute() {
  return (
    <main>
      <Title>Icons</Title>
      <Show when={import.meta.env.DEV} fallback={<h1>Not found</h1>}>
        <Gallery />
      </Show>
    </main>
  );
}
