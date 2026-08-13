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
/* reflecting a save into the store                                    */
/* ------------------------------------------------------------------ */

/**
 * the fields a completed save / save-as reports back to the local store: a
 * partial BackstageDocument -- the very row it's mirroring -- with path and
 * version required and everything else optional. derived rather than declared
 * so it can't drift from the row shape it updates, and so a caller that happens
 * to hold a full row (a future back end that returns one) can pass it straight
 * through.
 *
 * the back end has already been written by the time this is handed over, so
 * these are only the values the store needs to reflect it. an omitted field
 * means "leave the existing row's value alone" on an update -- an in-place save
 * reports neither name nor access -- and falls back to a default on an insert
 * (see upsertDocument). path and version are the two a save always knows.
 */
export type SavedDocument = Partial<BackstageDocument> & Pick<BackstageDocument, 'path' | 'version'>;

/**
 * ids for rows we insert locally, before a refetch replaces them with the real
 * ones. counts down from 0 so it can never collide with a server id (those are
 * positive), and a refreshDocuments() throws the whole set away regardless -- so
 * these only have to be unique among the client-inserted rows in one session.
 */
let localId = 0;
function nextLocalId(): number {
  return --localId;
}

/**
 * reflect a completed save / save-as in the store. inserts a row for a path the
 * store doesn't have, and merges into the row it does -- so a new document,
 * a save-as to a fresh path, an in-place save and an overwrite (a save-as onto
 * an existing path) all land correctly off the one rule "does this path exist?".
 * matched case-insensitively, the way the loader and findPathCollision resolve.
 *
 * a no-op until the store has been loaded: an unloaded store isn't missing this
 * row, it's missing every row, and its first loadDocuments() will fetch the save
 * along with the rest -- writing here would only mark it loaded with one row in it.
 *
 * history is handled per options.history (default 'record' -- see recordVersion);
 * pass 'invalidate' to drop the cached history instead, or 'none' to leave it.
 */
export function upsertDocument(
    saved: SavedDocument,
    options?: { history?: 'record' | 'invalidate' | 'none' }): void {

  if (!loaded()) { return; }

  const modified = saved.modified ?? Date.now();
  const key = saved.path.toLowerCase();
  const isNew = !documents.some(doc => doc.path.toLowerCase() === key);

  if (isNew) {
    // honour anything the caller does supply; synthesise the rest a save doesn't
    // report -- a local negative id (see nextLocalId), the current user, active
    // status, created == modified, and the redesign's own defaults
    setDocuments(documents.length, {
      id: saved.id ?? nextLocalId(),
      userid: saved.userid ?? documents[0]?.userid ?? 0,
      name: saved.name ?? '',
      path: saved.path,
      status: saved.status ?? STATUS_ACTIVE,
      access: saved.access ?? ACCESS_PRIVATE,
      created: saved.created ?? modified,
      modified,
      version: saved.version,
      app: saved.app,
      api_version: saved.api_version ?? 2,
      starred: saved.starred ?? false,
    });
  }
  else {
    // only the provided fields, so an in-place save (which reports neither) can't
    // wipe the row's name, access, api_version or starred flag
    const changes: Partial<BackstageDocument> = { version: saved.version, modified };
    if (saved.name !== undefined) { changes.name = saved.name; }
    if (saved.access !== undefined) { changes.access = saved.access; }
    if (saved.api_version !== undefined) { changes.api_version = saved.api_version; }
    if (saved.starred !== undefined) { changes.starred = saved.starred; }

    setDocuments(doc => doc.path.toLowerCase() === key, prev => ({ ...prev, ...changes }));
  }

  const history = options?.history ?? 'record';
  if (history === 'record') { recordVersion(saved.path, saved.version, modified, { seedIfAbsent: isNew }); }
  else if (history === 'invalidate') { invalidateHistory(saved.path); }

}

/**
 * the values a completed rename / move reports back to the local store. only the
 * new `path` -- the new identity -- is required; name and access are updated when
 * provided and left alone when omitted. no `version`: a rename doesn't modify the
 * document, so the row keeps the version it already had. modified defaults to now.
 */
export type RenamedDocument =
  Pick<BackstageDocument, 'path'> &
  Partial<Pick<BackstageDocument, 'name' | 'access' | 'modified'>>;

/**
 * reflect a completed rename / move in the store: relocate the existing row from
 * `from` to `to.path`, rather than upsertDocument's insert-a-new-row. a rename
 * changes a document's identity (its path) and pretty name, so feeding it through
 * upsertDocument would strand the old-path row as a duplicate -- this moves the
 * one row instead. paths are matched case-insensitively, the way the rest of the
 * module resolves them.
 *
 * unlike a save, a rename leaves the document body untouched: the version does
 * NOT change (the row keeps its own), and history is migrated to the new key
 * rather than gaining a version. only path, name, (maybe) access and the modified
 * time change -- and modified always does, a metadata edit still being an edit.
 *
 * name collisions aren't handled here: the app requires the target be deleted
 * first, so the destination path is always free -- there's no overwrite branch.
 *
 * a no-op until the store has been loaded (same reasoning as upsertDocument), and
 * a no-op when the store doesn't hold the source row: there's nothing on screen
 * to move, and a later loadDocuments() will fetch it already renamed.
 */
export function renameDocument(from: string, to: RenamedDocument): void {

  if (!loaded()) { return; }

  const fromKey = from.toLowerCase();
  const key = to.path.toLowerCase();
  const modified = to.modified ?? Date.now();

  if (!documents.some(doc => doc.path.toLowerCase() === fromKey)) { return; }

  // move + merge the existing row, keyed on the still-old path. id, version,
  // created, starred, api_version, etc. all carry over via ...prev -- a rename
  // changes only path, name, (maybe) access, and always the modified time
  setDocuments(doc => doc.path.toLowerCase() === fromKey, prev => ({
    ...prev,
    path: to.path,
    name: to.name ?? prev.name,
    access: to.access ?? prev.access,
    modified,
  }));

  // migrate the version history to the new key -- a rename doesn't add a version,
  // so the doc's existing history simply moves address. guarded on fromKey !== key
  // so a case-only rename (same lowercased path) doesn't set then immediately
  // delete its own entry
  if (fromKey !== key) {
    const hist = histories[fromKey];
    if (hist) {
      setHistories(key, hist);
      invalidateHistory(from);
    }
  }

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
 * record a just-saved version into the cached history, so the panel stays right
 * without a refetch. the new version is the newest, so:
 *
 *   - a loaded ('ready') list gets it prepended (deduped by number and capped);
 *   - an absent entry is seeded as a one-version 'ready' list when seedIfAbsent
 *     (the default) -- correct for a brand-new document, whose only version this
 *     is. pass false for an existing document whose full history isn't loaded,
 *     where a one-entry list would hide its older versions: absent is left absent
 *     so loadHistory() can fetch the real list when the panel next opens;
 *   - a 'loading' or 'failed' entry is dropped, so that same next open refetches.
 */
export function recordVersion(
    path: string, version: number, modified: number,
    options?: { seedIfAbsent?: boolean }): void {

  const key = historyKey(path);
  const entry: DocumentVersion = { version, modified };
  const current = histories[key];

  if (current?.status === 'ready') {
    const versions = newestFirst([entry, ...current.versions.filter(v => v.version !== version)])
      .slice(0, VERSION_CAP);
    setHistories(key, 'versions', versions);
  }
  else if (!current) {
    if (options?.seedIfAbsent ?? true) {
      setHistories(key, { status: 'ready', versions: [entry] });
    }
  }
  else {
    // loading or failed: drop it so the next loadHistory() fetches the real list
    invalidateHistory(path);
  }

}

/** drop the cached history for a path so the next loadHistory() refetches it */
export function invalidateHistory(path: string): void {
  setHistories(historyKey(path), undefined as unknown as DocumentHistory);
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

/**
 * true when a string is shaped like a document path: an `@owner` segment
 * followed by at least one more segment -- `@dwerner/bubbles` is the minimum,
 * `@dwerner/finance/portfolio-var` adds folders. the helpers below all assume
 * this shape, so this is the gate to put in front of untrusted input (a typed
 * url, a stored value from an older build).
 *
 * shape only: whether the path names a document that exists is a question for
 * the rows, not for the string. every segment has to be non-empty and free of
 * whitespace -- '@dwerner/', '@dwerner//model' and a leading slash are all out,
 * and so is a bare '@dwerner', which is an owner rather than a document.
 *
 * casing isn't checked. paths are written slugged (lowercase), but the back end
 * resolves them case-insensitively and legacy rows carry mixed case, so
 * '@dwerner/Finance/Model' is a valid path -- see folderTree().
 */
export function isValidPath(path: string): boolean {
  return /^@[^/\s]+(?:\/[^/\s]+)+$/.test(path);
}

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

/** given a path, remove the owner segment: @dwerner/finance/portfolio-var -> finance/portfolio-var */
export function pathOf(path: string): string {
  const cut = path.indexOf('/');
  return cut < 0 ? path : path.slice(cut + 1);
}

/** assemble a path from an owner, a folder ('' for the owner's root) and a name */
export function pathFor(owner: string, folder: string, name: string): string {
  return `${owner}${folder}/${slugSegment(name)}`;
}

/**
 * the pretty display form of a document, split out of its name field against
 * its path: the folder segments to show (with their typed casing) and the
 * document's own label.
 *
 * the name field carries a full pretty path -- "Finance/Reports/My Model" --
 * because the path itself is slugged (lowercase, ascii) and is the only place a
 * folder's typed casing could otherwise live. every '/' in a name is a folder
 * separator: names are not allowed to contain a literal one.
 *
 * a v2+ document (api_version >= 2) is always split this way -- the name is
 * authoritative. old data isn't so tidy, so for a legacy document the split is
 * *structure-aware*: the name's leading segments are trusted as folders only
 * when there's one per path folder and each slugs to the matching path folder.
 * otherwise the name is a plain title -- which legitimately contains slashes,
 * "LLM pricing 10/15/2024" is real data, and a bare "Portfolio VaR" keeps its
 * folder in the path -- and the folders come from the path instead.
 *
 * when the name doesn't supply folders, they fall back to the path's own
 * segments (with whatever casing the path carries) so folderTree still has a
 * label. an unnamed document is all slug, shown as-is: un-slugifying can't
 * recover "VaR" from "var" and shouldn't pretend to.
 */
function prettyPath(doc: BackstageDocument): { folders: string[]; name: string } {

  const pathFolders = folderOf(doc.path).split('/').filter(Boolean);

  if (isUnnamed(doc)) {
    return { folders: pathFolders, name: slugOf(doc.path) };
  }

  const segments = doc.name.trim().split('/');
  const leading = segments.length - 1;

  // v2+ documents store the folder path in the name, so the name is
  // authoritative -- always split. legacy documents may carry a bare title with
  // the folder in the path, or a title with non-separator slashes ("LLM pricing
  // 10/15/2024"), so the split is trusted only when it mirrors the path folders.
  const trusted = (doc.api_version ?? 0) >= 2
    || (leading === pathFolders.length
        && pathFolders.every((seg, i) => slugSegment(segments[i]) === slugSegment(seg)));

  if (trusted) {
    return { folders: segments.slice(0, leading).filter(Boolean), name: segments[leading] || doc.name.trim() };
  }

  return {
    folders: pathFolders,                                   // the path's own casing
    name: doc.name.trim(),
  };

}

/** what to show as a document's label -- the pretty leaf of its name */
export function displayName(doc: BackstageDocument): string {
  return prettyPath(doc).name;
}

/** the pretty folder segments for a document, aligned 1:1 with its path folders */
export function displayFolders(doc: BackstageDocument): string[] {
  return prettyPath(doc).folders;
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
 * folders are consolidated *case-insensitively*, because the back end resolves
 * paths that way -- /Finance/Model and /finance/model are one folder, not two.
 * the node is keyed by the lowercased slug path (its identity, and what the page
 * filters and selects on), and labelled with the pretty segment from the *first*
 * document (in list order) to land in it: displayFolders() supplies the typed
 * casing from the name field, falling back to the path's own casing.
 *
 * node paths are owner-relative (`/finance/capital`), because folderOf() drops
 * the owner segment: it isn't a folder, and an account with no folders at all
 * should show none rather than one holding everything.
 */
export function folderTree(list: BackstageDocument[]): FolderNode[] {

  const roots: FolderNode[] = [];
  const index = new Map<string, FolderNode>();   // keyed by the lowercased slug path

  for (const doc of list) {

    // paths are full, so the folder is everything before the last segment;
    // a root-level document leaves nothing behind
    const slugs = folderOf(doc.path).split('/').filter(Boolean);
    if (!slugs.length) { continue; }

    const pretty = displayFolders(doc);           // aligned 1:1 with slugs

    // walk every ancestor so nested folders get counts too
    let key = '';
    let parent: FolderNode | undefined;

    for (let i = 0; i < slugs.length; i++) {

      key += '/' + slugs[i].toLowerCase();

      let node = index.get(key);
      if (!node) {
        // first sighting sets the display casing; the path is the lowercased key
        node = { name: pretty[i] ?? slugs[i], path: key, depth: i, count: 0, children: [] };
        index.set(key, node);
        if (parent) { parent.children.push(node); } else { roots.push(node); }
      }

      node.count++;
      parent = node;
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
  scroll: 0,
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
    scroll: typeof saved.scroll === 'number' && saved.scroll >= 0 ? saved.scroll : DEFAULT_VIEW.scroll,
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

/**
 * encode a segment whose slug would be empty -- all non-ascii or punctuation,
 * "\u7814\u7a76" or "!!!" -- as its code points in base36, '-' joined. this keeps the
 * path segment non-empty where slugify() would drop it.
 *
 * NFC + lowercase first so equal text produces equal tokens (tagging exact
 * matches) and casing folds the way the rest of the folder model does. the
 * output stays inside [0-9a-z-], so re-running slugify() over it is a no-op and
 * the folder comparison/keying code needs no special case. it's a bijection --
 * no collisions, and reversible if we ever want to recover the text.
 */
function encodeSegment(text: string): string {
  return Array.from(text.normalize('NFC').toLowerCase())
    .map(ch => ch.codePointAt(0)!.toString(36))
    .join('-');
}

/**
 * a slug for a single path segment that never collapses to '' for non-empty
 * input: the normal slug, or the code-point encoding above when the slug would
 * be empty. '' only when there's nothing but whitespace to begin with.
 */
export function slugSegment(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) { return ''; }
  return slugify(trimmed) || encodeSegment(trimmed);
}

/** the URL a document lives at is the path */
export function documentUrl(doc: BackstageDocument): string {
  return `/${doc.path}`;
}

/**
 * the path is the identity, so no two documents can share one. paths are
 * matched case-insensitively, the same way the loader resolves them -- which
 * goes for the exclusion below too, for the same reason historyKey() lowercases.
 *
 * ignore_path is a full path to leave out of the match: a document renamed in
 * place would otherwise collide with itself. a path rather than an id because
 * that's what callers reliably have -- a loaded document knows where it lives,
 * but not necessarily which row it came from.
 */
export function findPathCollision(
    list: BackstageDocument[],
    path: string,
    ignore_path?: string): BackstageDocument | undefined {
  const target = path.toLowerCase();
  const ignore = ignore_path?.toLowerCase();
  return list.find(doc => {
    const candidate = doc.path.toLowerCase();
    return candidate === target && candidate !== ignore;
  });
}
