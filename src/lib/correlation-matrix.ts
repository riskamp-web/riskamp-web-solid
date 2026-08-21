
import type { CellValue } from '@trebco/treb';
import type { SpreadsheetType } from './spreadsheet-type';
import { confirmDialog } from '~/components/dialogs/confirm-dialog/confirm-control';
// import { Accessor, Setter } from 'solid-js';
import { type CorrelationDialogData } from '~/components/dialogs/correlation-dialog/correlation-dialog';
import { t, format } from '~/i18n/i18n';
// import { AwaitSignal } from './await-signal';

// import type CorrelationDialog from './components/correlation-dialog.svelte';
// import type InfoDialog from './components/info-dialog.svelte';

/**
 * check correlation matrix. if it's OK, show a message (info dialog).
 * if it's not OK but we can fix it, show the other dialog.
 */
export const CheckCorrelationMatrix = async (
      sheet: SpreadsheetType, 
      // open: Accessor<boolean>,
      // setOpen: Setter<boolean>,
      // setData: Setter<CorrelationDialogData|undefined>,
    ): Promise<CorrelationDialogData|undefined> => {

  const selection_range = sheet.GetSelection();
  const data = sheet.GetRange(selection_range);

  const test_matrix: CellValue[][] = [];

  // valid?

  let valid_matrix = true;
  let symmetric = true;
  let unit_diagonal = true;
  let lower_triangular = true;
  let upper_triangular = true;

  let rows = 0;

  if (!data || !Array.isArray(data)) {
    valid_matrix = false;
  } else {
    rows = data.length;
    const cols = data[0]?.length;
    if (rows < 2 || rows !== cols) {
      valid_matrix = false;
    }
  }

  if (valid_matrix && Array.isArray(data)) {
    for (let i = 0; i < rows; i++) {
      if (data[i][i] !== 1) {
        unit_diagonal = false;
        break;
      }
    }
    if (unit_diagonal) {
      for (let r = 1; r < rows; r++) {
        test_matrix[r] = [];

        for (let c = 0; c < r; c++) {
          const lower = data[r][c];
          const upper = data[c][r];

          if (lower !== undefined) {
            lower_triangular = false;
          }
          if (upper !== undefined) {
            upper_triangular = false;
          }

          test_matrix[r][c] = lower || upper;

          symmetric = symmetric && lower === upper;
        }
      }
    }
  }

  // console.info({valid_matrix, upper_triangular, lower_triangular, symmetric, test_matrix});

  if (!valid_matrix) {
    await confirmDialog.alert({
      // style: 'info',
      // header: 'Correlation matrix',
      title: 'correlation-matrix.title',
      message: t('correlation-matrix.invalid-shape'),
    });
  } else if (!unit_diagonal) {
    await confirmDialog.alert({
      // style: 'info',
      // header: 'Correlation matrix',
      title: 'correlation-matrix.title',
      message: format(t('correlation-matrix.invalid-data'), { unit: sheet.FormatNumber(1, '#.0')}),
    });
  } else if (!symmetric && !upper_triangular && !lower_triangular) {
    await confirmDialog.alert({
      // style: 'info',
      // header: 'Correlation matrix',
      title: 'correlation-matrix.title',
      message: 'correlation-matrix.asymmetric',
    });
  } else {
    const pos_def = sheet.Evaluate(`=IsPosDef(${selection_range})`);
    if (pos_def) {
    await confirmDialog.alert({
        // style: 'info',
        // header: 'Correlation matrix',
        title: 'correlation-matrix.title',
        message: 'Your matrix is positive-definite.',
      });
    } else {
      const adjusted = sheet.Evaluate(`=MakePosDef(${selection_range})`);
      const style = sheet.GetStyle(selection_range);

      // before we clean up the adjusted matrix we need to calculate error

      let err = 0;

      if (Array.isArray(adjusted)) {
        for (let r = 1; r < rows; r++) {
          for (let c = 0; c < r; c++) {
            const a = adjusted[r][c];
            const b = test_matrix[r][c];

            if (typeof a !== 'number' || typeof b !== 'number') {
              console.info({ adjusted, test_matrix });
              throw new Error('invalid data');
            }

            err += Math.abs(b - a) / b;
          }
        }
      }

      // here we're applying the data layout, so we preserve upper- or
      // lower-triangular layouts

      if (Array.isArray(adjusted) && Array.isArray(data)) {
        for (let r = 0; r < data.length; r++) {
          for (let c = 0; c < data[r].length; c++) {
            if (data[r][c] === undefined) {
              adjusted[r][c] = undefined;
            }
          }
        }
      }

      // we already know this... need to convince ts
      if (Array.isArray(adjusted) && (!style || Array.isArray(style))) {

        // console.info("ERR", err);

        return { adjusted, style, err };

        // ...

        /*
        const dialog_result = await correlation_dialog.Show(
          adjusted,
          style,
          err
        );
        if (dialog_result) {
          sheet.SetRange(selection_range, adjusted);
        }
        */

      }
    }
  }

};

