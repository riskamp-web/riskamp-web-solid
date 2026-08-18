
import { createStore, createEffect } from '~/lib/solid-compat';

import { type Model } from 'treb-llm-support';
import type { DocumentsRow } from '~/docs/documents';
import type { DocumentScope, SortDirection, SortKey } from '~/backstage/documents-data';

/**
 * FIXME: we should change how this works, make it deeper 
 * and perhaps switch to a mutable? also we could be lazier
 * about the specific types
 */
interface SessionData {
  active_tab: number;
  last_split: number;
  llm_tab_split: number;
  
  // notes_tab: number;
  notes?: {
    tab?: number;
    view_scroll?: number;
    edit_scroll?: number;
  }

  /* moved to persistent 
  documents?: {
    sort?: keyof DocumentsRow;
    asc?: boolean;
    filter?: string;
  }
  */

  /** 
   * this is the last version of the document loaded from storage (or 0 in
   * the case of drag-and-drop or imported documents). it's used to determine
   * when versions in the browser cache have unsaved changes. it requires some
   * management.
   */
  last_saved_version: number;
  
  /**
   * this is a mirror of the document state (version), maintained separately
   * for convenience
   */
  document_version: number;

  selected_documents?: Record<number, boolean>;

}

/**
 * what the documents page was looking at: the list it had narrowed to, the order
 * it was in, what was typed in the search box, and which document's detail panel
 * was open. persisted so that opening a document and coming back lands on the
 * same view rather than resetting to everything, newest first.
 *
 * every field is optional and every reader supplies its own default -- this is
 * read back from localStorage, so a version that predates a field, or one that
 * wrote a value since removed, has to be a non-event. the page validates what it
 * reads (see savedView() in ~/backstage/documents-data).
 */
export interface DocumentsView {
  /** which of the rail's top-level filters is active */
  scope?: DocumentScope;
  /** owner-relative folder path, or undefined for none */
  folder?: string;
  /** the search box's contents */
  search?: string;
  /** the sorted column */
  sort?: SortKey;
  /** and its direction */
  direction?: SortDirection;
  /** the list's saved scroll offset, in px */
  scroll?: number;
  /**
   * the open document's path, or undefined for a closed panel. the *path*
   * rather than the row id: ids come from the service and needn't survive a
   * reload, while the path is the document's identity (see findPathCollision).
   */
  open?: string;
}

export interface PersistentData {
  lhs: boolean;
  stepped: boolean; 
  trials: number; // FIXME: should be per-sheet
  llm_model: Model|undefined;
  llm_api_keys: Record<string, string>;

  quickview_tab: number;
  quickview_minmax: "minmax"|"iqr";
  quickview_bin_algorithm: "ss"|"fd"|"sturges"|"auto";

  fit_ignore_blanks: boolean;
  fit_ignore_strings: boolean;
  fit_ignore_boolean: boolean;

  /* superseded by documents_view below, which the redesigned documents page
     uses -- these are the old skeleton page's and are due to be removed */
  documents_sort?: keyof DocumentsRow;
  documents_asc?: boolean;
  documents_filter?: string;

  /** the documents page's view state -- see DocumentsView above */
  documents_view?: DocumentsView;

  /** explicit light/dark theme. leave undefined to use system theme. */
  explicit_theme?: 'light'|'dark';

}

export const [sessionData, setSessionData] = createStore<SessionData>({
  
  active_tab: 0,
  last_split: 70,
  llm_tab_split: 70,

  /*
  documents: {
    sort: 'modified',
    asc: false,
    filter: '',
  },
*/

  last_saved_version: 0,
  document_version: 0,

  selected_documents: {},

});

export const [persistentData, setPersistentData] = createStore<PersistentData>({
  lhs: true,
  stepped: false,
  trials: 5000,
  
  llm_model: undefined,
  llm_api_keys: {},
  
  quickview_tab: 0,
  quickview_bin_algorithm: 'auto',
  quickview_minmax: "minmax",

  fit_ignore_blanks: true,
  fit_ignore_boolean: true,
  fit_ignore_strings: true,

  documents_asc: false,
  documents_sort: 'modified',
  documents_filter: '',

  documents_view: {},

});

export function InitAppData() {

  if (localStorage) {
    const json = localStorage.getItem('app-data');
    if (json) {
      try {
        const data = JSON.parse(json) as Partial<PersistentData>;
        setPersistentData(data);
      }
      catch (err) {
        console.error(err);
      }
    }
  }

  createEffect(() => {
    const json = JSON.stringify(persistentData);
    localStorage.setItem('app-data', json);
  });

  createEffect(() => {
    const theme = persistentData.explicit_theme || 'system';
    // console.info("set theme:", theme);
    document.documentElement.setAttribute('data-theme', theme);
  });

}
