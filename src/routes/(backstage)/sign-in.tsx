/**
 * sign in -- backstage redesign.
 *
 * this one is wired: it posts to /api/login through ~/lib/auth. Login stores the
 * token and populates the session as a side effect of the request, so all this
 * page does with a success is route onward.
 *
 * the methods on the page are the ones the backend actually has -- username or
 * email plus password. no SSO buttons, because there are no SSO providers to
 * wire them to, and remember me is hidden because Login accepts the flag but
 * doesn't send it yet (see .remember-row).
 *
 * i18n: extracted. every string is a 'sign-in-page.*' key in ~/i18n/lang/en.ts,
 * including the aria-labels. the error signals hold *keys*, not text -- see
 * below. ('sign-in.page.title' is a separate existing key: the toolbar title,
 * which isn't the same string as the heading on the page.)
 */

import { Show, createSignal, onCleanup, onMount } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';

import { useLayoutContext } from '~/components/layout-context';
import { t, type I18N } from '~/i18n/i18n';
import * as auth from '~/lib/auth';

import bs from './backstage.module.css';
import style from './sign-in.module.css';

import { Eye, EyeOff } from './backstage-icons';

/** where a successful sign-in lands */
const DESTINATION = '/';

export default function SignIn() {

  const { setTitle, setRequires } = useLayoutContext();
  setTitle('sign-in.page.title');
  onCleanup(() => setTitle(undefined));

  // no point signing in twice: the layout redirects to / with a session in hand,
  // which is also what a successful sign-in here does. see (backstage).tsx
  setRequires('signed-out');

  const navigate = useNavigate();

  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [remember, setRemember] = createSignal(false);

  const [revealed, setRevealed] = createSignal(false);
  const [capsLock, setCapsLock] = createSignal(false);

  const [pending, setPending] = createSignal(false);

  /* the errors are held as *keys* and translated where they're drawn. holding
     the text instead would translate at the moment of the failure and leave a
     banner in the old language after a language change -- the same trap as
     calling t() at module scope, and it also makes these type-checked */
  const [formError, setFormError] = createSignal<keyof I18N | undefined>();
  const [usernameError, setUsernameError] = createSignal<keyof I18N | undefined>();
  const [passwordError, setPasswordError] = createSignal<keyof I18N | undefined>();

  let username_input: HTMLInputElement | undefined;
  let password_input: HTMLInputElement | undefined;

  /* the request outlives the page if you navigate away mid-flight; nothing
     should write state back into a disposed component */
  let live = true;

  onMount(() => queueMicrotask(() => username_input?.focus()));
  onCleanup(() => { live = false; });

  /** editing anything invalidates the last verdict, field-level or form-level */
  const clearErrors = () => {
    setFormError(undefined);
    setUsernameError(undefined);
    setPasswordError(undefined);
  };

  const submit = async () => {

    const name = username().trim();
    const secret = password();

    // validated on submit rather than by disabling the button: a button that
    // does nothing doesn't say which field it's waiting on
    setFormError(undefined);
    setUsernameError(name ? undefined : 'sign-in-page.username.required');
    setPasswordError(secret ? undefined : 'sign-in-page.password.required');

    if (!name || !secret) {
      (name ? password_input : username_input)?.focus();
      return;
    }

    setPending(true);

    /* Login resolves false for a rejected credential and throws if the request
       never completed -- those are different problems and shouldn't read the
       same. the flag is passed through even though Login doesn't send it yet,
       so this doesn't need revisiting when it does. */
    let accepted = false;
    let reached = true;

    try {
      accepted = await auth.Login(name, secret, remember());
    }
    catch {
      reached = false;
    }

    if (!live) { return; }

    setPending(false);

    // the token arrives as a response header and is stored on the way through,
    // so a session that didn't materialise means the sign-in didn't finish
    if (accepted && auth.loggedIn()) {
      navigate(DESTINATION);
      return;
    }

    setFormError(
      !reached ? 'sign-in-page.error.unreachable'
        : accepted ? 'sign-in-page.error.incomplete'
          // which half was wrong isn't disclosed
          : 'sign-in-page.error.rejected');

    // keep the identifier -- retyping it is friction, and it's the half you're
    // least likely to have got wrong
    setPassword('');
    password_input?.focus();

  };

  /**
   * caps lock is worth calling out on a field you can't read back.
   *
   * getModifierState only exists on keyboard and mouse events -- this is bound
   * to keydown/keyup, but anything else that reaches it would throw, so read
   * the state only when the event actually carries it.
   */
  const trackCapsLock = (event: Event) => {
    const keyboard = event as KeyboardEvent;
    if (typeof keyboard.getModifierState === 'function') {
      setCapsLock(keyboard.getModifierState('CapsLock'));
    }
  };

  return <div class={`${bs.page} ${bs['page-centered']}`}>

    <div class={bs.centered}>
      <div class={bs.card}>

        <div class={bs['title-block']}>
          <h1 class={bs.title}>{t('sign-in-page.heading')}</h1>
          <div class={bs.subtitle}>{t('sign-in-page.subtitle')}</div>
        </div>

        <form class={bs.form} novalidate onsubmit={(event) => { event.preventDefault(); void submit(); }}>

          <Show when={formError()}>
            <div class={bs['form-error']} role='alert'>{t(formError())}</div>
          </Show>

          <div class={bs.field}>
            <label class={bs['field-block-label']} for='sign-in-username'>{t('sign-in-page.username.label')}</label>
            <input
                ref={username_input}
                id='sign-in-username'
                name='username'
                type='text'
                class={bs.input}
                autocomplete='username'
                autocapitalize='none'
                spellcheck={false}
                disabled={pending()}
                aria-invalid={!!usernameError()}
                aria-describedby={usernameError() ? 'sign-in-username-error' : undefined}
                value={username()}
                oninput={(event) => { setUsername(event.currentTarget.value); clearErrors(); }} />
            <Show when={usernameError()}>
              <div id='sign-in-username-error' class={bs['field-message']}>{t(usernameError())}</div>
            </Show>
          </div>

          <div class={bs.field}>
            <label class={bs['field-block-label']} for='sign-in-password'>{t('sign-in-page.password.label')}</label>
            <div class={bs['password-field']}>
              <input
                  ref={password_input}
                  id='sign-in-password'
                  name='password'
                  type={revealed() ? 'text' : 'password'}
                  class={`${bs.input} ${bs['password-input']}`}
                  autocomplete='current-password'
                  disabled={pending()}
                  aria-invalid={!!passwordError()}
                  aria-describedby={passwordError() ? 'sign-in-password-error' : undefined}
                  value={password()}
                  oninput={(event) => { setPassword(event.currentTarget.value); clearErrors(); }}
                  onkeydown={trackCapsLock}
                  onkeyup={trackCapsLock}
                  onblur={() => setCapsLock(false)} />
              <button
                  type='button'
                  class={`${bs['icon-button']} ${bs['password-reveal']}`}
                  aria-label={t(revealed() ? 'sign-in-page.password.hide.label' : 'sign-in-page.password.show.label')}
                  aria-pressed={revealed()}
                  disabled={pending()}
                  onclick={() => { setRevealed(shown => !shown); password_input?.focus(); }}>
                <Show when={revealed()} fallback={<Eye />}>
                  <EyeOff />
                </Show>
              </button>
            </div>
            <Show when={passwordError()}>
              <div id='sign-in-password-error' class={bs['field-message']}>{t(passwordError())}</div>
            </Show>
            <Show when={capsLock()}>
              <div class={bs['caps-hint']} role='status'>{t('sign-in-page.password.caps-lock')}</div>
            </Show>
          </div>

          {/* hidden until the backend can actually not remember you -- see
              .remember-row. the space it occupies is deliberate. */}
          <div class={`${bs['checkbox-row']} ${style['remember-row']}`}>
            <input
                id='sign-in-remember'
                type='checkbox'
                disabled={pending()}
                checked={remember()}
                onchange={(event) => setRemember(event.currentTarget.checked)} />
            <label for='sign-in-remember'>{t('sign-in-page.remember.label')}</label>
          </div>

          <div class={style['submit-row']}>
            <button
                type='submit'
                class={`${bs.button} ${bs['button-primary']} ${bs['button-block']}`}
                disabled={pending()}
                aria-busy={pending()}>
              {t(pending() ? 'sign-in-page.submit.pending' : 'sign-in-page.submit.label')}
            </button>
          </div>

        </form>

        <div class={bs.links}>
          <A class={bs.link} href='/forgot-password'>{t('sign-in-page.link.forgot-password')}</A>
          {/* the dot is a separator, not a word -- it stays out of the strings */}
          <span class={bs['links-separator']}>·</span>
          <A class={bs.link} href='/create-account'>{t('sign-in-page.link.create-account')}</A>
        </div>

      </div>
    </div>

  </div>;

}
