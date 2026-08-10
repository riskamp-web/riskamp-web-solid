
import { createSignal, type JSX } from 'solid-js';
import { createStore } from 'solid-js/store';
import en from '~/i18n/lang/en';

export type I18N = typeof en;

/**
 * the shape a catalogue has to have: strings at the leaves, namespaces in
 * between. the dot is the separator between segments, which is why it can't
 * appear *inside* one -- see AssertNoDots at the bottom of this file.
 */
export type StringTree = { [key: string]: string | StringTree };

/** a translation supplies whatever it has; english fills in the rest. */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends string ? string : DeepPartial<T[K]>;
};

/** every dotted path through the tree that lands on a string. */
export type StringKey = Leaf<I18N>;

type Leaf<T, P extends string = ''> = {
  [K in keyof T & string]: T[K] extends string
    ? P extends '' ? K : `${P}.${K}`
    : Leaf<T[K], P extends '' ? K : `${P}.${K}`>;
}[keyof T & string];

/** the tree with each leaf replaced by its own key -- see K, below. */
export type KeyPaths<T, P extends string = ''> = {
  [K in keyof T & string]: T[K] extends string
    ? P extends '' ? K : `${P}.${K}`
    : KeyPaths<T[K], P extends '' ? K : `${P}.${K}`>;
};

// a *copy* of english, never `en` itself. a store writes through to the object
// it wraps, so handing it `en` would mean loading a translation overwrites the
// english catalogue in place -- and then switching back to english restores
// from a catalogue that is no longer english. every assignment below goes
// through deepMerge for the same reason.
const [i18n_instance, setI18nInstance] = createStore({
  strings: deepMerge(en),
});

const [currentLocale, setCurrentLocale] = createSignal('en-us');
export { currentLocale };

function buildKeyPaths(node: StringTree, prefix = ''): StringTree {
  const paths: StringTree = {};
  for (const [segment, value] of Object.entries(node)) {
    const path = prefix ? `${prefix}.${segment}` : segment;
    paths[segment] = typeof value === 'string' ? path : buildKeyPaths(value, path);
  }
  return paths;
}

/**
 * the catalogue's keys as an object, so a key can be *navigated* to rather than
 * spelled out: K.toolbar.menus.file is the string 'toolbar.menus.file', typed as
 * that exact literal. t(K.toolbar.menus.file) and t('toolbar.menus.file') are
 * the same call.
 *
 * built from english because english is the canonical catalogue -- a key a
 * translation invents isn't a key. segments that aren't valid identifiers need
 * brackets: K['command-palette'].find.label.
 */
export const K = buildKeyPaths(en) as KeyPaths<I18N>;

/**
 * resolve a key against the current language.
 *
 * the key is a path and this walks it a segment at a time, which is what keeps
 * it reactive: every hop is a read off the store, so a language change
 * invalidates whatever drew this. that means it has to be called from a
 * tracking scope -- at module scope it snapshots english and stays there.
 *
 * a path that doesn't resolve returns the key itself rather than '', on the
 * same reasoning as format() leaving {whatever} in place: a mistake should be
 * visible in the ui, not silently blank.
 */
export function t(key?: StringKey): string {
  if (!key) { return ''; }

  let node: unknown = i18n_instance.strings;
  for (const segment of key.split('.')) {
    if (typeof node !== 'object' || node === null) { return key; }
    node = (node as Record<string, unknown>)[segment];
  }

  return typeof node === 'string' ? node : key;
}

/**
 * english under, the translation over, one namespace at a time.
 *
 * a plain spread would only reach the top level, so a translation that supplied
 * part of `toolbar` would drop the rest of it on the floor. english is the
 * canonical key set, so this walks *that*: a key the translation doesn't have
 * keeps its english, and a key english doesn't have isn't a key.
 *
 * it always builds fresh objects, even with no delta to apply -- `base` is the
 * module-level english catalogue, and anything handed to the store is written
 * through to. call it with one argument for a plain copy.
 */
function deepMerge<T extends StringTree>(base: T, delta?: unknown): T {
  const patch = (delta && typeof delta === 'object') ? delta as StringTree : undefined;

  const merged: StringTree = {};
  for (const [segment, value] of Object.entries(base)) {
    const translated = patch?.[segment];
    merged[segment] = typeof value === 'string'
      ? (typeof translated === 'string' ? translated : value)
      : deepMerge(value, translated);
  }

  return merged as T;
}

/**
 * splice values into a translated string: format(t('key'), { count: 3 }).
 *
 * placeholders are named -- {count} -- rather than numbered, so a translation
 * can put them wherever its own grammar needs them, which is the whole point of
 * having them in the string rather than concatenating around it.
 *
 * a name with no value is left as-is rather than blanked, so a typo shows up in
 * the ui as {whatever} instead of silently swallowing the value.
 */
export function format(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (all, key) => key in values ? String(values[key]) : all);
}

/**
 * like format(), but values may be JSX -- so a translated string can have part
 * of a value marked up, e.g. bolding a path inside a sentence:
 *   formatJSX(t('...{name}...'), { name: <strong>{path}</strong> })
 *
 * returns the string split into an array of literal-text and value parts, which
 * renders directly in JSX. same {name} tokenizing and same "unmatched name is
 * left as literal {name}" behaviour as format().
 */
export function formatJSX(text: string, values: Record<string, string | number | JSX.Element>): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = [];
  const regex = /\{(\w+)\}/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text))) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const key = match[1];
    parts.push(key in values ? values[key] : match[0]);
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    parts.push(text.slice(last));
  }
  return parts;
}

/**
 * updating this method to take a proper locale (e.g. en-us). we'll 
 * pull the language based on the first half.
 * 
 * @param locale 
 */
export async function UpdateLanguage(locale?: string) {

  // FIXME: we need to update the sheet language as well...

  // TODO: validate

  if (locale) {

    const lang = locale.substring(0, 2).toLowerCase();

    // the locale is set *after* the strings are in place, in both branches.
    // anything watching currentLocale() to know the language changed -- the
    // command palette re-runs its search on it -- would otherwise wake up while
    // the store still held the outgoing language and read the old strings.

    if (lang !== 'en') {

      const data = (await import(`~/i18n/lang/${lang}.ts`)).default;
      console.info(`assigning from ${lang}`, { data });

      // start with the base, in case anything is missing, then apply the deltas
      setI18nInstance('strings', deepMerge(en, data));
      setCurrentLocale(locale);

      // some things (specific example: the insert function button, which
      // is inserted as static html and not managed by solid) cannot react
      // to changes in the managed language object. so we need to fire
      // an event for anyone who needs to take specific action.
      //
      // KEEP THIS. nothing listens for it at the moment -- command-list.ts was
      // the last consumer and it holds keys now, so it re-renders on its own --
      // but anything drawn outside solid's reach still needs telling, and there
      // will be more of those. it is not dead code, it is an empty socket.
      //
      // note it only fires on this branch: a switch *back* to english doesn't
      // announce itself. worth fixing when something listens again.
      requestAnimationFrame(() => window.dispatchEvent(new CustomEvent('update-language')));
    } else {

      setI18nInstance('strings', deepMerge(en));
      setCurrentLocale('en-us');

    }

  }
}

/* ------------------------------------------------------------------ */
/* key validation                                                      */
/* ------------------------------------------------------------------ */

/**
 * every key in the tree that illegally contains a dot.
 *
 * the dot separates segments, so a key holding one would produce a path that
 * can't be walked back to it -- 'menus.file' inside `toolbar` reads the same as
 * the nested form but resolves to nothing. this is a union of the offenders,
 * and `never` when there are none.
 */
type DottedKeys<T> = {
  [K in keyof T & string]: K extends `${string}.${string}` ? K
    : T[K] extends string ? never
    : DottedKeys<T[K]>;
}[keyof T & string];

type AssertNoDots<T extends never> = T;

/**
 * a dotted key fails here, naming itself: "Type '"menus.file"' does not satisfy
 * the constraint 'never'". nest it instead.
 */
type _NoDottedKeys = AssertNoDots<DottedKeys<I18N>>;
