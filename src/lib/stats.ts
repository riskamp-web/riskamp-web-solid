

import { createEffect, on } from "solid-js";
import { useLocation } from "@solidjs/router";
import { isServer } from "solid-js/web";

let session = '';

export const Notify = (data: Record<string, number|string|boolean> = {}) => {

  if (import.meta.env.DEV) {
    console.info("skip stats for dev (2)");
    return; 
  }

  if (!session) {
    session = Math.round(Math.random() * 1e15).toString(16);
    if (window.sessionStorage) {
      window.sessionStorage.setItem('session-key', session);
    }
  }

  navigator.sendBeacon("https://internal.riskamp.com/stats", JSON.stringify({
    ...data,
    session,
    href: document.location.href,
  }));
  
};

export function RouteStats() {
  const location = useLocation();

  // dev
  if (import.meta.env.DEV) {
    console.info("skip stats for dev (1)");
    return; 
  }

  createEffect(on(() => `${location.pathname}${location.search}${location.hash}`, url => {
    // SSR/hydration phase    
    if (isServer) { 
      return; 
    }
    Notify({url, event: 'load'});
  }));

  return null;
}

if (typeof window !== `undefined` && !import.meta.env.DEV) {
  window.addEventListener('pagehide', () => {
    Notify({event: 'pagehide'});
  });
}

