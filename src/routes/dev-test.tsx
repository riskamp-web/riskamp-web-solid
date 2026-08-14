
import { ParentProps, Show } from 'solid-js';
import { Navigate } from '@solidjs/router';

/*
 * layout for the dev-test routes.
 *
 * these are the demo / gallery pages we keep around to exercise components by
 * hand -- confirm-demo, save-as-demo, toast-demo, and the icons gallery. they're
 * useful enough to keep rather than recreate each time, but have no place in
 * production, so this gate limits the whole /dev-test/* tree to the dev server.
 *
 * import.meta.env.DEV is statically replaced, so a production build compiles the
 * `when` to `false` and this renders a plain redirect to / -- the child page is
 * never rendered, so its lazy route chunk is never even fetched. same mechanism
 * the ?dev bypass (dev-access.ts) and the icons page already lean on.
 */
export default function DevTestLayout(props: ParentProps) {
  return (
    <Show when={import.meta.env.DEV} fallback={<Navigate href='/' />}>
      {props.children}
    </Show>
  );
}
