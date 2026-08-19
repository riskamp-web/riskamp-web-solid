
import type { DataModel } from '@trebco/treb/treb-data-model';
import type { Grid } from '@trebco/treb/treb-grid';
import type { Parser } from '@trebco/treb/treb-parser';
import type { EmbeddedSpreadsheet } from 'riskamp-web';
import type { ToolbarMessage } from '@trebco/treb/treb-embed/src/toolbar-message';
import type { Color } from '@trebco/treb';
import type { Localization } from '@trebco/treb/treb-base-types';
import type { Calculator } from '@trebco/treb/treb-calculator';
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
  auto_show_notes?: boolean;
  lv?: {
    accept?: string,
    terminate?: string,
    fail?: string,
  }

  /** imported from another file, this is the filename */
  imported_from?: string;

  /** folder for tracking on this app */
  folder?: string;

  /** indicates we've saved this as a v2 API file */
  raw_api_version?: number;

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

