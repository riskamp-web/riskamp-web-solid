/**
 * create account -- backstage redesign.
 *
 * this one is a mock: it talks to ~/backstage/create-account-mock, not to the
 * backend. documents was built the same way round, and for the same reason --
 * the UI/UX is the deliverable and the wiring lands once the design has
 * settled. the real call, auth.CreateAccount({username, email}), already has
 * this page's exact shape.
 *
 * the flow is unusual and the page has to carry it: we collect an email address
 * and a username, and *no password*. the account is created, a confirmation
 * link is mailed, and the password is chosen from that link. so the last thing
 * above the button is the sentence explaining where the password went.
 *
 * the client-side rules are a courtesy. the server is the authority and is
 * allowed to reject something this page accepted -- a name already taken, a
 * name reserved -- so a server verdict lands in the same field slot a format
 * verdict would, and the page is built to draw one it couldn't have predicted.
 *
 * i18n: extracted. every string is a 'create-account-page.*' key in
 * ~/i18n/lang/en.ts, including the aria-labels. error state holds Messages --
 * a key plus its values -- not text; see create-account-mock.ts for why.
 * ('create-account.page.title' is a separate existing key: the toolbar title,
 * which isn't the same string as the heading on the page.)
 */

import { onMount, createSignal } from '~/lib/solid-compat';
import { Show, createMemo, onCleanup } from 'solid-js';

import { useLayoutContext } from '~/components/layout-context';
import { format, t } from '~/i18n/i18n';
import { messageText, validateEmail, validateUsername, type Message } from '~/backstage/account-validation';
import { createAccountMock, type CreateAccountResult } from '~/backstage/create-account-mock';

import bs from './backstage.module.css';
import style from './create-account.module.css';
import shared from '../../style/shared.module.css';
import { DevResetLink, Icon, splice } from './backstage-parts';

export default function CreateAccount() {

  const { setTitle, setRequires } = useLayoutContext();
  setTitle('create-account.page.title');
  onCleanup(() => setTitle(undefined));

  // signing up while signed in doesn't mean anything; the layout sends a
  // session-holder to /. plain setRequires rather than requireAuth -- the ?dev
  // bypass only covers 'signed-in', so routing through it would imply a bypass
  // exists here. see (backstage).tsx
  setRequires('signed-out');

  const [email, setEmail] = createSignal('');
  const [username, setUsername] = createSignal('');

  const [pending, setPending] = createSignal(false);

  /* the address the link went to, not a boolean: the confirmation names it, and
     this way it can't be drawn without its subject */
  const [sent, setSent] = createSignal<string | undefined>();

  /* held as Messages -- a key plus the values it quotes -- and resolved where
     they're drawn. holding the text instead would translate at the moment of
     the failure and leave a message in the old language after a language
     change, and the values are captured now because the field they came from
     may have been edited by the time this is drawn */
  const [formError, setFormError] = createSignal<Message | undefined>();
  const [emailError, setEmailError] = createSignal<Message | undefined>();
  const [usernameError, setUsernameError] = createSignal<Message | undefined>();

  let email_input: HTMLInputElement | undefined;
  let username_input: HTMLInputElement | undefined;
  let sent_block: HTMLDivElement | undefined;

  /* the request outlives the page if you navigate away mid-flight; nothing
     should write state back into a disposed component */
  let live = true;

  onMount(() => queueMicrotask(() => email_input?.focus()));
  onCleanup(() => { live = false; });

  /** the live handle: what you typed, or the placeholder while the field is empty */
  const handle = createMemo(() => format(t('create-account-page.handle.example'), {
    username: username().trim() || t('create-account-page.handle.placeholder'),
  }));

  /* editing a field invalidates the verdict on *that* field, and any form-level
     one. deliberately not sign-in's clear-everything: there both messages are
     one verdict about one credential pair, where here the two fields fail
     independently and failing both at once is a designed state -- so wiping the
     untouched field's message while you fix the other hides something still
     true, and you rediscover it on the next submit. */
  const editEmail = (value: string) => {
    setEmail(value);
    setEmailError(undefined);
    setFormError(undefined);
  };

  const editUsername = (value: string) => {
    setUsername(value);
    setUsernameError(undefined);
    setFormError(undefined);
  };

  const submit = async () => {

    const address = email().trim();
    const name = username().trim();

    // validated on submit rather than by disabling the button: a button that
    // does nothing doesn't say which field it's waiting on
    setFormError(undefined);

    const bad_email = validateEmail(address);
    const bad_username = validateUsername(name);

    setEmailError(bad_email);
    setUsernameError(bad_username);

    // first offender in dom order -- the tab order is the reading order, and
    // jumping to the second makes you scroll back
    if (bad_email || bad_username) {
      (bad_email ? email_input : username_input)?.focus();
      return;
    }

    setPending(true);

    /* undefined is "the request never completed", which is a different problem
       from a rejection and shouldn't read the same -- the split Login makes,
       and the reason sign-in can say "can't reach the server" */
    let result: CreateAccountResult | undefined;

    try {
      result = await createAccountMock({ username: name, email: address });
    }
    catch {
      result = undefined;
    }

    if (!live) { return; }

    setPending(false);

    if (!result) {
      setFormError({ key: 'create-account-page.error.unreachable' });
      return;
    }

    if (result.ok) {
      setSent(address);
      // the form this was submitted from has just left the dom, so focus would
      // fall to <body> and a screen reader would announce nothing at all
      queueMicrotask(() => sent_block?.focus());
      return;
    }

    /* the server's verdicts land in the same slots a format verdict would --
       they're alternatives, not additions, and a field can only be wrong one
       way at a time. neither field is cleared: nothing here is a secret, and
       retyping an address you got almost right is pure friction. */
    setEmailError(result.email);
    setUsernameError(result.username);

    if (result.email) {
      email_input?.focus();
    }
    else if (result.username) {
      username_input?.focus();
    }
    else {
      // rejected without saying which half -- the banner is what stops the
      // button appearing to do nothing
      setFormError({ key: 'create-account-page.error.rejected' });
    }

  };

  /** back to the form, with both fields still holding what was typed */
  const restart = () => {
    setSent(undefined);
    queueMicrotask(() => email_input?.focus());
  };

  const form = () => <>

    <div class={bs['title-block']}>
      <h1 class={bs.title}>{t('create-account-page.heading')}</h1>
      <div class={bs.subtitle}>{t('create-account-page.subtitle')}</div>
    </div>

    <form class={bs.form} novalidate onsubmit={(event) => { event.preventDefault(); void submit(); }}>

      <Show when={formError()}>
        <div class={bs['form-error']} role='alert'>{messageText(formError())}</div>
      </Show>

      <div class={bs.field}>
        <label class={bs['field-block-label']} for='create-account-email'>{t('create-account-page.email.label')}</label>
        <input
            ref={email_input}
            id='create-account-email'
            name='email'
            type='email'
            inputmode='email'
            class={bs.input}
            autocomplete='email'
            autocapitalize='none'
            spellcheck={false}
            disabled={pending()}
            aria-invalid={!!emailError()}
            aria-describedby={emailError() ? 'create-account-email-error' : undefined}
            value={email()}
            oninput={(event) => editEmail(event.currentTarget.value)} />
        <Show when={emailError()}>
          <div id='create-account-email-error' class={bs['field-message']}>{messageText(emailError())}</div>
        </Show>
      </div>

      <div class={bs.field}>
        <label class={bs['field-block-label']} for='create-account-username'>{t('create-account-page.username.label')}</label>
        <input
            ref={username_input}
            id='create-account-username'
            name='username'
            type='text'
            class={bs.input}
            autocomplete='username'
            autocapitalize='none'
            spellcheck={false}
            disabled={pending()}
            aria-invalid={!!usernameError()}
            aria-describedby={usernameError() ? 'create-account-username-error' : 'create-account-username-handle'}
            value={username()}
            oninput={(event) => editUsername(event.currentTarget.value)} />

        {/* the preview and the message share this slot rather than stacking:
            they answer the same question -- what your handle will be, or why it
            can't be -- and the message is strictly the more urgent of the two.
            one slot also means the card doesn't jump as errors come and go. */}
        <Show
            when={usernameError()}
            fallback={<div id='create-account-username-handle' classList={{[shared.truncate]: true, [style['handle-preview']]: true}}>{handle()}</div>}>
          <div id='create-account-username-error' class={bs['field-message']}>{messageText(usernameError())}</div>
        </Show>
      </div>

      <div class={bs['form-actions']}>
        <button
            type='submit'
            class={`${bs.button} ${bs['button-primary']} ${bs['button-block']}`}
            disabled={pending()}
            aria-busy={pending()}>
          {t(pending() ? 'create-account-page.submit.pending' : 'create-account-page.submit.label')}
        </button>

        {/* under the button, because "and then what?" is asked at the point of
            pressing it -- and the first of these is what explains why the page
            never asked for a password */}
        <div class={style.notes}>
          <div>{t('create-account-page.after')}</div>
          <div>{splice(
            t('create-account-page.terms.text'), 'link',
            <a class={bs.link} href='/terms-of-service'>{t('create-account-page.terms.link')}</a>)}</div>
        </div>
      </div>

    </form>

  </>;

  const confirmation = (address: () => string) => <div
      ref={sent_block}
      class={bs.sent}
      tabindex='-1'>

    <Icon name='confirm' class={bs['sent-icon']} />

    <h1 class={bs.title}>{t('create-account-page.done.heading')}</h1>

    <div class={bs['sent-detail']}>{splice(
      t('create-account-page.done.body'), 'email',
      <span class={bs['sent-email']}>{address()}</span>)}</div>

    <div class={bs['sent-detail']}>{t('create-account-page.done.spam')}</div>

    {/* bordered rather than quiet: a borderless button here sits directly above
        the links row and reads as a third link, and a control you have to
        guess at is worse than a visible one */}
    <button
        type='button'
        class={`${bs.button} ${bs['sent-action']}`}
        onclick={restart}>
      {t('create-account-page.done.restart')}
    </button>

    {/* the link the mail would have carried -- this page's confirmation promises
        the same email as forgot-password's, and both flows end on
        /update-password. dev only, and absent from a production build rather
        than merely hidden in one; see DevResetLink. */}
    <DevResetLink email={address()} />

  </div>;

  return <div class={`${bs.page} ${bs['page-centered']}`}>

    <div class={bs.centered}>
      <div class={bs.card}>

        <Show when={sent()} fallback={form()}>
          {(address) => confirmation(address)}
        </Show>

        {/* outside the swap: both of these are still exactly the right onward
            moves once the mail has been sent, and keeping them rendered means
            the card doesn't lose its footing when it changes */}
        <div class={bs.links}>
          <a class={bs.link} href='/forgot-password'>{t('create-account-page.link.forgot-password')}</a>
          {/* the dot is a separator, not a word -- it stays out of the strings */}
          <span class={bs['links-separator']}>·</span>
          <a class={bs.link} href='/sign-in'>{t('create-account-page.link.sign-in')}</a>
        </div>

      </div>
    </div>

  </div>;

}
