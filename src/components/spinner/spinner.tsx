import { onCleanup, onMount } from 'solid-js';
import { spinner } from './spinner-control';

import styles from "./spinner.module.css";

export function Spinner() {

  // eslint-disable-next-line no-unassigned-vars
  let dialog: HTMLDialogElement|undefined;

  // attach on mount, not from the ref: showModal() throws on a dialog that
  // isn't in the document yet
  onMount(() => spinner.attach(dialog));
  onCleanup(() => spinner.attach(undefined));

  return (
    <dialog class={styles.container} ref={dialog}>
      <div class={styles.spinner}><div></div><div></div><div></div><div></div></div>
    </dialog>
  );

}
