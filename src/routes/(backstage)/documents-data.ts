/**
 * the documents page's data: the row shape, the loader, and the path / folder /
 * format / sort helpers the page renders through.
 *
 * the row shape intentionally matches DocumentsRow in ~/docs/documents, plus the
 * two things the redesign adds: a `starred` flag and a real version list. that way
 * swapping in ListDocuments() later is a data change, not a markup change.
 *
 * the canned set itself lives in documents-sample.ts; loadDocuments() below is
 * where the choice between it and live data gets made.
 */

import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

import { devBypass, devFailLoads } from './dev-access';

export const ACCESS_PRIVATE = 0;
export const ACCESS_PUBLIC = 1;

export const STATUS_ACTIVE = 0;
export const STATUS_DELETED = 1;

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

export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

/**
 * one clock reading for the whole module, so relative timestamps stay stable
 * within a session and the canned data never goes stale.
 */
export const NOW = Date.now();

/** the "recent" scope window */
export const RECENT_WINDOW = 14 * DAY;

/** documents keep at most this many versions (soft cap, matches the service) */
export const VERSION_CAP = 7;

/* ------------------------------------------------------------------ */
/* the store                                                           */
/* ------------------------------------------------------------------ */

/**
 * the documents, module-level so they're loaded once rather than once per visit
 * to the page. the page reads them directly and writes through setDocuments --
 * star, access, rename and delete all land here.
 */
const [documents, setDocuments] = createStore<BackstageDocument[]>([]);

/**
 * whether the store has been filled. a flag rather than a length check, because
 * an account with no documents is a real state: [] means loaded and empty, not
 * "not loaded yet", and treating the two alike would refetch forever.
 */
const [loaded, setLoaded] = createSignal(false);

/**
 * whether the last attempt to fill the store failed.
 *
 * an empty list and a failed fetch both leave the store empty, and they mean
 * opposite things -- "you have no documents" versus "we couldn't ask" -- so the
 * page has to be able to tell them apart. deliberately a flag and not the error
 * itself: nothing downstream is ready to say anything specific about the cause,
 * and half-reporting one is worse than reporting none.
 */
const [failed, setFailed] = createSignal(false);

export { documents, setDocuments, loaded, failed };

/** in flight, so two callers land on one fetch rather than two */
let pending: Promise<void> | undefined;

/**
 * fill the store, unless it's already filled -- so a page can call this on every
 * mount without thinking about it. returns nothing: the store is the result,
 * and a failure is failed(), not a rejection. a failed load leaves the store
 * unloaded, so the next call retries.
 */
export function loadDocuments(): Promise<void> {

  if (loaded()) { return Promise.resolve(); }
  if (pending) { return pending; }

  setFailed(false);

  pending = source()
    .then(list => {
      setDocuments(list);
      setLoaded(true);
    })
    .catch(error => {
      // logged rather than reported: the page says the list couldn't be
      // fetched, and whatever the cause turns out to be is worth having here
      console.error('loading documents failed', error);
      setDocuments([]);
      setFailed(true);
    })
    .finally(() => { pending = undefined; });

  return pending;

}

/** empty the store and mark it unloaded; the next load fetches again */
export function flushDocuments(): void {
  setDocuments([]);
  setLoaded(false);
  setFailed(false);
}

/** throw the rows away and fetch them again */
export function refreshDocuments(): Promise<void> {
  flushDocuments();
  return loadDocuments();
}

/**
 * where the rows come from. the dev bypass has no session, so live data isn't an
 * option under it -- and the canned set is the point of that mode anyway. see
 * dev-access.ts.
 */
async function source(): Promise<BackstageDocument[]> {

  /* both dev switches lead with import.meta.env.DEV so the branches leave the
     production bundle entirely rather than merely going unreachable -- the
     callee's own check isn't enough for that. see dev-access.ts */

  if (import.meta.env.DEV && devFailLoads()) {
    await new Promise(resolve => setTimeout(resolve, 320));
    throw new Error('loading documents failed (?fail)');
  }

  if (import.meta.env.DEV && devBypass()) { return sample(); }

  // TODO: live data. ListDocuments() in ~/docs/documents returns DocumentsRow[],
  // which carries neither `starred` nor a version list -- both need somewhere to
  // come from before this branch can be written. until then the canned set
  // stands in, so the signed-in page still has something to draw.
  return sample();

}

/**
 * the canned set, after a short delay: it's already in memory, so it would
 * resolve before the page ever painted and the loading skeleton would be
 * unreachable rather than merely brief. a live fetch produces this on its own.
 *
 * the import is dynamic to keep the module graph acyclic. documents-sample.ts
 * takes the shape and the constants from this file, so a static import back the
 * other way puts its SEEDS table ahead of the constants it reads -- which fails
 * at load with "Cannot access 'ACCESS_PUBLIC' before initialization", and takes
 * the whole page with it.
 */
async function sample(): Promise<BackstageDocument[]> {
  const { sampleDocuments } = await import('./documents-sample');
  await new Promise(resolve => setTimeout(resolve, 320));
  return sampleDocuments();
}

/* ------------------------------------------------------------------ */
/* paths                                                               */
/* ------------------------------------------------------------------ */

/** the folder part of a full path: /finance/portfolio-var -> /finance */
export function folderOf(path: string): string {
  return path.slice(0, path.lastIndexOf('/'));
}

/** the document part of a full path: /finance/portfolio-var -> portfolio-var */
export function slugOf(path: string): string {
  return path.slice(path.lastIndexOf('/') + 1);
}

/** assemble a path from a folder ('' for root) and a name */
export function pathFor(folder: string, name: string): string {
  return `${folder}/${slugify(name)}`;
}

/**
 * what to show in the UI. documents saved through the old box have no name, so
 * the slug is all there is -- and it's shown as-is rather than prettified,
 * because un-slugifying can't recover "VaR" from "var" and shouldn't pretend to.
 */
export function displayName(doc: BackstageDocument): string {
  return doc.name || slugOf(doc.path);
}

/** true when the label above is really just the address */
export function isUnnamed(doc: BackstageDocument): boolean {
  return !doc.name;
}

/* ------------------------------------------------------------------ */
/* folders                                                             */
/* ------------------------------------------------------------------ */

export interface FolderNode {
  /** display name, i.e. the last path segment */
  name: string;
  /** full path, matching document.path */
  path: string;
  /** nesting level, 0 for top-level folders */
  depth: number;
  /** documents in this folder and everything below it */
  count: number;
  children: FolderNode[];
}

/**
 * derive the folder tree from document paths. paths are metadata -- there's no
 * folder table -- so a folder exists exactly when something lives in it.
 */
export function folderTree(list: BackstageDocument[]): FolderNode[] {

  const roots: FolderNode[] = [];
  const index = new Map<string, FolderNode>();

  const ensure = (path: string, depth: number): FolderNode => {

    const existing = index.get(path);
    if (existing) { return existing; }

    const node: FolderNode = {
      name: path.slice(path.lastIndexOf('/') + 1),
      path,
      depth,
      count: 0,
      children: [],
    };

    index.set(path, node);

    if (depth === 0) {
      roots.push(node);
    }
    else {
      ensure(path.slice(0, path.lastIndexOf('/')), depth - 1).children.push(node);
    }

    return node;

  };

  for (const doc of list) {

    // paths are full, so the folder is everything before the last segment;
    // a root-level document leaves nothing behind
    const folder = folderOf(doc.path);
    if (!folder) { continue; }

    const segments = folder.split('/').filter(Boolean);

    // walk every ancestor so nested folders get counts too
    for (let i = 0; i < segments.length; i++) {
      const path = '/' + segments.slice(0, i + 1).join('/');
      ensure(path, i).count++;
    }
  }

  const sort = (nodes: FolderNode[]) => {
    nodes.sort((a, b) => a.name.localeCompare(b.name));
    nodes.forEach(node => sort(node.children));
  };
  sort(roots);

  return roots;

}

/** flatten the tree into render order, parents before children */
export function flattenFolders(nodes: FolderNode[]): FolderNode[] {
  const out: FolderNode[] = [];
  const walk = (list: FolderNode[]) => {
    for (const node of list) {
      out.push(node);
      walk(node.children);
    }
  };
  walk(nodes);
  return out;
}

/* ------------------------------------------------------------------ */
/* formatting                                                          */
/* ------------------------------------------------------------------ */

const SHORT_DATE = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
const LONG_DATE = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const TIME = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });

/** absolute date; the year is only shown when it isn't the current one */
export function formatAbsolute(timestamp: number): string {
  const date = new Date(timestamp);
  return date.getFullYear() === new Date(NOW).getFullYear()
    ? SHORT_DATE.format(date)
    : LONG_DATE.format(date);
}

/** relative under a week, absolute after -- so the column stays scannable */
export function formatRelative(timestamp: number): string {

  const delta = NOW - timestamp;

  if (delta < 2 * MINUTE) { return 'just now'; }
  if (delta < HOUR) {
    const minutes = Math.floor(delta / MINUTE);
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }
  if (delta < DAY) {
    const hours = Math.floor(delta / HOUR);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }
  if (delta < 7 * DAY) {
    const days = Math.floor(delta / DAY);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }

  return formatAbsolute(timestamp);

}

/** date + time, for the version list where ordering within a day matters */
export function formatStamp(timestamp: number): string {
  const delta = NOW - timestamp;
  const date = new Date(timestamp);
  if (delta < DAY) { return `today, ${TIME.format(date)}`; }
  if (delta < 2 * DAY) { return `yesterday, ${TIME.format(date)}`; }
  return formatAbsolute(timestamp);
}

/* ------------------------------------------------------------------ */
/* sorting                                                             */
/* ------------------------------------------------------------------ */

export type SortKey = 'name' | 'path' | 'access' | 'modified';
export type SortDirection = 'asc' | 'desc';

export function sortDocuments(list: BackstageDocument[], key: SortKey, direction: SortDirection): BackstageDocument[] {

  const sign = direction === 'asc' ? 1 : -1;

  return [...list].sort((a, b) => {
    let result = 0;
    switch (key) {
      case 'name':
        result = displayName(a).localeCompare(displayName(b));
        break;
      case 'path':
        result = folderOf(a.path).localeCompare(folderOf(b.path))
          || displayName(a).localeCompare(displayName(b));
        break;
      case 'access':
        result = (a.access - b.access) || displayName(a).localeCompare(displayName(b));
        break;
      case 'modified':
        result = a.modified - b.modified;
        break;
    }
    return result * sign;
  });

}

/**
 * the path segment for a name. lowercase, ascii, hyphen-separated, no %20.
 *
 * diacritics are folded rather than dropped: "Análisis de Riesgo" has to become
 * "analisis-de-riesgo", not "an-lisis-de-riesgo", which is what you get if you
 * run the non-ascii characters through the separator rule.
 */
export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip the combining marks NFD split off
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** the URL a document lives at, e.g. /@duncan/finance/portfolio-var */
export function documentUrl(doc: BackstageDocument, user = 'duncan'): string {
  return `/@${user}${doc.path}`;
}

/**
 * the path is the identity, so no two documents can share one. paths are
 * matched case-insensitively, the same way the loader resolves them.
 */
export function findPathCollision(
    list: BackstageDocument[],
    path: string,
    ignore_id?: number): BackstageDocument | undefined {
  const target = path.toLowerCase();
  return list.find(doc => doc.id !== ignore_id && doc.path.toLowerCase() === target);
}
