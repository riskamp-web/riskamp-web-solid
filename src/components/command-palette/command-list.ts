

import { IsCellAddress } from '@trebco/treb/treb-base-types';
import { UA, type Grid } from '@trebco/treb/treb-grid';
import { type Parameter, type Context, ApplyStyle, SheetToolbarCommand, ToolbarCommand, ToggleStyle, StyleParameters } from './support-functions';
import type { CellStyle, EmbeddedSpreadsheet } from 'riskamp-web';
import { NumberFormatCache } from '@trebco/treb/treb-format';
import { Sheet } from '@trebco/treb/treb-data-model';
import { t } from '~/i18n/i18n';

export interface PaletteCommand {

  /** 
   * command label. text in the label is passed to the search engine 
   * when searching for commands.
   */
  label: string;

  /** 
   * alterante text you might search for, that should return this command
   * (subject to normal search priority). For example, the command "remove 
   * hyperlink" includes the alt text "delete clear link" because you might 
   * type some combination of those terms -- you might say "remove link" instead
   * of "remove hyperlink", and we want that to return this command.
   */
  alt?: string;

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
    label: t('command-palette.remove-hyperlink.label'),
    alt: t('command-palette.remove-hyperlink.alt'),
    fn: (ctx: Context) => {
      const grid = (ctx.sheet as EmbeddedSpreadsheet & {grid: Grid}).grid;
      const sel = grid.GetSelection();
      if (!sel.empty) {
        ctx.sheet.SetLink(sel.target);
      }
    },
  },

  {
    label: t('command-palette.insert-hyperlink.label'),
    alt: t('command-palette.insert-hyperlink.alt'),
    parameters: [{
      type: 'text',
      label: t('command-palette.insert-hyperlink.parameter.url.label'),
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
    label: t('command-palette.add-edit-comment.label'),
    alt: t('command-palette.add-edit-comment.alt'),
    parameters: [{
      type: 'multi-line-text',
      label: UA.is_mac ?
        t('command-palette.add-edit-comment.parameter.comment.label-mac') :
        t('command-palette.add-edit-comment.parameter.comment.label'),
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
    label: t('command-palette.remove-comment.label'),
    alt: t('command-palette.remove-comment.alt'),
    fn: (ctx: Context) => {
      ctx.sheet.SetNote(undefined, '');
      (ctx.sheet.grid as any).layout.HideNote();
    },
  },

  {
    label: t('command-palette.reset-background-color.label'),
    alt: t('command-palette.reset-background-color.alt'),
    fn: ApplyStyle({ fill: {}}),
  },

  {
    label: t('command-palette.set-background-color.label'),
    alt: t('command-palette.set-background-color.alt'),
    parameters: [{
        type: 'color', 
      }],
    fn: StyleParameters(['fill']),
  },

  {
    label: t('command-palette.reset-text-color.label'),
    fn: ApplyStyle({ text: {}}),
    alt: t('command-palette.reset-text-color.alt'),
  },

  {
    label: t('command-palette.set-text-color.label'),
    alt: t('command-palette.set-text-color.alt'),
    parameters: [{
        type: 'color', 
      }],
      fn: StyleParameters(['text']),
    },

  {
    label: t('command-palette.reset-border-color.label'),
    alt: t('command-palette.reset-border-color.alt'),
    fn: ApplyStyle({ 
      border_top_fill: {},
      border_left_fill: {},
      border_right_fill: {},
      border_bottom_fill: {},
    }),
  },

  {
    label: t('command-palette.set-border-color.label'),
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
    label: t('command-palette.borders-clear.label'),
    fn: SheetToolbarCommand({ command: 'border-none' }),
  },

  {
    label: t('command-palette.border-top.label'),
    fn: SheetToolbarCommand({ command: 'border-top' }),
  },

  {
    label: t('command-palette.border-bottom.label'),
    fn: SheetToolbarCommand({ command: 'border-bottom' }),
  },

  {
    label: t('command-palette.border-double-bottom.label'),
    fn: SheetToolbarCommand({ command: 'border-double-bottom' }),
  },

  {
    label: t('command-palette.border-left.label'),
    fn: SheetToolbarCommand({ command: 'border-left' }),
  },

  {
    label: t('command-palette.border-right.label'),
    fn: SheetToolbarCommand({ command: 'border-right' }),
  },

  {
    label: t('command-palette.border-outside.label'),
    alt: t('command-palette.border-outside.alt'),
    fn: SheetToolbarCommand({ command: 'border-outside' }),
  },

  {
    label: t('command-palette.border-all.label'),
    fn: SheetToolbarCommand({ command: 'border-all' }),
  },

  {
    label: t('command-palette.reset-font-scale.label'),
    fn: SheetToolbarCommand({ command: 'font-scale', scale: 1.0 }),
    alt: t('command-palette.reset-font-scale.alt')
  },

  {
    label: t('command-palette.font-scale-increase.label'),
    fn: SheetToolbarCommand({ command: 'adjust-font-scale', delta: .1 }),
    alt: t('command-palette.font-scale-increase.alt')
  },

  {
    label: t('command-palette.font-scale-decrease.label'),
    fn: SheetToolbarCommand({ command: 'adjust-font-scale', delta: -.1 }),
    alt: t('command-palette.font-scale-decrease.alt')
  },

  {
    label: t('command-palette.insert-donut-chart.label'),
    fn: SheetToolbarCommand({ command: 'insert-donut-chart' }),
    alt: t('command-palette.insert-donut-chart.alt')
  },
  {
    label: t('command-palette.insert-column-chart.label'),
    fn: SheetToolbarCommand({ command: 'insert-column-chart' }),
    alt: t('command-palette.insert-column-chart.alt')
  },
  {
    label: t('command-palette.insert-bar-chart.label'),
    fn: SheetToolbarCommand({ command: 'insert-bar-chart' }),
    alt: t('command-palette.insert-bar-chart.alt')
  },
  {
    label: t('command-palette.insert-line-chart.label'),
    fn: SheetToolbarCommand({ command: 'insert-line-chart' }),
    alt: t('command-palette.insert-line-chart.alt')
  },
  {
    label: t('command-palette.insert-scatter-plot.label'),
    fn: SheetToolbarCommand({ command: 'insert-scatter-plot' }),
    alt: t('command-palette.insert-scatter-plot.alt')
  },
  {
    label: t('command-palette.insert-box-plot.label'),
    fn: SheetToolbarCommand({ command: 'insert-box-plot' }),
    alt: t('command-palette.insert-box-plot.alt')
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
    label: t('command-palette.insert-image.label'),
    fn: SheetToolbarCommand({ command: 'insert-image' }),
  },

  /*
  case 'insert-image': this.InsertImage(); break;
  */

  {
    label: t('command-palette.cf-gradient-red-green.label'),
    fn: (ctx: Context) => {
      ctx.sheet.ConditionalFormatGradient(undefined, 'red-green');
    }
  },

  {
    label: t('command-palette.cf-gradient-green-red.label'),
    fn: (ctx: Context) => {
      ctx.sheet.ConditionalFormatGradient(undefined, 'green-red');
    }
  },

  {
    label: t('command-palette.cf-unique-values.label'),
    parameters: [{
      label: t('command-palette.cf-unique-values.parameter.color.label'),
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
    label: t('command-palette.cf-data-bars.label'),
    alt: t('command-palette.cf-data-bars.alt'),
    parameters: [{
      label: t('command-palette.cf-data-bars.parameter.color.label'),
      type: 'color',
      default: { theme: 4, tint: .5 },
    }, {
      label: t('command-palette.cf-data-bars.parameter.hide-values.label'),
      type: 'boolean',
      default: true,
      choices: [
        { value: 'true', label: t('command-palette.cf-data-bars.parameter.hide-values.choice.true') },
        { value: 'false', label: t('command-palette.cf-data-bars.parameter.hide-values.choice.false') }
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
    label: t('command-palette.cf-duplicate-values.label'),
    parameters: [{
      label: t('command-palette.cf-duplicate-values.parameter.color.label'),
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
    label: t('command-palette.cf-clear.label'),
    alt: t('command-palette.cf-clear.alt'),
    fn: (ctx: Context) => {
      ctx.sheet.RemoveConditionalFormats()
    }
  },


  { 
    label: t('command-palette.fit-column-widths.label'),
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
    label: t('command-palette.fit-data.label'),
    fn: ToolbarCommand('fit-data'),
    alt: t('command-palette.fit-data.alt'),
  },

  {
    label: t('command-palette.named-ranges.label'),
    fn: ToolbarCommand('names'),
    alt: t('command-palette.named-ranges.alt'),
  },

  {
    label: t('command-palette.set-tab-color.label'),
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
    label: t('command-palette.reset-tab-color.label'),
    alt: t('command-palette.reset-tab-color.alt'),
    fn: (ctx: Context) => {
      ctx.sheet.SetTabColor(undefined, undefined);
    },
  },
  
  { 
    label: t('command-palette.fit-row-heights.label'),
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
    label: t('command-palette.correlation-matrix.label'),
    fn: ToolbarCommand('correlation-matrix'),
  },

  {
    label: t('command-palette.hide-sheet.label'),
    alt: t('command-palette.hide-sheet.alt'),
    fn: (ctx: Context) => {
      ctx.sheet.HideSheet(ctx.sheet.active_sheet, true);
    },
  },

  {
    label: t('command-palette.unhide-all-sheets.label'),
    alt: t('command-palette.unhide-all-sheets.alt'),
    fn: (ctx: Context) => {
      for (const sheet of ctx.sheet.grid.model.sheets.list) {
        if (!sheet.visible) {
          ctx.sheet.HideSheet(sheet.name, false);
        }
      }
    },
  },

  {
    label: t('command-palette.unhide-columns.label'),
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
    label: t('command-palette.unhide-rows.label'),
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
    label: t('command-palette.hide-rows.label'),
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
    label: t('command-palette.hide-columns.label'),
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
    label: t('command-palette.las-vegas-simulation.label'),
    fn: ToolbarCommand('run-lv-simulation'),
  },

  {
    label: t('command-palette.simulation-settings.label'),
    fn: ToolbarCommand('simulation-settings'),
  },

  {
    label: t('command-palette.language-settings.label'),
    fn: ToolbarCommand('language-settings'),
  },

  {
    label: t('command-palette.load-desktop-file.label'),
    alt: t('command-palette.load-desktop-file.alt'),
    fn: (ctx: Context) => ctx.sheet.LoadLocalFile(),
  },

  {
    label: t('command-palette.save-xlsx.label'),
    alt: t('command-palette.save-xlsx.alt'),
    fn: (ctx: Context) => ctx.sheet.Export(),
  },

  {
    label: t('command-palette.save-csv.label'),
    alt: t('command-palette.save-csv.alt'),
    fn: (ctx: Context) => ctx.sheet.ExportDelimited(),
  },

  {
    label: t('command-palette.save-to-cloud.label'),
    fn: ToolbarCommand('save'),
  },

  {
    label: t('command-palette.load-document.label'),
    alt: t('command-palette.load-document.alt'),
    fn: (ctx: Context) => goto('/documents'),
  },

  {
    label: t('command-palette.download-json.label'),
    alt: t('command-palette.download-json.alt'),
    fn: (ctx: Context) => ctx.sheet.SaveToDesktop(),
  },

  {
    label: t('command-palette.insert-function.label'),
    fn: ToolbarCommand('insert-function'),
  },

  {
    label: t('command-palette.find.label'),
    fn: ToolbarCommand('find'),
  },
  {
    label: t('command-palette.insert-distribution.label'),
    fn: ToolbarCommand('insert-distribution'),
  },
  {
    label: t('command-palette.run-simulation.label'),
    fn: ToolbarCommand('run-simulation-again'),
  },
  {
    label: t('command-palette.quick-view.label'),
    fn: ToolbarCommand('quick-view'),
  },
  {
    label: t('command-palette.new-model.label'),
    fn: ToolbarCommand('new-document'),
  },
  {
    label: t('command-palette.revert-file.label'),
    fn: ToolbarCommand('revert'),
  },

  {
    label: t('command-palette.recalculate.label'),
    fn: (ctx: Context) => ctx.sheet.Recalculate(),
  },

  {
    label: t('command-palette.undo.label'),
    fn: (ctx: Context) => ctx.sheet.Undo(),
  },

  {
    label: t('command-palette.delete-columns.label'),
    fn: (ctx: Context) => ctx.sheet.DeleteColumns(),
  },
  {
    label: t('command-palette.delete-rows.label'),
    fn: (ctx: Context) => ctx.sheet.DeleteRows(),
  },

  {
    label: t('command-palette.insert-column.label'),
    fn: (ctx: Context) => ctx.sheet.InsertColumns(),
  },
  {
    label: t('command-palette.insert-row.label'),
    fn: (ctx: Context) => ctx.sheet.InsertRows(),
  },

  {
    label: t('command-palette.set-view-scale.label'),
    parameters: [{
      type: 'number',
      style: 'percent',
      label: t('command-palette.set-view-scale.parameter.scale.label')
    }],
    fn: (ctx: Context) => {
      const parameter = ctx.parameters?.[0];
      if (parameter?.type === 'number' && parameter.value) {

        ctx.sheet.grid.SetScale(parameter.value);
      }
    }
  },

  {
    label: t('command-palette.reset-view-scale.label'),
    fn: (ctx: Context) => {
      ctx.sheet.grid.SetScale(1);
    }
  },

  {
    label: t('command-palette.rename-tab.label'),
    alt: t('command-palette.rename-tab.alt'),
    parameters: [{
      type: 'text',
      label: t('command-palette.rename-tab.parameter.name.label')
    }],
    fn: (ctx: Context) => {
      const parameter = ctx.parameters?.[0];
      if (parameter?.type === 'text' && parameter.value) {
        ctx.sheet.RenameSheet(undefined, parameter.value);
      }
    }
  },

  {
    label: t('command-palette.add-tab.label'),
    alt: t('command-palette.add-tab.alt'),
    parameters: [{
      label: t('command-palette.add-tab.parameter.name.label'),
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
    label: t('command-palette.delete-tab.label'),
    alt: t('command-palette.delete-tab.alt'),
    fn: (ctx: Context) => ctx.sheet.DeleteSheet(),
  },

  {
    label: t('command-palette.increase-indent.label'),
    alt: t('command-palette.increase-indent.alt'),
    fn: SheetToolbarCommand({ command: 'indent' }),
    // fn: (ctx: Context) => (ctx.sheet as any).HandleToolbarMessage({ command: 'indent'}),
  },
  {
    label: t('command-palette.decrease-indent.label'),
    alt: t('command-palette.decrease-indent.alt'),
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
    label: t('command-palette.number-format-increase-precision.label'),
    alt: t('command-palette.number-format-increase-precision.alt'),
    fn: SheetToolbarCommand({ command: 'increase-precision' }),
  },
  {
    label: t('command-palette.number-format-decrease-precision.label'),
    alt: t('command-palette.number-format-decrease-precision.alt'),
    fn: SheetToolbarCommand({ command: 'decrease-precision' }),
  },

  {
    label: t('command-palette.number-format.label'),
    alt: t('command-palette.number-format.alt'),
    parameters: [{ 
      name: 'Format', 
      type: 'text', 
      label: t('command-palette.number-format.parameter.format.label'),
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
    label: t('command-palette.merge-cells.label'),
    fn: (ctx: Context) => ctx.sheet.MergeCells(),
  },
  {
    label: t('command-palette.unmerge-cells.label'),
    fn: (ctx: Context) => ctx.sheet.UnmergeCells(),
  },

  {
    label: t('command-palette.lock-cells.label'),
    fn: (ctx: Context) => ctx.sheet.ApplyStyle(undefined, {
      locked: true,
    }),
  },
  {
    label: t('command-palette.unlock-cells.label'),
    fn: (ctx: Context) => ctx.sheet.ApplyStyle(undefined, {
      locked: false,
    }),
  },

  {
    label: t('command-palette.valign-top.label'),
    fn: ApplyStyle({ vertical_align: 'top' }),
  },
  {
    label: t('command-palette.valign-bottom.label'),
    fn: ApplyStyle({ vertical_align: 'bottom' }),
  },
  {
    label: t('command-palette.valign-middle.label'),
    // alt: 'center',
    fn: ApplyStyle({ vertical_align: 'middle' }),
  },

  {
    label: t('command-palette.align-left.label'),
    alt: t('command-palette.align-left.alt'),
    fn: (ctx: Context) => ctx.sheet.ApplyStyle(undefined, {
      horizontal_align: 'left',
    }),
  },
  {
    label: t('command-palette.align-right.label'),
    alt: t('command-palette.align-right.alt'),
    fn: (ctx: Context) => ctx.sheet.ApplyStyle(undefined, {
      horizontal_align: 'right',
    }),
  },
  {
    label: t('command-palette.align-center.label'),
    alt: t('command-palette.align-center.alt'),
    fn: (ctx: Context) => ctx.sheet.ApplyStyle(undefined, {
      horizontal_align: 'center',
    }),
  },

  { 
    label: t('command-palette.toggle-word-wrap.label'),
    fn: ToggleStyle('wrap'),
  },
  
  {
    label: t('command-palette.toggle-gridlines.label'),
    fn: (ctx: Context) => {
      ctx.sheet.ShowGridlines();
    }
  },

  {
    label: t('command-palette.show-gridlines.label'),
    fn: (ctx: Context) => {
      ctx.sheet.ShowGridlines(undefined, true);
    }
  },

  {
    label: t('command-palette.hide-gridlines.label'),
    fn: (ctx: Context) => {
      ctx.sheet.ShowGridlines(undefined, false);
    }
  },

  { 
    label: t('command-palette.toggle-bold.label'),
    fn: ToggleStyle('bold'),
  },

  { 
    label: t('command-palette.toggle-italic.label'),
    fn: ToggleStyle('italic'),
  },
  { 
    label: t('command-palette.toggle-underline.label'),
    fn: ToggleStyle('underline'),
  },
  { 
    label: t('command-palette.toggle-strikethrough.label'),
    fn: ToggleStyle('strike'),
  },

  {
    label: t('command-palette.reset-text-formatting.label'),
    alt: t('command-palette.reset-text-formatting.alt'),
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
