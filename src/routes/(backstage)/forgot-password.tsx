/**
 * forgot password -- backstage redesign.
 *
 * one field, and a deliberately careful confirmation. this is a mock: it talks
 * to ~/backstage/password-reset-mock, not to the backend. the real call,
 * auth.RecoverAccount({email}), posts to /api/recover-account.
 *
 * **the page must not disclose whether an address has an account.** a form that
 * says "sent!" for real addresses and "no such account" for the rest is an
 * account-enumeration oracle that anyone can read, so:
 *
 *   - the request's outcome is never reported. requestResetMock returns nothing,
 *     and the real call's boolean should keep being ignored when this is wired
 *   - the confirmation is the same either way, and worded conditionally: "if
 *     there's an account for that address". a flat "we've sent you a link" would
 *     be a lie half the time
 *   - the only failures that surface are ones the page can see for itself -- an
 *     empty or malformed address, or a request that never completed
 *
 * that non-disclosure is also what the real call's 1.7-3.7s delay defends: a
 * request for an unknown address has to take as long as one for a known address,
 * or the timing answers what the response won't.
 *
 * i18n: extracted. every string is a 'forgot-password-page.*' key.
 * ('forgot-password.page.title' is a separate existing key: the toolbar title.)
 */

import { Show, createSignal, onCleanup, onMount } from 'solid-js';
import { A } from '@solidjs/router';

import { useLayoutContext } from '~/components/layout-context';
import { t } from '~/i18n/i18n';
import { messageText, validateEmail, type Message } from '~/backstage/account-validation';
// import { requestResetMock } from '~/backstage/password-reset-mock';

import bs from './backstage.module.css';
import { Icon, splice } from './backstage-parts';

import * as auth from '~/lib/auth';

export default function ForgotPassword() {

  const { setTitle, setRequires } = useLayoutContext();
  setTitle('forgot-password.page.title');
  onCleanup(() => setTitle(undefined));

  // a session means you know the password, or can change it from the account
  // page; recovery is for the case where you can't get in. see (backstage).tsx
  setRequires('signed-out');

  const [email, setEmail] = createSignal('');
  const [pending, setPending] = createSignal(false);

  /* the address the link went to, not a boolean -- the confirmation names it,
     so this way it can't be drawn without its subject */
  const [sent, setSent] = createSignal<string | undefined>();

  const [formError, setFormError] = createSignal<Message | undefined>();
  const [emailError, setEmailError] = createSignal<Message | undefined>();

  let email_input: HTMLInputElement | undefined;
  let sent_block: HTMLDivElement | undefined;

  /* the request outlives the page if you navigate away mid-flight; nothing
     should write state back into a disposed component */
  let live = true;

  onMount(() => queueMicrotask(() => email_input?.focus()));
  onCleanup(() => { live = false; });

  const submit = async () => {

    const address = email().trim();

    // validated on submit rather than by disabling the button: a button that
    // does nothing doesn't say which field it's waiting on
    setFormError(undefined);

    const bad_email = validateEmail(address);
    setEmailError(bad_email);

    if (bad_email) {
      email_input?.focus();
      return;
    }

    setPending(true);

    /* the only outcome worth distinguishing is "the request didn't happen".
       whether the address has an account is not reported -- see the note at the
       top of the file -- so there's nothing else to branch on. */
    let reached = true;

    try {
      // await requestResetMock({ email: address });
      await auth.RecoverAccount({ email: address });
    }
    catch {
      reached = false;
    }

    if (!live) { return; }

    setPending(false);

    if (!reached) {
      setFormError({ key: 'forgot-password-page.error.unreachable' });
      return;
    }

    setSent(address);

    // the form this was submitted from has just left the dom, so focus would
    // fall to <body> and a screen reader would announce nothing at all
    queueMicrotask(() => sent_block?.focus());

  };

  /** back to the form, with the address still in it */
  const restart = () => {
    setSent(undefined);
    queueMicrotask(() => email_input?.focus());
  };

  const form = () => <>

    <div class={bs['title-block']}>
      <h1 class={bs.title}>{t('forgot-password-page.heading')}</h1>
      <div class={bs.subtitle}>{t('forgot-password-page.subtitle')}</div>
    </div>

    <form class={bs.form} novalidate onsubmit={(event) => { event.preventDefault(); void submit(); }}>

      <Show when={formError()}>
        <div class={bs['form-error']} role='alert'>{messageText(formError())}</div>
      </Show>

      <div class={bs.field}>
        <label class={bs['field-block-label']} for='forgot-password-email'>{t('forgot-password-page.email.label')}</label>
        <input
            ref={email_input}
            id='forgot-password-email'
            name='email'
            type='email'
            inputmode='email'
            class={bs.input}
            autocomplete='email'
            autocapitalize='none'
            spellcheck={false}
            disabled={pending()}
            aria-invalid={!!emailError()}
            aria-describedby={emailError() ? 'forgot-password-email-error' : undefined}
            value={email()}
            oninput={(event) => { setEmail(event.currentTarget.value); setEmailError(undefined); setFormError(undefined); }} />
        <Show when={emailError()}>
          <div id='forgot-password-email-error' class={bs['field-message']}>{messageText(emailError())}</div>
        </Show>
      </div>

      <div class={bs['form-actions']}>
        <button
            type='submit'
            class={`${bs.button} ${bs['button-primary']} ${bs['button-block']}`}
            disabled={pending()}
            aria-busy={pending()}>
          {t(pending() ? 'forgot-password-page.submit.pending' : 'forgot-password-page.submit.label')}
        </button>
      </div>

    </form>

  </>;

  const confirmation = (address: () => string) => <div
      ref={sent_block}
      class={bs.sent}
      tabindex='-1'>

    <Icon name='confirm' class={bs['sent-icon']} />

    <h1 class={bs.title}>{t('forgot-password-page.done.heading')}</h1>

    {/* conditional on purpose -- see the note at the top of the file */}
    <div class={bs['sent-detail']}>{splice(
      t('forgot-password-page.done.body'), 'email',
      <span class={bs['sent-email']}>{address()}</span>)}</div>

    <div class={bs['sent-detail']}>{t('forgot-password-page.done.spam')}</div>

    <button
        type='button'
        class={`${bs.button} ${bs['sent-action']}`}
        onclick={restart}>
      {t('forgot-password-page.done.restart')}
    </button>

    {/* the link the mail would have carried. dev only, and absent from a
        production build rather than merely hidden in one -- see DevResetLink,
        whose shape is what achieves that. */}

    {/*
    <DevResetLink email={address()} />
      */}

  </div>;

  return <div class={`${bs.page} ${bs['page-centered']}`}>

    <div class={bs.centered}>
      <div class={bs.card}>

        <Show when={sent()} fallback={form()}>
          {(address) => confirmation(address)}
        </Show>

        <div class={bs.links}>
          <A class={bs.link} href='/sign-in'>{t('forgot-password-page.link.sign-in')}</A>
          {/* the dot is a separator, not a word -- it stays out of the strings */}
          <span class={bs['links-separator']}>·</span>
          <A class={bs.link} href='/create-account'>{t('forgot-password-page.link.create-account')}</A>
        </div>

      </div>
    </div>

  </div>;

}
