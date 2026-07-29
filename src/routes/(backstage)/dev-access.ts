
/**
 * dev-only escape hatch for the backstage route guard.
 *
 * the documents page is UI/UX against canned data, so signing in for every look
 * at it is friction -- but the guard has to be real. `/documents?dev` opens a
 * page that requires a session without one, on the dev server only.
 *
 * only documents uses this today; it lives on its own so another backstage page
 * can opt in with the same one-line call.
 */

import { AuthRequirement, useLayoutContext } from '~/components/layout-context';

/** the parameter that opens a signed-in page without a session */
export const DEV_PARAM = 'dev';

/** the parameter that makes a load fail, for looking at the failure state */
export const FAIL_PARAM = 'fail';

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
