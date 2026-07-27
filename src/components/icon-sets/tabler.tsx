
import { bootstrap_icons as bs, fa_light, fa_regular, fa_sharp_light, fa_sharp_regular } from 's5-icon-lib';
import { phosphor_light as phosphor } from 's5-icon-lib';
import { lucide } from 's5-icon-lib';

import { fluent } from 'fluent-icons/output/fluent';
import { fluent_mdl2 } from 'fluent-icons/output/fluent_mdl2';

import { tabler_outline as tabler } from 'tabler-icons/output/tabler_outline';

import type { IconSet } from './types';

/**
 * The current icon set: a mix of families, picked glyph by glyph.
 *
 * `alt:` comments record other candidates we've looked at for that slot.
 */
export const icons: IconSet = {

  // --- file / app ----------------------------------------------------

  sign_out:               tabler.logout,
  fullscreen:             tabler.maximize,
  new_spreadsheet:        tabler.file,
  import_file:            tabler.upload,
  revert_file:            tabler.clock_up,
  save_to_desktop:        tabler.download,
  export_xlsx:            tabler.file_spreadsheet,            // alt: bs.file_earmark_excel

  // --- panels --------------------------------------------------------

  ai_chat:                tabler.messages,   // alt: bs.chat_dots, phosphor.chat_circle_dots
  developer:              tabler.braces,      // alt: bs.braces
  notes:                  tabler.notebook,        // alt: bs.journal_text, phosphor.notebook, lucide.notebook_text

  // --- color ---------------------------------------------------------

  text_color:             bs.type,                      // alt: fa_regular.a, phosphor.text_aa
  fill_color:             fluent.paint_bucket_20_regular,              // alt: phosphor.paint_bucket, fa_sharp_regular.fill_drip

  // --- borders -------------------------------------------------------

  border_top:             bs.border_top,
  border_bottom:          bs.border_bottom,
  border_left:            bs.border_left,
  border_right:           bs.border_right,
  border_all:             bs.border_all,
  border_none:            bs.border,
  border_outside:         bs.border_outer,
  border_double_bottom:   bs.border_bottom,
  border_color:           bs.palette2,                  // alt: phosphor.palette

  // --- number format -------------------------------------------------

  font_scale:             fa_regular.text_size,
  number_format:          phosphor.hash,                // alt: bs.hash
  toggle_grouping:        fa_regular.comma,

  // --- insert --------------------------------------------------------

  insert_table:           tabler.table,
  insert_comment:         fa_sharp_regular.comment,
  insert_bar_chart:       tabler.chart_bar,   // alt: fa_light.chart_bar, phosphor.chart_bar_horizontal, lucide.chart_bar_big
  insert_column_chart:    tabler.chart_column, // alt: fa_solid.chart_column, phosphor.chart_bar, lucide.chart_column_big
  insert_donut_chart:     tabler.chart_donut,   // alt: fa_solid.chart_pie, phosphor.chart_donut
  insert_area_chart:      tabler.chart_area,  // alt: fa_solid.chart_area
  insert_scatter_plot:    tabler.chart_scatter, // alt: fa_solid.chart_scatter, phosphor.chart_scatter, lucide.chart_scatter
  insert_line_chart:      tabler.chart_line,  // alt: fa_solid.chart_line, phosphor.chart_line, lucide.chart_line
  insert_image:           tabler.photo,       // alt: fa_solid.image, phosphor.image, lucide.image

  // --- text style ----------------------------------------------------

  wrap:                   tabler.text_wrap,
  bold:                   tabler.bold,                 // alt: phosphor.text_b, fa_sharp_regular.bold
  italic:                 tabler.italic,
  underline:              tabler.underline,
  strike:                 tabler.strikethrough,
  sparkline:              tabler.graph,

  // --- cell ops ------------------------------------------------------

  merge_cells:            bs.fullscreen_exit,
  unmerge_cells:          bs.fullscreen,
  lock_cells:             bs.lock,
  unlock_cells:           bs.unlock,

  // --- alignment -----------------------------------------------------

  align_left:             bs.text_left,
  align_center:           bs.text_center,
  align_right:            bs.text_right,
  align_top:              fa_light.arrow_up_to_line,
  align_middle:           fa_light.arrows_to_line,
  align_bottom:           fa_light.arrow_down_to_line,
  indent:                 bs.text_indent_left,
  outdent:                bs.text_indent_right,

  // --- data tools ----------------------------------------------------

  fit_data:               lucide.chart_no_axes_combined, // alt: bs.graph_up_arrow, phosphor.chart_line_up
  defined_names:          lucide.tag,                   // alt: bs.tag, fa_solid.label, phosphor.tag
  find:                   lucide.search,                // alt: bs.search, phosphor.magnifying_glass

  // --- simulation ----------------------------------------------------

  run_simulation:         bs.play_circle,
  run_simulation_again:   bs.fast_forward,
  las_vegas_simulation:   lucide.spade,                 // alt: bs.suit_spade_fill, phosphor.spade
  quick_view:             fa_sharp_regular.square_poll_vertical,
  quick_view_correlation: fa_sharp_regular.square_poll_vertical,
  simulation_settings:    lucide.settings_2,            // alt: bs.gear, phosphor.gear
  recalculate:            fa_sharp_regular.arrows_rotate, // alt: phosphor.arrows_clockwise, lucide.refresh_cw

  // --- help ----------------------------------------------------------

  riskamp_documentation:  lucide.circle_question_mark,  // alt: phosphor.question

  // --- ui primitives -------------------------------------------------

  close:                  bs.x_lg,

  // NOTE: these three are three _different_ bootstrap check glyphs, carried
  // over as-is from the call sites. If the variation isn't deliberate they
  // can be unified by pointing all three at one glyph, here.
  confirm:                bs.check_lg,
  menu_checked:           bs.check2,
  help:                   bs.question_circle,
  overflow:               bs.three_dots,
  caret_down:             bs.caret_down_fill,

  // --- component-specific --------------------------------------------

  copy:                   bs.copy,
  copy_confirmed:         bs.check,
  name_expression:        bs.braces,
  name_range:             bs.grid_3x3,
  seed_time_based:        bs.clock,
  seed_reset:             bs.lightning,
  theme_light:            bs.sun,
  theme_dark:             bs.moon,
  theme_system:           bs.circle_half,
  row_column_ops:         bs.rulers,                    // alt: lucide.pencil_ruler, bs.columns, fa_regular.ruler_triangle

};
