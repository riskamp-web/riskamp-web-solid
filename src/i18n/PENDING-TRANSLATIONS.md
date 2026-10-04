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

_Nothing pending._
