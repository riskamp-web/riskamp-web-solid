/**
 * icons local to the backstage redesign.
 *
 * the app icon set (~/components/icon-sets) has no star / folder / search /
 * trash glyph, and adding names there means touching three files outside the
 * redesign's containment boundary. these are plain components rather than the
 * app's innerHTML={icons.x} pattern, mostly so the star's filled state can be
 * a prop instead of a second glyph.
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

export function Star(props: IconProps & { filled?: boolean }) {
  return svg(props,
    <path d='M12 4.2l2.42 4.9 5.41.79-3.92 3.81.93 5.39L12 16.55l-4.84 2.54.93-5.39L4.17 9.89l5.41-.79L12 4.2z' />,
    { fill: props.filled ? 'currentColor' : 'none' });
}

export function Folder(props: IconProps) {
  return svg(props,
    <path d='M3.5 7.2a1.5 1.5 0 011.5-1.5h3.6l1.9 2.4h8a1.5 1.5 0 011.5 1.5v7.6a1.5 1.5 0 01-1.5 1.5H5a1.5 1.5 0 01-1.5-1.5V7.2z' />);
}

export function Search(props: IconProps) {
  return svg(props, <>
    <circle cx='10.8' cy='10.8' r='5.8' />
    <path d='M15.2 15.2L20 20' />
  </>);
}

export function Overflow(props: IconProps) {
  return svg(props, <>
    <circle cx='12' cy='5.5' r='1.1' fill='currentColor' stroke='none' />
    <circle cx='12' cy='12' r='1.1' fill='currentColor' stroke='none' />
    <circle cx='12' cy='18.5' r='1.1' fill='currentColor' stroke='none' />
  </>);
}

export function Close(props: IconProps) {
  return svg(props, <path d='M6.5 6.5l11 11M17.5 6.5l-11 11' />);
}

export function CaretDown(props: IconProps) {
  return svg(props, <path d='M6.5 9.75L12 15.25l5.5-5.5' />);
}

export function CaretRight(props: IconProps) {
  return svg(props, <path d='M9.75 6.5L15.25 12l-5.5 5.5' />);
}

export function Plus(props: IconProps) {
  return svg(props, <path d='M12 5.5v13M5.5 12h13' />);
}

export function Globe(props: IconProps) {
  return svg(props, <>
    <circle cx='12' cy='12' r='8' />
    <path d='M4.4 9.5h15.2M4.4 14.5h15.2' />
    <path d='M12 4c-2 2.2-3 5-3 8s1 5.8 3 8c2-2.2 3-5 3-8s-1-5.8-3-8z' />
  </>);
}

export function Lock(props: IconProps) {
  return svg(props, <>
    <rect x='5.5' y='10.5' width='13' height='9' rx='1.5' />
    <path d='M8.5 10.5V8a3.5 3.5 0 017 0v2.5' />
  </>);
}

export function Trash(props: IconProps) {
  return svg(props, <>
    <path d='M4.5 7h15' />
    <path d='M9.5 7V5.6A1.6 1.6 0 0111.1 4h1.8a1.6 1.6 0 011.6 1.6V7' />
    <path d='M6.5 7v11.4A1.6 1.6 0 008.1 20h7.8a1.6 1.6 0 001.6-1.6V7' />
  </>);
}

export function Copy(props: IconProps) {
  return svg(props, <>
    <rect x='8.5' y='8.5' width='11' height='11' rx='1.5' />
    <path d='M15.5 5.5H6a1.5 1.5 0 00-1.5 1.5v9.5' />
  </>);
}

export function Clock(props: IconProps) {
  return svg(props, <>
    <circle cx='12' cy='12' r='8' />
    <path d='M12 7.5V12l3 1.8' />
  </>);
}

/** small spreadsheet mark, used for empty states and the detail header */
export function Sheet(props: IconProps) {
  return svg(props, <>
    <rect x='4' y='4.5' width='16' height='15' rx='1.5' />
    <path d='M4 9.5h16M4 14.5h16M10.5 9.5v10' />
  </>);
}

export function Check(props: IconProps) {
  return svg(props, <path d='M5.5 12.5l4 4 9-9' />);
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
