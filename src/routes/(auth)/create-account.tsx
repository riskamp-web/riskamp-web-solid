
import { onCleanup, Show } from 'solid-js';
import { useLayoutContext } from '~/components/layout-context';
import style from './auth.module.css';
import * as auth from '~/lib/auth';
import { A, Navigate } from '@solidjs/router';
import { Link, Title } from "@solidjs/meta";
import { t } from '~/i18n/i18n';

export default function RecoverPassword() {

  const { setTitle } = useLayoutContext();

  setTitle('create-account.page.title');
  onCleanup(() => setTitle(undefined)); // optional reset

  const HandleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  };

  return <>
      <Show when={!auth.loggedIn()} fallback={<Navigate href="/" />}>
        <Title>{t('create-account.page.title')}</Title>

        <div class={style.layout}>

          
          <div class={style.instructions}>
            {t('forgot-password.form.instructions')}
          </div>

          {/*
          <form class={style.form} onsubmit={HandleSubmit}>

            <input class="input" 
                  name="email" 
                  autocomplete='email' 
                  type="text" 
                  placeholder={t('forgot-password.form.email.placeholder')} />

            <button class="control-button" type="submit">
              {t('forgot-password.form.reset-password-button.label')}
            </button>

          </form>
            */}

          <hr/>

          <div>
            <ul>
              <li>
                <A href="/forgot-password">
                  {t('auth.link.forgot-password.text')}
                </A>
              </li>
              <li>
                <A href="/sign-in">
                  {t('auth.link.sign-in.text')}
                </A>
              </li>
            </ul>
          </div>

        </div>

      </Show>
    </>;

}