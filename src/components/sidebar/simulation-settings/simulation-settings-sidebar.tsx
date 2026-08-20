
import style from './simulation-settings.module.css';
import { Register } from '../registry';
import { t } from '~/i18n/i18n';

import { type SidebarProps } from '../sidebar-main';
import { persistentData, setPersistentData } from '~/lib/app-data';

export function Sidebar(props: SidebarProps) {

  // eslint-disable-next-line no-unassigned-vars
  let seed_input: HTMLInputElement|undefined;

  function UpdateSeedValue(event: Event, override?: number) {
    const sheet = props.sheet();
    if (sheet) {

      const user_data = sheet.user_data || {};
      let value = 0;

      if (typeof override === 'number') {
        if (override >= 0 && !isNaN(override) && override !== Infinity) {
          value = override;
        }
        else {
          value = user_data.simulation?.seed || 0;
        }
      }
      else if (event.target instanceof HTMLInputElement) {
        const parsed = sheet.ParseNumber(event.target.value || '');
        if (typeof parsed === 'number' && parsed >= 0 && !isNaN(parsed) && parsed !== Infinity) {
          value = parsed;
        }
        else {
          value = user_data.simulation?.seed || 0;
        }
      }

      if (!user_data?.simulation) {
        user_data.simulation = {};
      }
      user_data.simulation.seed = value;
      sheet.user_data = user_data;

      if (seed_input) {
        seed_input.value = value.toString();
      }

    }
  }

  return  <div class={style.layout}>
            <section class={style.section}>
              <span class={style.heading}>{t('sidebar.simulation_settings.random-sampling.section-header')}</span>
              <div class={style.options}>
                <label>
                  <input type='radio'
                         name='random-sampling'
                         checked={!!persistentData.lhs}
                         onchange={e => { if(e.currentTarget.checked) setPersistentData({ lhs: true })}}
                         />
                  <span>{t('sidebar.simulation_settings.latin-hypercube-sampling')}</span>
                </label>
                <label>
                  <input type='radio'
                         name='random-sampling'
                         checked={!persistentData.lhs}
                         onchange={e => { if(e.currentTarget.checked) setPersistentData({ lhs: false })}}
                         />
                  <span>{t('sidebar.simulation_settings.standard-random-sampling')}</span>
                </label>
              </div>
              <p class={style.note}>
                {t('sidebar.simulation_settings.random-sampling.explanatory-text').split(/\n/).map(para => <span>{para}</span>)}
              </p>
            </section>

            <section class={style.section}>
              <span class={style.heading}>{t('sidebar.simulation_settings.random-seed.section-header')}</span>
              <div class={style.field}>
                <label>{t('sidebar.simulation_settings.random-seed.seed-value')}</label>
                <input type="text"
                      class="input width-100"
                      ref={seed_input}
                      value={props.sheet()?.user_data?.simulation?.seed || '0'}
                      onchange={UpdateSeedValue}
                      placeholder={t('sidebar.simulation_settings.random-seed.enter-seed-value')} />
              </div>
              <div class={style.links}>
                <a href='#' onclick={e => UpdateSeedValue(e, new Date().getTime())}>
                  {t('sidebar.simulation_settings.random-seed.time-based-seed')}
                </a>
                <a href='#' onclick={e => UpdateSeedValue(e, 0)}>
                  {t('sidebar.simulation_settings.random-seed.reset-seed-value')}
                </a>
              </div>
              <p class={style.note}>
                {t('sidebar.simulation_settings.random-seed.explanatory-text').split(/\n/).map(para => <span>{para}</span>)}
              </p>
            </section>
          </div>;
}

Register('simulation-settings', Sidebar);


