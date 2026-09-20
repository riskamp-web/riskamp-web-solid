/**
 * contact -- a plain "send us a message" form.
 *
 * name, an optional email, and a message. it posts to the brochure site's
 * contact endpoint via ~/backstage/contact-message (a different host from the
 * app backend, unauthenticated, form-data -- see that module for why it sidesteps
 * auth.AccessResource).
 *
 * the page is public: no setRequires, so it's reachable signed in or out. when
 * there IS a session we seed the fields from it -- Claims carries a username and
 * an email but no display name, so name is seeded from the username. both stay
 * editable; the seed is a convenience, not a lock.
 *
 * the form conventions are lifted from forgot-password.tsx: on-submit validation
 * (a disabled button doesn't say which field it's waiting on), errors held as
 * i18n keys and resolved only in jsx, the live-flag guard against writing into a
 * disposed component, and the <Show>-swapped confirmation. the one new wrinkle is
 * that email is optional, so it's only validated when non-empty.
 *
 * the LAYOUT departs from the other backstage pages, though: they're a single
 * narrow card because they're a quick transaction, and this is somewhere you sit
 * and write. so it's a roomier two-column split -- intro left, form right,
 * stacking on a narrow viewport -- in contact.module.css. the controls are still
 * the shared backstage primitives; only the frame is local.
 *
 * i18n: extracted. every string is a 'contact-page.*' key.
 * ('contact.page.title' is a separate existing key: the toolbar title.)
 */

import { Show, createSignal, onCleanup, onMount } from 'solid-js';
import { A } from '@solidjs/router';

import { useLayoutContext } from '~/components/layout-context';
import { t } from '~/i18n/i18n';
import { messageText, validateEmail, type Message } from '~/backstage/account-validation';
import { ContactMessage } from '~/backstage/contact-message';

import bs from './backstage.module.css';
import styles from './contact.module.css';
import { Icon } from './backstage-parts';

import { session } from '~/lib/auth';

export default function Contact() {

  const { setTitle } = useLayoutContext();
  setTitle('contact.page.title');
  onCleanup(() => setTitle(undefined));

  // public: no setRequires. we still read the session to prefill -- an empty
  // session just leaves the fields blank.
  const claims = session();
  const [name, setName] = createSignal(claims.username ?? '');
  const [email, setEmail] = createSignal(claims.email ?? '');
  const [message, setMessage] = createSignal('');

  const [pending, setPending] = createSignal(false);
  const [sent, setSent] = createSignal(false);

  const [formError, setFormError] = createSignal<Message | undefined>();
  const [nameError, setNameError] = createSignal<Message | undefined>();
  const [emailError, setEmailError] = createSignal<Message | undefined>();
  const [messageError, setMessageError] = createSignal<Message | undefined>();

  let name_input: HTMLInputElement | undefined;
  let email_input: HTMLInputElement | undefined;
  let message_input: HTMLTextAreaElement | undefined;
  let sent_block: HTMLDivElement | undefined;

  /* the request outlives the page if you navigate away mid-flight; nothing
     should write state back into a disposed component */
  let live = true;

  onMount(() => queueMicrotask(() => name_input?.focus()));
  onCleanup(() => { live = false; });

  const submit = async () => {

    const name_value = name().trim();
    const email_value = email().trim();
    const message_value = message().trim();

    setFormError(undefined);

    // validated on submit rather than by disabling the button: a button that
    // does nothing doesn't say which field it's waiting on
    const bad_name = name_value ? undefined : { key: 'contact-page.error.name-required' } as const;
    // email is optional -- only judge it when something was typed
    const bad_email = email_value ? validateEmail(email_value) : undefined;
    const bad_message = message_value ? undefined : { key: 'contact-page.error.message-required' } as const;

    setNameError(bad_name);
    setEmailError(bad_email);
    setMessageError(bad_message);

    // focus the first field with a problem, top to bottom
    if (bad_name) { name_input?.focus(); return; }
    if (bad_email) { email_input?.focus(); return; }
    if (bad_message) { message_input?.focus(); return; }

    setPending(true);

    let reached = true;
    let ok = false;

    try {
      ok = await ContactMessage({ name: name_value, email: email_value, message: message_value });
    }
    catch {
      reached = false;
    }

    if (!live) { return; }

    setPending(false);

    if (!reached) {
      setFormError({ key: 'contact-page.error.unreachable' });
      return;
    }

    if (!ok) {
      setFormError({ key: 'contact-page.error.failed' });
      return;
    }

    setSent(true);

    // the form this was submitted from has just left the dom, so focus would
    // fall to <body> and a screen reader would announce nothing at all
    queueMicrotask(() => sent_block?.focus());

  };

  const formLayout = () => <div class={styles.layout}>

    <div class={styles.intro}>
      <div class={styles.eyebrow}>{t('contact-page.eyebrow')}</div>
      <h1 class={styles.heading}>{t('contact-page.heading')}</h1>
      <p class={styles.lede}>{t('contact-page.subtitle')}</p>
    </div>

    <form class={styles.form} novalidate onsubmit={(event) => { event.preventDefault(); void submit(); }}>

      <Show when={formError()}>
        <div class={bs['form-error']} role='alert'>{messageText(formError())}</div>
      </Show>

      <div class={bs.field}>
        <label class={bs['field-block-label']} for='contact-name'>{t('contact-page.name.label')}</label>
        <input
            ref={name_input}
            id='contact-name'
            name='name'
            type='text'
            class={bs.input}
            autocomplete='name'
            disabled={pending()}
            aria-invalid={!!nameError()}
            aria-describedby={nameError() ? 'contact-name-error' : undefined}
            value={name()}
            oninput={(event) => { setName(event.currentTarget.value); setNameError(undefined); setFormError(undefined); }} />
        <Show when={nameError()}>
          <div id='contact-name-error' class={bs['field-message']}>{messageText(nameError())}</div>
        </Show>
      </div>

      <div class={bs.field}>
        <label class={bs['field-block-label']} for='contact-email'>{t('contact-page.email.label')}</label>
        <input
            ref={email_input}
            id='contact-email'
            name='email'
            type='email'
            inputmode='email'
            class={bs.input}
            autocomplete='email'
            autocapitalize='none'
            spellcheck={false}
            disabled={pending()}
            aria-invalid={!!emailError()}
            aria-describedby={emailError() ? 'contact-email-error' : undefined}
            value={email()}
            oninput={(event) => { setEmail(event.currentTarget.value); setEmailError(undefined); setFormError(undefined); }} />
        <Show when={emailError()}>
          <div id='contact-email-error' class={bs['field-message']}>{messageText(emailError())}</div>
        </Show>
      </div>

      <div class={bs.field}>
        <label class={bs['field-block-label']} for='contact-message'>{t('contact-page.message.label')}</label>
        <textarea
            ref={message_input}
            id='contact-message'
            name='message'
            class={styles.message}
            rows={8}
            disabled={pending()}
            aria-invalid={!!messageError()}
            aria-describedby={messageError() ? 'contact-message-error' : undefined}
            value={message()}
            oninput={(event) => { setMessage(event.currentTarget.value); setMessageError(undefined); setFormError(undefined); }} />
        <Show when={messageError()}>
          <div id='contact-message-error' class={bs['field-message']}>{messageText(messageError())}</div>
        </Show>
      </div>

      <div class={styles.actions}>
        <button
            type='submit'
            class={`${bs.button} ${bs['button-primary']}`}
            disabled={pending()}
            aria-busy={pending()}>
          {t(pending() ? 'contact-page.submit.pending' : 'contact-page.submit.label')}
        </button>
      </div>

    </form>

  </div>;

  const confirmation = () => <div
      ref={sent_block}
      class={styles.done}
      tabindex='-1'>

    <Icon name='confirm' class={styles.doneIcon} />

    <h1 class={styles.doneHeading}>{t('contact-page.done.heading')}</h1>

    <p class={styles.doneBody}>{t('contact-page.done.body')}</p>

    <A href='/' class={`${bs.button} ${bs['button-primary']}`}>
      {t('contact-page.done.home')}
    </A>

  </div>;

  return <div class={bs.page}>

    <div class={styles.scroll}>
      <div class={styles.inner}>

        <Show when={sent()} fallback={formLayout()}>
          {confirmation()}
        </Show>

      </div>
    </div>

  </div>;

}
