
import { format, t } from '~/i18n/i18n';
import style from './about-content.module.css';

/**
 * Body of the "About RiskAMP" box. Not a dialog itself -- it's passed as the
 * `message` of the shared confirm/info dialog (see AboutRiskAMP() in the default
 * route), so it renders inside that host's <section class="message">.
 *
 * The version/build values are build-time constants injected by `define` in
 * app.config.ts (see src/global.d.ts): __RAW_VERSION__ / __TREB_VERSION__ read
 * from the installed engine packages, __APP_COMMIT__ is this app's short commit.
 */
export function AboutContent() {
  return (
    <div class={style.about}>

      <div class={style.title}>RiskAMP web</div>
      <div class={style.tagline}>{t('about.tagline')}</div>
      <div class={style.build}>{format(t('about.build'), { commit: __APP_COMMIT__ })}</div>

      <dl class={style.versions}>
        <dt>RiskAMP</dt>
        <dd>{__RAW_VERSION__}</dd>
        <dt>TREB</dt>
        <dd>{__TREB_VERSION__}</dd>
      </dl>

      <div class={style.footer}>
        <span>{format(t('about.copyright'), { 
          year: new Date().getUTCFullYear()
        })}</span>
      </div>

    </div>
  );
}
