
import { icons as mixed } from './mixed';
import type { IconSet } from './types';

/**
 * Every icon set, for the gallery page to choose between.
 *
 * NOTE: this is deliberately _not_ used by `index.ts`. index.ts is imported by
 * the whole app; if it pulled in this registry, every set would land in the
 * main bundle. Only the gallery (lazily loaded, dev-only) imports this.
 */
export const icon_sets = { mixed } satisfies Record<string, IconSet>;

export type IconSetName = keyof typeof icon_sets;
