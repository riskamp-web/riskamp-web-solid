
/**
 * create account -- the validators, and a stand-in for the server.
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
 * the split between the two halves of this file is the point of it:
 *
 *   - validate*()           what the page can rule out before asking
 *   - createAccountMock()   what only the server can answer
 *
 * the client rules are a courtesy that saves a round trip. the server is the
 * authority, and it knows things the page can't -- who already has the name,
 * which names are reserved -- so it runs its own checks and is allowed to
 * disagree. RESERVED below exists to keep the page honest about that: it makes
 * the page draw a verdict it could not have predicted, which is otherwise a
 * state you'd discover only once the real endpoint was wired up.
 */

import { format, t, type I18N } from '~/i18n/i18n';

/* ------------------------------------------------------------------ */
/* messages                                                            */
/* ------------------------------------------------------------------ */

/**
 * a message held as a *key* plus the values it splices in.
 *
 * sign-in holds a bare `keyof I18N` so that nothing is translated until it's
 * drawn -- otherwise a language change leaves a message in the old language.
 * this is that, plus the values, because some of these messages quote what you
 * typed. the values are captured when the verdict is reached rather than read
 * back at the render site: the field they came from may have been edited since,
 * and "@foo is already taken" should keep saying foo.
 *
 * a Message with no values is exactly sign-in's key, so nothing is lost.
 */
export interface Message {
  key: keyof I18N;
  values?: Record<string, string | number>;
}

/**
 * resolve one at the point it's drawn.
 *
 * t() is reactive only inside a tracking scope, so this has to be called from
 * the page's jsx -- which is where it is. undefined resolves to '', so the
 * <Show> guards around these read the same as sign-in's.
 */
export function messageText(message?: Message): string {
  if (!message) { return ''; }
  return message.values ? format(t(message.key), message.values) : t(message.key);
}

/* ------------------------------------------------------------------ */
/* the rules                                                           */
/* ------------------------------------------------------------------ */

/**
 * the shortest username the service accepts.
 *
 * this is the one rule that already existed in the codebase: CheckAvailability
 * in ~/lib/auth refuses to even ask the server below five characters, which
 * means the backend enforces it.
 */
export const USERNAME_MIN = 5;

/** and the longest. no backend number is known for this one -- see the README */
export const USERNAME_MAX = 30;

/**
 * lowercase, starts with a letter, then letters, digits, hyphen, underscore.
 *
 * the username isn't only a login: it's the first segment of every document
 * address this account owns -- @dwerner/gort/horn -- and documentUrl() drops it
 * into a url with no encoding step anywhere. so it has to be url-safe without
 * escaping, and it has to be case-stable, or @Duncan and @duncan become two
 * addresses for one account. leading digits are out because a bare @123 reads
 * as an id rather than a handle.
 */
const USERNAME_PATTERN = /^[a-z][a-z0-9_-]*$/;

/**
 * deliberately loose: one @, something either side, a dot in the domain, and no
 * whitespace.
 *
 * this catches the typo; it doesn't adjudicate validity. the flow mails a
 * confirmation link and the account isn't usable until it's followed, so
 * delivery is the real check -- and a false rejection here is unrecoverable
 * (there's no "no, really, send it"), where a false accept costs one bounced
 * email that the confirm-by-link flow already absorbs. an RFC-shaped regex
 * reliably rejects plus-tags, apostrophes and new TLDs, which is the worse
 * trade.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/** what the page can tell about an email address without asking */
export function validateEmail(value: string): Message | undefined {
  if (!value) { return { key: 'create-account-page.email.required' }; }
  if (!EMAIL_PATTERN.test(value)) { return { key: 'create-account-page.email.invalid' }; }
  return undefined;
}

/**
 * what the page can tell about a username without asking.
 *
 * length and characters get separate messages rather than one sentence stating
 * the whole rule: length is the one people hit by accident, and "usernames are
 * at least 5 characters" is something you can act on without reading a clause
 * about character classes. the bounds are spliced in from the constants above
 * so the message can't drift from the code enforcing it.
 */
export function validateUsername(value: string): Message | undefined {
  if (!value) { return { key: 'create-account-page.username.required' }; }
  if (value.length < USERNAME_MIN) {
    return { key: 'create-account-page.username.too-short', values: { min: USERNAME_MIN } };
  }
  if (value.length > USERNAME_MAX) {
    return { key: 'create-account-page.username.too-long', values: { max: USERNAME_MAX } };
  }
  if (!USERNAME_PATTERN.test(value)) { return { key: 'create-account-page.username.invalid' }; }
  return undefined;
}

/* ------------------------------------------------------------------ */
/* the stand-in server                                                 */
/* ------------------------------------------------------------------ */

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
