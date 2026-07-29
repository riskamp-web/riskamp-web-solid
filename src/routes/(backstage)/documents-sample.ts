/**
 * canned documents for the redesign.
 *
 * nothing here is wired to the document service -- this is the set the page is
 * designed against, and what loadDocuments() serves in dev. it lives apart from
 * documents-data.ts so that file is the shape and the helpers, not the fixture.
 */

import {
  ACCESS_PRIVATE, ACCESS_PUBLIC, BackstageDocument, DAY, DocumentVersion, HOUR, MINUTE, NOW, STATUS_ACTIVE,
} from './documents-data';

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

/**
 * a fresh copy of the canned set. the page mutates what it's given -- star,
 * access, rename and delete all write to its store -- so each call builds its
 * own rows rather than handing out the module's.
 */
export function sampleDocuments(): BackstageDocument[] {

  return SEEDS.map((seed, index) => {

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

}
