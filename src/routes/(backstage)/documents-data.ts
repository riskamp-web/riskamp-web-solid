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
 * [ name, full path, access, starred, created (days ago), modified (ms ago), versions ]
 *
 * an empty name is a legacy document: the old save box only took a slug, so the
 * path is all it has. roughly a third of the set here, which is deliberate --
 * unnamed is the common case in the real data, not the edge case.
 */
type Seed = [string, string, number, boolean, number, number, number];

/* public is the default access level, so private is the exception here too --
   roughly a quarter of the set */
const SEEDS: Seed[] = [
  ['Portfolio VaR',             '/finance/portfolio-var',              ACCESS_PUBLIC,  true,  146,   2 * HOUR,  7],
  ['Revenue Ramp Scenarios',    '/finance/revenue-ramp-scenarios',     ACCESS_PUBLIC,  true,   40,   2 * DAY,   4],
  ['Project NPV Risk',          '/finance/project-npv-risk',           ACCESS_PUBLIC,  false, 210,  14 * DAY,   5],
  ['',                          '/finance/cashflow-simulation',        ACCESS_PUBLIC,  false, 320,  56 * DAY,   3],
  ['',                          '/finance/retirement-drawdown',        ACCESS_PUBLIC,  false, 620, 260 * DAY,   4],
  ['Cost Overrun Analysis',     '/finance/capital/cost-overrun',       ACCESS_PRIVATE, true,   88,   3 * DAY,   4],
  ['Capex Approval Model',      '/finance/capital/capex-approval',     ACCESS_PRIVATE, false, 190,  30 * DAY,   3],
  ['',                          '/finance/credit/loan-default-corr',   ACCESS_PRIVATE, false, 400, 190 * DAY,   2],

  ['Demand Forecast 2027',      '/models/demand-forecast-2027',        ACCESS_PUBLIC,  true,   60,   5 * HOUR,  6],
  ['Project Schedule Risk',     '/models/project-schedule-risk',       ACCESS_PUBLIC,  false, 130,  11 * DAY,   5],
  ['Supply Chain Disruption',   '/models/supply-chain-disruption',     ACCESS_PUBLIC,  false, 150,  21 * DAY,   4],
  ['',                          '/models/clinical-trial-enrollment',   ACCESS_PRIVATE, false, 240,  74 * DAY,   3],
  ['Catastrophe Bond Pricing',  '/models/actuarial/cat-bond-pricing',  ACCESS_PRIVATE, true,  175,   8 * HOUR,  3],
  ['',                          '/models/actuarial/insurance-loss',    ACCESS_PUBLIC,  false, 300,  45 * DAY,   6],

  ['Well Production Model',     '/energy/well-production-model',       ACCESS_PUBLIC,  true,  500,   9 * DAY,   7],
  ['',                          '/energy/reservoir-decline-curves',    ACCESS_PUBLIC,  false, 480, 130 * DAY,   5],
  ['Wind Farm Yield',           '/energy/renewables/wind-farm-yield',  ACCESS_PUBLIC,  false,  95,   1 * DAY,   2],

  ['Option Pricing Sandbox',    '/scratch/option-pricing-sandbox',     ACCESS_PUBLIC,  false,  12,  35 * MINUTE, 1],
  ['Sensitivity Test Bench',    '/scratch/sensitivity-test-bench',     ACCESS_PUBLIC,  false,   5,  20 * MINUTE, 2],
  ['Correlation Matrix Draft',  '/scratch/correlation-matrix-draft',   ACCESS_PRIVATE, false,   2,   6 * HOUR,   1],

  ['',                          '/monte-carlo-primer',                 ACCESS_PUBLIC,  false, 700, 300 * DAY,   1],
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
