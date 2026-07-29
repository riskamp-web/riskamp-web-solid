/**
 * the glyphs the app icon set doesn't have.
 *
 * the backstage pages draw from ~/components/icon-sets; what's left here is what
 * that set has no name for -- public/private access, a plain spreadsheet mark,
 * and the password reveal pair. each is a stand-in: as the set grows a name for
 * one of these, the page should switch to it and the component should go.
 *
 * conventions follow the app set: currentColor, thin stroke, square, and
 * rendered at 20px -- the art sits in a 16px area inside that box and is
 * allowed to bleed past it, so layout should reserve the full 20px.
 */

import { JSX } from 'solid-js';

/** matches the app icon set: 20px box, ~16px art area, bleed allowed */
export const ICON_SIZE = 20;

interface IconProps {
  size?: number;
  class?: string;
}

function svg(props: IconProps, children: JSX.Element, extra?: JSX.SvgSVGAttributes<SVGSVGElement>) {
  return <svg
      xmlns='http://www.w3.org/2000/svg'
      class={props.class}
      width={props.size ?? ICON_SIZE}
      height={props.size ?? ICON_SIZE}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
      aria-hidden='true'
      {...extra}>
    {children}
  </svg>;
}

/* public access. the set has no globe, and a substitute is coming -- until then
   the pair is drawn half here and half from the set (private is lock_cells). */
export function Globe(props: IconProps) {
  return svg(props, <>
    <circle cx='12' cy='12' r='8' />
    <path d='M4.4 9.5h15.2M4.4 14.5h15.2' />
    <path d='M12 4c-2 2.2-3 5-3 8s1 5.8 3 8c2-2.2 3-5 3-8s-1-5.8-3-8z' />
  </>);
}

/* a plain spreadsheet mark, for the "all documents" scope, the empty state and
   the open actions. the set's only document glyph is new_spreadsheet, which
   carries a plus -- right for the New document button, wrong for these. */
export function Sheet(props: IconProps) {
  return svg(props, <>
    <rect x='4' y='4.5' width='16' height='15' rx='1.5' />
    <path d='M4 9.5h16M4 14.5h16M10.5 9.5v10' />
  </>);
}

/* eye / eye-off are a pair: the password reveal toggle draws one in each state,
   so neither can be text-only without the other reading as inconsistent */

export function Eye(props: IconProps) {
  return svg(props, <>
    <path d='M3 12s3.4-5.5 9-5.5S21 12 21 12s-3.4 5.5-9 5.5S3 12 3 12z' />
    <circle cx='12' cy='12' r='2.6' />
  </>);
}

export function EyeOff(props: IconProps) {
  return svg(props, <>
    <path d='M9.9 6.7A9.7 9.7 0 0112 6.5c5.6 0 9 5.5 9 5.5a16 16 0 01-3.2 3.8' />
    <path d='M6.3 8.2A15.9 15.9 0 003 12s3.4 5.5 9 5.5a9.9 9.9 0 004-.8' />
    <path d='M10.2 10.2a2.6 2.6 0 003.6 3.6' />
    <path d='M4.5 4.5l15 15' />
  </>);
}
