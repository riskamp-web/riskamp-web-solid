
/**
 * this is context for the auth pages, which are the first pages
 * to use a layout (testing). we might lazily use it for other pages/
 * page groups, or we could split into focused contexts.
 */

import { Accessor, createContext, createSignal, ParentProps, Setter, useContext } from "solid-js";
import { useLocation } from "@solidjs/router";
import { I18N } from '~/i18n/i18n';

/**
 * what a page needs of the session. pages that declare nothing render either way.
 */
export type AuthRequirement = 'signed-in' | 'signed-out';

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

  /** what the page at the current path asked for, if it asked for anything */
  requirement: Accessor<AuthRequirement|undefined>;

  /** called by a page during render, the same way setTitle is */
  setRequires: (requires: AuthRequirement) => void;
}

const LayoutContext = createContext<LayoutContextType>();

export function LayoutProvider(props: ParentProps) {

  const [title, setTitle] = createSignal<keyof I18N | undefined>();

  /*
   * the auth requirement is keyed by the path that declared it, and pages
   * deliberately don't clear it on cleanup.
   *
   * a route component can't pass props up to its layout, so the page pushes its
   * requirement during render and the layout reacts -- but if the page also
   * reset it on unmount, a layout that redirects would disown the page, the
   * cleanup would clear the requirement, the guard would allow the page again,
   * and it would remount and re-declare. forever. keying to the path means a
   * stale declaration stops counting the moment the location changes, and no
   * page needs a cleanup.
   */
  const location = useLocation();
  const [claim, setClaim] = createSignal<{ path: string, requires: AuthRequirement }>();

  const setRequires = (requires: AuthRequirement) => setClaim({ path: location.pathname, requires });

  const requirement = () => {
    const current = claim();
    return current?.path === location.pathname ? current.requires : undefined;
  };

  return (
    <LayoutContext.Provider value={{ title, setTitle, requirement, setRequires }}>
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

