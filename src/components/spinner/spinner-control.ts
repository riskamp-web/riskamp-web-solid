
/**
 * spinner controller
 */

import { createSignal } from "solid-js";

const [visible, setVisible] = createSignal(false);

function BlockKeys(event: KeyboardEvent) {
  event.stopPropagation();
  event.preventDefault();
}

export const spinner = {
  show: () => {
    setVisible(true);
    window.addEventListener('keydown', BlockKeys)
  },
  hide: () => {
    setVisible(false);
    window.removeEventListener('keydown', BlockKeys)
  },
  visible // Export the getter
};


