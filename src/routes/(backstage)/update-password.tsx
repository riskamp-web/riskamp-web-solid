/**
 * update password -- backstage redesign.
 *
 * where the link in the recovery email lands, and also where a brand-new account
 * chooses its first password: create-account never asks for one, so both flows
 * end here. this is a mock -- ~/backstage/password-reset-mock, not the backend.
 * the real call is auth.ResetPassword({username, password, token}) to
 * /api/recover.
 *
 * **the token is the credential on this page, not the session** -- which is why,
 * uniquely among the card pages, this one declares no auth requirement at all.
 * see the note by the setRequires that isn't there.
 *
 * the first field takes a username *or* an email, as the v1 page did. that isn't
 * indecision: RecoverAccount is keyed by email, because an address is the only
 * thing you can mail to, while ResetPassword is keyed by username -- so a single
 * link has to satisfy both, and the page sends whichever was typed.
 *
 * i18n: extracted, 'update-password-page.*'. error state holds Messages -- a key
 * plus its values -- not text. ('update-password.page.title' is the toolbar
 * title, matching how every other page here is named.)
 */

import { Show, createMemo, createSignal, onCleanup, onMount } from 'solid-js';
import { A, useSearchParams } from '@solidjs/router';

import { useLayoutContext } from '~/components/layout-context';
import { t } from '~/i18n/i18n';
import {
  messageText, scorePassword, strengthKey, validatePassword, type Message,
} from '~/backstage/account-validation';
import { updatePasswordMock, type UpdatePasswordResult } from '~/backstage/password-reset-mock';

import bs from './backstage.module.css';
import { Icon } from './backstage-parts';
import { Eye, EyeOff } from './backstage-icons';

export default function UpdatePassword() {

  const { setTitle } = useLayoutContext();
  setTitle('update-password.page.title');
  onCleanup(() => setTitle(undefined));

  /* deliberately no setRequires. every other card page is 'signed-out', but the
     token in the link is what authorises this page -- so someone who happens to
     be signed in on this browser and follows a reset link from their inbox must
     still be able to finish. 'signed-out' would bounce them to / with no way to
     tell why, and the only route out would be signing out first. declaring
     nothing is already how the guard says "renders either way" (sign-out.tsx
     does the same), so this needs no cooperation from (backstage).tsx. */

  const [params] = useSearchParams<{ email?: string, token?: string }>();

  /* the parameters *seed* the fields, they don't drive them.
   *
   * reading them reactively would fight typing, and both fields have to stay
   * editable: a link truncated by an email client is exactly the failure someone
   * needs to be able to repair by hand, and hiding a token you can't verify
   * removes the only way to correct it. so this is read once, at construction.
   *
   * a repeated parameter arrives as an array; there's no sensible way to honour
   * two tokens, so take the first and let the server reject it if it's wrong. */
  const seed = (value?: string | string[]) =>
    (Array.isArray(value) ? value[0] : value) ?? '';

  const [identifier, setIdentifier] = createSignal(seed(params.email));
  const [password, setPassword] = createSignal('');
  const [token, setToken] = createSignal(seed(params.token));

  const [revealed, setRevealed] = createSignal(false);
  const [capsLock, setCapsLock] = createSignal(false);

  const [pending, setPending] = createSignal(false);
  const [done, setDone] = createSignal(false);

  const [formError, setFormError] = createSignal<Message | undefined>();
  const [identifierError, setIdentifierError] = createSignal<Message | undefined>();
  const [tokenError, setTokenError] = createSignal<Message | undefined>();
  const [passwordError, setPasswordError] = createSignal<Message | undefined>();

  let identifier_input: HTMLInputElement | undefined;
  let token_input: HTMLInputElement | undefined;
  let password_input: HTMLInputElement | undefined;
  let done_block: HTMLDivElement | undefined;

  let live = true;
  onCleanup(() => { live = false; });

  /* focus the first thing that still needs filling in: arriving from a link,
     that's the password, and the two fields above it are already answered */
  onMount(() => queueMicrotask(() => {
    if (!identifier()) { identifier_input?.focus(); }
    else if (!token()) { token_input?.focus(); }
    else { password_input?.focus(); }
  }));

  /** undefined below the minimum -- the meter shows nothing for a password that can't be used */
  const score = createMemo(() => scorePassword(password()));

  /* what the meter actually draws: nothing while a message about this field is
     showing.
   *
     the interesting case is the server's -- it can refuse a password this scorer
     rates Good, and a three-quarters-full green bar sitting above a red "too
     easy to guess" is the meter contradicting the authority inside forty pixels.
     it's been overruled, so it stops asserting; editing the field clears the
     message and the bar comes back. */
  const shown = createMemo(() => passwordError() ? undefined : score());

  /* the identifier and the token clear *each other's* messages, which neither
     sign-in nor create-account does.
   *
     a token verdict is a verdict about the pair -- this token, for this account
     -- so editing either half invalidates it, and leaving "that token isn't
     valid" standing under a token you've just re-pointed at a different account
     is a message about a question nobody asked any more. the password is
     independent and clears on its own. */
  const editPair = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setIdentifierError(undefined);
    setTokenError(undefined);
    setFormError(undefined);
  };

  const editIdentifier = editPair(setIdentifier);
  const editToken = editPair(setToken);

  const editPassword = (value: string) => {
    setPassword(value);
    setPasswordError(undefined);
    setFormError(undefined);
  };

  const submit = async () => {

    const id = identifier().trim();
    const supplied = token().trim();
    const secret = password();

    setFormError(undefined);

    /* the identifier and the token are only checked for presence here: whether
       they're *right* is the server's business, and a client that decided a
       token looked wrong would reject links it had no way to validate. the
       password is the one field with a real client-side rule. */
    const bad_identifier = id ? undefined : { key: 'update-password-page.identifier.required' } as Message;
    const bad_token = supplied ? undefined : { key: 'update-password-page.token.required' } as Message;
    const bad_password = validatePassword(secret);

    setIdentifierError(bad_identifier);
    setTokenError(bad_token);
    setPasswordError(bad_password);

    // first offender in dom order -- the tab order is the reading order
    if (bad_identifier || bad_token || bad_password) {
      (bad_identifier ? identifier_input : bad_token ? token_input : password_input)?.focus();
      return;
    }

    setPending(true);

    let result: UpdatePasswordResult | undefined;

    try {
      result = await updatePasswordMock({ identifier: id, token: supplied, password: secret });
    }
    catch {
      result = undefined;
    }

    if (!live) { return; }

    setPending(false);

    if (!result) {
      setFormError({ key: 'update-password-page.error.unreachable' });
      return;
    }

    if (result.ok) {
      setDone(true);
      queueMicrotask(() => done_block?.focus());
      return;
    }

    setIdentifierError(result.identifier);
    setTokenError(result.token);
    setPasswordError(result.password);

    if (result.identifier) {
      identifier_input?.focus();
    }
    else if (result.token) {
      token_input?.focus();
    }
    else if (result.password) {
      password_input?.focus();
    }
    else {
      setFormError({ key: 'update-password-page.error.rejected' });
    }

  };

  /**
   * caps lock is worth calling out on a field you can't read back. getModifierState
   * only exists on keyboard and mouse events, so read it only when the event
   * actually carries it.
   */
  const trackCapsLock = (event: Event) => {
    const keyboard = event as KeyboardEvent;
    if (typeof keyboard.getModifierState === 'function') {
      setCapsLock(keyboard.getModifierState('CapsLock'));
    }
  };

  const form = () => <>

    <div class={bs['title-block']}>
      <h1 class={bs.title}>{t('update-password-page.heading')}</h1>
      <div class={bs.subtitle}>{t('update-password-page.subtitle')}</div>
    </div>

    <form class={bs.form} novalidate onsubmit={(event) => { event.preventDefault(); void submit(); }}>

      <Show when={formError()}>
        <div class={bs['form-error']} role='alert'>{messageText(formError())}</div>
      </Show>

      <div class={bs.field}>
        <label class={bs['field-block-label']} for='update-password-identifier'>{t('update-password-page.identifier.label')}</label>
        <input
            ref={identifier_input}
            id='update-password-identifier'
            name='username'
            type='text'
            class={bs.input}
            autocomplete='username'
            autocapitalize='none'
            spellcheck={false}
            disabled={pending()}
            aria-invalid={!!identifierError()}
            aria-describedby={identifierError() ? 'update-password-identifier-error' : undefined}
            value={identifier()}
            oninput={(event) => editIdentifier(event.currentTarget.value)} />
        <Show when={identifierError()}>
          <div id='update-password-identifier-error' class={bs['field-message']}>{messageText(identifierError())}</div>
        </Show>
      </div>

      {/* shown and editable even when the link filled it in: a token truncated
          in transit is otherwise unfixable, and v1 shows it too */}
      <div class={bs.field}>
        <label class={bs['field-block-label']} for='update-password-token'>{t('update-password-page.token.label')}</label>
        <input
            ref={token_input}
            id='update-password-token'
            name='token'
            type='text'
            class={bs.input}
            autocomplete='off'
            autocapitalize='none'
            spellcheck={false}
            disabled={pending()}
            aria-invalid={!!tokenError()}
            aria-describedby={tokenError() ? 'update-password-token-error' : undefined}
            value={token()}
            oninput={(event) => editToken(event.currentTarget.value)} />
        <Show when={tokenError()}>
          <div id='update-password-token-error' class={bs['field-message']}>{messageText(tokenError())}</div>
        </Show>
      </div>

      <div class={bs.field}>
        <label class={bs['field-block-label']} for='update-password-password'>{t('update-password-page.password.label')}</label>
        <div class={bs['password-field']}>
          <input
              ref={password_input}
              id='update-password-password'
              name='new-password'
              type={revealed() ? 'text' : 'password'}
              class={`${bs.input} ${bs['password-input']}`}
              autocomplete='new-password'
              disabled={pending()}
              aria-invalid={!!passwordError()}
              aria-describedby={passwordError() ? 'update-password-password-error' : 'update-password-strength'}
              value={password()}
              oninput={(event) => editPassword(event.currentTarget.value)}
              onkeydown={trackCapsLock}
              onkeyup={trackCapsLock}
              onblur={() => setCapsLock(false)} />
          <button
              type='button'
              class={`${bs['icon-button']} ${bs['password-reveal']}`}
              aria-label={t(revealed() ? 'update-password-page.password.hide.label' : 'update-password-page.password.show.label')}
              aria-pressed={revealed()}
              disabled={pending()}
              onclick={() => { setRevealed(shown => !shown); password_input?.focus(); }}>
            <Show when={revealed()} fallback={<Eye />}>
              <EyeOff />
            </Show>
          </button>
        </div>

        <Show when={passwordError()}>
          <div id='update-password-password-error' class={bs['field-message']}>{messageText(passwordError())}</div>
        </Show>

        {/* the meter gets its own row rather than sharing the message slot the
            way create-account's handle preview does. those two answer the same
            question; these don't -- "too short" is a rejection and the meter is a
            running commentary -- and the meter is the one thing here that must
            not move while you type.

            it carries a visible label, because a 4px bar on its own reads as a
            divider or a smudge rather than as a measurement of anything. the
            label is always there, so the bar is explained before you've typed
            enough for it to fill; the verdict joins it on the right.

            the bar itself is decoration and says so: a role='meter' or a live
            region updating on every keystroke announces four states while you
            type one word. the label and the verdict are real text, and the whole
            block is tied to the input with aria-describedby above. */}
        <div class={bs.meter} id='update-password-strength'>
          <div class={bs['meter-track']} aria-hidden='true'>
            <div
                class={`${bs['meter-fill']} ${shown() ? bs[shown()!.strength] : ''}`}
                style={{ width: `${(shown()?.fraction ?? 0) * 100}%` }} />
          </div>
          <div class={bs['meter-caption']}>
            <span>{t('update-password-page.strength.title')}</span>
            <Show when={shown()}>
              <span>{t(strengthKey(shown()!.strength))}</span>
            </Show>
          </div>
        </div>

        <Show when={capsLock()}>
          <div class={bs['caps-hint']} role='status'>{t('update-password-page.password.caps-lock')}</div>
        </Show>
      </div>

      <div class={bs['form-actions']}>
        <button
            type='submit'
            class={`${bs.button} ${bs['button-primary']} ${bs['button-block']}`}
            disabled={pending()}
            aria-busy={pending()}>
          {t(pending() ? 'update-password-page.submit.pending' : 'update-password-page.submit.label')}
        </button>
      </div>

    </form>

  </>;

  const confirmation = () => <div
      ref={done_block}
      class={bs.sent}
      tabindex='-1'>

    <Icon name='confirm' class={bs['sent-icon']} />

    <h1 class={bs.title}>{t('update-password-page.done.heading')}</h1>

    <div class={bs['sent-detail']}>{t('update-password-page.done.body')}</div>

    {/* a link, not an automatic redirect: changing a password doesn't create a
        session, so signing in is a step you take rather than one that happens */}
    <A
        class={`${bs.button} ${bs['button-primary']} ${bs['sent-action']}`}
        href='/sign-in'>
      {t('update-password-page.done.sign-in')}
    </A>

  </div>;

  return <div class={`${bs.page} ${bs['page-centered']}`}>

    <div class={bs.centered}>
      <div class={bs.card}>

        <Show when={done()} fallback={form()}>
          {confirmation()}
        </Show>

        {/* not drawn on the confirmation: the one thing to do next is already
            there as a button, and offering "forgot password" beside it after a
            successful reset reads as a suggestion something went wrong */}
        <Show when={!done()}>
          <div class={bs.links}>
            <A class={bs.link} href='/sign-in'>{t('update-password-page.link.sign-in')}</A>
            <span class={bs['links-separator']}>·</span>
            <A class={bs.link} href='/forgot-password'>{t('update-password-page.link.forgot-password')}</A>
          </div>
        </Show>

      </div>
    </div>

  </div>;

}
