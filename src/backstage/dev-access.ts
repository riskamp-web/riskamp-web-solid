
/**
 * the dev-only affordances the backstage pages lean on.
 *
 * two kinds so far. the route-guard escape hatch: the documents page is UI/UX
 * against canned data, so signing in for every look at it is friction -- but the
 * guard has to be real, and `/documents?dev` opens a page that requires a
 * session without one, on the dev server only. and the reset link: the sign-up
 * and recovery pages promise an email that a mock can't send, so the link that
 * mail would have carried is offered on the page instead.
 *
 * everything here is written to be *absent* from a production build, not merely
 * unreachable in one -- see the note on devFlag() for the trap that distinction
 * hides.
 */

import { AuthRequirement, useLayoutContext } from '~/components/layout-context';
import { DEMO_TOKEN } from './password-reset-mock';

/** the parameter that opens a signed-in page without a session */
export const DEV_PARAM = 'dev';

/** the parameter that makes a load fail, for looking at the failure state */
export const FAIL_PARAM = 'fail';

/** the same, for version history -- see devFailHistory() */
export const FAIL_HISTORY_PARAM = 'fail-history';

/**
 * true when this is the dev server and the current url carries the flag.
 *
 * the query comes from window.location rather than the router's useLocation, so
 * this can be called from anywhere -- loadDocuments() reaches it from an event
 * handler and a bare promise, neither of which has an owner for useContext to
 * find. the router keeps window.location current through pushState, and nothing
 * here needs to react to a change mid-visit.
 */
function devFlag(name: string): boolean {

  // import.meta.env.DEV is statically replaced, so a production build compiles
  // this to `false` and drops the query read with it -- the same reason
  // src/routes/icons.tsx can gate a whole page on it
  if (!import.meta.env.DEV) { return false; }
  if (typeof window === 'undefined') { return false; }

  // `has`, not a value test: `?dev` with no value is the shortest form and the
  // one worth typing
  return new URLSearchParams(window.location.search).has(name);

}

/** dev server, and the url carries ?dev: open a signed-in page without a session */
export function devBypass(): boolean {
  return devFlag(DEV_PARAM);
}

/**
 * dev server, and the url carries ?fail: make loading the documents fail.
 *
 * the failure state is otherwise unreachable -- the canned set can't fail, and
 * the live source isn't written yet -- and an error state nobody can look at is
 * an error state nobody has checked.
 */
export function devFailLoads(): boolean {
  return devFlag(FAIL_PARAM);
}

/**
 * dev server, and the url carries ?fail-history: make loading a document's
 * version history fail.
 *
 * a separate flag rather than reusing ?fail, because that one fails the document
 * list -- which leaves no rows, so no panel, so no way to reach the state this
 * is meant to show. `/documents?dev&fail-history` lists fine and fails on open.
 */
export function devFailHistory(): boolean {
  return devFlag(FAIL_HISTORY_PARAM);
}

/**
 * the address the confirmation email would have carried.
 *
 * both the sign-up and the recovery flow tell you to go and read your mail, and
 * a mock sends none -- so `/update-password` would otherwise be reachable only
 * by typing a url with a plausible token in it. this hands back the real link so
 * the flow can be walked end to end.
 *
 * callers must wrap the use in their own `import.meta.env.DEV` test, the same way
 * requireAuth() repeats it below: with the check only in here, the branch around
 * the call survives into the bundle carrying whatever link text sits next to it.
 */
export function devResetLink(email: string): string {
  return `/update-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(DEMO_TOKEN)}`;
}

/**
 * setRequires(), except a page that needs a session yields to the dev bypass.
 * called during render, next to setTitle, exactly like setRequires itself.
 *
 * declaring nothing is how the guard already says "renders either way" (see
 * sign-out.tsx), so the bypass needs no cooperation from (backstage).tsx.
 */
export function requireAuth(requires: AuthRequirement) {

  const { setRequires } = useLayoutContext();

  // the DEV test is repeated here, ahead of the call, on purpose: devBypass()
  // makes its own check, but only a literal `false` at the head of this
  // condition gets the whole branch -- warning text included -- dropped from a
  // production bundle rather than merely made unreachable
  if (import.meta.env.DEV && requires === 'signed-in' && devBypass()) {
    console.warn(`[dev] sign-in check bypassed via ?${DEV_PARAM}`);
    return;
  }

  setRequires(requires);

}
