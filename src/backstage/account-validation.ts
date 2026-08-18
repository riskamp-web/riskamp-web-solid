
/**
 * shared validation and message plumbing for the account pages.
 *
 * sign in, create account, forgot password and update password all ask the same
 * two questions -- is this field acceptable, and how do I say so -- so the
 * answers live here rather than in whichever page needed them first. this module
 * holds no canned data and no mock: the mocks import it, not the other way
 * round, which is what keeps the pair acyclic (the same reason
 * documents-store.ts and documents-data.ts are separate files).
 *
 * everything here is about what the *client* can rule out before asking. the
 * server is the authority and is allowed to disagree -- see the mock modules.
 */

import { format, t, type StringKey } from '~/i18n/i18n';

/* ------------------------------------------------------------------ */
/* messages                                                            */
/* ------------------------------------------------------------------ */

/**
 * a message held as a *key* plus the values it splices in.
 *
 * sign-in holds a bare `StringKey` so that nothing is translated until it's
 * drawn -- otherwise a language change leaves a message in the old language.
 * this is that, plus the values, because some of these messages quote what you
 * typed. the values are captured when the verdict is reached rather than read
 * back at the render site: the field they came from may have been edited since,
 * and "@foo is already taken" should keep saying foo.
 *
 * a Message with no values is exactly sign-in's key, so nothing is lost.
 */
export interface Message {
  key: StringKey;
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
/* email                                                               */
/* ------------------------------------------------------------------ */

/**
 * deliberately loose: one @, something either side, a dot in the domain, and no
 * whitespace.
 *
 * this catches the typo; it doesn't adjudicate validity. the flows that ask for
 * an address mail a link to it, and nothing proceeds until that link is
 * followed, so delivery is the real check -- and a false rejection here is
 * unrecoverable (there's no "no, really, send it"), where a false accept costs
 * one bounced email that a confirm-by-link flow already absorbs. an RFC-shaped
 * regex reliably rejects plus-tags, apostrophes and new TLDs, which is the worse
 * trade.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/** what a page can tell about an email address without asking */
export function validateEmail(value: string): Message | undefined {
  if (!value) { return { key: 'backstage-form.email.required' }; }
  if (!EMAIL_PATTERN.test(value)) { return { key: 'backstage-form.email.invalid' }; }
  return undefined;
}

/* ------------------------------------------------------------------ */
/* username                                                            */
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
 * starts with a letter, then letters, digits, hyphen, underscore -- either case.
 *
 * the username isn't only a login: it's the first segment of every document
 * address the account owns -- @dwerner/gort/horn -- and documentUrl() drops it
 * into a url with no encoding step anywhere, so it has to be url-safe without
 * escaping. every character this allows is, in either case.
 *
 * it does NOT have to be case-stable, which is why uppercase is let in: document
 * lookup normalizes case, so @Duncan/x and @duncan/x resolve to the same
 * document, and the account itself is compared case-insensitively (the mocks
 * lowercase before they check). so case carries no identity -- rejecting a name
 * over it would be friction enforcing a rule the system doesn't have. we accept
 * whatever's typed and canonicalize to lowercase downstream instead. leading
 * digits are still out: a bare @123 reads as an id rather than a handle.
 */
const USERNAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9_-]*$/;

/**
 * what a page can tell about a username without asking.
 *
 * length and characters get separate messages rather than one sentence stating
 * the whole rule: length is the one people hit by accident, and "usernames are
 * at least 5 characters" is something you can act on without reading a clause
 * about character classes. the bounds are spliced in from the constants above
 * so the message can't drift from the code enforcing it.
 */
export function validateUsername(value: string): Message | undefined {
  if (!value) { return { key: 'backstage-form.username.required' }; }
  if (value.length < USERNAME_MIN) {
    return { key: 'backstage-form.username.too-short', values: { min: USERNAME_MIN } };
  }
  if (value.length > USERNAME_MAX) {
    return { key: 'backstage-form.username.too-long', values: { max: USERNAME_MAX } };
  }
  if (!USERNAME_PATTERN.test(value)) { return { key: 'backstage-form.username.invalid' }; }
  return undefined;
}

/* ------------------------------------------------------------------ */
/* password                                                            */
/* ------------------------------------------------------------------ */

/**
 * the floor, and the only password rule that blocks a submission.
 *
 * nothing above this is enforced: the meter advises and never rejects. a rule
 * that demands an upper, a digit and a symbol mostly teaches people to end a
 * weak password with `1!`, and it rejects passphrases that are genuinely strong
 * -- so the floor is a floor and the meter does the rest.
 */
export const PASSWORD_MIN = 8;

/** what a page can tell about a password without asking */
export function validatePassword(value: string): Message | undefined {
  if (!value) { return { key: 'backstage-form.password.required' }; }
  if (value.length < PASSWORD_MIN) {
    return { key: 'backstage-form.password.too-short', values: { min: PASSWORD_MIN } };
  }
  return undefined;
}

/** the four levels the meter draws. deliberately not a number: the page shows a word */
export type Strength = 'weak' | 'fair' | 'good' | 'strong';

/** a strength plus how full the bar should be, 0..1 */
export interface PasswordScore {
  strength: Strength;
  fraction: number;
}

/** how full the bar is at each level. the width carries what the third colour doesn't */
const FRACTIONS: Record<Strength, number> = {
  weak: .25,
  fair: .5,
  good: .75,
  strong: 1,
};

/**
 * score a password, roughly, for the meter.
 *
 * **length dominates.** it's the only input that reliably tracks how hard a
 * password is to guess, so it carries the score and everything else adjusts it:
 *
 *   - a variety bonus for each of lower, upper, digit and symbol, worth much
 *     less than the length -- variety helps, but `Aa1!` is not a password
 *   - a penalty when the whole thing is built from very few distinct characters,
 *     because `aaaaaaaaaa` is long and worthless and length alone would call it
 *     strong
 *
 * this is a hint, not an oracle. it has no dictionary, so it can't know
 * `password1` is the first thing anyone would try -- and buying that knowledge
 * means shipping zxcvbn's several hundred kilobytes to draw one small bar. what
 * it does do is stop the two states that would make the meter actively
 * misleading: short-but-varied reading as strong, and long-but-repetitive
 * reading as strong.
 *
 * returns undefined below PASSWORD_MIN, rather than a fifth 'too short' level:
 * under the floor the password is *rejected*, which is the field message's job,
 * and a meter rating something unsubmittable invites reading it as permission.
 */
export function scorePassword(value: string): PasswordScore | undefined {

  if (value.length < PASSWORD_MIN) { return undefined; }

  /* the repeat penalty, applied to the length rather than to the score.
   *
   * a password built from a handful of characters is shorter than it looks:
   * 'abababababab' has the length of twelve and the variety of two. capping the
   * length at twice the distinct count expresses that directly, and it catches
   * every shape of the problem at once -- runs ('aaaa'), alternations ('abab')
   * and repeated blocks ('Aa1!Aa1!Aa1!'), which a run-length test would miss two
   * of. the factor is 2 rather than 1 so it can't bite on real text: a
   * passphrase has plenty of distinct characters and is left alone.
   *
   * Set iterates code points, so an astral character counts once, not twice. */
  const distinct = new Set(value).size;
  const effective = Math.min(value.length, distinct * 2);

  // length is the backbone: it's the only input that buys entropy at a rate an
  // attacker cares about, so it carries the score and everything else adjusts
  let score = Math.max(0, effective - PASSWORD_MIN);

  const classes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-z0-9]/i]
    .filter(pattern => pattern.test(value)).length;

  // worth about a character and a half each -- enough to separate two passwords
  // of the same length, never enough to promote a short one. 'Aa1!' is four
  // classes and not a password
  score += classes * 1.5;

  if (score >= 14) { return { strength: 'strong', fraction: FRACTIONS.strong }; }
  if (score >= 9) { return { strength: 'good', fraction: FRACTIONS.good }; }
  if (score >= 4) { return { strength: 'fair', fraction: FRACTIONS.fair }; }
  return { strength: 'weak', fraction: FRACTIONS.weak };

}

/** the i18n key for a strength word. the four are a `.strength.*` group */
export function strengthKey(strength: Strength): StringKey {
  switch (strength) {
    case 'strong': return 'update-password-page.strength.strong';
    case 'good': return 'update-password-page.strength.good';
    case 'fair': return 'update-password-page.strength.fair';
    default: return 'update-password-page.strength.weak';
  }
}
