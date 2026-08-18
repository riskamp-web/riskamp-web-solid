
/**
 * create account -- a stand-in for the server.
 *
 * the page is UI/UX only for now, the same way documents is: nothing here
 * touches ~/lib/auth. the real calls already exist --
 * CreateAccount({username, email}) posts to /api/create-account, and
 * CheckAvailability({username, email}) posts to /api/username-exists -- so
 * swapping this out means replacing createAccountMock() and nothing above it.
 *
 * worth knowing before that happens: CreateAccount reports nothing but
 * result.ok, and CheckAvailability answers with a single value for both fields
 * at once, so neither can currently say *which* of the two collided. the
 * two-field result below is a shape the backend has to be asked for. until it
 * is, a wired page could only say "one of these is taken", which is a worse
 * page than this one.
 *
 * the rules the page checks before it gets here are in account-validation.ts.
 * those are a courtesy that saves a round trip; this is the authority, and it
 * knows things the page can't -- who already has the name, which names are
 * reserved -- so it runs its own checks and is allowed to disagree. RESERVED
 * below exists to keep the page honest about that: it makes the page draw a
 * verdict it could not have predicted, which is otherwise a state you'd
 * discover only once the real endpoint was wired up.
 */

import type { Message } from './account-validation';

/* canned collisions. two independent sets rather than a list of account
   records, because the two collisions are independent -- which is what makes
   the both-at-once state reachable at all. dwerner is the owner in
   documents-sample2.ts and dwerner@riskamp.com is in the email set, so one
   typed submission gets you there without having to guess. */
const TAKEN_USERNAMES = new Set(['dwerner', 'duncan', 'riskamp', 'testuser']);
const TAKEN_EMAILS = new Set(['dwerner@riskamp.com', 'taken@example.com']);

/* names the service keeps for itself. the page deliberately doesn't know about
   these -- they're the "the server said no and you couldn't have guessed" case,
   which the error handling has to cope with either way. */
const RESERVED = new Set(['admin', 'root', 'system', 'support', 'help', 'about', 'documents', 'sign-in']);

/**
 * what a create-account attempt comes back with.
 *
 * the two field verdicts are independent, so a submission that collides on both
 * halves reports both -- fixing one and being told about the other on the next
 * attempt is two round trips for one problem.
 *
 * `ok` is kept as its own field rather than re-derived by each caller, and it
 * isn't simply "no field verdicts": a rejection the client can't attribute to a
 * field is a real outcome, and it has to be distinguishable from a success.
 */
export interface CreateAccountResult {
  ok: boolean;
  username?: Message;
  email?: Message;
}

/**
 * long enough that the pending state is a state and not a flicker.
 *
 * deliberately not the 1.7-3.7s auth.CreateAccount uses -- that delay is there
 * to mask a real round trip against timing attacks, and copying it into a mock
 * just makes the page feel broken.
 */
const LATENCY = 700;

/**
 * stands in for POST /api/create-account.
 *
 * this one never throws, but the page still handles it, because that's the
 * shape the real call needs -- Login resolves false for a rejection and throws
 * for a request that never completed, which is why sign-in can say "incorrect
 * password" and "can't reach the server" as different things. to see that
 * banner, throw from here for a moment.
 */
export async function createAccountMock(
    { username, email }: { username: string, email: string }): Promise<CreateAccountResult> {

  await new Promise(resolve => setTimeout(resolve, LATENCY));

  // the server normalises before it compares, and so does the document store
  // behind it -- which is why the page can't decide a name is free by looking
  // at what was typed
  const name = username.trim().toLowerCase();
  const address = email.trim().toLowerCase();

  const result: CreateAccountResult = { ok: true };

  if (RESERVED.has(name)) {
    result.username = { key: 'create-account-page.username.reserved', values: { username: name } };
  }
  else if (TAKEN_USERNAMES.has(name)) {
    result.username = { key: 'create-account-page.username.taken', values: { username: name } };
  }

  if (TAKEN_EMAILS.has(address)) {
    result.email = { key: 'create-account-page.email.taken' };
  }

  result.ok = !result.username && !result.email;

  return result;

}

/* ------------------------------------------------------------------ */
/* live username availability                                          */
/* ------------------------------------------------------------------ */

/**
 * what a live availability check comes back with.
 *
 * a single verdict, not the two-field shape createAccountMock returns: the live
 * check only ever asks about the username, and only once the client has already
 * ruled the format acceptable -- so the answer is just "is this name free, and
 * if not, why". `message` reuses the very keys createAccountMock returns for the
 * same collisions, because a name the live check calls taken has to read
 * identically when submit rejects it.
 */
export interface UsernameAvailability {
  available: boolean;
  message?: Message;
}

/**
 * shorter than createAccountMock's 700ms: this fires while you type, so it has
 * to feel like a network check without feeling like a stall. auth.CheckAvailability
 * uses a 0-500ms jitter for the same reason; a fixed value keeps the mock's
 * timing legible.
 */
const CHECK_LATENCY = 400;

/**
 * stands in for POST /api/username-exists (auth.CheckAvailability).
 *
 * the authority on the one thing the client can't know -- whether a well-formed
 * name is already spoken for, or reserved. it does *not* re-check the format:
 * the caller runs validateUsername first and only asks about names that passed,
 * exactly the arrangement account-validation.ts describes (the client rules out
 * what it can, the server rules on what it can't). sharing RESERVED and
 * TAKEN_USERNAMES with createAccountMock above is the point -- a name this call
 * says is free must not then collide on submit.
 *
 * the real CheckAvailability answers with a bare boolean, so the message below
 * is a shape the backend has to be asked for. until it is, a wired page would
 * know a name was taken but not whether it was taken or reserved -- the same gap
 * createAccountMock's header notes.
 */
export async function checkUsernameMock(username: string): Promise<UsernameAvailability> {

  await new Promise(resolve => setTimeout(resolve, CHECK_LATENCY));

  const name = username.trim().toLowerCase();

  if (RESERVED.has(name)) {
    return { available: false, message: { key: 'create-account-page.username.reserved', values: { username: name } } };
  }

  if (TAKEN_USERNAMES.has(name)) {
    return { available: false, message: { key: 'create-account-page.username.taken', values: { username: name } } };
  }

  return { available: true };

}
