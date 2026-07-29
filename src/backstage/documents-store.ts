
import { createSignal } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';

/** matches HistoryEntry in ~/docs/SVELTE-documents, which is what the service returns */
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

  /**
   * the full path, e.g. @dwerner/finance/portfolio-var. this is the identity.
   *
   * the first segment is the owner's handle, then zero or more folders, then
   * the slug. there's no leading slash: the path is everything after the
   * origin, and documentUrl() supplies the slash. see documents-data.ts for
   * the helpers that take it apart.
   */
  path: string;

  status: number;
  access: number;
  created: number;
  modified: number;
  version: number;

  /** which app wrote the document, e.g. 'RAW'. not shown anywhere yet. */
  app?: string;

  // ---- redesign additions ----

  /**
   * optional: the list endpoint doesn't return a starred flag, so an
   * unstarred document and a document loaded from a service that has no
   * concept of starring both arrive as undefined. read it as false.
   */
  starred?: boolean;

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

/**
 * empty the store and mark it unloaded; the next load fetches again.
 *
 * histories go with it: they're keyed by path, so rows and the history cached
 * against them have to be dropped together or the second describes documents
 * the first no longer holds.
 */
export function flushDocuments(): void {
  setDocuments([]);
  setLoaded(false);
  setFailed(false);
  flushHistories();
}

/* ------------------------------------------------------------------ */
/* version history                                                     */
/* ------------------------------------------------------------------ */

/**
 * version history is a second store rather than a field on the row, because it
 * arrives separately: the list query returns the current version *number* and
 * nothing else, so history is fetched per document when something asks for it.
 * putting it on the row would mean every row carrying a field that is empty
 * until opened, and no way to tell "not fetched" from "no history".
 *
 * the three states are all real and all render differently, so the entry is a
 * tagged record rather than a bare array: absent means nobody has asked yet,
 * which is what makes loadHistory() idempotent.
 */
export interface DocumentHistory {
  status: 'loading' | 'ready' | 'failed';
  /** empty unless status is 'ready' */
  versions: DocumentVersion[];
}

/**
 * path -> history. keyed by the lowercased path, matching how the service
 * resolves them (and how findPathCollision compares them) -- see historyKey()
 * in documents-data.ts, which is the only thing that should build these keys.
 *
 * a store rather than a Map so the panel re-renders when an entry lands: a Map
 * mutated in place is invisible to the reactive system.
 */
export const [histories, setHistories] = createStore<Record<string, DocumentHistory>>({});

/**
 * throw the cached history away. paths are the key, so anything that changes a
 * path (rename, move, delete) invalidates the entry it was stored under.
 */
export function flushHistories(): void {
  setHistories(reconcile({}));
}
