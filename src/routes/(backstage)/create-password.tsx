/**
 * create password -- backstage redesign.
 *
 * the same screen as update-password: a brand-new account arrives from
 * create-account with a token in the link and chooses its first password. only
 * two labels differ -- the toolbar title and the form heading -- so this is a
 * thin wrapper that hands update-password the create-flow keys and shares
 * everything else (token field, strength meter, submit, done state) verbatim.
 */

import UpdatePassword from './update-password';

export default function CreatePassword() {
  return (
    <UpdatePassword
      titleKey='create-password.page.title'
      headingKey='create-password-page.heading'
    />
  );
}
