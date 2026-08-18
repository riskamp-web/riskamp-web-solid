import { onMount } from '~/lib/solid-compat';
import { useNavigate } from "@solidjs/router";

// Solid Router 2.0 removed the declarative <Navigate> component (it exposes
// only the useNavigate hook). This restores the 1.x affordance so existing
// `<Show fallback={<Navigate href="/" />}>` redirect guards keep working.
export function Navigate(props: { href: string }) {
  const navigate = useNavigate();
  onMount(() => navigate(props.href, { replace: true }));
  return null;
}
