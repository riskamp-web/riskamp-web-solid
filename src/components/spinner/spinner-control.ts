
/**
 * spinner controller
 */

import { createSignal } from "solid-js";

const [visible, setVisible] = createSignal(false);

type EscapeFunction = () => void;

let escape_function: EscapeFunction|undefined = undefined;

function BlockKeys(event: KeyboardEvent) {

  if (event.key === 'Escape' && escape_function) {
    escape_function();
  }

  event.stopPropagation();
  event.preventDefault();
}

export const spinner = {
  show: (escape?: EscapeFunction) => {
    escape_function = escape;
    setVisible(true);
    window.addEventListener('keydown', BlockKeys)
  },
  hide: () => {
    setVisible(false);
    escape_function = undefined;
    window.removeEventListener('keydown', BlockKeys)
  },
  visible // Export the getter
};


