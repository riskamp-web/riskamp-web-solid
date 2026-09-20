/**
 * sending a contact message to us.
 *
 * this posts to the brochure site's contact endpoint -- a *different* host from
 * the app's own backend (auth.riskamp.com), open and unauthenticated, and it
 * expects multipart form data rather than json. so it deliberately does NOT go
 * through auth.AccessResource, which would attach a bearer token, send json, and
 * aim at the wrong origin. it's a plain cross-origin fetch, lifted from the same
 * helper the brochure site uses.
 *
 * `dummy` short-circuits the network call and reports success -- for exercising
 * the form without mailing us. nothing ships it: production and the dev server
 * both send for real. it's a hook for local testing only.
 *
 * a network failure throws (fetch rejects); a server rejection resolves false.
 * the page distinguishes the two -- "couldn't reach us" vs "we couldn't take it"
 * -- so it lets the throw propagate rather than swallowing it here.
 */

const ENDPOINT = 'https://www.riskamp.com/webapp/contact-message';

export const ContactMessage = async (props: {
  dummy?: boolean;
  name: string;
  email: string;
  message: string;
}): Promise<boolean> => {

  const data = new FormData();
  data.append('name', props.name);
  data.append('email', props.email);
  data.append('message', props.message);

  const result = props.dummy
    ? { ok: true }
    : await fetch(ENDPOINT, { method: 'POST', body: data });

  return result.ok;

};
