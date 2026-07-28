/**
 * canned data for the documents page redesign.
 *
 * the row shape intentionally matches DocumentsRow in ~/docs/documents, plus the
 * two things the redesign adds: a `starred` flag and a real version list. that way
 * swapping in ListDocuments() later is a data change, not a markup change.
 *
 * this file is part of the contained backstage redesign; nothing here is wired to
 * the document service.
 */

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
  name: string;
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

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * one clock reading for the whole module, so relative timestamps stay stable
 * within a session and the canned data never goes stale.
 */
export const NOW = Date.now();

/** the "recent" scope window */
export const RECENT_WINDOW = 14 * DAY;

/** documents keep at most this many versions (soft cap, matches the service) */
export const VERSION_CAP = 7;

/**
 * build a version list ending at `modified`, walking backwards toward `created`.
 * newest first, which is how the detail panel wants it.
 */
function versions(count: number, created: number, modified: number): DocumentVersion[] {

  const span = Math.max(modified - created, DAY);
  const gap = Math.max(span / (count + 1), 45 * MINUTE);

  const list: DocumentVersion[] = [];
  for (let i = 0; i < count; i++) {
    list.push({
      version: count - i,
      modified: Math.round(modified - (i * gap)),
    });
  }

  return list;

}

/**
 * [ name, path, access, starred, created (days ago), modified (ms ago), versions ]
 */
type Seed = [string, string, number, boolean, number, number, number];

/* public is the default access level, so private is the exception here too --
   roughly a quarter of the set */
const SEEDS: Seed[] = [
  ['Portfolio VaR',             '/finance',            ACCESS_PUBLIC,  true,  146,   2 * HOUR,  7],
  ['Revenue Ramp Scenarios',    '/finance',            ACCESS_PUBLIC,  true,   40,   2 * DAY,   4],
  ['Project NPV Risk',          '/finance',            ACCESS_PUBLIC,  false, 210,  14 * DAY,   5],
  ['Cashflow Simulation',       '/finance',            ACCESS_PUBLIC,  false, 320,  56 * DAY,   3],
  ['Retirement Drawdown',       '/finance',            ACCESS_PUBLIC,  false, 620, 260 * DAY,   4],
  ['Cost Overrun Analysis',     '/finance/capital',    ACCESS_PRIVATE, true,   88,   3 * DAY,   4],
  ['Capex Approval Model',      '/finance/capital',    ACCESS_PRIVATE, false, 190,  30 * DAY,   3],
  ['Loan Default Correlations', '/finance/credit',     ACCESS_PRIVATE, false, 400, 190 * DAY,   2],

  ['Demand Forecast 2027',      '/models',             ACCESS_PUBLIC,  true,   60,   5 * HOUR,  6],
  ['Project Schedule Risk',     '/models',             ACCESS_PUBLIC,  false, 130,  11 * DAY,   5],
  ['Supply Chain Disruption',   '/models',             ACCESS_PUBLIC,  false, 150,  21 * DAY,   4],
  ['Clinical Trial Enrollment', '/models',             ACCESS_PRIVATE, false, 240,  74 * DAY,   3],
  ['Catastrophe Bond Pricing',  '/models/actuarial',   ACCESS_PRIVATE, true,  175,   8 * HOUR,  3],
  ['Insurance Loss Model',      '/models/actuarial',   ACCESS_PUBLIC,  false, 300,  45 * DAY,   6],

  ['Well Production Model',     '/energy',             ACCESS_PUBLIC,  true,  500,   9 * DAY,   7],
  ['Reservoir Decline Curves',  '/energy',             ACCESS_PUBLIC,  false, 480, 130 * DAY,   5],
  ['Wind Farm Yield',           '/energy/renewables',  ACCESS_PUBLIC,  false,  95,   1 * DAY,   2],

  ['Option Pricing Sandbox',    '/scratch',            ACCESS_PUBLIC,  false,  12,  35 * MINUTE, 1],
  ['Sensitivity Test Bench',    '/scratch',            ACCESS_PUBLIC,  false,   5,  20 * MINUTE, 2],
  ['Correlation Matrix Draft',  '/scratch',            ACCESS_PRIVATE, false,   2,   6 * HOUR,   1],

  ['Monte Carlo Primer',        '',                    ACCESS_PUBLIC,  false, 700, 300 * DAY,   1],
];

export const DOCUMENTS: BackstageDocument[] = SEEDS.map((seed, index) => {

  const [name, path, access, starred, created_days, modified_ago, version_count] = seed;

  const created = NOW - (created_days * DAY);
  const modified = NOW - modified_ago;

  return {
    id: index + 1,
    userid: 1,
    name,
    path,
    status: STATUS_ACTIVE,
    access,
    created,
    modified,
    version: version_count,
    starred,
    versions: versions(version_count, created, modified),
  };

});

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
    if (!doc.path) { continue; } // root-level document, not in any folder

    const segments = doc.path.split('/').filter(Boolean);

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
        result = a.name.localeCompare(b.name);
        break;
      case 'path':
        result = (a.path || '').localeCompare(b.path || '') || a.name.localeCompare(b.name);
        break;
      case 'access':
        result = (a.access - b.access) || a.name.localeCompare(b.name);
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
  return `/@${user}${doc.path}/${slugify(doc.name)}`;
}

/**
 * the slug is the identity, so two documents in one folder can't share one.
 * returns the document already holding the slug, if any.
 */
export function findSlugCollision(
    list: BackstageDocument[],
    folder: string,
    slug: string,
    ignore_id?: number): BackstageDocument | undefined {
  return list.find(doc => doc.id !== ignore_id && doc.path === folder && slugify(doc.name) === slug);
}
