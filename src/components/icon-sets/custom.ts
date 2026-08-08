
// import { bootstrap_icons as bs, fa_light, fa_regular, fa_sharp_light, fa_sharp_regular } from 's5-icon-lib';
// import { phosphor_light as phosphor } from 's5-icon-lib';
// import { lucide } from 's5-icon-lib';

// import { ICONS } from 'riskamp-icons';

import { icons as rai } from 'riskamp-icon-workbench';

import type { IconSet } from './types';


export const icons: IconSet = {

  // --- file / app ----------------------------------------------------

  sign_out:               rai['sign-out'],
  fullscreen:             rai.fullscreen,
  new_spreadsheet:        rai['new-spreadsheet'],
  import_file:            rai['import-file'],
  revert_file:            rai['revert-file-2'],
  save_to_desktop:        rai['save-to-desktop'],
  export_xlsx:            rai['export-xlsx'],
  trash:                  rai['trash'],
  folder:                 rai['folder'],
  star:                   rai['star'],
  recent:                 rai['recent'],

  // --- panels --------------------------------------------------------

  ai_chat:                rai['ai-chat'],
  developer:              rai['developer-2'],
  notes:                  rai.notes,

  // --- color ---------------------------------------------------------

  text_color:             rai['text-color'],
  fill_color:             rai['fill-color'],

  // --- borders -------------------------------------------------------

  border_top:             rai['border-top'],
  border_bottom:          rai['border-bottom'],
  border_left:            rai['border-left'],
  border_right:           rai['border-right'],
  border_all:             rai['border-all'],
  border_none:            rai['border-none'],
  border_outside:         rai['border-outside'],
  border_double_bottom:   rai['border-double-bottom'],
  border_color:           rai['border-color'],

  // --- number format -------------------------------------------------

  font_scale:             rai['font-scale-2'],
  number_format:          rai['number-format-2'],
  toggle_grouping:        rai['toggle-grouping'],

  // --- insert --------------------------------------------------------

  insert_table:           rai['insert-table'],
  insert_comment:         rai['insert-comment'],
  insert_bar_chart:       rai['insert-bar-chart-2'],
  insert_column_chart:    rai['insert-column-chart'],
  insert_donut_chart:     rai['insert-donut-chart'],
  insert_area_chart:      rai['insert-area-chart'],
  insert_scatter_plot:    rai['insert-scatter-plot'],
  insert_line_chart:      rai['insert-line-chart'],
  insert_image:           rai['insert-image'],

  // --- text style ----------------------------------------------------

  wrap:                   rai['wrap-2'],
  bold:                   rai.bold,
  italic:                 rai['italic-alt-2'],
  underline:              rai['underline-2'],
  strike:                 rai['strike-2'],
  sparkline:              rai['insert-sparkline-2'],

  // --- cell ops ------------------------------------------------------

  merge_cells:            rai['fullscreen'],
  unmerge_cells:          rai['unmerge-cells'],
  lock_cells:             rai['lock-cells'],
  unlock_cells:           rai['unlock-cells'],

  // --- alignment -----------------------------------------------------

  align_left:             rai['align-left-2'],
  align_center:           rai['align-center-2'],
  align_right:            rai['align-right-2'],
  align_top:              rai['align-top-2'],
  align_middle:           rai['align-middle-2'],
  align_bottom:           rai['align-bottom-2'],
  indent:                 rai['indent-3'],
  outdent:                rai['outdent-3'],

  // --- data tools ----------------------------------------------------

  fit_data:               rai['fit-data-2'],
  defined_names:          rai['defined-names-2'],
  find:                   rai.find,

  // --- simulation ----------------------------------------------------

  run_simulation:         rai['run-simulation-2'],
  run_simulation_again:   rai['run-simulation-again-2'],
  las_vegas_simulation:   rai['las-vegas-simulation-2'],
  quick_view:             rai['quick-view'],
  quick_view_correlation: rai['quick-view-correlation'],
  simulation_settings:    rai['simulation-settings'],
  recalculate:            rai['recalculate-3'],

  // --- help ----------------------------------------------------------

  riskamp_documentation:  rai['riskamp-documentation'],

  // --- ui primitives -------------------------------------------------

  close:                  rai.close,

  // NOTE: these three are three _different_ bootstrap check glyphs, carried
  // over as-is from the call sites. If the variation isn't deliberate they
  // can be unified by pointing all three at one glyph, here.
  confirm:                rai.confirm,
  menu_checked:           rai['menu-checked'],
  help:                   rai.help,
  warning:                rai.warning,
  overflow:               rai.overflow,
  caret_down:             rai['caret-down'],
  plus:                   rai['plus'],
  eye_on:                 rai['eye-on'],
  eye_off:                rai['eye-off'],
  public:                 rai['public'],

  // --- component-specific --------------------------------------------

  copy:                   rai.copy,
  copy_confirmed:         rai['copy-confirmed'],
  named_expression:       rai['named-expression'],
  named_range:            rai['named-range'],
  seed_time_based:        rai.help, // FIXME
  seed_reset:             rai.help, // FIXME
  theme_light:            rai['theme-light'],
  theme_dark:             rai['theme-dark-2'],
  theme_system:           rai['theme-system-2'],
  row_column_ops:         rai['row-column-ops'],

};
