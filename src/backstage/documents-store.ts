
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

export interface DocumentVersion {
  version: number;
  modified: number;
}

export interface BackstageDocument {

  // ---- fields that mirror DocumentsRow ----
  id: number;
  userid: number;

  /**
   * the document name, with its own casing. optional in practice: the old UI
   * asked for a name and a slug separately, and almost nobody filled in the
   * name, so most existing documents have none and the slug carries.
   */
  name: string;

  /** the full slug path, e.g. /finance/portfolio-var. this is the identity. */
  path: string;

  status: number;
  access: number;
  created: number;
  modified: number;
  version: number;

  // ---- redesign additions ----
  starred: boolean;
  versions: DocumentVersion[];

}

/* ------------------------------------------------------------------ */
/* the store                                                           */
/* ------------------------------------------------------------------ */

/**
 * whether the store has been filled. a flag rather than a length check, because
 * an account with no documents is a real state: [] means loaded and empty, not
 * "not loaded yet", and treating the two alike would refetch forever.
 */
export const [loaded, setLoaded] = createSignal(false);

/**
 * whether the last attempt to fill the store failed.
 *
 * an empty list and a failed fetch both leave the store empty, and they mean
 * opposite things -- "you have no documents" versus "we couldn't ask" -- so the
 * page has to be able to tell them apart. deliberately a flag and not the error
 * itself: nothing downstream is ready to say anything specific about the cause,
 * and half-reporting one is worse than reporting none.
 */
export const [failed, setFailed] = createSignal(false);

/**
 * the documents, module-level so they're loaded once rather than once per visit
 * to the page. the page reads them directly and writes through setDocuments --
 * star, access, rename and delete all land here.
 */
export const [documents, setDocuments] = createStore<BackstageDocument[]>([]);

/** empty the store and mark it unloaded; the next load fetches again */
export function flushDocuments(): void {
  setDocuments([]);
  setLoaded(false);
  setFailed(false);
}
