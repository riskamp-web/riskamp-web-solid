
/**
 * this is context for the auth pages, which are the first pages
 * to use a layout (testing). we might lazily use it for other pages/
 * page groups, or we could split into focused contexts.
 */

import { Accessor, createContext, createSignal, ParentProps, Setter, useContext } from "solid-js";
import { I18N } from '~/i18n/i18n';

/*

const [title, setTitle] = createSignal<keyof I18N|undefined>();
const LayoutContext = createContext({ title, setTitle });

export function useLayoutContext() {
  return useContext(LayoutContext);
}
*/

interface LayoutContextType {
  title: Accessor<keyof I18N|undefined>;
  setTitle: Setter<keyof I18N|undefined>;
}

const LayoutContext = createContext<LayoutContextType>();

export function LayoutProvider(props: ParentProps) {

  const [title, setTitle] = createSignal<keyof I18N | undefined>();
  return (
    <LayoutContext.Provider value={{ title, setTitle }}>
      {props.children}
    </LayoutContext.Provider>
  );
  
}

// 3. Custom hook with safety check
export function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  return context;
}

