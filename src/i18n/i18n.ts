
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import en from '~/i18n/lang/en';

export type I18N = typeof en;

const [i18n_instance, setI18nInstance] = createStore({
  strings: en as I18N,
});

const [currentLocale, setCurrentLocale] = createSignal('en-us');
export { currentLocale };

export function t(key?: keyof I18N) {
  return key ? i18n_instance.strings[key] : '';
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
 * updating this method to take a proper locale (e.g. en-us). we'll 
 * pull the language based on the first half.
 * 
 * @param locale 
 */
export async function UpdateLanguage(locale?: string) {

  // FIXME: we need to update the sheet language as well...

  // TODO: validate

  if (locale) {

    setCurrentLocale(locale);
    const lang = locale.substring(0, 2).toLowerCase();

    if (lang !== 'en') {

      const data = (await import(`~/i18n/lang/${lang}.ts`)).default;
      console.info(`assigning from ${lang}`, { data });

      // start with the base, in case anything is missing, then apply the deltas
      setI18nInstance('strings', { ...en, ...data });

      // some things (specific example: the insert function button, which
      // is inserted as static html and not managed by solid) cannot react
      // to changes in the managed language object. so we need to fire
      // an event for anyone who needs to take specific action.
      requestAnimationFrame(() => window.dispatchEvent(new CustomEvent('update-language')));
    } else {

      setCurrentLocale('en-us');
      setI18nInstance('strings', en);

    }

  }
}

