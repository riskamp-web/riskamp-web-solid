
import type { DataModel } from '@trebco/treb/treb-data-model';
import type { Grid } from '@trebco/treb/treb-grid';
import type { Parser } from '@trebco/treb/treb-parser';
import type { EmbeddedSpreadsheet } from 'riskamp-web';
import type { ToolbarMessage } from '@trebco/treb/treb-embed/src/toolbar-message';
import type { Color } from '@trebco/treb';
import type { Localization } from '@trebco/treb/treb-base-types';
import type { Calculator } from '@trebco/treb/treb-calculator';
import { createSignal } from 'solid-js';
import type { SelectionState } from '@trebco/treb/treb-embed/src/selection-state';

/**
 * this type kind of grew accidentally, it would be nice to clean
 * it up but we'll have to handle old layouts
 */
interface UserData {
  simulation?: {
    trials?: number;
    seed?: number;
  }
  note?: string;
  lv?: {
    accept?: string,
    terminate?: string,
    fail?: string,
  }
}

/**
 * this is an attempt to unwind some of our field hiding.
 * TODO: just undo that at the source
 */

export type SpreadsheetType = EmbeddedSpreadsheet<UserData> & {
  parser: Parser,
  grid: Grid,
  Localization: Localization;
  model: DataModel,
  calculator: Calculator,
  selection_state: SelectionState;
  HandleToolbarMessage: (event: ToolbarMessage) => void,
  document_styles: {
    number_formats: string[], 
    colors: string[],
    theme_colors: Array<{ color: Color, resolved: string, }>[] // FIXME: type
  }

  AbortSimulation: () => void;

  // Localization: Localization; ??
}

