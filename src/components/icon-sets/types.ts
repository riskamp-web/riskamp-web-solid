
/**
 * Symbolic names for every icon the toolbar uses.
 *
 * These are named for their _role_, not for what they look like. Two commands
 * that happen to share a glyph today still get separate names, so either one
 * can be changed without disturbing the other.
 *
 * Declared explicitly (rather than derived from one of the mappings) so that
 * an incomplete or misspelled icon set is a compile error.
 */
export type IconName =

  // --- file / app ---
  | 'sign_out'
  | 'fullscreen'
  | 'new_spreadsheet'
  | 'import_file'
  | 'revert_file'
  | 'save_to_desktop'
  | 'export_xlsx'

  // --- panels ---
  | 'ai_chat'
  | 'developer'
  | 'notes'

  // --- color ---
  | 'text_color'
  | 'fill_color'

  // --- borders ---
  | 'border_top'
  | 'border_bottom'
  | 'border_left'
  | 'border_right'
  | 'border_all'
  | 'border_none'
  | 'border_outside'
  | 'border_double_bottom'
  | 'border_color'

  // --- number format ---
  | 'font_scale'
  | 'number_format'
  | 'toggle_grouping'

  // --- insert ---
  | 'insert_table'
  | 'insert_comment'
  | 'insert_bar_chart'
  | 'insert_column_chart'
  | 'insert_donut_chart'
  | 'insert_area_chart'
  | 'insert_scatter_plot'
  | 'insert_line_chart'
  | 'insert_image'

  // --- text style ---
  | 'wrap'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'sparkline'

  // --- cell ops ---
  | 'merge_cells'
  | 'unmerge_cells'
  | 'lock_cells'
  | 'unlock_cells'

  // --- alignment ---
  | 'align_left'
  | 'align_center'
  | 'align_right'
  | 'align_top'
  | 'align_middle'
  | 'align_bottom'
  | 'indent'
  | 'outdent'

  // --- data tools ---
  | 'fit_data'
  | 'defined_names'
  | 'find'

  // --- simulation ---
  | 'run_simulation'
  | 'run_simulation_again'
  | 'las_vegas_simulation'
  | 'quick_view'
  | 'quick_view_correlation'
  | 'simulation_settings'
  | 'recalculate'

  // --- help ---
  | 'riskamp_documentation'
  ;

/** A complete icon mapping: every name -> an inline SVG string. */
export type IconSet = Record<IconName, string>;
