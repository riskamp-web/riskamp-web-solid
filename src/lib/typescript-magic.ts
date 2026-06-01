
import type { CellStyle, EmbeddedSpreadsheet } from 'riskamp-web';

/** typescript magic */
export type BooleanKeys<T> = keyof {
  [K in keyof T as T[K] extends boolean | undefined ? K : never]: T[K];
};

/** more typescript magic */
export function ApplyProperty<K extends keyof CellStyle>(sheet: EmbeddedSpreadsheet|undefined, prop: K, value: CellStyle[K]) {
  sheet?.ApplyStyle(undefined, {[prop]: value});
  sheet?.Focus();
}

/** more typescript magic */
export type CellStyleEntry = {
  [K in keyof CellStyle]: [K, CellStyle[K]]
}[keyof CellStyle];

