
/**
 * password recovery -- a stand-in for the server.
 *
 * two halves of one flow: forgot-password asks for a link, update-password
 * spends the token that link carried. neither touches ~/lib/auth yet. the real
 * calls exist -- RecoverAccount({email}) posts to /api/recover-account and
 * ResetPassword({password, token}) posts to /api/recover -- so swapping these
 * out means replacing two function bodies.
 *
 * the rules the pages check first are in account-validation.ts.
 */

import type { Message } from './account-validation';

/**
 * long enough that the pending state is a state and not a flicker.
 *
 * the real calls wait 1.7-3.7s, which is a deliberate anti-enumeration measure
 * -- a request for an address that has no account has to take as long as one
 * that does, or the timing answers the question the response refuses to. that
 * matters on a real network and not here, and copying it makes the page feel
 * broken, so the mock keeps create-account's 700ms.
 */
const LATENCY = 700;

/* ------------------------------------------------------------------ */
/* asking for a link                                                   */
/* ------------------------------------------------------------------ */

/**
 * stands in for POST /api/recover-account.
 *
 * **it returns nothing, on purpose.** whether an address has an account is not
 * something this page may disclose: a form that says "sent!" for real addresses
 * and "no such account" for the rest is an account-enumeration oracle, and
 * anyone can read it. so the outcome is not reported, the page draws the same
 * confirmation either way, and the confirmation is worded conditionally --
 * "if there's an account for that address" -- because a flat "we've sent you a
 * link" would be a lie half the time.
 *
 * the real RecoverAccount does return a boolean. the page should keep ignoring
 * it when this is wired: it exists for the caller, not for the person reading
 * the screen.
 */
export async function requestResetMock({ email }: { email: string }): Promise<void> {
  void email;
  await new Promise(resolve => setTimeout(resolve, LATENCY));
}

/* ------------------------------------------------------------------ */
/* spending the token                                                  */
/* ------------------------------------------------------------------ */

/** the token the dev-only link carries, and the only one that works */
export const DEMO_TOKEN = 'demo-token';

/* two canned failures, because they call for different actions: an expired
   token means "get a new link", a bad one means "check the link you followed".
   one message for both would leave you re-reading a link that was never going
   to work. */
const EXPIRED_TOKEN = 'expired-token';
const USED_TOKEN = 'used-token';

/* passwords the service refuses however long they are.
 *
 * this is the RESERVED set's counterpart: a verdict the client cannot predict,
 * because it has no list of common passwords and isn't going to ship one. every
 * entry clears the minimum length, so the page accepts each of them and the
 * server sends them back -- which is the state that proves the strength meter
 * advises rather than decides. 'password1' rates Fair and is refused anyway.
 *
 * a real service checks a breach corpus here. five entries is enough to make
 * the state reachable without pretending to be that. */
const WEAK_PASSWORDS = new Set(['password', 'password1', '12345678', 'letmein1', 'qwertyui']);

/** what a reset attempt comes back with. one verdict per field, same as create account */
export interface UpdatePasswordResult {
  ok: boolean;
  token?: Message;
  password?: Message;
}

/**
 * stands in for POST /api/recover.
 *
 * the real call collapses every failure into result.ok, so the per-field
 * verdicts below are a shape the backend has to be asked for -- the same gap
 * create-account has. until then a wired page can only say "that didn't work",
 * which is a worse page.
 */
export async function updatePasswordMock(
    { token, password }:
    { token: string, password: string }): Promise<UpdatePasswordResult> {

  await new Promise(resolve => setTimeout(resolve, LATENCY));

  const supplied = token.trim();

  const result: UpdatePasswordResult = { ok: false };

  if (!supplied) {
    result.token = { key: 'update-password-page.token.required' };
    return result;
  }

  if (supplied === EXPIRED_TOKEN) {
    result.token = { key: 'update-password-page.token.expired' };
    return result;
  }

  if (supplied === USED_TOKEN) {
    result.token = { key: 'update-password-page.token.used' };
    return result;
  }

  /* anything that isn't the demo token is rejected as invalid. a real service
     would be checking a signature and an expiry carried by the token itself,
     which is also where a token issued for someone else would be caught -- it
     reads as invalid, deliberately, since "that token belongs to another
     account" tells an attacker their guess was otherwise well-formed. */
  if (supplied !== DEMO_TOKEN) {
    result.token = { key: 'update-password-page.token.invalid' };
    return result;
  }

  /* checked last, and only once the token is known good: telling someone their
     password is weak before establishing they may set one at all would confirm
     the token to anyone holding a guess. the password is *not* trimmed anywhere
     on this path -- leading and trailing spaces are legal, and silently dropping
     them sets a password its owner can't type. */
  if (WEAK_PASSWORDS.has(password.toLowerCase())) {
    result.password = { key: 'update-password-page.password.common' };
    return result;
  }

  result.ok = true;
  return result;

}
