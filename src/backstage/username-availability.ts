
/**
 * live username availability -- the "is @name free?" check the create-account
 * field runs while you type.
 *
 * this exists because picking a username is a search, not a declaration: you
 * try a name, it's taken, you try another, and finding a free one shouldn't cost
 * a full submit each time. so the field checks as you go -- but a check per
 * keystroke would be a check per character of a name nobody finished typing, so
 * the checks are debounced, and a name already asked about is remembered rather
 * than re-asked.
 *
 * the ordering matters and is deliberate: the client's own character rules
 * (validateUsername) run *first*, and a name that fails them never reaches the
 * server. that's account-validation.ts's whole premise -- the client rules out
 * what it can without a round trip, the mock rules on what it can't (taken,
 * reserved). so "too short" and "starts with a digit" are answered here for
 * free, and only a well-formed name is ever handed to checkUsernameMock.
 *
 * this is a courtesy, like everything client-side on this page: it advises, it
 * doesn't gate the button. createAccountMock stays the authority on submit, and
 * a live check that can't complete falls back to the neutral preview rather than
 * blocking anyone on a network blip.
 */

import { createEffect, createSignal, onCleanup } from 'solid-js';

import { validateUsername, type Message } from './account-validation';
// import { checkUsernameMock } from './create-account-mock';

import * as auth from '~/lib/auth';

/**
 * the same 250ms the old site used. long enough that a steady typist never
 * triggers a check mid-word, short enough that a pause resolves near-instantly.
 */
const DEBOUNCE = 250;

/**
 * what the field knows about the current username, moment to moment.
 *
 *   idle       -- empty field: nothing to say, the @handle preview shows
 *   invalid    -- fails the character rules; `message` is validateUsername's
 *   checking   -- well-formed, waiting on the availability check
 *   available  -- the name is free
 *   taken      -- the name is spoken for or reserved; `message` says which
 *
 * a discriminated union rather than a bag of booleans so the page draws exactly
 * one of these and can't render a contradiction (checking *and* available).
 */
export type AvailabilityState =
  | { status: 'idle' }
  | { status: 'invalid'; message: Message }
  | { status: 'checking' }
  | { status: 'available'; username: string }
  | { status: 'taken'; message: Message };

/**
 * the field's live view of the current username.
 *
 *   state    -- the verdict to draw, moment to moment
 *   pending  -- true while a check for the *current* name hasn't settled yet:
 *               either it's waiting out its debounce or it's in flight. this is
 *               what submit waits on -- `state` alone can't say it, because
 *               during the debounce window state still holds the previous name's
 *               answer. false once state reflects the name that's in the field.
 */
export interface UsernameAvailability {
  state: () => AvailabilityState;
  pending: () => boolean;
}

/**
 * track a username accessor and report its live availability.
 *
 * call it once from a component body (it plants an effect and a cleanup); pass
 * the same signal the field is bound to, read `state` where the status is drawn,
 * and await `pending` going false on submit to hold for a check still settling.
 */
export function createUsernameAvailability(username: () => string): UsernameAvailability {

  const [state, setState] = createSignal<AvailabilityState>({ status: 'idle' });

  /* true from the moment the field changes until the answer for that value is
     settled -- covers both the debounce wait and the in-flight check. submit
     awaits this so it never races a verdict the field is about to show. */
  const [pending, setPending] = createSignal(false);

  /* the dupe cache: a name we've already resolved this session isn't asked
     about again. null == available; a Message == the reason it isn't. keyed by
     the canonical (trimmed, lowercased) name, so @Duncan and @duncan share one
     entry and one check. */
  const cache = new Map<string, Message | null>();

  let timer: ReturnType<typeof setTimeout> | undefined;

  /* bumped on every keystroke. an availability check is async, so one launched
     for an older value can resolve after a newer keystroke has moved on --
     comparing the generation it captured against the current one lets that
     stale result drop itself instead of overwriting a fresher verdict. */
  let generation = 0;

  const clearTimer = () => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  createEffect(() => {
    // canonicalize up front: the name is case-insensitive (document lookup and
    // the mocks all fold it), so lowercase is the form we validate, cache, check
    // and show -- @Duncan is accepted and reads back as @duncan
    const name = username().trim().toLowerCase();
    const gen = ++generation;
    clearTimer();

    /* only write state if this run is still the current one. the effect reruns
       (and bumps generation) on the next keystroke, so a settle from a superseded
       run is a no-op. settling always clears pending -- this is the answer for
       the current value. */
    const settle = (next: AvailabilityState) => {
      if (gen === generation) {
        setState(next);
        setPending(false);
      }
    };

    if (!name) {
      setState({ status: 'idle' });
      setPending(false);
      return;
    }

    // there is now work to do for this value -- a debounce to wait out, and
    // maybe a check after it -- so nothing is settled until one of the paths
    // below calls settle()
    setPending(true);

    /* the character rules need no round trip, but they still wait out the
       debounce: answering "too short" on the first keystroke of a name that's
       on its way to five characters is nagging, not helping. */
    const invalid = validateUsername(name);
    if (invalid) {
      timer = setTimeout(() => settle({ status: 'invalid', message: invalid }), DEBOUNCE);
      return;
    }

    /* already known -- answer straight away, with no flicker through 'checking'
       for a name we're certain about */
    const cached = cache.get(name);
    if (cached !== undefined) {
      settle(cached ? { status: 'taken', message: cached } : { status: 'available', username: name });
      return;
    }

    timer = setTimeout(() => {
      // the spinner appears only now, after the pause -- a fast typist who lands
      // on a cached name never sees it, and a new name shows it for the length of
      // one check rather than one keystroke. still pending: 'checking' isn't a
      // settled state, so this isn't a settle() call.
      if (gen !== generation) { return; }
      setState({ status: 'checking' });

      auth.CheckAvailability({username: name}).then(result => {
        if (result && result.username) {
          if (result.username.exists) {

            // username taken
            cache.set(name, null);
            settle({ status: 'taken', 
              message: { key: 'create-account-page.username.taken', values: { username: name } },
            });

          }
          else {

            // username available
            cache.set(name, null);
            settle({ status: 'available', username: name });
          }
        }
      }).catch(() => {
        // advisory only: a failed check falls back to the neutral state and
        // leaves the verdict to submit. not cached -- the next pause retries.
        settle({ status: 'idle' });
      });

      /*
      checkUsernameMock(name).then(result => {
        const message = result.available ? null : (result.message ?? null);
        cache.set(name, message);
        settle(message ? { status: 'taken', message } : { status: 'available', username: name });
      }).catch(() => {
        // advisory only: a failed check falls back to the neutral state and
        // leaves the verdict to submit. not cached -- the next pause retries.
        settle({ status: 'idle' });
      });
      */

    }, DEBOUNCE);
  });

  onCleanup(() => {
    clearTimer();
    // release anyone awaiting a settle we'll never reach now -- submit's wait
    // resolves, sees the component is gone, and bails
    setPending(false);
  });

  return { state, pending };
}
