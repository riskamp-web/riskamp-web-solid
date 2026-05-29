
import type { DataModel } from '@trebco/treb/treb-data-model';
import type { Grid } from '@trebco/treb/treb-grid';
import type { Parser } from '@trebco/treb/treb-parser';
import type { EmbeddedSpreadsheet } from 'riskamp-web';
import type { ToolbarMessage } from '@trebco/treb/treb-embed/src/toolbar-message';
import type { Color } from '@trebco/treb';
import type { Localization } from '@trebco/treb/treb-base-types';
import type { Calculator } from '@trebco/treb/treb-calculator';
import { createSignal } from 'solid-js';

/**
 * this is an attempt to unwind some of our field hiding.
 * TODO: just undo that at the source
 */

export type SpreadsheetType<T = unknown> = EmbeddedSpreadsheet<T> & {
  parser: Parser,
  grid: Grid,
  model: DataModel,
  calculator: Calculator,
  HandleToolbarMessage: (event: ToolbarMessage) => void,
  document_styles: {
    number_formats: string[], 
    colors: string[],
    theme_colors: Array<{ color: Color, resolved: string, }>[] // FIXME: type
  }
  // Localization: Localization; ??
}

