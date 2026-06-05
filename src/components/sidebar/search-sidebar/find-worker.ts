
import type { TREBDocument, ICellAddress } from '@trebco/treb';
import { Sheet } from '@trebco/treb/treb-data-model';
import { ValueType, type Cell } from '@trebco/treb/treb-base-types';
import { ParseWildcards } from '@trebco/treb/treb-calculator/src/utilities';

/*
 * TODOs for find: 
 * 
 * - i18n - we're searching in english only
 * - annotations - search annotation formulas (for titles, mostly)
 *
 */

export interface FindResult {
  sheet_name: string;
  address: ICellAddress;
  value: string;
  formula?: string;
  hidden?: boolean;
}

export type FindType = 'values'|'formulas';

export interface InitMessage {
  type: 'init';
  data: TREBDocument;
}

export interface InitCompleteMessage {
  type: 'init-complete';
}

export interface QueryMessage {
  type: 'query';
  find: FindType;
  query: string;
  transaction: number;
  wildcards?: boolean;
}

export interface ResultsMessage {
  type: 'results';
  results: FindResult[];
  transaction: number;
}

export type FindMessageType = InitMessage | QueryMessage | ResultsMessage | InitCompleteMessage;

let sheets: Sheet[] = [];


export const Find = (message: QueryMessage) => {

  let rexp: RegExp;

  if (message.wildcards) {
    rexp = new RegExp(ParseWildcards(message.query), 'i');
  }
  else {
    const query = message.query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // console.info({query});
    rexp = new RegExp(query, 'i');
  }

  const results: FindResult[] = [];

  const Store = (sheet: Sheet, row: number, column: number, cell: Cell) => {
      if (cell.type === ValueType.formula) {
        results.push({
          sheet_name: sheet.name,
          address: { row, column, sheet_id: sheet.id },
          value: (cell.calculated ?? '').toString(),
          formula: cell.value as string,
          hidden: !sheet.visible,
        });
      }
      else if (cell.spill || cell.area) {
        results.push({
          sheet_name: sheet.name,
          address: { row, column, sheet_id: sheet.id },
          value: (cell.calculated ?? '').toString(),
          hidden: !sheet.visible,
        });
      }
      else {
        results.push({
          sheet_name: sheet.name,
          address: { row, column, sheet_id: sheet.id },
          value: cell.value as string,
          hidden: !sheet.visible,
        });
      }
  }

  // console.info({message});

  if (message.find === 'values') {
    for (const sheet of sheets) {
      for (const { cell, row, column } of sheet.cells.IterateRC()) {
        let value: string|undefined = undefined;
        if (cell.formatted !== undefined) {
          console.info("CF", cell.formatted);
          if (typeof cell.formatted === 'string') {
            value = cell.formatted;
          }
          else {
            value = cell.formatted.map(part => part.text || '').join('');
          }
        }
        else {
          value = cell.calculated?.toString() ?? cell.value?.toString();
        }

        if (value !== undefined && value !== null && rexp.test(value)) {
          Store(sheet, row, column, cell);
        }
      }
    }
  }
  else { // formulas
    for (const sheet of sheets) {
      for (const { cell, row, column } of sheet.cells.IterateRC()) {
        if (cell.type === ValueType.formula && cell.value && rexp.test(cell.value.toString())) {
          Store(sheet, row, column, cell);
        }
      }
    }
  }

  return results;

};


self.addEventListener('message', (event: MessageEvent) => {

  const message = event.data as FindMessageType;
  switch (message?.type) {

    case 'init':
      // console.info(message.data);
      if (Array.isArray(message.data.sheet_data)) {
        sheets = (message.data.sheet_data || []).map(entry => {
          return Sheet.FromJSON(entry, {});
        });
      }
      else if (message.data.sheet_data) {
        sheets = [Sheet.FromJSON(message.data.sheet_data, {})];
      }
      else {
        sheets = [];
      }
      postMessage({
        type: 'init-complete',
      });
      // console.info(sheets);
      break;

    case 'query':
      // const results = Find(message);
      postMessage({
        type: 'results', 
        results: Find(message),
        transaction: message.transaction,
      });
      break;
  }

});

