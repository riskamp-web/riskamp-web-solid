
import { Switch, Match, Show } from 'solid-js';
import style from './toolbar.module.css';
import { Logo } from '../logo';
import { DropMenu } from '~/components/drop-menu/drop-menu';
import { I18N, t } from '~/i18n/i18n';

import '~/components/tabs.css';
import { session, loggedIn } from '~/lib/auth';

import { goto } from '~/lib/navigate';
import { bootstrap_icons } from 's5-icon-lib';
import { A } from '@solidjs/router';
import { ThemeSelector } from './theme-selector';

export interface Props {
  title?: keyof I18N;
  'account-info'?: boolean;
}

export function Toolbar(props: Props) {

  return <>
    <div classList={{
      [style.toolbar]: true,
      [style['account-toolbar']]: true,
      'tab-container': true,
    }}>
        
        <div class={style.logo}>
          <A class="display-contents" href='/'>
            <Logo/>
          </A>
        </div>
        
        <div class={style.separator} />

        <div class={style['page-title']}>
          <Show when={props.title}>
            {t(props.title)}
          </Show>
        </div>

        <div class={style.login}>
          <Show when={props['account-info']}>
            <Switch>
              <Match when={loggedIn()}>
                <DropMenu label={session().email || ''}>
                <menu>
                  <button disabled class={style['menu-item']} onclick={() => goto('/account')}>
                    <div class={style['svg-placeholder']}></div>
                    <span>{t('toolbar.menu-commands.account-page')}</span>
                  </button>
                  <button class={style['menu-item']} onclick={() => goto('/documents')}>
                    <div class={style['svg-placeholder']}></div>
                    <span>{t('toolbar.menu-commands.documents')}</span>
                  </button>

                  <hr />
                  <button class={style['menu-item']} onclick={() => goto('/sign-out')}>
                    <div class='display-contents' innerHTML={bootstrap_icons.box_arrow_right}></div>
                    <span>{t('toolbar.menu-commands.sign-out')}</span>
                  </button>
                </menu>
              </DropMenu>

              </Match>
              <Match when={true}>
                <A href='/sign-in'>Sign in</A>
              </Match>
            </Switch>
          </Show>
        </div>

        <div class={style.separator} />

        <div class={style['theme-toggle']}>
          <ThemeSelector sheet={() => undefined} />
        </div>

    </div>
  </>;
};
