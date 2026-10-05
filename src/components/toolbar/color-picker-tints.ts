import { Measurement } from '@trebco/treb/treb-utils';

/**
 * tint rows for the color picker, per theme column, following Excel's
 * picker. columns are in TREB theme-index order: grid fill, grid text,
 * background, text, then the six accents. the base (tint 0) row is drawn
 * separately, above these rows.
 *
 * prototype: swatches are resolved here (in CSS) rather than by TREB, so
 * they have to follow TREB's tint math -- see ColorFunctions.Lighten and
 * Darken in treb-base-types/src/color.ts. the long-term plan is for TREB
 * to expose the resolver instead.
 */
const accent_tints = [.8, .6, .4, -.25, -.5];

export const theme_tints: number[][] = [
  [-.05, -.15, -.25, -.35, -.5],  // grid fill  (Excel "Background 1")
  [.5, .35, .25, .15, .05],       // grid text  (Excel "Text 1")
  [-.1, -.25, -.5, -.75, -.9],    // background (Excel "Background 2")
  accent_tints,                   // text       (Excel "Text 2")
  accent_tints,
  accent_tints,
  accent_tints,
  accent_tints,
  accent_tints,
  accent_tints,
];

/** HSL lightness of a css color, in [0, 1] */
function Lightness(color: string) {
  const [r, g, b] = Array.from(Measurement.MeasureColor(color)).map(value => value / 255);
  return (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
}

/**
 * same test TREB uses (DeriveColorScheme in treb-base-types/src/theme.ts):
 * if the grid text is lighter than the grid fill, we're in dark mode.
 */
export function IsDarkTheme(grid_fill: string, grid_text: string) {
  return Lightness(grid_text) > Lightness(grid_fill);
}

/**
 * css for a theme color at a tint, the way TREB renders it: darker is
 * l * (1 + t), lighter is l + (1 - l) * t, and the tint is inverted in
 * dark mode.
 */
export function TintedColor(base: string, tint: number, dark: boolean) {
  if (dark) {
    tint = -tint;
  }
  if (tint > 0) {
    return `hsl(from ${base} h s calc(l + (100 - l) * ${tint}))`;
  }
  return `hsl(from ${base} h s calc(l * ${1 + tint}))`;
}
