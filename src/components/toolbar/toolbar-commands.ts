

import type { StringKey } from '~/i18n/i18n';
import type { Color } from 'riskamp-web';

import { icons } from '~/components/icon-sets';

export interface BaseToolbarCommand {
  key: string;
  title?: StringKey;
  icon?: string;
  text?: string;
  value?: string|boolean;
  state_key?: string;

  /** new, for enable/disable menu command */
  enabled?: boolean;

  /** show icon in menus, should be used sparingly */
  menuicon?: boolean;
  additional_data?: unknown; // yuck
}

export interface ToggleCommand extends BaseToolbarCommand {
  type: 'toggle',
  active?: {
    title?: StringKey;
    icon?: string;
  }
}

export interface Command extends BaseToolbarCommand {
  type?: never, // 'base',
}

export interface ListCommand extends BaseToolbarCommand {
  type: 'list';
  // values: string[];
  values?: ({value: string, label:string}|'separator')[];
}

export interface ColorCommand extends BaseToolbarCommand {
  type: 'color';
  default_color_text?: StringKey;
  default_color: Color;
  active_color?: Color;
}

export type ToolbarCommand = Command | ColorCommand | ToggleCommand | ListCommand;

export const ToolbarCommands = [

{
  key: 'dark-theme',
},
{
  key: 'light-theme',
},
{
  key: 'system-theme',
},

{
		key: 'sign-out',
    title: 'toolbar.menu-commands.sign-out',
    icon: icons.sign_out,
    menuicon: true,
  },
{
		key: 'account-page',
    title: 'toolbar.menu-commands.account-page',
  },
{
		key: 'documents',
    title: 'toolbar.menu-commands.documents',
  },

{
		key: 'fullscreen',
    title: 'toolbar.button.toggle-fullscreen',
    icon: icons.fullscreen,
    // state_key: 'fullscreen',

  },

{
		key: 'test',
    title: 'test.title',
  },

{
		key: 'new',
    title: 'toolbar.button.new-spreadsheet',
    icon: icons.new_spreadsheet,
    menuicon: true,
  },

{
		key: 'import',
    title: 'toolbar.button.import-file',
    icon: icons.import_file,
  },

{
		key: 'open',
    title: 'toolbar.button.open-file',
  },

{
		key: 'sign-in',
    title: 'toolbar.button.sign-in',
  },

{
		key: 'create-account',
    title: 'toolbar.button.create-account',
  },

{
		key: 'revert',
    title: 'toolbar.button.revert-file',
    menuicon: true,
    icon: icons.revert_file,
    enabled: false,
    state_key: 'revert',
  },

{
		key: 'save',
    title: 'toolbar.button.save-file',
    enabled: false,
    state_key: 'dirty',
  },
{
		key: 'save-as',
    title: 'toolbar.button.save-file-as',
  },

{
		key: 'save-to-desktop',
    title: 'toolbar.button.save-to-desktop',
    icon: icons.save_to_desktop,
  },

{
		key: 'export-xlsx',
    title: 'toolbar.button.export-xlsx',
    icon: icons.export_xlsx,

  },

{
		key: 'export-csv',
    title: 'toolbar.button.export-csv',
  },

{
		key: 'ai',
    title: 'llm-chat.panel.title',
    icon: icons.ai_chat,
    menuicon: true,
  },

{
		key: 'developer',
    title: 'developer-panel.title',
    icon: icons.developer,
  },

{
		key: 'update-language',
    title: 'update-language.title',
  },
  
{
		key: 'notes',
    title: 'toolbar.button.notes.label',
    icon: icons.notes,
    menuicon: true,
  },

{
		key: 'text-color',
    type: 'color',
    title: 'toolbar.button.text-color.label',
    default_color_text: 'color-picker.default_text_color',
    icon: icons.text_color,
    default_color: { type: 'theme', theme: 1 },
    active_color: { type: 'theme', theme: 4 },
  },

{
		key: 'fill-color',
    type: 'color',
    title: 'toolbar.button.background-color.label',
    icon: icons.fill_color,
    default_color_text: 'color-picker.no_fill',
    default_color: { type: 'theme', theme: 0 },
    active_color: { type: 'theme', theme: 7 },
  },

{
		key: 'border-top',
    title: 'toolbar.button.border-top.title',
    icon: icons.border_top,
  },
{
		key: 'border-bottom',
    title: 'toolbar.button.border-bottom.title',
    icon: icons.border_bottom,
  },
{
		key: 'border-left',
    title: 'toolbar.button.border-left.title',
    icon: icons.border_left,
  },
{
		key: 'border-right',
    title: 'toolbar.button.border-right.title',
    icon: icons.border_right,
  },
{
		key: 'border-all',
    title: 'toolbar.button.border-all.title',
    icon: icons.border_all,
  },
{
		key: 'border-none',
    title: 'toolbar.button.border-none.title',
    icon: icons.border_none,
  },
{
		key: 'border-outside',
    title: 'toolbar.button.border-outside.title',
    icon: icons.border_outside,
  },
{
		key: 'border-double-bottom',
    title: 'toolbar.button.border-double-bottom.title',
    icon: icons.border_double_bottom,
  },


{
		key: 'border-color',
    type: 'color',
    default_color_text: 'color-picker.default_border_color',
    title: 'toolbar.button.border-color.label',
    icon: icons.border_color,
    default_color: { type: 'theme', theme: 1 },
    active_color: { type: 'theme', theme: 1 },
  },

{
		key: 'font-scale',
    
    type: 'list',
    title: 'toolbar.combobox.font-size.label',
    icon: icons.font_scale,
    state_key: 'font_scale',
  },

{
		key: 'number-format',

    type: 'list',
    title: 'toolbar.combobox.number-format.label',
    icon: icons.number_format,
    state_key: 'number_format',

  },

{
		key: 'increase-precision',
    
    title: 'toolbar.button.increase-decimal-precision.label',
    text: '0.00',
  },

{
		key: 'decrease-precision',
    
    title: 'toolbar.button.decrease-decimal-precision.label',
    text: '0.0',
  },

{
		key: 'toggle-grouping',
    
    icon: icons.toggle_grouping,
    title: 'toolbar.button.toggle-integer-grouping.label',
  },

{
		key: 'insert-table',
    title: 'toolbar.button.insert.table',
    icon: icons.insert_table,
  },

{
		key: 'insert-comment',
    title: 'toolbar.button.insert.comment',
    icon: icons.insert_comment,
  },

{
		key: 'insert-bar-chart',
    title: 'toolbar.button.insert.bar-chart',
    icon: icons.insert_bar_chart,
  },
{
		key: 'insert-column-chart',
    title: 'toolbar.button.insert.column-chart',
    icon: icons.insert_column_chart,
  },
{
		key: 'insert-donut-chart',
    title: 'toolbar.button.insert.donut-chart',
    icon: icons.insert_donut_chart,
  },
{
		key: 'insert-area-chart',
    title: 'toolbar.button.insert.area-chart',
    icon: icons.insert_area_chart,

  },
{
		key: 'insert-scatter-plot',
    title: 'toolbar.button.insert.scatter-plot',
    icon: icons.insert_scatter_plot,

  },
{
		key: 'insert-line-chart',
    title: 'toolbar.button.insert.line-chart',
    icon: icons.insert_line_chart,

  },
{
		key: 'insert-image',
    title: 'toolbar.button.insert.image',
    icon: icons.insert_image,
  },

{
		key: 'insert-row',
    title: 'toolbar.button.insert-row.label',
  },
{
		key: 'insert-column',
    
    title: 'toolbar.button.insert-column.label',
  },
{
		key: 'delete-row',
    
    title: 'toolbar.button.delete-row.label',
  },
{
		key: 'delete-column',
    
    title: 'toolbar.button.delete-column.label',
  },

{
		key: 'wrap',
    
    title: 'toolbar.button.wrap-text.label',
    icon: icons.wrap,
    state_key: 'wrap',
  },

{
		key: 'bold',
    
    title: 'toolbar.button.bold.label',
    icon: icons.bold,
    state_key: 'bold',

  },
{
		key: 'italic',
    title: 'toolbar.button.italic.label',
    state_key: 'italic',
    icon: icons.italic,
  },
{
		key: 'underline',
    
    title: 'toolbar.button.underline.label',
    icon: icons.underline,
    state_key: 'underline',
  },

{
		key: 'strike',
    title: 'toolbar.button.strikethrough.label',
    icon: icons.strike,
    state_key: 'strike',
  },

{
		key: 'about-riskamp',
    title: 'toolbar.menu.about-riskamp',
    icon: icons.help,
    menuicon: true,
  },
{
		key: 'walkthrough',
    title: 'toolbar.menu.walkthrough',
  },
{
		key: 'function-docs',
    title: 'toolbar.menu.function-documentation',
    icon: icons.riskamp_documentation,
    menuicon: true,
  },

  /*
{
		key: 'sparkline-column',
    title: 'toolbar.button.sparkline-column',
  },
  
{
		key: 'sparkline-line',
    title: 'toolbar.button.sparkline-line',
  },
  */
{
		key: 'sparkline',
    title: 'toolbar.button.sparkline',
    icon: icons.sparkline,
  },

{
		key: 'forecast',
    title: 'toolbar.button.forecast',
  },

{
		key: 'merge-cells',
    type: 'toggle',
    icon: icons.merge_cells,
    title: 'toolbar.button.merge-cells.label',
    state_key: 'merge',
    active: {
      title: 'toolbar.button.unmerge-cells.label',
      icon: icons.unmerge_cells,
    }
  },

{
		key: 'lock-cells',
    type: 'toggle',
    icon: icons.lock_cells,
    title: 'toolbar.button.lock-cells.label',
    state_key: 'locked',
    active: {
      title: 'toolbar.button.unlock-cells.label',
      icon: icons.unlock_cells,
    }
  },

{
		key: 'align-left',
   
    icon: icons.align_left,
    title: 'toolbar.button.align-left.label',
    state_key: 'horizontal_align-left',
  },

{
		key: 'align-center',
    
    icon: icons.align_center,
    title: 'toolbar.button.align-center.label',
    state_key: 'horizontal_align-center',
 },

{
		key: 'align-right',
    
    icon: icons.align_right,
    title: 'toolbar.button.align-right.label',
    state_key: 'horizontal_align-right',

  },

{
		key: 'align-top',
    
    icon: icons.align_top,
    title: 'toolbar.button.align-top.label',
    state_key: 'vertical_align-top',
  },
{
		key: 'align-middle',
    
    icon: icons.align_middle,
    title: 'toolbar.button.align-middle.label',
    state_key: 'vertical_align-middle',
  },
{
		key: 'align-bottom',
    
    icon: icons.align_bottom,
    title: 'toolbar.button.align-bottom.label',
    state_key: 'vertical_align-bottom',
  },

{
		key: 'indent',
    
    title: 'toolbar.button.increase-indent.label',
    icon: icons.indent,

  },
{
		key: 'outdent',
    
    title: 'toolbar.button.decrease-indent.label',
    icon: icons.outdent,
  },

{
		key: 'fit-data',
    
    title: 'toolbar.button.fit-data.label',
    icon: icons.fit_data,
    menuicon: true,
    
  },

{
		key: 'names',
    
    title: 'toolbar.button.defined-names.label',
    icon: icons.defined_names,
    menuicon: true,
  },

{
		key: 'find',
    
    title: 'toolbar.button.search-cells.label',
    icon: icons.find,
    menuicon: true,
  },

{
		key: 'run-simulation',
    title: 'toolbar.button.run-simulation.label',
    icon: icons.run_simulation,
    menuicon: true,
  },

{
		key: 'run-simulation-again',
    title: 'toolbar.button.run-simulation-again.label',
    icon: icons.run_simulation_again,
    menuicon: true,
  },

{
		key: 'las-vegas-simulation',
    title: 'toolbar.button.las-vegas-simulation.label',
    icon: icons.las_vegas_simulation,
    // menuicon: true,
  },

{
		key: 'riskamp-documentation',
    title: 'toolbar-button.riskamp-documentation.label',
    icon: icons.riskamp_documentation,
    menuicon: true,
  },

{
		key: 'quick-view',
    
    title: 'toolbar.button.quick-view.label',
    icon: icons.quick_view,
    menuicon: true,
  },

{
		key: 'quick-view-correlation',
    
    title: 'toolbar.button.quick-view-correlation.label',
    icon: icons.quick_view_correlation,
  },

{
		key: 'simulation-settings',
    
    title: 'toolbar.button.simulation-settings.label',
    icon: icons.simulation_settings,
    menuicon: true,

  },

{
		key: 'recalculate',
    
    title: 'toolbar.button.recalculate.label',
    icon: icons.recalculate,
  },

 ] as const satisfies ToolbarCommand[]; 

 /*
type KeysOfType<Map, Match> = {
  [K in keyof Map]: Map[K] extends Match ? K : never;
}[keyof Map];
*/

export type ToolbarCommandKey = (typeof ToolbarCommands)[number]['key'];
export type ToolbarColorCommandKeys = Extract<(typeof ToolbarCommands)[number], ColorCommand>['key'];

// export type ToolbarCommandKey = keyof typeof ToolbarCommands;
// export type ToolbarColorCommandKeys = KeysOfType<typeof ToolbarCommands, ColorCommand>;
// export type ToolbarToggleCommandKeys = KeysOfType<typeof ToolbarCommands, ToggleCommand>;

const record: Partial<Record<ToolbarCommandKey, ToolbarCommand>> = {};
for (const entry of ToolbarCommands) {
  record[entry.key] = entry;
}

export const ToolbarCommandMap = record as Record<ToolbarCommandKey, ToolbarCommand>;



