
import type { Navigator } from "@solidjs/router";

let navigator: Navigator | undefined;

export function setNavigator(instance: Navigator) {
  navigator = instance;
}

/**
 * programmatic goto for script. we'll need a receiver in a UI 
 * component to hook into solid's router -- could be the very
 * top level. how about using signals for this instead of events?
 */
export function goto(url: string) {
  if (!navigator) {
    throw new Error('navigator not instantiated');
  }
  navigator(url);
}

export function OpenExternal(url: string, newTab = true) {
  if (newTab) window.open(url, "_blank", "noopener,noreferrer");
  else window.location.assign(url);
}

