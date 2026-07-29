/**
 * sign in -- backstage redesign.
 *
 * UI/UX only: nothing here touches ~/lib/auth. submitting runs against a canned
 * credential (below) after a fake delay, so the pending, failed and successful
 * states are all reachable; success just routes to /documents.
 *
 * the methods on the page are the ones the backend actually has -- username or
 * email plus password. no SSO buttons, because there are no SSO providers to
 * wire them to.
 *
 * i18n: strings are hardcoded english for now, per the containment rule in
 * README.md. ('sign-in.page.title' is an existing key, so the toolbar title is
 * already localized.)
 */

import { Show, createSignal, onCleanup, onMount } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';

import { useLayoutContext } from '~/components/layout-context';

import bs from './backstage.module.css';
import style from './sign-in.module.css';

import { Eye, EyeOff } from './backstage-icons';

/* the one account this page accepts. printed under the form on purpose: a demo
   you have to guess the password for isn't a demo. it takes either identifier
   so the "username or email" field is more than a label. */
const DEMO_USERNAME = 'duncan';
const DEMO_EMAIL = 'duncan@riskamp.com';
const DEMO_PASSWORD = 'riskamp';

/** long enough that the pending state reads as a state, short enough to sit through */
const FAKE_REQUEST_MS = 700;

export default function SignIn() {

  const { setTitle } = useLayoutContext();
  setTitle('sign-in.page.title');
  onCleanup(() => setTitle(undefined));

  const navigate = useNavigate();

  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [remember, setRemember] = createSignal(false);

  const [revealed, setRevealed] = createSignal(false);
  const [capsLock, setCapsLock] = createSignal(false);

  const [pending, setPending] = createSignal(false);
  const [formError, setFormError] = createSignal<string | undefined>();
  const [usernameError, setUsernameError] = createSignal<string | undefined>();
  const [passwordError, setPasswordError] = createSignal<string | undefined>();

  let username_input: HTMLInputElement | undefined;
  let password_input: HTMLInputElement | undefined;
  let timer: number | undefined;

  onMount(() => queueMicrotask(() => username_input?.focus()));
  onCleanup(() => { if (timer) { window.clearTimeout(timer); } });

  /** editing anything invalidates the last verdict, field-level or form-level */
  const clearErrors = () => {
    setFormError(undefined);
    setUsernameError(undefined);
    setPasswordError(undefined);
  };

  const submit = () => {

    const name = username().trim();
    const secret = password();

    // validated on submit rather than by disabling the button: a button that
    // does nothing doesn't say which field it's waiting on
    setFormError(undefined);
    setUsernameError(name ? undefined : 'Enter your username or email.');
    setPasswordError(secret ? undefined : 'Enter your password.');

    if (!name || !secret) {
      (name ? password_input : username_input)?.focus();
      return;
    }

    setPending(true);

    timer = window.setTimeout(() => {

      timer = undefined;
      setPending(false);

      const identified = name.toLowerCase() === DEMO_USERNAME || name.toLowerCase() === DEMO_EMAIL;

      if (identified && secret === DEMO_PASSWORD) {
        // routing only -- no session is established, since nothing is wired yet
        navigate('/documents');
        return;
      }

      // which half was wrong isn't disclosed; keep the identifier, since
      // retyping it is friction and it's the half you're least likely to
      // have got wrong
      setFormError('Incorrect username or password.');
      setPassword('');
      password_input?.focus();

    }, FAKE_REQUEST_MS);

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

  return <div class={`${bs.page} ${style['page-centered']}`}>

    <div class={bs.centered}>
      <div class={bs.card}>

        <div class={style['title-block']}>
          <h1 class={style.title}>Sign in</h1>
          <div class={style.subtitle}>Enter your username and password to sign in.</div>
        </div>

        <form class={style.form} novalidate onsubmit={(event) => { event.preventDefault(); submit(); }}>

          <Show when={formError()}>
            <div class={bs['form-error']} role='alert'>{formError()}</div>
          </Show>

          <div class={bs.field}>
            <label class={bs['field-block-label']} for='sign-in-username'>Username or email</label>
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
              <div id='sign-in-username-error' class={bs['field-message']}>{usernameError()}</div>
            </Show>
          </div>

          <div class={bs.field}>
            <label class={bs['field-block-label']} for='sign-in-password'>Password</label>
            <div class={style['password-field']}>
              <input
                  ref={password_input}
                  id='sign-in-password'
                  name='password'
                  type={revealed() ? 'text' : 'password'}
                  class={`${bs.input} ${style['password-input']}`}
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
                  class={`${bs['icon-button']} ${style['password-reveal']}`}
                  aria-label={revealed() ? 'Hide password' : 'Show password'}
                  aria-pressed={revealed()}
                  disabled={pending()}
                  onclick={() => { setRevealed(shown => !shown); password_input?.focus(); }}>
                <Show when={revealed()} fallback={<Eye />}>
                  <EyeOff />
                </Show>
              </button>
            </div>
            <Show when={passwordError()}>
              <div id='sign-in-password-error' class={bs['field-message']}>{passwordError()}</div>
            </Show>
            <Show when={capsLock()}>
              <div class={style['caps-hint']} role='status'>Caps Lock is on.</div>
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
            <label for='sign-in-remember'>Remember me on this device</label>
          </div>

          <div class={style['submit-row']}>
            <button
                type='submit'
                class={`${bs.button} ${bs['button-primary']} ${bs['button-block']}`}
                disabled={pending()}
                aria-busy={pending()}>
              {pending() ? 'Signing in…' : 'Sign in'}
            </button>
          </div>

        </form>

        <div class={style.links}>
          <A class={bs.link} href='/forgot-password'>Forgot password</A>
          <span class={style['links-separator']}>·</span>
          <A class={bs.link} href='/create-account'>Create account</A>
        </div>

        <div class={style['demo-note']}>
          Design pass — nothing is wired up. Sign in with <code>{DEMO_USERNAME}</code> or
          {' '}<code>{DEMO_EMAIL}</code> and the password <code>{DEMO_PASSWORD}</code>;
          anything else fails.
        </div>

      </div>
    </div>

  </div>;

}
