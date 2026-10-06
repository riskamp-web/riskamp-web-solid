import { lazy } from 'solid-js';

// Typeface trials: the page lives in components/font-trial/font-specimens.tsx.
// Loaded behind import.meta.env.DEV, unlike the other dev-test pages, so a
// production build doesn't emit the ~2MB of trial font files it pulls in.
const FontSpecimens = import.meta.env.DEV ? lazy(() => import('~/components/font-trial/font-specimens')) : undefined;

export default function FontsPage() {
  return FontSpecimens ? <FontSpecimens /> : null;
}
