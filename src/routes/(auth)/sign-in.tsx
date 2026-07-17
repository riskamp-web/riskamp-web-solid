import { Title } from "@solidjs/meta";
import * as auth from '~/lib/auth';

import style from './auth.module.css';
import { goto } from '~/lib/navigate';
import { onCleanup, Show } from 'solid-js';
import { A, Navigate } from '@solidjs/router';

import { t } from '~/i18n/i18n';

import { useLayoutContext } from '~/components/layout-context';

export default function SignIn() {

  const HandleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    if (data.username && data.password) {
      auth.Login(data.username as string, data.password as string).then(result => {
        console.info("result", result);
        if (result) {
          goto('/');
        }
      });
    }

  };

  const { setTitle } = useLayoutContext();

  setTitle('sign-in.page.title');
  onCleanup(() => setTitle(undefined)); // optional reset


  return (
    <Show when={!auth.loggedIn()} fallback={<Navigate href="/" />}>
        <Title>{t('sign-in.page.title')}</Title>

        <div class={style.layout}>

          <div class={style.instructions}>
            {t('sign-in.form.instructions')}
          </div>

          <form class={style.form} onsubmit={HandleSubmit}>
            <input class="input" 
                  name="username" 
                  autocomplete='username' 
                  type="text" 
                  placeholder={t('sign-in.form.username.placeholder')} />
            <input class="input" 
                  name="password" 
                  autocomplete='current-password' 
                  type="password" 
                  placeholder={t('sign-in.form.password.placeholder')} />

            <button class="control-button" type="submit">
              {t('sign-in.form.sign-in-button.label')}
            </button>

            {/*
            <div>
              <label>
                <input type="checkbox" name="remember"/>
                <span>{t('sign-in.form.remember-me')}</span>
              </label>
            </div>
            */}

          </form>

          <hr/>

          <div>
            <ul>
              <li>
                <A href="/forgot-password">
                  {t('auth.link.forgot-password.text')}
                </A>
              </li>
              <li>
                <A href="/create-account">
                  {t('auth.link.create-account.text')}
                </A>
              </li>
            </ul>
          </div>

        </div>

    </Show>
  );
}


