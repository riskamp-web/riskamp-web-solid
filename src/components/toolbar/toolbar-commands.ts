

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { bootstrap_icons as bs, fa_light, fa_regular, fa_solid, fa_sharp_regular, fa_sharp_light, bootstrap_icons } from 's5-icon-lib';
import type { I18N } from '~/i18n/i18n';
import type { Color } from 'riskamp-web';

import { phosphor_light as phosphor } from 's5-icon-lib';
import { lucide } from 's5-icon-lib';

export interface BaseToolbarCommand {
  key: string;
  title?: keyof I18N;
  icon?: string;
  text?: string;
  value?: string|boolean;
  state_key?: string;

  /** show icon in menus, should be used sparingly */
  menuicon?: boolean;
  additional_data?: unknown; // yuck
}

export interface ToggleCommand extends BaseToolbarCommand {
  type: 'toggle',
  active?: {
    title?: keyof I18N;
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
  default_color_text?: keyof I18N;
  default_color: Color;
  active_color?: Color;
}

export type ToolbarCommand = Command | ColorCommand | ToggleCommand | ListCommand;

export const ToolbarCommands = [

{
		key: 'sign-out',
    title: 'toolbar.menu-commands.sign-out',
    icon: bootstrap_icons.box_arrow_right,
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
    icon: phosphor.corners_out,
    // state_key: 'fullscreen',

  },

{
		key: 'test',
    title: 'test.title',
  },

{
		key: 'new',
    title: 'toolbar.button.new-spreadsheet',
    icon: bs.file_earmark,
    // icon: phosphor.file,
    // icon: fa_sharp_regular.file,
    menuicon: true,
  },

{
		key: 'import',
    title: 'toolbar.button.import-file',
    icon: bs.upload,
  },

{
		key: 'open',
    title: 'toolbar.button.open-file',
  },

{
		key: 'revert',
    title: 'toolbar.button.revert-file',
    menuicon: true,
    // icon: phosphor.clock_counter_clockwise,
    icon: fa_light.clock_rotate_left,
  },

{
		key: 'save',
    title: 'toolbar.button.save-file',
  },

{
		key: 'save-to-desktop',
    title: 'toolbar.button.save-to-desktop',
    icon: bs.download,
  },

{
		key: 'export-xlsx',
    title: 'toolbar.button.export-xlsx',
    // icon: bs.file_earmark_excel,
    icon: phosphor.file_xls,

  },

{
		key: 'export-csv',
    title: 'toolbar.button.export-csv',
  },

{
		key: 'ai',
    title: 'llm-chat.panel.title',
    // icon: bs.chat_dots,
    // icon: phosphor.chat_circle_dots,
    icon: lucide.message_circle_more,
  },

{
		key: 'developer',
    title: 'developer-panel.title',
    // icon: bs.braces,
    icon: phosphor.brackets_curly,
  },

{
		key: 'update-language',
    title: 'update-language.title',
  },
  
{
		key: 'notes',
    title: 'toolbar.button.notes.label',
    // icon: bs.journal_text,
    // icon: phosphor.notebook,
    // icon: lucide.notebook_text,
    icon: fa_sharp_regular.note,
  },

{
		key: 'text-color',
    type: 'color',
    title: 'toolbar.button.text-color.label',
    default_color_text: 'color-picker.default_text_color',
    // icon: fa_regular.a,
    // icon: phosphor.text_aa,
    icon: bs.type,
    default_color: { type: 'theme', theme: 1 },
    active_color: { type: 'theme', theme: 4 },
  },

{
		key: 'fill-color',
    type: 'color',
    title: 'toolbar.button.background-color.label',
    //icon: bs.paint_bucket,
    // icon: phosphor.paint_bucket,
    // icon: fa_sharp_regular.fill_drip,
    icon: bs.paint_bucket,
    default_color_text: 'color-picker.no_fill',
    default_color: { type: 'theme', theme: 0 },
    active_color: { type: 'theme', theme: 7 },
  },

{
		key: 'border-top',
    title: 'toolbar.button.border-top.title',
    icon: bs.border_top,
  },
{
		key: 'border-bottom',
    title: 'toolbar.button.border-bottom.title',
    icon: bs.border_bottom,
  },
{
		key: 'border-left',
    title: 'toolbar.button.border-left.title',
    icon: bs.border_left,
  },
{
		key: 'border-right',
    title: 'toolbar.button.border-right.title',
    icon: bs.border_right,
  },
{
		key: 'border-all',
    title: 'toolbar.button.border-all.title',
    icon: bs.border_all,
  },
{
		key: 'border-none',
    title: 'toolbar.button.border-none.title',
    icon: bs.border,
  },
{
		key: 'border-outside',
    title: 'toolbar.button.border-outside.title',
    icon: bs.border_outer,
  },
{
		key: 'border-double-bottom',
    title: 'toolbar.button.border-double-bottom.title',
    icon: bs.border_bottom,
  },


{
		key: 'border-color',
    type: 'color',
    default_color_text: 'color-picker.default_border_color',
    title: 'toolbar.button.border-color.label',
    icon: bs.palette2,
    // icon: phosphor.palette,
    default_color: { type: 'theme', theme: 1 },
    active_color: { type: 'theme', theme: 1 },
  },

{
		key: 'font-scale',
    
    type: 'list',
    title: 'toolbar.combobox.font-size.label',
    icon: fa_regular.text_size,
    state_key: 'font_scale',
  },

{
		key: 'number-format',

    type: 'list',
    title: 'toolbar.combobox.number-format.label',
    //icon: bs.hash,
    icon: phosphor.hash,
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
    
    icon: fa_regular.comma,
    title: 'toolbar.button.toggle-integer-grouping.label',
  },

{
		key: 'insert-table',
    title: 'toolbar.button.insert.table',
    // icon: phosphor.grid_nine,
    // icon: lucide.grid_3x3,
    icon: fa_sharp_regular.table_cells_header,
  },

{
		key: 'insert-comment',
    title: 'toolbar.button.insert.comment',
    //icon: // fa_regular.comment
    //  bs.chat_left
    // icon: phosphor.chat,
    // icon: lucide.message_square,
    icon: fa_sharp_regular.comment,
  },

{
		key: 'insert-bar-chart',
    title: 'toolbar.button.insert.bar-chart',
    // icon: fa_light.chart_bar,
    // icon: phosphor.chart_bar_horizontal,
    // icon: lucide.chart_bar_big,
    icon: fa_sharp_regular.chart_bar,
  },
{
		key: 'insert-column-chart',
    title: 'toolbar.button.insert.column-chart',
    // icon: fa.chart_column,
    // icon: phosphor.chart_bar,
    // icon: lucide.chart_column_big,
    icon: fa_sharp_regular.chart_column,
  },
{
		key: 'insert-donut-chart',
    title: 'toolbar.button.insert.donut-chart',
    // icon: fa.chart_pie,
    // icon: phosphor.chart_donut,
    icon: fa_sharp_regular.chart_pie,
  },
{
		key: 'insert-area-chart',
    title: 'toolbar.button.insert.area-chart',
    // icon: fa.chart_area,
    icon: fa_sharp_regular.chart_area,

  },
{
		key: 'insert-scatter-plot',
    title: 'toolbar.button.insert.scatter-plot',
    // icon: fa.chart_scatter,
    // icon: phosphor.chart_scatter,
    // icon: lucide.chart_scatter,
    icon: fa_sharp_regular.chart_scatter,

  },
{
		key: 'insert-line-chart',
    title: 'toolbar.button.insert.line-chart',
    // icon: fa.chart_line,
    // icon: phosphor.chart_line,
    // icon: lucide.chart_line,
    icon: fa_sharp_regular.chart_line,

  },
{
		key: 'insert-image',
    title: 'toolbar.button.insert.image',
    // icon: fa.image,
    // icon: phosphor.image,
    // icon: lucide.image,
    icon: fa_sharp_regular.image,
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
    icon: bs.text_wrap,
    state_key: 'wrap',
  },

{
		key: 'bold',
    
    title: 'toolbar.button.bold.label',
    icon: bs.type_bold,
    // icon: phosphor.text_b,
    state_key: 'bold',
    // icon: fa_sharp_regular.bold,
    
  },
{
		key: 'italic',
    title: 'toolbar.button.italic.label',
    state_key: 'italic',
    icon: bs.type_italic,
  },
{
		key: 'underline',
    
    title: 'toolbar.button.underline.label',
    icon: bs.type_underline,
    state_key: 'underline',
  },

{
		key: 'strike',
    title: 'toolbar.button.strikethrough.label',
    icon: bs.type_strikethrough,
    state_key: 'strike',
  },

{
		key: 'about-riskamp',
    title: 'toolbar.menu.about-riskamp',
  },
{
		key: 'walkthrough',
    title: 'toolbar.menu.walkthrough',
  },
{
		key: 'function-docs',
    title: 'toolbar.menu.function-documentation',
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
    icon: fa_sharp_light.square_poll_vertical,
  },

{
		key: 'forecast',
    title: 'toolbar.button.forecast',
  },

{
		key: 'merge-cells',
    type: 'toggle',
    icon: bs.fullscreen_exit,
    title: 'toolbar.button.merge-cells.label',
    state_key: 'merge',
    active: {
      title: 'toolbar.button.unmerge-cells.label',
      icon: bs.fullscreen,
    }
  },

{
		key: 'lock-cells',
    type: 'toggle',
    icon: bs.lock,
    title: 'toolbar.button.lock-cells.label',
    state_key: 'locked',
    active: {
      title: 'toolbar.button.unlock-cells.label',
      icon: bs.unlock,
    }
  },

{
		key: 'align-left',
   
    icon: bs.text_left,
    title: 'toolbar.button.align-left.label',
    state_key: 'horizontal_align-left',
  },

{
		key: 'align-center',
    
    icon: bs.text_center,
    title: 'toolbar.button.align-center.label',
    state_key: 'horizontal_align-center',
 },

{
		key: 'align-right',
    
    icon: bs.text_right,
    title: 'toolbar.button.align-right.label',
    state_key: 'horizontal_align-right',

  },

{
		key: 'align-top',
    
    icon: fa_light.arrow_up_to_line,
    title: 'toolbar.button.align-top.label',
    state_key: 'vertical_align-top',
  },
{
		key: 'align-middle',
    
    icon: fa_light.arrows_to_line,
    title: 'toolbar.button.align-middle.label',
    state_key: 'vertical_align-middle',
  },
{
		key: 'align-bottom',
    
    icon: fa_light.arrow_down_to_line,
    title: 'toolbar.button.align-bottom.label',
    state_key: 'vertical_align-bottom',
  },

{
		key: 'indent',
    
    title: 'toolbar.button.increase-indent.label',
    icon: bs.text_indent_left,

  },
{
		key: 'outdent',
    
    title: 'toolbar.button.decrease-indent.label',
    icon: bs.text_indent_right,
  },

{
		key: 'fit-data',
    
    title: 'toolbar.button.fit-data.label',
    // icon: bs.graph_up_arrow,
    // icon: phosphor.chart_line_up,
    icon: lucide.chart_no_axes_combined,
  },

{
		key: 'names',
    
    title: 'toolbar.button.defined-names.label',
    //icon: // bs.tag,
    //  fa.label
    // icon: phosphor.tag,
    icon: lucide.tag,
  },

{
		key: 'find',
    
    title: 'toolbar.button.search-cells.label',
    // icon: bs.search,
    // icon: phosphor.magnifying_glass,
    icon: lucide.search
  },

{
		key: 'run-simulation',
    title: 'toolbar.button.run-simulation.label',
    icon: bs.play_circle,
    menuicon: true,
  },

{
		key: 'run-simulation-again',
    title: 'toolbar.button.run-simulation-again.label',
    icon: bs.fast_forward,
    menuicon: true,
  },

{
		key: 'las-vegas-simulation',
    // icon: bs.suit_spade_fill,    
    // icon: phosphor.spade,
    title: 'toolbar.button.las-vegas-simulation.label',
    icon: lucide.spade,
    // menuicon: true,
  },

{
		key: 'riskamp-documentation',
    // icon: phosphor.question,
    title: 'toolbar-button.riskamp-documentation.label',
    icon: lucide.circle_question_mark,
  },

{
		key: 'quick-view',
    
    title: 'toolbar.button.quick-view.label',
    icon: fa_sharp_regular.square_poll_vertical,
  },

{
		key: 'quick-view-correlation',
    
    title: 'toolbar.button.quick-view-correlation.label',
    icon: fa_sharp_regular.square_poll_vertical,
  },

{
		key: 'simulation-settings',
    
    title: 'toolbar.button.simulation-settings.label',
    // icon: bs.gear,
    // icon: phosphor.gear,
    icon: lucide.settings_2,
  },

{
		key: 'recalculate',
    
    title: 'toolbar.button.recalculate.label',
    // icon: phosphor.arrows_clockwise,
    // icon: lucide.refresh_cw,
    icon: fa_sharp_regular.arrows_rotate,
  },

 ] as const ; // satisfies ToolbarCommand[]; 

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



