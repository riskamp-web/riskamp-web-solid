
import { type SpreadsheetType } from '~/lib/spreadsheet-type';
import { toolbar_config } from './toolbar-config';
import { ButtonControl, ColorButtonControl, ComboBoxControl, Control, TextButtonControl } from './toolbar-utils';
import { NumberFormatCache } from '@trebco/treb/treb-format';
import { t } from '~/i18n/i18n';
import { BooleanKeys } from '~/lib/typescript-magic';
import { CellStyle } from 'riskamp-web';
import { ResolveThemeColor } from '@trebco/treb/treb-base-types';
import { ToolbarCommands, type ToolbarCommand } from './toolbar-commands';

// let command_list: [string, ComboBoxControl|ButtonControl|TextButtonControl][]|undefined;
// let command_list: [string, ToolbarCommand][]|undefined;
let command_list: (ToolbarCommand & {state_key: string})[]|undefined;

function GenerateCommandList(config: typeof toolbar_config) {

  const list: (ToolbarCommand & {state_key: string})[] = [];

  //const list: [string, ComboBoxControl|ButtonControl|TextButtonControl][] = [];
  // const list: [string, ToolbarCommand][] = [];

  function AddCommand(command: ToolbarCommand) {
    if (command.state_key) {
      const resolved = command as ToolbarCommand & { state_key: string };
      if (!list.includes(resolved)) {
        list.push(resolved);
      }
    }
  }

  function ListControls(group: Control[]) {
    for (const entry of group) {
      switch (entry.type) {
        case 'button':
        case 'combo-box':
          AddCommand(entry.command);
          break;

        case 'composite-menu':
          for (const command of entry.commands) {
            AddCommand(command);
          }
          break;

        case 'more':
          ListControls(entry.controls);
          break;


      }
    }
  }

  for (const tab of config.tabs) {
    for (const group of tab.groups || []) {
      if (Array.isArray(group)) {
        ListControls(group);
      }
      else {
        for (const step of group.steps) {
          ListControls(step.controls);
        }
      }
    }

    /*
    for (const group of tab.groups || []) {
      if (Array.isArray(group)) {
        for (const control of group) {
          if (control.type === 'combo-box' || control.type === 'button' || control.type === 'text-button') {
            if (control.command.state_key) {
              // list.push([control.command.state_key, control.command]);
              list.push(control.command as (ToolbarCommand & {state_key: string}));
            }
          }
          else if (control.type === 'more') {
            for (const subcontrol of control.controls) {
              if (subcontrol.type === 'combo-box' || subcontrol.type === 'button' || subcontrol.type === 'text-button') {
                if (subcontrol.command.state_key) {
                  list.push(subcontrol.command as (ToolbarCommand & {state_key: string}));
                }
              }
            }
          }
        }
      }
    }
    */

  } 
  
  // console.info("List len", list.length);
  return list;

}

let color_list: ColorButtonControl[]|undefined;

function GenerateColorList(config: typeof toolbar_config) {

  const list: ColorButtonControl[] = [];

  for (const tab of config.tabs) {

    for (const group of tab.groups || []) {
      if (Array.isArray(group)) {
        for (const control of group) {
          if (control.type === 'color-button') {
            // if (control.command.state_key) {
              list.push(control);
            //}
          }
          else if (control.type === 'more') {
            for (const subcontrol of control.controls) {
              if (subcontrol.type === 'color-button') {
                //if (subcontrol.command.state_key) {
                  list.push(subcontrol);
                //}
              }
            }
          }
        }
      }
    }
  }
  
  return list;

}

interface StateMenuItem {
  value: string;
  label: string; // i18n
}

export function ResolveColors(sheet: SpreadsheetType, config: typeof toolbar_config) {

  if (!color_list) {
    color_list = GenerateColorList(config);
  }

  for (const control of color_list) {
    if (control.command.active_color) {
      control.command.value = ResolveThemeColor(sheet.grid.theme, control.command.active_color, 0);
    }
    else {
      control.command.value = ResolveThemeColor(sheet.grid.theme, control.command.default_color, 0);
    }
  }

  // placeholder
}

function ListNumberFormats(sheet: SpreadsheetType) {

  const list: (StateMenuItem|'separator')[] = [];

  if (sheet) {

    const number_formats: [string, string][] = [
      ['General', t('number-format.general')],
      ['Number', t('number-format.number')],
      ['Integer', t('number-format.integer')],
      ['Percent', t('number-format.percent')],
      ['Fraction', t('number-format.fraction')],
      ['Accounting', t('number-format.accounting')],
      ['Currency', t('number-format.currency')],
      ['Scientific', t('number-format.scientific')],
    ];

    const date_formats: [string, string][] = [
      ['Timestamp', t('number-format.timestamp')],
      ['Long Date', t('number-format.long-date')],
      ['Short Date', t('number-format.short-date')],
    ];

    const formats = sheet.document_styles.number_formats as string[];
    for (const format of formats) {
      if (NumberFormatCache.SymbolicName(NumberFormatCache.Translate(format))) { continue; }
      const instance = NumberFormatCache.Get(format);
      if (instance.date_format) {
        date_formats.push([format, format]);
      }
      else {
        number_formats.push([format, format]);
      }
    }

    for (const entry of number_formats) {
      list.push({
        value: entry[0], 
        label: entry[1],
      });
    }
    list.push('separator');
    for (const entry of date_formats) {
      list.push({
        value: entry[0], 
        label: entry[1],
      });
    }

  }

  return list;
  
}

export function UpdateState(sheet: SpreadsheetType, config: typeof toolbar_config) {

  if (!command_list) {
    command_list = GenerateCommandList(config);
  }

  const selection_state = sheet.selection_state;

  for (const command of command_list) {

    const key = command.state_key;
    // console.info(key);

    if (key.startsWith('horizontal_align')) {
      command.value = (selection_state.style?.horizontal_align === key.substring(17)); // includes '-'
    }
    else if (key.startsWith('vertical_align')) {
      command.value = (selection_state.style?.vertical_align === key.substring(15)); // includes '-'
    }
    else {
      switch (key) {
        case 'font_scale':
          if (sheet && command?.type === 'list') {
            command.values = [0.5, 0.75, 0.9, 1, 1.25, 1.5, 2].map(value => {
              return {
                value: value.toString(), 
                label: sheet.FormatNumber(value, '0%'),
              }
            });

            let text = '';
            if (selection_state.style?.font_size) {
              if (selection_state.style.font_size.unit === '%') {
                if (selection_state.style.font_size.value !== 100) {
                  text = sheet.FormatNumber(selection_state.style.font_size.value / 100, '0%');
                }
              }
              else if (selection_state.style.font_size.unit === 'em') {
                if (selection_state.style.font_size.value !== 1) {
                  text = sheet.FormatNumber(selection_state.style.font_size.value, '0%');
                }
              }
            }
            command.value = command.text = text;

          }
          break;

        case 'number_format':
          if (command?.type === 'list') {
            command.values = ListNumberFormats(sheet);
            const nf = selection_state.style?.number_format;
            if (nf) {
              const symbolic_name = NumberFormatCache.SymbolicName(nf);
              if (symbolic_name) {
                command.value = symbolic_name;
                command.text = symbolic_name; // FIXME: i18n
              }
              else {
                command.value = command.text = nf;
              }
            }
          }
          break;

        case 'merge':
          command.value = !!selection_state.merge;
          break;

        case 'fullscreen':
          command.value = !!(document.fullscreenElement);
          break;

        default:
          command.value = !!(selection_state.style as any)?.[key];
          break;

      }
    }
  }
}
