import { createSignal, For, onMount, Show } from 'solid-js';
import { A, useLocation } from '@solidjs/router';
import { activeTrial, font_trials, setFontTrial, storedFontTrial } from './font-trials';
import style from './font-trial.module.css';

/*
 * dev-only typeface switcher, floating over every page. shown while a trial is
 * active (so one is never on by accident) or when the URL has ?fonts; × hides
 * it until the next reload. strings are plain English: dev tooling, never
 * shipped (app.tsx mounts it behind import.meta.env.DEV).
 */
export default function FontTrialSwitcher() {

  const location = useLocation();
  const [dismissed, setDismissed] = createSignal(false);

  onMount(() => {
    const stored = storedFontTrial();
    if (stored) {
      setFontTrial(stored);
    }
  });

  const visible = () => !dismissed() && (!!activeTrial() || /(^|[?&])fonts\b/.test(location.search));

  return (
    <Show when={visible()}>
      <div class={style.switcher}>
        <label>
          <span>Font</span>
          <select class='select' value={activeTrial()} onChange={event => setFontTrial(event.currentTarget.value)}>
            <For each={font_trials}>{trial =>
              <option value={trial.id}>{trial.label}</option>
            }</For>
          </select>
        </label>
        <A href='/dev-test/fonts'>Compare</A>
        <button type='button' class={style.close} title='Hide until reload' aria-label='Hide' onClick={() => setDismissed(true)}>×</button>
      </div>
    </Show>
  );
}
