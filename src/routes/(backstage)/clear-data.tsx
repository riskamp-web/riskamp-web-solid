import { Title } from '@solidjs/meta';
import { createSignal, Switch, Match } from 'solid-js';

import { t } from '~/i18n/i18n';
import style from './clear-data.module.css';

/**
 * /clear-data -- a "start fresh" escape hatch that wipes every trace of local
 * state: localStorage, sessionStorage, the document caches, and any
 * client-readable cookies. Useful when a stale cache or a bad persisted
 * preference leaves the app wedged and a plain reload won't clear it.
 *
 * Filed with the backstage account pages for logical grouping, but it opts out of
 * that group's layout (see (backstage).tsx) and renders as its own bare, centred
 * page -- the toolbar and auth gate read the very state this page clears.
 *
 * Destructive and irreversible, so it asks first: the page loads in a 'confirm'
 * state and only wipes when the button is clicked. That way merely landing on the
 * URL (a stale bookmark, a browser autocomplete) can't destroy anything. Cancel is
 * a plain link home; on success we link (rather than auto-redirect) so the user
 * gets an explicit confirmation. Crucially it's a *hard* navigation (rel=external,
 * which opts the anchor out of solid-router's SPA click interception) so the whole
 * app reboots from the now-empty storage -- otherwise the in-memory reactive stores
 * survive a soft route transition and the toolbar would still show the old session.
 *
 * The clearing runs client-side only (localStorage, caches, etc. don't exist
 * during SSR). Strings live under the 'clear-data-page' namespace in ~/i18n/lang.
 *
 * Intended side-effect -- the UI language resets to the system default. The chosen
 * language is persisted in persistentData.locale_settings.ui_language (localStorage
 * 'app-data'); wiping storage removes it, so on the post-clear reload InitI18N finds
 * nothing stored and falls back to SystemLocale(). Note the two-step nature: the
 * clear does *not* touch the in-memory i18n store, so the 'done' screen still renders
 * in whatever language was loaded (e.g. the confirmation reads in Danish), and only
 * the reload swaps back to the default. That's correct for "clear all local data" --
 * a persisted preference is exactly the kind of state this page exists to drop.
 */

type Phase = 'confirm' | 'clearing' | 'done' | 'error';

/** Best-effort wipe of everything this app persists in the browser. */
async function clearAll(): Promise<void> {
  // key/value stores -- clear() empties every key, so we don't have to track
  // individual key names (auth, app-data, chat, documents-list, session-key, ...).
  try { localStorage.clear(); } catch { /* unavailable / blocked -- nothing to clear */ }
  try { sessionStorage.clear(); } catch { /* unavailable / blocked -- nothing to clear */ }

  // Cache API -- this is where documents live (the 'documents' and 'local'
  // caches). Delete every cache by name rather than a hard-coded list so this
  // keeps working if we add more.
  if (typeof caches !== 'undefined') {
    try {
      const names = await caches.keys();
      await Promise.all(names.map((name) => caches.delete(name)));
    } catch { /* Cache API unavailable -- nothing to clear */ }
  }

  // Cookies -- expire every cookie visible to JS. HTTP-only cookies (e.g. the
  // server-set auth refresh cookie) aren't reachable from document.cookie and
  // are left to the server to invalidate on logout.
  try {
    for (const pair of document.cookie.split(';')) {
      const name = pair.split('=')[0].trim();
      if (name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    }
  } catch { /* no document / no cookies -- nothing to clear */ }
}

export default function ClearData() {
  const [phase, setPhase] = createSignal<Phase>('confirm');

  const clear = () => {
    setPhase('clearing');
    clearAll().then(
      () => setPhase('done'),
      () => setPhase('error'),
    );
  };

  return (
    <main class={style.page}>
      <Title>{t('clear-data-page.title')}</Title>
      <Switch>
        <Match when={phase() === 'confirm'}>
          <h1 class={style.heading}>{t('clear-data-page.confirm.heading')}</h1>
          <p class={style.detail}>{t('clear-data-page.confirm.detail')}</p>
          <div class={style.actions}>
            <button type='button' class={style.danger} onClick={clear}>
              {t('clear-data-page.confirm.submit')}
            </button>
            <a class={style['home-link']} href='/'>{t('clear-data-page.confirm.cancel')}</a>
          </div>
        </Match>
        <Match when={phase() === 'clearing'}>
          <h1 class={style.heading}>{t('clear-data-page.clearing')}</h1>
        </Match>
        <Match when={phase() === 'done'}>
          <h1 class={style.heading}>{t('clear-data-page.done.heading')}</h1>
          <p class={style.detail}>{t('clear-data-page.done.detail')}</p>
          <a class={style['home-link']} href='/' rel='external'>{t('clear-data-page.home-link')}</a>
        </Match>
        <Match when={phase() === 'error'}>
          <h1 class={style.heading}>{t('clear-data-page.error.heading')}</h1>
          <p class={style.detail}>{t('clear-data-page.error.detail')}</p>
          <div class={style.actions}>
            <button type='button' class={style.danger} onClick={clear}>
              {t('clear-data-page.error.retry')}
            </button>
            <a class={style['home-link']} href='/' rel='external'>{t('clear-data-page.home-link')}</a>
          </div>
        </Match>
      </Switch>
    </main>
  );
}
