# Pending translations

English strings that changed **in place**: the key stayed the same, so the other
catalogues still carry a translation of the *old* text. Nothing flags these on its
own. `npm run check:i18n-coverage` reports keys that are *missing* from a locale, not
keys that are stale, so they're listed here by hand until stale detection exists
(see "i18n catalogue scaling" in `CLAUDE.md`).

**New keys don't belong here.** Add them to `en.ts` only and coverage reports them
per locale. They fall back to English until translated.

To clear an entry, update the key in every catalogue (`da de es fr it nl no pl pt sv`),
run `npm run check:i18n-fr` for the French spacing, and delete the row. Delete a
section once it's empty.

## Backstage Inter pass (branch `backstage-inter`, 2026-10-03)

Copy-voice changes from the 2026-10 design review, made alongside the switch to
Inter. The goal is warmer and more direct, with the same facts.

| key | was | now | note |
|---|---|---|---|
| `sign-in-page.heading` | Sign in | Welcome back | The page heading only. The button (`submit.label`) and the toolbar title (`sign-in.page.title`) stay "Sign in". |
| `sign-in-page.subtitle` | Enter your username and password to sign in. | Sign in to pick up where you left off. | |
| `documents-page.error.detail` | Loading failed because of an error. Please try again later. | Something went wrong loading the list. Try again in a moment. | Sits under "Couldn't load your documents", next to a Try again button. |
| `create-account-page.subtitle` | We ask for an email address and a username because documents are stored under your username. | Your username is part of every document’s address, so choose one you’re happy to share. | Still has to *explain* why a username is asked for (see the comment in `en.ts`): addresses are public-facing. |
| `contact-page.done.heading` | Thanks for your feedback! | Thanks for writing | |
| `contact-page.done.body` | We will read your message and get back to you as soon as we can. | If you left an email address, we’ll get back to you as soon as we can. | The email field is optional, so a reply is promised only when one is possible. |
| `update-password-page.done.body` | Your new password has been saved. | You’re all set — use it the next time you sign in. | Shown under the heading "Password updated". |
