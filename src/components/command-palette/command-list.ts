

import { IsCellAddress } from '@trebco/treb/treb-base-types';
import { UA, type Grid } from '@trebco/treb/treb-grid';
import { type Parameter, type Context, ApplyStyle, SheetToolbarCommand, ToolbarCommand, ToggleStyle, StyleParameters } from './support-functions';
import type { CellStyle, EmbeddedSpreadsheet } from 'riskamp-web';
import { NumberFormatCache } from '@trebco/treb/treb-format';
import { Sheet } from '@trebco/treb/treb-data-model';
import type { StringKey } from '~/i18n/i18n';
import { ToolbarCommandMap } from '../toolbar/toolbar-commands';

export interface PaletteCommand {

  /**
   * command label, held as a key and resolved where it's drawn. the resolved
   * text is what the search engine matches against -- see command-palette.tsx,
   * which hands fuzzysort accessors rather than field names.
   *
   * this is a key rather than the text because the list is built once, at
   * import: a t() here would snapshot whatever language was loaded then and
   * keep it for the life of the page.
   */
  label: StringKey;

  /** 
   * alterante text you might search for, that should return this command
   * (subject to normal search priority). For example, the command "remove 
   * hyperlink" includes the alt text "delete clear link" because you might 
   * type some combination of those terms -- you might say "remove link" instead
   * of "remove hyperlink", and we want that to return this command.
   */
  alt?: StringKey;

  /** 
   * we're requiring functions as a sanity check, part of the 
   * restructuring of commands. 
   */
  fn: (ctx: Context) => void;

  /** optional function to init parameters */
  init?: (ctx: Context) => void;

  /** WIP */
  parameters?: Parameter[];

}

export const commands: PaletteCommand[] = [

  {
    label: 'command-palette.remove-hyperlink.label',
    alt: 'command-palette.remove-hyperlink.alt',
    fn: (ctx: Context) => {
      const grid = (ctx.sheet as EmbeddedSpreadsheet & {grid: Grid}).grid;
      const sel = grid.GetSelection();
      if (!sel.empty) {
        ctx.sheet.SetLink(sel.target);
      }
    },
  },

  {
    label: 'command-palette.insert-hyperlink.label',
    alt: 'command-palette.insert-hyperlink.alt',
    parameters: [{
      type: 'text',
      label: 'command-palette.insert-hyperlink.parameter.url.label',
    }],
    fn: (ctx: Context) => {
      const text = (ctx.parameters?.[0]?.type === 'text') ? ctx.parameters[0].value : '';
      const grid = (ctx.sheet as EmbeddedSpreadsheet & {grid: Grid}).grid;
      const sel = grid.GetSelection();
      if (!sel.empty) {
        ctx.sheet.SetLink(sel.target, text);
      }
    },
    init: (ctx: Context) => {

      if (ctx.parameters?.[0]?.type === 'text') {
        const grid = (ctx.sheet as EmbeddedSpreadsheet & {grid: Grid}).grid;
        const sel = grid.GetSelection();
        if (!sel.empty) {
          const data = grid.active_sheet.CellData(sel.target);
          if (data.hyperlink) {
            ctx.parameters[0].value = data.hyperlink;
          }
          else if (data.value) {
            const text = data.value.toString();
            if (/^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/.test(text)) {
              ctx.parameters[0].value = text;
            }
          }
        }
      }

    },
  },

  {
    label: 'command-palette.add-edit-comment.label',
    alt: 'command-palette.add-edit-comment.alt',
    parameters: [{
      type: 'multi-line-text',
      label: UA.is_mac ?
        'command-palette.add-edit-comment.parameter.comment.label-mac' :
        'command-palette.add-edit-comment.parameter.comment.label',
    }],
    fn: (ctx: Context) => {
      ctx.sheet.SetNote(undefined, ctx.parameters?.[0].value?.toString() || '');
      (ctx.sheet.grid as any).layout.HideNote();
    },
    init: (ctx: Context) => {
      if (ctx.parameters?.[0].type === 'multi-line-text') {
        ctx.parameters[0].value = ctx.selection_state?.comment || '';
      }
    },
  },
  {
    label: 'command-palette.remove-comment.label',
    alt: 'command-palette.remove-comment.alt',
    fn: (ctx: Context) => {
      ctx.sheet.SetNote(undefined, '');
      (ctx.sheet.grid as any).layout.HideNote();
    },
  },

  {
    label: 'command-palette.reset-background-color.label',
    alt: 'command-palette.reset-background-color.alt',
    fn: ApplyStyle({ fill: {}}),
  },

  {
    label: 'command-palette.set-background-color.label',
    alt: 'command-palette.set-background-color.alt',
    parameters: [{
        type: 'color', 
      }],
    fn: StyleParameters(['fill']),
  },

  {
    label: 'command-palette.reset-text-color.label',
    fn: ApplyStyle({ text: {}}),
    alt: 'command-palette.reset-text-color.alt',
  },

  {
    label: 'command-palette.set-text-color.label',
    alt: 'command-palette.set-text-color.alt',
    parameters: [{
        type: 'color', 
      }],
      fn: StyleParameters(['text']),
    },

  {
    label: 'command-palette.reset-border-color.label',
    alt: 'command-palette.reset-border-color.alt',
    fn: ApplyStyle({ 
      border_top_fill: {},
      border_left_fill: {},
      border_right_fill: {},
      border_bottom_fill: {},
    }),
  },

  {
    label: 'command-palette.set-border-color.label',
    parameters: [{
        type: 'color', 
      }],
    fn: (ctx: Context) => {
      const color = ctx.parameters?.[0].value;
      const style: CellStyle = {
        border_bottom_fill: color,
        border_top_fill: color,
        border_left_fill: color,
        border_right_fill: color,
      }
      ctx.sheet.ApplyStyle(undefined, style);
    },
  },

  {
    label: 'command-palette.borders-clear.label',
    fn: SheetToolbarCommand({ command: 'border-none' }),
  },

  {
    label: 'command-palette.border-top.label',
    fn: SheetToolbarCommand({ command: 'border-top' }),
  },

  {
    label: 'command-palette.border-bottom.label',
    fn: SheetToolbarCommand({ command: 'border-bottom' }),
  },

  {
    label: 'command-palette.border-double-bottom.label',
    fn: SheetToolbarCommand({ command: 'border-double-bottom' }),
  },

  {
    label: 'command-palette.border-left.label',
    fn: SheetToolbarCommand({ command: 'border-left' }),
  },

  {
    label: 'command-palette.border-right.label',
    fn: SheetToolbarCommand({ command: 'border-right' }),
  },

  {
    label: 'command-palette.border-outside.label',
    alt: 'command-palette.border-outside.alt',
    fn: SheetToolbarCommand({ command: 'border-outside' }),
  },

  {
    label: 'command-palette.border-all.label',
    fn: SheetToolbarCommand({ command: 'border-all' }),
  },

  {
    label: 'command-palette.reset-font-scale.label',
    fn: SheetToolbarCommand({ command: 'font-scale', scale: 1.0 }),
    alt: 'command-palette.reset-font-scale.alt'
  },

  {
    label: 'command-palette.font-scale-increase.label',
    fn: SheetToolbarCommand({ command: 'adjust-font-scale', delta: .1 }),
    alt: 'command-palette.font-scale-increase.alt'
  },

  {
    label: 'command-palette.font-scale-decrease.label',
    fn: SheetToolbarCommand({ command: 'adjust-font-scale', delta: -.1 }),
    alt: 'command-palette.font-scale-decrease.alt'
  },

  {
    label: 'command-palette.insert-donut-chart.label',
    fn: SheetToolbarCommand({ command: 'insert-donut-chart' }),
    alt: 'command-palette.insert-donut-chart.alt'
  },
  {
    label: 'command-palette.insert-column-chart.label',
    fn: SheetToolbarCommand({ command: 'insert-column-chart' }),
    alt: 'command-palette.insert-column-chart.alt'
  },
  {
    label: 'command-palette.insert-bar-chart.label',
    fn: SheetToolbarCommand({ command: 'insert-bar-chart' }),
    alt: 'command-palette.insert-bar-chart.alt'
  },
  {
    label: 'command-palette.insert-line-chart.label',
    fn: SheetToolbarCommand({ command: 'insert-line-chart' }),
    alt: 'command-palette.insert-line-chart.alt'
  },
  {
    label: 'command-palette.insert-scatter-plot.label',
    fn: SheetToolbarCommand({ command: 'insert-scatter-plot' }),
    alt: 'command-palette.insert-scatter-plot.alt'
  },
  {
    label: 'command-palette.insert-box-plot.label',
    fn: SheetToolbarCommand({ command: 'insert-box-plot' }),
    alt: 'command-palette.insert-box-plot.alt'
  },

  {
    label: 'command-palette.theme.dark-theme.label',
    alt: 'command-palette.theme.dark-theme.alt',
    fn: (ctx: Context) => {
      ctx.oncommand(ToolbarCommandMap['dark-theme']);
    },
  },
  {
    label: 'command-palette.theme.light-theme.label',
    alt: 'command-palette.theme.light-theme.alt',
    fn: (ctx: Context) => {
      ctx.oncommand(ToolbarCommandMap['light-theme']);
    },
  },
  {
    label: 'command-palette.theme.system-theme.label',
    alt: 'command-palette.theme.system-theme.alt',
    fn: (ctx: Context) => {
      ctx.oncommand(ToolbarCommandMap['system-theme']);
    },
  },

  /*
  {
    label: 'Insert text box',
    alt: 'create textarea',
    parameters: [{
      type: 'multi-line-text',
      label: UA.is_mac ? 
        'Enter a comment. Press Cmd + Enter to save.' :
        'Enter a comment. Press Ctrl + Enter to save.' ,
    }],
    fn: (ctx: Context) => {
      const grid: Grid = (ctx.sheet as any).grid;

      const { x, y } = grid.GetScrollOffset();
      const scale = grid.scale || 1;
      const auto_size = { width: 301 / scale, height: 301 / scale };

      const text = ctx.parameters?.[0]?.value?.toString() || '';
      const lines = text.split(/\n/g);

      grid.CreateAnnotation({
          type: 'textbox',
          data: {
            paragraphs: lines.map(line => ({
              content: [{ text: line }],
            })),
          },
        }, true, undefined, { top: y / scale + 30, left: x / scale + 30, ...auto_size });

    },
  },
  */

  {
    label: 'command-palette.insert-image.label',
    fn: SheetToolbarCommand({ command: 'insert-image' }),
  },

  /*
  case 'insert-image': this.InsertImage(); break;
  */

  {
    label: 'command-palette.cf-gradient-red-green.label',
    fn: (ctx: Context) => {
      ctx.sheet.ConditionalFormatGradient(undefined, 'red-green');
    }
  },

  {
    label: 'command-palette.cf-gradient-green-red.label',
    fn: (ctx: Context) => {
      ctx.sheet.ConditionalFormatGradient(undefined, 'green-red');
    }
  },

  {
    label: 'command-palette.cf-unique-values.label',
    parameters: [{
      label: 'command-palette.cf-unique-values.parameter.color.label',
      type: 'color',
      default: { theme: 9, tint: .66 },
    }],
    fn: (ctx: Context) => {
      const parameter = ctx.parameters?.[0];
      if (parameter?.type === 'color') {
        ctx.sheet.ConditionalFormatDuplicateValues(undefined, { 
          unique: true, 
          style: { 
            fill: parameter.value || parameter.default || {}
          } 
        });
      }
    }
  },

  {
    label: 'command-palette.cf-data-bars.label',
    alt: 'command-palette.cf-data-bars.alt',
    parameters: [{
      label: 'command-palette.cf-data-bars.parameter.color.label',
      type: 'color',
      default: { theme: 4, tint: .5 },
    }, {
      label: 'command-palette.cf-data-bars.parameter.hide-values.label',
      type: 'boolean',
      default: true,
      choices: [
        { value: 'true', label: 'command-palette.cf-data-bars.parameter.hide-values.choice.true' },
        { value: 'false', label: 'command-palette.cf-data-bars.parameter.hide-values.choice.false' }
      ],
    }],
    fn: (ctx: Context) => {
      const hide = !!(ctx.parameters?.[1]?.value || false);

      console.info({hide, p1: ctx.parameters?.[1]});

      const parameter = ctx.parameters?.[0];
      if (parameter?.type === 'color') {
        ctx.sheet.ConditionalFormatDataBars(undefined, { 
          fill: parameter.value || parameter.default || {},
          hide_values: hide,
        });
      }
    }
  },

  {
    label: 'command-palette.cf-duplicate-values.label',
    parameters: [{
      label: 'command-palette.cf-duplicate-values.parameter.color.label',
      type: 'color',
      default: { theme: 7, tint: .66 },
    }],
    fn: (ctx: Context) => {
      const parameter = ctx.parameters?.[0];
      if (parameter?.type === 'color') {
        ctx.sheet.ConditionalFormatDuplicateValues(undefined, { 
          unique: true, 
          style: { 
            fill: parameter.value || parameter.default || {}
          } 
        });
      }
    }
  },

  {
    label: 'command-palette.cf-clear.label',
    alt: 'command-palette.cf-clear.alt',
    fn: (ctx: Context) => {
      ctx.sheet.RemoveConditionalFormats()
    }
  },


  { 
    label: 'command-palette.fit-column-widths.label',
    fn: (ctx: Context) => {
      const columns: number[] = [];
      const sel = ctx.sheet.GetSelection();
      if (sel) {
        const resolved = ctx.sheet.Resolve(sel);
        if (resolved) {
          if (IsCellAddress(resolved)) {
            columns.push(resolved.column);
          }
          else {
            for (let c = resolved.start.column; c <= resolved.end.column; c++) {
              columns.push(c);
            }
          }
        }
      }
      if (columns.length) {
        ctx.sheet.SetColumnWidth(columns);
      }
    },
  },

  /*
  {
    label: 'Split view',
    fn: ToolbarCommand('split-view'),
  },

  {
    label: 'Unsplit view',
    fn: ToolbarCommand('unsplit-view'),
  },
  */

  {
    label: 'command-palette.fit-data.label',
    fn: ToolbarCommand('fit-data'),
    alt: 'command-palette.fit-data.alt',
  },

  {
    label: 'command-palette.named-ranges.label',
    fn: ToolbarCommand('names'),
    alt: 'command-palette.named-ranges.alt',
  },

  {
    label: 'command-palette.set-tab-color.label',
    parameters: [{
      type: 'color',
    }],
    fn: (ctx: Context) => {
      const parameter = ctx.parameters?.[0];
      if (parameter?.type === 'color' && parameter.value) {
        ctx.sheet.SetTabColor(undefined, parameter.value);
      }
    },
  },

  {
    label: 'command-palette.reset-tab-color.label',
    alt: 'command-palette.reset-tab-color.alt',
    fn: (ctx: Context) => {
      ctx.sheet.SetTabColor(undefined, undefined);
    },
  },
  
  { 
    label: 'command-palette.fit-row-heights.label',
    fn: (ctx: Context) => {
      const rows: number[] = [];
      const sel = ctx.sheet.GetSelection();
      if (sel) {
        const resolved = ctx.sheet.Resolve(sel);
        if (resolved) {
          if (IsCellAddress(resolved)) {
            rows.push(resolved.row);
          }
          else {
            for (let r = resolved.start.row; r <= resolved.end.row; r++) {
              rows.push(r);
            }
          }
        }
      }
      if (rows.length) {
        ctx.sheet.SetRowHeight(rows);
      }
    },
  },

  {
    label: 'command-palette.correlation-matrix.label',
    fn: ToolbarCommand('correlation-matrix'),
  },

  {
    label: 'command-palette.hide-sheet.label',
    alt: 'command-palette.hide-sheet.alt',
    fn: (ctx: Context) => {
      ctx.sheet.HideSheet(ctx.sheet.active_sheet, true);
    },
  },

  {
    label: 'command-palette.unhide-all-sheets.label',
    alt: 'command-palette.unhide-all-sheets.alt',
    fn: (ctx: Context) => {
      for (const sheet of ctx.sheet.grid.model.sheets.list) {
        if (!sheet.visible) {
          ctx.sheet.HideSheet(sheet.name, false);
        }
      }
    },
  },

  {
    label: 'command-palette.unhide-columns.label',
    fn: (ctx: Context) => {
      const columns: number[] = [];

      const count = ctx.sheet.grid.active_sheet.columns;
      for (let i = 0; i < count; i++) {
        const width = ctx.sheet.grid.active_sheet.GetColumnWidth(i);
        if (width === 0) {
          columns.push(i);
        }
      }
      if (columns.length) {
        ctx.sheet.SetColumnWidth(columns, ctx.sheet.grid.active_sheet.default_column_width);
      }
    },
  },

  {
    label: 'command-palette.unhide-rows.label',
    fn: (ctx: Context) => {
      const rows: number[] = [];

      const count = ctx.sheet.grid.active_sheet.rows;
      for (let i = 0; i < count; i++) {
        const height = ctx.sheet.grid.active_sheet.GetRowHeight(i);
        if (height === 0) {
          rows.push(i);
        }
      }
      if (rows.length) {
        ctx.sheet.SetRowHeight(rows, ctx.sheet.grid.active_sheet.default_row_height);
      }
    },
  },

  { 
    label: 'command-palette.hide-rows.label',
    fn: (ctx: Context) => {
      const rows: number[] = [];
      const sel = ctx.sheet.GetSelection();
      if (sel) {
        const resolved = ctx.sheet.Resolve(sel);
        if (resolved) {
          if (IsCellAddress(resolved)) {
            rows.push(resolved.row);
          }
          else {
            for (let r = resolved.start.row; r <= resolved.end.row; r++) {
              rows.push(r);
            }
          }
        }
      }
      if (rows.length) {
        ctx.sheet.SetRowHeight(rows, 0);
        ctx.sheet.Select(undefined);
      }
    },
  },

  { 
    label: 'command-palette.hide-columns.label',
    fn: (ctx: Context) => {
      const columns: number[] = [];
      const sel = ctx.sheet.GetSelection();
      if (sel) {
        const resolved = ctx.sheet.Resolve(sel);
        if (resolved) {
          if (IsCellAddress(resolved)) {
            columns.push(resolved.column);
          }
          else {
            for (let c = resolved.start.column; c <= resolved.end.column; c++) {
              columns.push(c);
            }
          }
        }
      }
      if (columns.length) {
        ctx.sheet.SetColumnWidth(columns, 0);
        ctx.sheet.Select(undefined);
      }
    },
  },

  {
    label: 'command-palette.las-vegas-simulation.label',
    fn: ToolbarCommand('run-lv-simulation'),
  },

  {
    label: 'command-palette.simulation-settings.label',
    fn: ToolbarCommand('simulation-settings'),
  },

  {
    label: 'command-palette.language-settings.label',
    fn: ToolbarCommand('language-settings'),
  },

  {
    label: 'command-palette.load-desktop-file.label',
    alt: 'command-palette.load-desktop-file.alt',
    fn: (ctx: Context) => ctx.sheet.LoadLocalFile(),
  },

  {
    label: 'command-palette.save-xlsx.label',
    alt: 'command-palette.save-xlsx.alt',
    fn: (ctx: Context) => ctx.sheet.Export(),
  },

  {
    label: 'command-palette.save-csv.label',
    alt: 'command-palette.save-csv.alt',
    fn: (ctx: Context) => ctx.sheet.ExportDelimited(),
  },

  {
    label: 'command-palette.save-to-cloud.label',
    fn: ToolbarCommand('save'),
  },

  {
    label: 'command-palette.load-document.label',
    alt: 'command-palette.load-document.alt',
    fn: (ctx: Context) => goto('/documents'),
  },

  {
    label: 'command-palette.download-json.label',
    alt: 'command-palette.download-json.alt',
    fn: (ctx: Context) => ctx.sheet.SaveToDesktop(),
  },

  {
    label: 'command-palette.insert-function.label',
    fn: ToolbarCommand('insert-function'),
  },

  {
    label: 'command-palette.find.label',
    fn: ToolbarCommand('find'),
  },
  {
    label: 'command-palette.insert-distribution.label',
    fn: ToolbarCommand('insert-distribution'),
  },
  {
    label: 'command-palette.run-simulation.label',
    fn: ToolbarCommand('run-simulation-again'),
  },
  {
    label: 'command-palette.quick-view.label',
    fn: ToolbarCommand('quick-view'),
  },
  {
    label: 'command-palette.new-model.label',
    fn: ToolbarCommand('new-document'),
  },
  {
    label: 'command-palette.revert-file.label',
    fn: ToolbarCommand('revert'),
  },

  {
    label: 'command-palette.recalculate.label',
    fn: (ctx: Context) => ctx.sheet.Recalculate(),
  },

  {
    label: 'command-palette.undo.label',
    fn: (ctx: Context) => ctx.sheet.Undo(),
  },

  {
    label: 'command-palette.delete-columns.label',
    fn: (ctx: Context) => ctx.sheet.DeleteColumns(),
  },
  {
    label: 'command-palette.delete-rows.label',
    fn: (ctx: Context) => ctx.sheet.DeleteRows(),
  },

  {
    label: 'command-palette.insert-column.label',
    fn: (ctx: Context) => ctx.sheet.InsertColumns(),
  },
  {
    label: 'command-palette.insert-row.label',
    fn: (ctx: Context) => ctx.sheet.InsertRows(),
  },

  {
    label: 'command-palette.set-view-scale.label',
    parameters: [{
      type: 'number',
      style: 'percent',
      label: 'command-palette.set-view-scale.parameter.scale.label'
    }],
    fn: (ctx: Context) => {
      const parameter = ctx.parameters?.[0];
      if (parameter?.type === 'number' && parameter.value) {

        ctx.sheet.grid.SetScale(parameter.value);
      }
    }
  },

  {
    label: 'command-palette.reset-view-scale.label',
    fn: (ctx: Context) => {
      ctx.sheet.grid.SetScale(1);
    }
  },

  {
    label: 'command-palette.rename-tab.label',
    alt: 'command-palette.rename-tab.alt',
    parameters: [{
      type: 'text',
      label: 'command-palette.rename-tab.parameter.name.label'
    }],
    fn: (ctx: Context) => {
      const parameter = ctx.parameters?.[0];
      if (parameter?.type === 'text' && parameter.value) {
        ctx.sheet.RenameSheet(undefined, parameter.value);
      }
    }
  },

  {
    label: 'command-palette.add-tab.label',
    alt: 'command-palette.add-tab.alt',
    parameters: [{
      label: 'command-palette.add-tab.parameter.name.label',
      type: 'text',
    }],
    init: (ctx: Context) => {
      const parameter = ctx.parameters?.[0];
      if (parameter?.type === 'text') {

        // what would the new sheet name be? this is done when it's 
        // added, but we can estimate

        let name = Sheet.default_sheet_name;
        
        // this is copied from grid

        while (ctx.sheet.grid.model.sheets.list.some((test) => test.name === name)) {

          const match = name.match(/^(.*?)(\d+)$/);
          if (match) {
            name = match[1] + (Number(match[2]) + 1);
          }
          else {
            name = name + '2';
          }
    
        }

        parameter.value = name;

      }
    },
    fn: (ctx: Context) => {
      let name: string|undefined;
      const parameter = ctx.parameters?.[0];
      if (parameter?.type === 'text') {
        name = parameter.value;
      }
      ctx.sheet.AddSheet(name);
    },
  },
  {
    label: 'command-palette.delete-tab.label',
    alt: 'command-palette.delete-tab.alt',
    fn: (ctx: Context) => ctx.sheet.DeleteSheet(),
  },

  {
    label: 'command-palette.increase-indent.label',
    alt: 'command-palette.increase-indent.alt',
    fn: SheetToolbarCommand({ command: 'indent' }),
    // fn: (ctx: Context) => (ctx.sheet as any).HandleToolbarMessage({ command: 'indent'}),
  },
  {
    label: 'command-palette.decrease-indent.label',
    alt: 'command-palette.decrease-indent.alt',
    // fn: (ctx: Context) => (ctx.sheet as any).HandleToolbarMessage({ command: 'outdent'}),
    fn: SheetToolbarCommand({ command: 'outdent' }),
  },

  /*
  {
    label: 'Conditional format: gradient...',
    parameters: [
      { name: 'Minimum', type: 'text' },
      { name: 'Maximum', type: 'text' }
    ],
  },
  */


  {
    label: 'command-palette.number-format-increase-precision.label',
    alt: 'command-palette.number-format-increase-precision.alt',
    fn: SheetToolbarCommand({ command: 'increase-precision' }),
  },
  {
    label: 'command-palette.number-format-decrease-precision.label',
    alt: 'command-palette.number-format-decrease-precision.alt',
    fn: SheetToolbarCommand({ command: 'decrease-precision' }),
  },

  {
    label: 'command-palette.number-format.label',
    alt: 'command-palette.number-format.alt',
    parameters: [{ 
      name: 'Format', 
      type: 'text', 
      label: 'command-palette.number-format.parameter.format.label',
      choices: [],
    }],
    fn: StyleParameters(['number_format']),
    init: (ctx: Context) => {

      const number_formats: string[] = [
      ];
  
      const date_formats: string[] = [
      ];
  
      if (ctx.document_styles) {
        for (const format of ctx.document_styles.number_formats) {
          if (NumberFormatCache.SymbolicName(NumberFormatCache.Translate(format))) { continue; }
          const instance = NumberFormatCache.Get(format);
          if (instance.date_format) {
            date_formats.push(format);
          }
          else {
            number_formats.push(format);
          }
        }
      }

      number_formats.push('General', 'Number', 'Integer', 'Percent', 'Fraction', 'Accounting', 'Currency', 'Scientific');
      date_formats.push('Timestamp', 'Long Date', 'Short Date');

      if (ctx.parameters?.[0]) {
        ctx.parameters[0].choices = [
          ...number_formats, ...date_formats,
        ];
      }

    },
  },

  {
    label: 'command-palette.merge-cells.label',
    fn: (ctx: Context) => ctx.sheet.MergeCells(),
  },
  {
    label: 'command-palette.unmerge-cells.label',
    fn: (ctx: Context) => ctx.sheet.UnmergeCells(),
  },

  {
    label: 'command-palette.lock-cells.label',
    fn: (ctx: Context) => ctx.sheet.ApplyStyle(undefined, {
      locked: true,
    }),
  },
  {
    label: 'command-palette.unlock-cells.label',
    fn: (ctx: Context) => ctx.sheet.ApplyStyle(undefined, {
      locked: false,
    }),
  },

  {
    label: 'command-palette.valign-top.label',
    fn: ApplyStyle({ vertical_align: 'top' }),
  },
  {
    label: 'command-palette.valign-bottom.label',
    fn: ApplyStyle({ vertical_align: 'bottom' }),
  },
  {
    label: 'command-palette.valign-middle.label',
    // alt: 'center',
    fn: ApplyStyle({ vertical_align: 'middle' }),
  },

  {
    label: 'command-palette.align-left.label',
    alt: 'command-palette.align-left.alt',
    fn: (ctx: Context) => ctx.sheet.ApplyStyle(undefined, {
      horizontal_align: 'left',
    }),
  },
  {
    label: 'command-palette.align-right.label',
    alt: 'command-palette.align-right.alt',
    fn: (ctx: Context) => ctx.sheet.ApplyStyle(undefined, {
      horizontal_align: 'right',
    }),
  },
  {
    label: 'command-palette.align-center.label',
    alt: 'command-palette.align-center.alt',
    fn: (ctx: Context) => ctx.sheet.ApplyStyle(undefined, {
      horizontal_align: 'center',
    }),
  },

  { 
    label: 'command-palette.toggle-word-wrap.label',
    fn: ToggleStyle('wrap'),
  },
  
  {
    label: 'command-palette.toggle-gridlines.label',
    fn: (ctx: Context) => {
      ctx.sheet.ShowGridlines();
    }
  },

  {
    label: 'command-palette.show-gridlines.label',
    fn: (ctx: Context) => {
      ctx.sheet.ShowGridlines(undefined, true);
    }
  },

  {
    label: 'command-palette.hide-gridlines.label',
    fn: (ctx: Context) => {
      ctx.sheet.ShowGridlines(undefined, false);
    }
  },

  { 
    label: 'command-palette.toggle-bold.label',
    fn: ToggleStyle('bold'),
  },

  { 
    label: 'command-palette.toggle-italic.label',
    fn: ToggleStyle('italic'),
  },
  { 
    label: 'command-palette.toggle-underline.label',
    fn: ToggleStyle('underline'),
  },
  { 
    label: 'command-palette.toggle-strikethrough.label',
    fn: ToggleStyle('strike'),
  },

  {
    label: 'command-palette.reset-text-formatting.label',
    alt: 'command-palette.reset-text-formatting.alt',
    fn: ApplyStyle({
      bold: false, 
      italic: false, 
      underline: false, 
      strike: false
    }),
  }
]

/*
if (dev_mode) {

  commands.push(
    { 
      label: 'Set font',
      alt: 'typeface',
      parameters: [{
        type: 'text',
        label: 'Enter a font or select one of the font sets',
        choices: [
          { label: 'Handwritten', value : 'stack:handwritten' },
          { label: 'Serif', value: 'stack:transitional' },
          { label: 'Sans-serif', value: 'stack:default' },
          { label: 'Monospace', value: 'stack:monospace' },
          { label: 'System UI', value: 'stack:ui' },
        ]
      }],
      fn: (ctx: Context) => {

        const value = ctx.parameters?.[0].value?.toString();
        // console.info(value);
        
        const grid: Grid = (ctx.sheet as any).grid;
        if (grid.AnnotationSelected()) {
          grid.ApplyAnnotationStyle({ font_face: value }, true);
        }
        else {
          ctx.sheet.ApplyStyle(undefined, { font_face: value }, true);
        }

      },
    }
  );

}
*/
