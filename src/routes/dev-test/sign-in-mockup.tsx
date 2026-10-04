import { For, createSignal } from 'solid-js';
import { A } from '@solidjs/router';

import { LayoutProvider } from '~/components/layout-context';
import { Toolbar } from '~/components/toolbar/account-toolbar';
import { t } from '~/i18n/i18n';

import '@fontsource-variable/inter/wght.css';

import bs from '../(backstage)/backstage.module.css';
import { Icon } from '../(backstage)/backstage-parts';
import style from './sign-in-mockup.module.css';

// Dev-only mockup of a sign-in page with more brand presence: a brand panel
// beside the existing card. Not wired -- the form only looks real. It reuses the
// backstage card/field classes so the form side is exactly what ships today,
// and the brand copy is plain English on purpose (mockup convention, see
// rate-demo). If it ships, the panel moves into (backstage)/sign-in.tsx and its
// strings into the catalogues.
//
// the card side has shipped (Inter, the 22px heading, "Welcome back") -- see
// sign-in.tsx. the brand panel hasn't. this route sits outside the (backstage)
// layout, so it imports the self-hosted face itself.

// the walkthrough model's NPV histogram (percent of trials per 200k bin, 5,000
// trials), so the picture is a real RiskAMP result rather than a drawn curve
const BINS = [0.04, 0.44, 3.16, 8.12, 15.74, 18.70, 17.78, 13.86, 9.08, 5.96, 3.34, 1.74, 1.04, 0.56];
const P5_BIN = 3;   // bins wholly below P5 are the low tail
const P95_BIN = 11; // bins wholly above P95 are the high tail
// percentiles interpolated within their bins, in bin units from 400k
const P5_AT = 3.17;  // 1.03M
const P95_AT = 10.5; // 2.50M

function Histogram() {
  const W = 420, H = 200, max = 20, gap = 4;
  const bw = W / BINS.length;
  return (
    <svg class={style.histogram} viewBox={`0 0 ${W} ${H + 24}`} role='img'
        aria-label='Histogram of simulated project NPV across 5,000 trials, with the 5% tails highlighted'>
      <For each={BINS}>{(v, i) => {
        const h = Math.max(2, v / max * H);
        const tail = i() < P5_BIN || i() >= P95_BIN;
        return <rect
            class={tail ? style.tail : style.body}
            style={{ 'animation-delay': `${i() * 35}ms` }}
            x={i() * bw + gap / 2} y={H - h} width={bw - gap} height={h} rx={3} />;
      }}</For>
      <line class={style.baseline} x1={0} x2={W} y1={H + 0.5} y2={H + 0.5} />
      <For each={[[P5_AT, 'P5'], [P95_AT, 'P95']] as const}>{([bin, label]) =>
        <>
          <line class={style.marker} x1={bin * bw} x2={bin * bw} y1={8} y2={H} />
          <text class={style['marker-label']} x={bin * bw} y={H + 18} text-anchor='middle'>{label}</text>
        </>
      }</For>
    </svg>
  );
}

function BrandPanel() {
  return (
    <section class={style.brand}>
      <div class={style['brand-inner']}>

        <div class={style.wordmark}>
          <span class={style['wordmark-risk']}>Risk</span><span class={style['wordmark-amp']}>AMP</span>
          <span class={style['wordmark-web']}>web</span>
        </div>

        <h2 class={style.headline}>See the whole range of outcomes, not just the estimate.</h2>
        <p class={style.lede}>
          Monte Carlo simulation in a browser spreadsheet, with the same
          functions as RiskAMP for Excel.
        </p>

        <figure class={style.figure}>
          <Histogram />
          <figcaption class={style.stats}>
            <span class={style['stats-title']}>Project NPV · 5,000 trials</span>
            <dl>
              <div><dt>P5</dt><dd>1.03M</dd></div>
              <div><dt>Median</dt><dd>1.64M</dd></div>
              <div><dt>P95</dt><dd>2.50M</dd></div>
            </dl>
          </figcaption>
        </figure>

        <div class={style.paths}>
          <A class={style.path} href='/@riskamp/riskamp-walkthrough'>
            <span class={style['path-title']}>New to Monte Carlo?</span>
            <span class={style['path-body']}>Open the walkthrough&nbsp;→</span>
          </A>
          <A class={style.path} href='/'>
            <span class={style['path-title']}>Just looking?</span>
            <span class={style['path-body']}>Try it without an account&nbsp;→</span>
          </A>
        </div>

      </div>
    </section>
  );
}

function SignInCard() {
  const [revealed, setRevealed] = createSignal(false);
  return (
    <div class={style['card-column']}>
      <div class={`${bs.card} ${style.card}`}>

        <div class={bs['title-block']}>
          <h1 class={bs.title}>{t('sign-in-page.heading')}</h1>
          <div class={bs.subtitle}>{t('sign-in-page.subtitle')}</div>
        </div>

        <form class={bs.form} novalidate onsubmit={(event) => event.preventDefault()}>
          <div class={bs.field}>
            <label class={bs['field-block-label']} for='mockup-username'>{t('sign-in-page.username.label')}</label>
            <input id='mockup-username' type='text' class={bs.input} autocomplete='off' />
          </div>
          <div class={bs.field}>
            <label class={bs['field-block-label']} for='mockup-password'>{t('sign-in-page.password.label')}</label>
            <div class={bs['password-field']}>
              <input id='mockup-password' type={revealed() ? 'text' : 'password'}
                  class={`${bs.input} ${bs['password-input']}`} autocomplete='off' />
              <button type='button' class={`${bs['icon-button']} ${bs['password-reveal']}`}
                  aria-label={t(revealed() ? 'sign-in-page.password.hide.label' : 'sign-in-page.password.show.label')}
                  aria-pressed={revealed()} onclick={() => setRevealed(shown => !shown)}>
                <Icon name={revealed() ? 'eye_off' : 'eye_on'} />
              </button>
            </div>
          </div>
          <div class={style['submit-row']}>
            <button type='submit' class={`${bs.button} ${bs['button-primary']} ${bs['button-block']}`}>
              {t('sign-in-page.submit.label')}
            </button>
          </div>
        </form>

        <div class={bs.links}>
          <A class={bs.link} href='/forgot-password'>{t('sign-in-page.link.forgot-password')}</A>
          <span class={bs['links-separator']}>·</span>
          <A class={bs.link} href='/create-account'>{t('sign-in-page.link.create-account')}</A>
        </div>

      </div>
    </div>
  );
}

export default function SignInMockup() {
  return (
    <LayoutProvider>
      <main class='fixed'>
        <Toolbar title='sign-in.page.title' />
        {/* .page is the bs-page inline-size container, so the split lives one
            level down where the container queries can reach it */}
        <div class={bs.page}>
          <div class={style.split}>
            <BrandPanel />
            <SignInCard />
          </div>
        </div>
      </main>
    </LayoutProvider>
  );
}
