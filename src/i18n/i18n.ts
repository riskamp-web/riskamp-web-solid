
import { createStore } from 'solid-js/store';
import en from '~/i18n/lang/en';

export type I18N = typeof en;

export const [i18n_instance, setI18nInstance] = createStore({
  strings: en as I18N,
});

export function t(key?: keyof I18N) {
  return key ? i18n_instance.strings[key] : '';
}

export async function UpdateLanguage(locale?: string) {
  // FIXME: we need to update the sheet language as well...
  if (locale && locale !== 'en') {
    locale = locale.toLowerCase();
    const data = (await import(`~/i18n/lang/${locale}.ts`)).default;
    console.info(`assigning from ${locale}`, { data });
    // start with the base, in case anything is missing, then apply the deltas
    setI18nInstance('strings', { ...en, ...data });
    // some things (specific example: the insert function button, which
    // is inserted as static html and not managed by solid) cannot react
    // to changes in the managed language object. so we need to fire
    // an event for anyone who needs to take specific action.
    requestAnimationFrame(() => window.dispatchEvent(new CustomEvent('update-language')));
  } else {
    setI18nInstance('strings', en);
  }
}