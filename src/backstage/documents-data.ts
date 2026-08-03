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

import { type BackstageDocument, type DocumentHistory, type DocumentVersion,
  flushDocuments,
  loaded, setLoaded,
  documents, setDocuments,
  histories, setHistories,
  failed, setFailed } from './documents-store';

import { devBypass, devFailHistory, devFailLoads } from './dev-access';
import * as auth from '~/lib/auth';

/* the date helpers below render text, so they translate like the page does.
   t() and currentLocale() read from solid state, so they're only reactive where
   they're called inside a tracking scope -- these are called from the page's
   jsx and from its memos, which are */
import { currentLocale, format, t, type StringKey } from '~/i18n/i18n';

/* the page's view state (scope / folder / search / sort) outlives the page, so
   it's kept in the app's persistent store rather than here -- see savedView() */
import { persistentData, setPersistentData, type DocumentsView } from '~/lib/app-data';

export const ACCESS_PRIVATE = 0;
export const ACCESS_PUBLIC = 1;

export const STATUS_ACTIVE = 0;
export const STATUS_DELETED = 1;


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



export { documents, setDocuments, loaded, failed, histories };

/* the store owns the shape, but this file is what the page imports from, so the
   types travel with the helpers rather than making callers know about both */
export type { BackstageDocument, DocumentHistory, DocumentVersion };

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

/** throw the rows away and fetch them again; flushDocuments() takes histories too */
export function refreshDocuments(): Promise<void> {
  flushDocuments();
  return loadDocuments();
}

/* ------------------------------------------------------------------ */
/* version history                                                     */
/* ------------------------------------------------------------------ */

/**
 * the key a document's history is stored under. lowercased, because that's how
 * the service resolves paths -- so /Finance/Model and /finance/model are one
 * document and must not end up as two entries.
 */
export function historyKey(path: string): string {
  return path.toLowerCase();
}

/** the history entry for a path, or undefined when nothing has asked for it yet */
export function historyOf(path: string): DocumentHistory | undefined {
  return histories[historyKey(path)];
}

/**
 * fill in a document's version history, unless it's already there or already on
 * its way -- so the panel can call this every time it opens without tracking
 * what it has fetched. returns nothing: the store is the result, and a failure
 * is a 'failed' entry rather than a rejection.
 *
 * a failed entry is left in place rather than deleted, so the panel can say the
 * history couldn't be fetched instead of sitting on a spinner. retryHistory()
 * is what clears it.
 */
export function loadHistory(path: string): void {

  const key = historyKey(path);

  // present in any state means someone already asked: loading is in flight,
  // ready is the answer, and failed needs an explicit retry rather than a
  // silent refetch every time the panel reopens
  if (histories[key]) { return; }

  setHistories(key, { status: 'loading', versions: [] });

  historySource(path)
    .then(versions => setHistories(key, { status: 'ready', versions: newestFirst(versions) }))
    .catch(error => {
      console.error('loading document history failed', path, error);
      setHistories(key, { status: 'failed', versions: [] });
    });

}

/**
 * newest version first, which is the order the panel renders. sorted here, on
 * the way into the store, rather than trusted from the source: the service
 * returns oldest first, and the panel shouldn't have to care which end of the
 * list it was handed. version numbers are the key, not timestamps -- they're
 * the thing guaranteed to increase.
 */
function newestFirst(versions: DocumentVersion[]): DocumentVersion[] {
  return [...versions].sort((a, b) => b.version - a.version);
}

/** drop a failed (or stale) entry so the next loadHistory() fetches again */
export function retryHistory(path: string): void {
  setHistories(historyKey(path), undefined as unknown as DocumentHistory);
  loadHistory(path);
}

/**
 * where a document's history comes from.
 *
 * STUB -- this is canned data on a timer, not the service. the real call is
 * already in ~/docs/SVELTE-documents (DocumentHistory): POST /api/document-history
 * with { path }, returning HistoryEntry[], which is DocumentVersion[] under
 * another name. swapping it in means replacing this body, nothing above it.
 */
async function historySource(path: string): Promise<DocumentVersion[]> {

  if (import.meta.env.DEV && devFailHistory()) {
    await new Promise(resolve => setTimeout(resolve, 480));
    throw new Error('loading document history failed (?fail-history)');
  }

  if (import.meta.env.DEV && devBypass()) {

    const { sampleHistory } = await import('./documents-sample');

    // slower than the list on purpose: this is the state the panel has to render
    // well, and it's unreachable if the data is there before the panel opens
    await new Promise(resolve => setTimeout(resolve, 700));

    const doc = documents.find(row => historyKey(row.path) === historyKey(path));
    return doc ? sampleHistory(doc) : [];

  }

  const result = await auth.AccessResource('/api/document-history', { path });
  if (result.ok) {
    const json = await result.json();
    return json || [];
  }

  throw new Error('loading document history failed');

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

  const result = await auth.AccessResource('/api/list-documents');
  if (result.ok) {
    const json = await result.json();
    console.info({json});
    return (json.list || []);
  }
  else {
    throw new Error('loading documents failed');
  }
  
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

/*
 * a path is `@owner/folder/slug`: the owner's handle, then zero or more folder
 * segments, then the document's slug. no leading slash -- the path is what
 * follows the origin, and documentUrl() adds the slash back.
 *
 * the owner segment is part of the address but it is not a folder. every one of
 * an account's documents sits under it, so treating it as one would file the
 * entire list inside a single folder that never tells you anything, and push
 * every real folder down a level. folderOf() strips it, and the folder tree is
 * built from what's left -- so a folder path is relative to the owner's root
 * and a document directly under the owner has no folder at all.
 */

/** the owner segment: @dwerner/finance/portfolio-var -> @dwerner */
export function ownerOf(path: string): string {
  const cut = path.indexOf('/');
  return cut < 0 ? path : path.slice(0, cut);
}

/**
 * the folder part, relative to the owner and with a leading slash:
 * @dwerner/finance/portfolio-var -> /finance, and @dwerner/bubbles -> '',
 * which is the owner's root.
 */
export function folderOf(path: string): string {
  const first = path.indexOf('/');
  const last = path.lastIndexOf('/');
  return first === last ? '' : path.slice(first, last);
}

/** the document part: @dwerner/finance/portfolio-var -> portfolio-var */
export function slugOf(path: string): string {
  return path.slice(path.lastIndexOf('/') + 1);
}

/** assemble a path from an owner, a folder ('' for the owner's root) and a name */
export function pathFor(owner: string, folder: string, name: string): string {
  return `${owner}${folder}/${slugify(name)}`;
}

/**
 * drop the folder from a name that is only the document's address restated.
 *
 * the old save box wrote the address into the name field, so a document inside
 * a folder comes back named "gort/horn" -- folder and slug -- which renders as
 * a folder sitting in the title. the label is the document, not the route to it.
 *
 * checked against *this document's own* path rather than by looking for a '/',
 * because names legitimately contain them: "LLM pricing 10/15/2024" is a real
 * name in the real data, and a blanket "take the last segment" rule would show
 * it as "2024".
 *
 * what's kept is the name's own last segment, not the slug, so whatever casing
 * was typed survives -- slugs are lowercased, and un-slugifying can't recover
 * "VaR" from "var". for a document at the owner's root the address is just the
 * slug, so this is a no-op and a name like "Bubbles" is left alone.
 */
function trimAddressName(doc: BackstageDocument): string {

  const name = doc.name.trim();

  // the stored form has no leading slash; folderOf() supplies one, so drop it
  const address = `${folderOf(doc.path)}/${slugOf(doc.path)}`.slice(1);

  // compared case-insensitively, the way paths are compared everywhere else
  if (name.toLowerCase() !== address.toLowerCase()) { return doc.name; }

  return name.slice(name.lastIndexOf('/') + 1);

}

/**
 * what to show in the UI. documents saved through the old box have no name, so
 * the slug is all there is -- and it's shown as-is rather than prettified,
 * because un-slugifying can't recover "VaR" from "var" and shouldn't pretend to.
 */
export function displayName(doc: BackstageDocument): string {
  return isUnnamed(doc) ? slugOf(doc.path) : trimAddressName(doc);
}

/** true when the label above is really just the address */
export function isUnnamed(doc: BackstageDocument): boolean {

  // 'Unnamed document' is a sentinel, not a name -- hopefully generated by the
  // back end rather than written to the database, in which case this goes

  return !doc.name || doc.name === 'Unnamed document';
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
 *
 * folder paths here are owner-relative (`/finance/capital`), because folderOf()
 * drops the owner segment: it isn't a folder, and an account with no folders at
 * all should show none rather than one holding everything.
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
    nodes.sort((a, b) => compareText(a.name, b.name));
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

/**
 * everything on this page that Intl decides: dates, times, counts, sort order,
 * and which plural form a count takes.
 *
 * built once per locale rather than per call -- Intl objects are expensive
 * enough that a collator rebuilt inside a comparator would be felt on a long
 * list -- and rebuilt when currentLocale() changes. reading the signal *here*
 * rather than at module scope is what makes the page redraw itself on a
 * language change: the readers below are called from the page's jsx and memos,
 * so the read is tracked, and a stale set can't outlive the locale that made it.
 */
function intl(): {
  short_date: Intl.DateTimeFormat;
  long_date: Intl.DateTimeFormat;
  time: Intl.DateTimeFormat;
  number: Intl.NumberFormat;
  collator: Intl.Collator;
  plurals: Intl.PluralRules;
} {

  const locale = currentLocale();
  if (intl_cache && intl_cache.locale === locale) { return intl_cache.formats; }

  intl_cache = { locale, formats: build(locale) };
  return intl_cache.formats;

}

let intl_cache: { locale: string, formats: ReturnType<typeof build> } | undefined;

/**
 * a locale Intl doesn't recognise throws rather than falling back, and
 * UpdateLanguage doesn't validate what it's handed. a bad tag shouldn't take
 * the page down with it, so this drops to the runtime default and says so.
 */
function build(locale: string) {
  try {
    return formats(locale);
  }
  catch (error) {
    console.error('building formats for locale failed; using the default', locale, error);
    return formats(undefined);
  }
}

function formats(locale: string | undefined) {
  return {
    short_date: new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }),
    long_date: new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' }),
    time: new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }),
    number: new Intl.NumberFormat(locale),
    collator: new Intl.Collator(locale),
    plurals: new Intl.PluralRules(locale),
  };
}

/** counts, in the locale's digits and grouping -- 1,205 documents, or ١٬٢٠٥ */
export function formatNumber(value: number): string {
  return intl().number.format(value);
}

/** the locale's idea of alphabetical order, for the sort helpers below */
export function compareText(a: string, b: string): number {
  return intl().collator.compare(a, b);
}

/** absolute date; the year is only shown when it isn't the current one */
export function formatAbsolute(timestamp: number): string {
  const date = new Date(timestamp);
  return date.getFullYear() === new Date(NOW).getFullYear()
    ? intl().short_date.format(date)
    : intl().long_date.format(date);
}

/**
 * "{count} minutes ago" and friends, in the singular or the plural.
 *
 * the form is chosen here rather than in the string because a language file
 * can't branch. Intl.PluralRules picks it, so which numbers count as singular
 * is the locale's business, not english's -- french calls 0 singular, english
 * doesn't. a locale with categories we don't carry keys for (few, many) lands
 * on .other, which is the closest thing we have.
 */
export function formatCount(count: number, one: StringKey, other: StringKey): string {
  const category = intl().plurals.select(count);
  return format(t(category === 'one' ? one : other), { count: formatNumber(count) });
}

/** relative under a week, absolute after -- so the column stays scannable */
export function formatRelative(timestamp: number): string {

  const delta = NOW - timestamp;

  if (delta < 2 * MINUTE) { return t('documents-page.time.just-now'); }
  if (delta < HOUR) {
    return formatCount(Math.floor(delta / MINUTE), 'documents-page.time.minutes.one', 'documents-page.time.minutes.other');
  }
  if (delta < DAY) {
    return formatCount(Math.floor(delta / HOUR), 'documents-page.time.hours.one', 'documents-page.time.hours.other');
  }
  if (delta < 7 * DAY) {
    return formatCount(Math.floor(delta / DAY), 'documents-page.time.days.one', 'documents-page.time.days.other');
  }

  return formatAbsolute(timestamp);

}

/** date + time, for the version list where ordering within a day matters */
export function formatStamp(timestamp: number): string {
  const delta = NOW - timestamp;
  const date = new Date(timestamp);
  if (delta < DAY) { return format(t('documents-page.time.today'), { time: intl().time.format(date) }); }
  if (delta < 2 * DAY) { return format(t('documents-page.time.yesterday'), { time: intl().time.format(date) }); }
  return formatAbsolute(timestamp);
}

/* ------------------------------------------------------------------ */
/* sorting                                                             */
/* ------------------------------------------------------------------ */

export type SortKey = 'name' | 'path' | 'access' | 'version' | 'modified';
export type SortDirection = 'asc' | 'desc';

/* the runtime lists exist for savedView(): a persisted value is untrusted input,
   and a union type can't check one at runtime */
const SORT_KEYS: SortKey[] = ['name', 'path', 'access', 'version', 'modified'];
const SORT_DIRECTIONS: SortDirection[] = ['asc', 'desc'];

export function sortDocuments(list: BackstageDocument[], key: SortKey, direction: SortDirection): BackstageDocument[] {

  const sign = direction === 'asc' ? 1 : -1;

  return [...list].sort((a, b) => {
    let result = 0;
    switch (key) {
      case 'name':
        result = compareText(displayName(a), displayName(b));
        break;
      case 'path':
        result = compareText(folderOf(a.path), folderOf(b.path))
          || compareText(displayName(a), displayName(b));
        break;
      case 'access':
        result = (a.access - b.access) || compareText(displayName(a), displayName(b));
        break;
      case 'version':
        result = (a.version - b.version) || compareText(displayName(a), displayName(b));
        break;
      case 'modified':
        result = a.modified - b.modified;
        break;
    }
    return result * sign;
  });

}

/* ------------------------------------------------------------------ */
/* the saved view                                                      */
/* ------------------------------------------------------------------ */

/**
 * the rail's top-level filters. lives here rather than in the page because the
 * saved view stores one, and ~/lib/app-data types the stored value against this.
 */
export type DocumentScope = 'all' | 'starred' | 'recent' | 'private';

const SCOPE_KEYS: DocumentScope[] = ['all', 'starred', 'recent', 'private'];

/** what a fresh visit looks like: everything, newest first, nothing typed */
export const DEFAULT_VIEW: Required<Omit<DocumentsView, 'folder' | 'open'>>
    & { folder: string | undefined, open: string | undefined } = {
  scope: 'all',
  folder: undefined,
  search: '',
  sort: 'modified',
  direction: 'desc',
  open: undefined,
};

/**
 * the view the page was left in -- scope, folder, search, sort, and the open
 * document. that lives in persistentData rather than in the page because a
 * route component's state dies with it: opening a document unmounts the page,
 * so restoring the list on the way back needs somewhere outside it to have kept
 * the answer. the document store next door can't be it, since this is about the
 * page's view of the rows, not the rows.
 *
 * persisted rather than session-scoped, so it survives a reload as well as a
 * navigation -- there's nothing here worth losing, and nothing private.
 *
 * every field is validated: this is JSON from localStorage, potentially written
 * by an older build, so a value that isn't one of ours reverts to its default
 * rather than putting the page in a state it can't draw.
 */
export function savedView(): typeof DEFAULT_VIEW {

  const saved = persistentData.documents_view || {};

  return {
    scope: SCOPE_KEYS.includes(saved.scope!) ? saved.scope! : DEFAULT_VIEW.scope,
    folder: typeof saved.folder === 'string' && saved.folder ? saved.folder : undefined,
    search: typeof saved.search === 'string' ? saved.search : DEFAULT_VIEW.search,
    sort: SORT_KEYS.includes(saved.sort!) ? saved.sort! : DEFAULT_VIEW.sort,
    direction: SORT_DIRECTIONS.includes(saved.direction!) ? saved.direction! : DEFAULT_VIEW.direction,
    /* only shape-checked here: whether the path still names a document can't be
       known until the rows are in, so the page resolves it -- see openDocument
       in documents.tsx */
    open: typeof saved.open === 'string' && saved.open ? saved.open : undefined,
  };

}

/**
 * write the view back. the whole object every time rather than a field at a
 * time: the page saves from one effect that reads all six, so there's no
 * partial state to merge, and replacing the object keeps a removed field from
 * lingering in localStorage.
 */
export function saveView(view: DocumentsView): void {
  setPersistentData('documents_view', { ...view });
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

/** the URL a document lives at is the path */
export function documentUrl(doc: BackstageDocument): string {
  return `/${doc.path}`;
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
