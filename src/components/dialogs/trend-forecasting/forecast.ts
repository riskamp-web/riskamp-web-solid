

import { Heuristics } from '@trebco/treb/treb-data-model';
import { Area, IsArea, ValueType } from '@trebco/treb/treb-base-types';
import { t } from '~/i18n/i18n';
import { BorderConstants } from '@trebco/treb/treb-grid';
import { SpreadsheetType } from '~/lib/spreadsheet-type';

export interface ForecastData {
  timeline: string;
  timeline_header?: string;
  values: string;
  values_header?: string;
  type: 0|1|2;                  // default 0
  fill: undefined | 0|1;                    // default 1
  aggregation: undefined | 0|1|2|3|4|5|6;   // default 0
  seasonality: number|undefined;            // default 1?
  forecast_type: 'excel-compatible'|'stochastic'|'static';
  chart_type: `line`|`column`;
  periods: number; 
}

function Transpose<T>(matrix: T[][]) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];
  for (let j = 0; j < cols; j++) {
    result[j] = Array(rows);
    for (let i = 0; i < rows; i++) {
      result[j][i] = matrix[i][j];
    }
  }
  return result;
}

export function CreateForecastSheet(sheet: SpreadsheetType, data: Partial<ForecastData>) {

  if (!data.timeline || !data.values) {
    return;
  }

  const resolved_timeline = sheet.Resolve(data.timeline);
  const resolved_values = sheet.Resolve(data.values);

  let timeline_data = sheet.Evaluate(data.timeline);
  let values_data = sheet.Evaluate(data.values);

  let timeline_count = 0;
  let values_count = 0;

  let timeline_style = sheet.GetStyle(IsArea(resolved_timeline) ? resolved_timeline.start : resolved_timeline);
  if (Array.isArray(timeline_style)) {
    timeline_style = timeline_style.flat()[0];
  }
  let values_style = sheet.GetStyle(IsArea(resolved_values) ? resolved_values.start : resolved_values);
  if (Array.isArray(values_style)) {
    values_style = values_style.flat()[0];
  }

  if (Array.isArray(timeline_data)) {
    timeline_data = Transpose(timeline_data);
    timeline_count = timeline_data.flat().length;
  }
  else {
    return;
  }

  if (Array.isArray(values_data)) {
    values_data = Transpose(values_data);
    values_count = values_data.flat().length;
  }
  else {
    return;
  }

  if (values_count !== timeline_count) {
    return;
  }

  const Headers = (random = false) => {

    sheet.SetRange('A1', data.timeline_header || t('forecast-sheet-timeline-header'));
    sheet.SetRange('B1', data.values_header || t('forecast-sheet-values-header'));
    if (random) {
      //sheet.SetRange('C1', t('forecast-sheet-perturb-header'));
      sheet.SetRange('D1', t('forecast-sheet-sample-header'));
      sheet.SetRange('E1', t('forecast-sheet-statistics.mean.header'));
      sheet.SetRange('F1', t('forecast-sheet-statistics.p80-range.header'));
      sheet.SetRange('G1', t('forecast-sheet-statistics.p80-range.header'));
      sheet.ApplyBorders('A1:G1', BorderConstants.Bottom, 1);
    }
    else {
      sheet.SetRange('C1', t('forecast-sheet-forecast-header'));
      sheet.ApplyBorders('A1:C1', BorderConstants.Bottom, 1);
    }
    sheet.SetRange('L1', t('forecast-sheet-statistics-header'));
    sheet.ApplyBorders('L1:M1', BorderConstants.Bottom, 1);

  };

  sheet.Batch(() => {
    const sheet_id = sheet.AddSheet();

    sheet.SetRange('A2', timeline_data, { spill: true });

    if (data.periods && timeline_data && Array.isArray(timeline_data)) {
      const step = Heuristics.DetectConstantStep(timeline_data.flat() as number[]);
      if (step) {
        const projected = Heuristics.ProjectTimeline(step, data.periods);
        sheet.SetRange({
          column: 0,
          row: timeline_count + 1,
        }, Transpose([projected]), { spill: true });
      }
    }

    if (timeline_style) {
      sheet.ApplyStyle('A:A', {
        number_format: timeline_style.number_format,
      });
    }

    sheet.SetRange('B2', values_data, { spill: true });

    /*
    sheet.SetRange({
      column: 2,
      row: values_count,
    }, values_data.flat().slice(-1)[0]);
    */

    const timeline_range = sheet.Unresolve({
      start: {
        row: 1,
        column: 0,
        sheet_id,
        absolute_column: true,
        absolute_row: true,
      },
      end: {
        row: timeline_count,
        column: 0,
        absolute_column: true,
        absolute_row: true,
      },
    });

    const values_range = sheet.Unresolve({
      start: {
        row: 1,
        column: 1,
        sheet_id,
        absolute_column: true,
        absolute_row: true,
      },
      end: {
        row: values_count,
        column: 1,
        absolute_column: true,
        absolute_row: true,
      },
    });

    if (data.periods) {

      if (data.forecast_type === 'excel-compatible') {

        // this is excel-style, using Forecast.ETS and one function in each cell

        Headers(false);
        sheet.SetRange({ column: 2, row: values_count }, values_data.flat().slice(-1)[0]);

        // TODO: confidence interval

        const forward: string[][] = [];
        for (let i = 0; i < data.periods; i++) {
          const area = new Area({ column: 0, row: timeline_count + i, });
          forward.push([
            `=Forecast.ETS(${area.spreadsheet_label}, ${values_range}, ${timeline_range}, ${data.seasonality || ''}, ${data.fill || ''}, ${data.aggregation || ''})`
          ]);
        }

        sheet.SetRange({
          column: 2, 
          row: values_count + 1,
        }, forward, {
          spill: true,
          argument_separator: ','
        });

        const last_row = values_count + (data.periods || 0);
        const chart_fn = data.chart_type === 'column' ? 
          `=Column.Chart(Group(Series(B1,,B2:B${last_row + 1}), Series(C1,,C2:C${last_row + 1})),,"${t('forecast-sheet-forecast-header')}")` :
          `=Line.Chart(Group(Series(B1,,B2:B${last_row + 1}), Series(C1,,C2:C${last_row + 1})),,"${t('forecast-sheet-forecast-header')}")` ;

        sheet.InsertAnnotation(chart_fn, undefined, 'F2:J16', ',');

        const stat_parms = (stat: number) => `${values_range}, ${timeline_range}, ${stat}, ${data.seasonality || ''}, ${data.fill || ''}, ${data.aggregation || ''}`;

        sheet.SetRange('L2', [
          [ 'α', `=Forecast.ETS.Stat(${stat_parms(1)})` ],
          [ 'β', `=Forecast.ETS.Stat(${stat_parms(2)})` ],
          [ 'γ', `=Forecast.ETS.Stat(${stat_parms(3)})` ],
          [ 'MASE', `=Forecast.ETS.Stat(${stat_parms(4)})` ],
          [ 'SMAPE', `=Forecast.ETS.Stat(${stat_parms(5)})` ],
          [ 'MAE', `=Forecast.ETS.Stat(${stat_parms(6)})` ],
          [ 'RMSE', `=Forecast.ETS.Stat(${stat_parms(7)})` ],
        ], { argument_separator: ',', spill: true });

      }
      else if (data.forecast_type === 'static') {

        // static riskamp-style, simple

        Headers(false);
        sheet.SetRange({ column: 2, row: values_count }, values_data.flat().slice(-1)[0]);

        const area = new Area({ column: 0, row: timeline_count + 1, }, { column: 0, row: timeline_count + data.periods});
        const projection = `=RiskAMP.Forecast(${area.spreadsheet_label}, ${values_range}, ${timeline_range}, ${data.seasonality || ''}, ${data.fill || ''}, ${data.aggregation || ''}, ${data.type || 0})`;

        sheet.SetRange({
          column: 2, 
          row: values_count + 1,
        }, projection, {
          spill: true,
          argument_separator: ','
        });

        const last_row = values_count + (data.periods || 0);
        const chart_fn = data.chart_type === 'column' ? 
          `=Column.Chart(Group(Series(B1,,B2:B${last_row + 1}), Series(C1,,C2:C${last_row + 1})),,"${t('forecast-sheet-forecast-header')}")` :
          `=Line.Chart(Group(Series(B1,,B2:B${last_row + 1}), Series(C1,,C2:C${last_row + 1})),,"${t('forecast-sheet-forecast-header')}")` ;

        sheet.InsertAnnotation(chart_fn, undefined, 'F2:J16', ',');

        sheet.SetRange('L2', [
          [ 'α', ],
          [ 'β', ],
          [ 'γ', ],
          [ 'MASE', ],
          [ 'SMAPE', ],
          [ 'MAE', ],
          [ 'RMSE', ],
          [ 'Model type', ],
          [ 'ϕ', ],
        ], { argument_separator: ',', spill: true });


        sheet.SetRange('M2', 
          `=RiskAMP.Forecast.Stats(${values_range}, ${timeline_range}, ${data.seasonality || ''}, ${data.fill || ''}, ${data.aggregation || ''}, ${data.type || 0})`,
          { argument_separator: ',', spill: true });


      }
      else {

        // stochastic

        Headers(true);

        // put in params

        const params_label_column = 8;

        const params_address = new Area({row: values_count - 1, column: params_label_column + 1}).spreadsheet_label;
        const model_address = new Area({row: values_count, column: params_label_column + 1}).spreadsheet_label;

        sheet.SetRange({row: values_count - 1, column: params_label_column}, [
          [ 'Params', 
            `=RiskAMP.Forecast.Params(${values_range}, ${timeline_range}, ${data.seasonality || ''}, ${data.fill || ''}, ${data.aggregation || ''}, ${data.type || 0})`, ],
          [ 'Model',
            `=RiskAMP.Forecast.Model(${values_range}, ${timeline_range}, ${params_address}#, ${data.fill || ''}, ${data.aggregation || ''})`, ],
          ], 
          { argument_separator: ',', spill: true }); 

        sheet.SetRange({ column: 3, row: values_count }, values_data.flat().slice(-1)[0]);
        sheet.SetRange({ column: 4, row: values_count }, values_data.flat().slice(-1)[0]);
        sheet.SetRange({ column: 5, row: values_count }, values_data.flat().slice(-1)[0]);
        sheet.SetRange({ column: 6, row: values_count }, values_data.flat().slice(-1)[0]);

        const perturb = new Area({
          row: values_count + 1, column: 2, 
        }, {
          row: values_count + data.periods, column: 2,
        }); 

        const model_address_r1c1 = `R${values_count + 1}C${params_label_column + 2}`;

        sheet.SetRange(perturb, 
          `=NormalValue(0, sqrt(ChooseCols(${model_address}#, -1)))`, { argument_separator: ',', recycle: true });

        sheet.SetRange({row: values_count + 1, column: 3},
          `=RiskAMP.Forecast.Project(${model_address}#, ${params_address}#, ${data.periods}, ${perturb.spreadsheet_label})`,
          { argument_separator: ',', spill: true }); 

        const stats = new Area({
          row: values_count + 1, column: 4, 
        }, {
          row: values_count + data.periods, column: 6,
        }); 

        sheet.SetRange(stats, 
          [[ 
            `=SimulationMean(R[0]C[-1])` ,
            `=SimulationPercentile(R[0]C[-2], 0.10)` ,
            `=SimulationPercentile(R[0]C[-3], 0.90)` ,

          ]], { argument_separator: ',', recycle: true, r1c1: true });

        const last_row = values_count + (data.periods || 0);
        let series = [
          `Series(B1,,B2:B${last_row + 1},,1)`,
          // `Series(D1,,D2:D${last_row})`,
          `Series(E1,,E2:E${last_row + 1},,2)`,
          // `Series(F1,,F2:F${last_row},,3)`,
          // `Series(G1,,G2:G${last_row},,3)`,
        ];
        let chart_fn =  
          `=Line.Chart(Group(${series.join(',')}),,"${t('forecast-sheet-forecast-header')} / ${t('forecast-sheet-statistics.mean.header')}")` ;
        sheet.InsertAnnotation(chart_fn, undefined, 'D3:G16', ',');

        series = [
          // `Series(B1,,B2:B${last_row},,1)`,
          `Series(D1,,D${values_count + 1}:D${last_row + 1},,2)`,
        ];
        chart_fn =  
          `=Line.Chart(Group(${series.join(',')}),,"${t('forecast-sheet-sample-header')}")` ;
        sheet.InsertAnnotation(chart_fn, undefined, 'I3:L16', ',');


        sheet.SetRange('L2', [
          [ 'α', ],
          [ 'β', ],
          [ 'γ', ],
          [ 'MASE', ],
          [ 'SMAPE', ],
          [ 'MAE', ],
          [ 'RMSE', ],
          [ 'Model type', ],
          [ 'ϕ', ],
        ], { argument_separator: ',', spill: true });


        sheet.SetRange('M2', 
          `=RiskAMP.Forecast.Stats(${values_range}, ${timeline_range}, ${data.seasonality || ''}, ${data.fill || ''}, ${data.aggregation || ''}, ${data.type || 0})`,
          { argument_separator: ',', spill: true });

      }

    }

  });
}

export function FindForecastData(sheet: SpreadsheetType) {

  let headers: ReturnType<typeof Heuristics['HasHeaders']> | undefined;
  let timeline: Area|undefined;
  let values: Area|undefined;

  let timeline_header = '';
  let values_header = '';

  const sel = sheet.grid.GetSelection();
  if (!sel.empty) {

    let area = sel.area.Clone();
    area = sheet.grid.active_sheet.RealArea(area);

    const cell_data = sheet.grid.active_sheet.CellData(area.start);

    if (area.count === 1) {
      const formula = sheet.GetRange(area, { type: 'formula' });
      if (formula !== undefined || cell_data.spill) {
        area = Heuristics.ExpandRegion(sel.area, sheet.grid.active_sheet);
      }
    }

    if (area.rows > 1 && area.columns > 1) {

        // look for an atomically-incrementing (for the most part)
        // column of numbers at the left

        for (let i = area.start.column; i <= area.end.column; i++) {

          let column = area.GetColumn(i);
          let header = '';

          headers = Heuristics.HasHeaders(column, sheet.grid.active_sheet);
          if (headers.column_headers) {

            const data = sheet.grid.active_sheet.CellData(column.start);
            header = data.calculated?.toString() || data.value?.toString() || '';

            column = column.RemoveHeaderRow();
          }

          // drop blanks at the end? this is useful if you select whole
          // columns, because our clip routine may include blanks. there
          // should be a faster/more efficient/built-in way to do this though

          for (let r = column.end.row; r > column.start.row; r--) {
            const data = sheet.grid.active_sheet.CellData({ row: r, column: column.start.column });
            if (data.value === undefined) {
              column = new Area(column.start, { column: column.end.column, row: r - 1 });
            }
          }

          // test for numeric/monthly step

          const check_timeline = Heuristics.IsTimeline(column, sheet.grid.active_sheet);
          if (check_timeline) {
            timeline = column;
            timeline_header = header;
            break;
          }
          else {
            console.info("not timeline", column);
          }

        }

        // if we have a timeline, look for values. start on the right and 
        // work left.

        if (timeline) {

          for (let i = area.end.column; i > timeline.start.column; i--) {
            let column = area.GetColumn(i);
            let header = '';

            headers = Heuristics.HasHeaders(column, sheet.grid.active_sheet);
            if (headers.column_headers) {

              const data = sheet.grid.active_sheet.CellData(column.start);
              header = data.calculated?.toString() || data.value?.toString() || '';

              column = column.RemoveHeaderRow();
            }

            for (let j = column.end.row; j > column.start.row; j--) {
              const data = sheet.grid.active_sheet.CellData({row: j, column: i});
              if (!data || data.type === ValueType.undefined) {
                column = new Area(column.start, {column: i, row: j - 1});
              }
            }

            if (column.rows < 2) {
              continue;
            }

            // same shape, all numeric
            if (column.start.row === timeline.start.row && Heuristics.AllNumeric(column, sheet.grid.active_sheet)) {
              values = column;
              values_header = header;
              break;
            }

          }

        }

        if (timeline && values) {
          if (values.rows < timeline.rows) {
            timeline = new Area(timeline.start, { column: timeline.start.column, row: values.end.row });
          }

          return {
            timeline,
            values,
            timeline_header, 
            values_header,
          };

        }

    }
  }

}

