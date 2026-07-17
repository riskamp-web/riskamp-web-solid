
import { createContext, createSignal, useContext } from "solid-js";
import { I18N } from '~/i18n/i18n';

const [title, setTitle] = createSignal<keyof I18N|undefined>();
const LayoutContext = createContext({ title, setTitle });

export function useLayoutContext() {
  return useContext(LayoutContext);
}

