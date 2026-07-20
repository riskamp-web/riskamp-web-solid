
/**
 * Every icon we use, grouped by role.
 *
 * This is the single source of truth: `IconName` is derived from it, and the
 * gallery page (`gallery.tsx`) iterates it. A name that isn't listed in some
 * group doesn't exist, and the icon sets won't compile without it.
 *
 * Names describe the _role_, not the picture. Two commands that happen to
 * share a glyph today still get separate names, so either can change without
 * disturbing the other.
 */
export const ICON_GROUPS = {

  file_app: [
    'sign_out', 'fullscreen', 'new_spreadsheet', 'import_file', 'revert_file',
    'save_to_desktop', 'export_xlsx',
  ],

  panels: [
    'ai_chat', 'developer', 'notes',
  ],

  color: [
    'text_color', 'fill_color',
  ],

  borders: [
    'border_top', 'border_bottom', 'border_left', 'border_right', 'border_all',
    'border_none', 'border_outside', 'border_double_bottom', 'border_color',
  ],

  number_format: [
    'font_scale', 'number_format', 'toggle_grouping',
  ],

  insert: [
    'insert_table', 'insert_comment', 'insert_bar_chart', 'insert_column_chart',
    'insert_donut_chart', 'insert_area_chart', 'insert_scatter_plot',
    'insert_line_chart', 'insert_image',
  ],

  text_style: [
    'wrap', 'bold', 'italic', 'underline', 'strike', 'sparkline',
  ],

  cell_ops: [
    'merge_cells', 'unmerge_cells', 'lock_cells', 'unlock_cells',
  ],

  alignment: [
    'align_left', 'align_center', 'align_right',
    'align_top', 'align_middle', 'align_bottom',
    'indent', 'outdent',
  ],

  data_tools: [
    'fit_data', 'defined_names', 'find',
  ],

  simulation: [
    'run_simulation', 'run_simulation_again', 'las_vegas_simulation',
    'quick_view', 'quick_view_correlation', 'simulation_settings', 'recalculate',
  ],

  documentation: [
    'riskamp_documentation',
  ],

  /**
   * Generic chrome, reused across unrelated components. Named for what they do,
   * not for the component they sit in -- there is one `close`, not a
   * dialog_close and a sidebar_close.
   */
  ui_primitives: [
    'close', 'confirm', 'menu_checked', 'help', 'overflow', 'caret_down',
  ],

  component: [
    'copy', 'copy_confirmed', 'name_expression', 'name_range',
    'seed_time_based', 'seed_reset',
    'theme_light', 'theme_dark', 'theme_system',
    'row_column_ops',
  ],

} as const satisfies Record<string, readonly string[]>;

export type IconGroup = keyof typeof ICON_GROUPS;

/** Symbolic name for an icon. Derived from ICON_GROUPS above. */
export type IconName = (typeof ICON_GROUPS)[IconGroup][number];

/** A complete icon mapping: every name -> an inline SVG string. */
export type IconSet = Record<IconName, string>;

/** Headings for the gallery page. */
export const ICON_GROUP_LABELS: Record<IconGroup, string> = {
  file_app:      'File / app',
  panels:        'Panels',
  color:         'Color',
  borders:       'Borders',
  number_format: 'Number format',
  insert:        'Insert',
  text_style:    'Text style',
  cell_ops:      'Cell operations',
  alignment:     'Alignment',
  data_tools:    'Data tools',
  simulation:    'Simulation',
  documentation: 'Documentation',
  ui_primitives: 'UI primitives',
  component:     'Component-specific',
};
