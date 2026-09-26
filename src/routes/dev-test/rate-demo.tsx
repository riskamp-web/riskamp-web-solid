import { createSignal, For, Show, type Setter } from 'solid-js';
import { Dialog } from '~/components/dialogs/dialog-base/dialog';
import style from './rate-demo.module.css';

// Dev-only mockup of a "please rate this app" prompt, for deciding whether the
// idea is worth shipping. Strings are plain English on purpose -- if it ships,
// the dialog moves to src/components/dialogs/ and its strings into the catalogues.

// a rating is recorded the moment a star is clicked; the follow-up comment is
// optional, so `closed` says how the follow-up ended when none was sent.
type Outcome = { dismissed: string } | { rated: number, comment?: string, closed?: string };

const STAR_PATH = 'M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.49l-5.87 3.09 1.12-6.54L2.5 9.41l6.56-.95z';

function RateDialog(props: {
  open: () => boolean,
  setOpen: Setter<boolean>,
  onOutcome: (outcome: Outcome) => void,
}) {

  const [rating, setRating] = createSignal(0);
  const [hover, setHover] = createSignal(0);
  const [thanked, setThanked] = createSignal(false);
  const [comment, setComment] = createSignal('');

  // which star is lit: the hover preview wins over the committed rating.
  const lit = () => hover() || rating();

  // every close without a sent comment routes here, tagged with how it happened.
  // before a rating that's a dismissal; after one, the rating stands and only the
  // comment was skipped. the base dialog calls setOpen(false) for Escape, the
  // close box and a click outside, and doesn't say which, so we sniff the event.
  const dismiss = (how: string) => {
    if (!props.open()) { return; }
    props.setOpen(false);
    props.onOutcome(thanked() ? { rated: rating(), closed: how } : { dismissed: how });
  };

  const send = () => {
    props.setOpen(false);
    props.onOutcome({ rated: rating(), comment: comment().trim() });
  };

  const handleSetOpen = ((value: boolean) => {
    if (value) { return; }
    const event = window.event;
    const how = event instanceof KeyboardEvent ? 'Escape'
      : event?.target instanceof HTMLDialogElement ? 'outside click'
      : 'close box';
    dismiss(how);
  }) as Setter<boolean>;

  // any rating moves on to the follow-up step, which asks for comments.
  const rate = (n: number) => {
    setRating(n);
    setThanked(true);
    props.onOutcome({ rated: n });
  };

  // radiogroup keyboard model: arrows move and select, like native radios.
  const handleKey = (event: KeyboardEvent, n: number) => {
    let next = 0;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') { next = Math.min(5, n + 1); }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') { next = Math.max(1, n - 1); }
    if (next) {
      event.preventDefault();
      setRating(next);
      ((event.currentTarget as HTMLElement).parentElement?.children[next - 1] as HTMLElement | undefined)?.focus();
    }
  };

  return (
    <Dialog
      open={props.open}
      setOpen={handleSetOpen}
      modal escape closebox lightdismiss resizeable={false}
      class={style['dialog-root']}>

      <header>{thanked() ? 'Thanks for rating!' : 'Please rate this app'}</header>

      <section class={style.body}>
        <Show when={!thanked()} fallback={
          <div class={style.followup}>
            <label for="rate-comment">Any comments or suggestions? We read every one.</label>
            <textarea
              id="rate-comment"
              class={style.comment}
              ref={el => queueMicrotask(() => el.focus())}
              placeholder="What's working, what isn't, what you'd like to see…"
              value={comment()}
              onInput={e => setComment(e.currentTarget.value)} />
          </div>
        }>
          <p class={style.prompt}>How are you finding RiskAMP so far?</p>
          <div class={style.stars} role="radiogroup" aria-label="Rating"
               onPointerLeave={() => setHover(0)}>
            <For each={[1, 2, 3, 4, 5]}>{n =>
              <button
                type="button"
                role="radio"
                aria-checked={rating() === n}
                aria-label={n === 1 ? '1 star' : `${n} stars`}
                tabindex={(rating() || 1) === n ? 0 : -1}
                class={{ [style.star]: true, [style.lit]: n <= lit() }}
                onPointerEnter={() => setHover(n)}
                onKeyDown={e => handleKey(e, n)}
                onClick={() => rate(n)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d={STAR_PATH} /></svg>
              </button>
            }</For>
          </div>
        </Show>
      </section>

      <footer>
        <Show when={thanked()} fallback={
          <button onClick={() => dismiss('Not now')}>Not now</button>
        }>
          <button class="button-primary" disabled={!comment().trim()} onClick={send}>Send</button>
          <button onClick={() => dismiss('No thanks')}>No thanks</button>
        </Show>
      </footer>

    </Dialog>
  );
}

export default function RateDemo() {

  const [open, setOpen] = createSignal(false);
  const [outcome, setOutcome] = createSignal<Outcome>();
  const [key, setKey] = createSignal(0);

  // remount per open so the stars start empty each time.
  const openPrompt = () => {
    setOutcome(undefined);
    setKey(k => k + 1);
    setOpen(true);
  };

  const describe = () => {
    const o = outcome();
    if (!o) { return '(no outcome yet)'; }
    if ('dismissed' in o) { return `dismissed via ${o.dismissed}`; }
    if (o.comment !== undefined) { return `rated ${o.rated}, comment: ${JSON.stringify(o.comment)}`; }
    if (o.closed) { return `rated ${o.rated}, comment skipped via ${o.closed}`; }
    return `rated ${o.rated} (follow-up open)`;
  };

  return (
    <main style="padding: 2rem; font-family: system-ui; display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
      <h1>Rate-this-app prompt (mockup)</h1>

      <p style="max-width: 40rem; color: #555;">
        Hover previews, click rates. Any rating moves to a follow-up asking for
        comments (Send is enabled once there's text). Either step dismisses via its
        secondary button, Escape, the X, or a click anywhere outside the dialog; a
        rating is kept even if the comment is skipped.
      </p>

      <button class="button-primary" onClick={openPrompt}>Open rating prompt</button>

      <pre id="result" style="background: #f4f4f4; padding: 1rem; border-radius: 6px;">{describe()}</pre>

      <Show when={key()} keyed>
        <RateDialog open={open} setOpen={setOpen} onOutcome={setOutcome} />
      </Show>
    </main>
  );
}
