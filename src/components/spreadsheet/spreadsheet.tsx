
import { createEffect, on, onMount, Setter } from "solid-js";
import { type EmbeddedSpreadsheet, type MCEmbeddedSpreadsheetOptions, RiskAMPWeb } from 'riskamp-web';
import { type SpreadsheetType } from '~/lib/spreadsheet-type';
import { ApplyThemeColors } from '../toolbar/theme-selector';
import { persistentData } from '~/lib/app-data';
import { SystemLocale } from '~/i18n/i18n';

interface Props {
  fill?: boolean;

  /** setter */
  setSheet: Setter<SpreadsheetType|undefined>;

  /** callback for the insert function button */
  'function-handler'?: () => void;

}

export function Spreadsheet(props: Props) {

  // eslint-disable-next-line no-unassigned-vars
  let container: HTMLDivElement|undefined;
  let sheet: EmbeddedSpreadsheet;

  onMount(() => {
    if (container) {

      let max_workers = persistentData.max_workers || 0;
      if (!max_workers) {
        const cores = navigator.hardwareConcurrency || 0;
        const cap = cores ? Math.min(Math.floor(cores/2), 8) : 4;
        max_workers = Math.min(navigator.hardwareConcurrency || 0, cap);
      }
      
      const options: MCEmbeddedSpreadsheetOptions & { insert_function_button?: boolean } = {
        container,
        stats: true,
        scale_control: true,
        scale: .95,
        add_tab: true,
        expand: true,
        dnd: true,
        expand_formula_button: true,
        resizable: false,
        persist_scale: true,
        insert_function_button: true,
        local_storage: false, // true, // FIXME
        toolbar: false,
        collapsed: true,
        complex: 'on',
        lhs: true,
        lv: true,
        toll_initial_load: true,
        max_workers: max_workers || undefined, // default instead of 0
      };

      sheet = RiskAMPWeb.CreateSpreadsheet(options);
      sheet.EnsureChartsLib();

      createEffect(on(() => persistentData.locale_settings, value => {
        if (!/locale=/.test(document.location.search)) { 
          (sheet as SpreadsheetType).LoadLanguage(value?.spreadsheet_language || SystemLocale(), value?.decimal_separator);
        }
      }, { defer: true }));

      sheet.ready.then(() => {
        props.setSheet(sheet as SpreadsheetType);

        // if there's an explicit spreadsheet language set, use that.
        // otherwise follow the normal pattern (i.e. let TREB figure it out)

        // I guess allow locale= override? 

        if (persistentData.locale_settings?.spreadsheet_language && 
            !/locale=/.test(document.location.search)) {
          (sheet as SpreadsheetType).LoadLanguage(
            persistentData.locale_settings.spreadsheet_language,
            persistentData.locale_settings.decimal_separator);
        }

      });

      (self as ( Window & typeof globalThis & {sheet: SpreadsheetType})).sheet = sheet as SpreadsheetType; // DEV

      // hide sidebar button [UPDATE: do this in css]

      /*
      let element = container.querySelector('.treb-toggle-sidebar-button');
      if (element instanceof HTMLElement) {
        element.remove();
      }
      */

      const fx = props['function-handler'];
      if (fx) {
        const element = container.querySelector('.treb-insert-function-button');
        if (element instanceof HTMLElement) {
          element.addEventListener('click', fx);
        }
      }

      // listener for system changes. here, we're not setting or
      // removing styles. we're just forcing a repaint if the _system_
      // style changes. we'll still need to handle explicit settings 
      // elsewhere.

      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', () => {
        requestAnimationFrame(() => {
          sheet.UpdateTheme();
          ApplyThemeColors();
        });
      });

      ApplyThemeColors();

    }
  });

  return (
    <div classList={{
      'spreadsheet-container-fill': !!props.fill,
      'spreadsheet-container': !props.fill,
    }} ref={container}></div>
  );

}

