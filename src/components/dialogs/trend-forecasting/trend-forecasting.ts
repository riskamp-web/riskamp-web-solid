import { createSignal } from 'solid-js';
import { TrendForecastingDialog } from './trend-forecasting-dialog';
import type { SpreadsheetType } from '~/lib/spreadsheet-type';
import { AwaitSignal } from '~/lib/await-signal';
import { createStore } from 'solid-js/store';
import { CreateForecastSheet, FindForecastData, ForecastData } from './forecast';

const [open, setOpen] = createSignal(false);
const [result, setResult] = createSignal<boolean|undefined>(false);

const default_forecast_data: ForecastData = {
  timeline: '',
  timeline_header: undefined,
  values: '',
  values_header: undefined,
  type: 0,
  fill: undefined,
  aggregation: undefined,
  seasonality: undefined,
  forecast_type: 'excel-compatible',
  chart_type: 'line',
  periods: 24,
} as const;

const [data, setData] = createStore<ForecastData>({...default_forecast_data});

export const trend_forecast_props: Omit<Parameters<typeof TrendForecastingDialog>[0], 'sheet'> = {
  open,
  setOpen,
  data, 
  setData,
  setResult,
  clear_primary_selection: true,
  moveable: true,
  resizeable: true,
  escape: true,
  closebox: true,
};

export async function RunTrendForecast(sheet?: SpreadsheetType) {
  if (!sheet) {
    return;
  }

  // FIXME: I guess we could leave settings...
  setData({
    timeline: '',
    values: '',
    timeline_header: undefined,
    values_header: undefined,
  }); // flush

  const ffd = FindForecastData(sheet);

  if (ffd) {

    setData({
      timeline: ffd.timeline.spreadsheet_label,
      values: ffd.values.spreadsheet_label,
      timeline_header: ffd.timeline_header,
      values_header: ffd.values_header,
    });

    // const composite = ffd.timeline.Clone();
    // composite.ConsumeArea(ffd.values);
    // sheet.Select(composite);

  }
  
  setOpen(true);
  await AwaitSignal(open, (value) => !value);
  if (result()) {
    CreateForecastSheet(sheet, data);
  }

  sheet.Focus();

}

