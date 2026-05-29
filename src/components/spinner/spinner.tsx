
import { createEffect } from 'solid-js';
import { spinner } from './spinner-control';

import styles from "./spinner.module.css";

export function Spinner() {

  let dialog: HTMLDialogElement|undefined;

  createEffect(() => {
    if (spinner.visible()) {
      dialog?.showModal();
    }
    else {
      dialog?.close();
    }
  });

  return (
    <dialog class={styles.container} ref={dialog}>
      <div class={styles.spinner}><div></div><div></div><div></div><div></div></div>
    </dialog>
  );

}
