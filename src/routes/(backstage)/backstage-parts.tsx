/**
 * the small markup helpers the backstage pages share.
 *
 * these live in the route folder rather than ~/backstage because the
 * containment rule splits on *markup*, not on sharing, and both of these
 * produce it.
 *
 * documents.tsx still has its own copy of Icon. it's left there rather than
 * swept into this pass -- worth deduping next time that page is open.
 */

import { JSX } from 'solid-js';
import { A } from '@solidjs/router';

import { IconName, icons } from '~/components/icon-sets';
import { devResetLink } from '~/backstage/dev-access';

import bs from './backstage.module.css';

/**
 * the app icon set ships svg markup as strings, so an icon is an element with
 * the markup inside it rather than a component. the box is fixed at the set's
 * 20px in .icon and the svg is sized to fill it, so a glyph that arrives at
 * another size can't shift a row; pass a class to override that.
 */
export function Icon(props: { name: IconName, class?: string }) {
  return <span class={`${bs.icon} ${props.class || ''}`} innerHTML={icons[props.name]} />;
}

/**
 * splice an element into a translated string at its {placeholder}.
 *
 * format() splices values, which is enough when the value is words. it isn't
 * when the value has to be marked up -- a link, or an address in monospace --
 * and the alternative is breaking the sentence into two keys and concatenating
 * around the element, which is exactly what a translation can't reorder. this
 * keeps the whole sentence in one key with the placeholder wherever the
 * grammar wants it.
 *
 * an unmatched name leaves the text alone rather than dropping the element,
 * so a typo is visible in the ui instead of silently swallowing it.
 */
export function splice(text: string, name: string, element: JSX.Element): JSX.Element {
  const parts = text.split(`{${name}}`);
  if (parts.length < 2) { return text; }
  return <>{parts[0]}{element}{parts.slice(1).join(`{${name}}`)}</>;
}

/**
 * the link the confirmation email would have carried, on the dev server only.
 *
 * both the sign-up and the recovery flow end by telling you to go and read your
 * mail, and a mock sends none -- so `/update-password` would otherwise be
 * reachable only by typing a url with a plausible token in it.
 *
 * **the shape of this function is what keeps it out of production**, and it took
 * two tries to get right. `import.meta.env.DEV` is replaced by a literal, so an
 * early `return` on it makes everything below unreachable and the minifier
 * deletes it, template and label included -- the same statement-level `if`
 * dev-access.ts uses. what does *not* work, and was verified by grepping dist/:
 *
 *   - `<Show when={import.meta.env.DEV}>` -- children are a prop, so the markup
 *     is constructed either way and only the rendering is skipped
 *   - `{import.meta.env.DEV && <A/>}` inside jsx -- solid's compiler wraps the
 *     whole expression in a memo, and the minifier can't see into the thunk
 *
 * so: check the flag in a statement, not in an expression, and never inside jsx.
 * if this ever needs editing, re-run the grep.
 *
 * the label is the one deliberately un-extracted string in this directory --
 * an i18n key would ship, and would imply someone should translate it.
 */
export function DevResetLink(props: { email: string }): JSX.Element {

  if (!import.meta.env.DEV) { return null; }

  return <A class={bs.link} href={devResetLink(props.email)}>
    [dev] open the reset link
  </A>;

}
