

/*
 * client side of auth operations against remote (cloud) db.
 * adding a svelte store for session data so we can watch it.
 * 
 * NOTE we're mixing auth and resource access/caching... maybe 
 * we should split? there are too many things going on here
 */

/**
 * so there are two caches now, this one and the one in local-cache.
 * _this_ one only caches files you look up by path, e.g.
 * 
 * /@riskamp/example-file
 * 
 * files are only cached for the session, because on load we flush this 
 * cache. that means you can update by refreshing the browser.
 * 
 * so what's the value of this cache? it's used if you navigate away
 * from a spreadsheet page and then back, for example to the account or
 * documents page. 
 * 
 * so I think it's useful. we could move it to OPFS but it's probably
 * not a big deal either way, and this is legit caching network requests.
 * 
 */

import * as jose from 'jose';

// import { goto } from '$app/navigation';
// import { type Writable, writable } from 'svelte/store';
import { createSignal  } from 'solid-js';
import { goto } from '~/lib/navigate';

const DOCUMENT_CACHE = 'documents';
const AUTH_KEY = 'auth';

// exporting this so we can expose it for dev

// export const BACKEND = 'http://localhost:8787'; 
export const BACKEND = 'https://auth.riskamp.com';

export interface Claims {
  username: string;
  email: string;
  exp: number;
  id: string;
}

function init_fn() {
  return false;
}

export const sessionSignal = createSignal<Partial<Claims>>({});
export const loggedInSignal = createSignal<boolean>(false);

const [_loggedIn, setLoggedIn] = loggedInSignal;
const [_session, setSession] = sessionSignal;

// export const session: Writable<Partial<Claims>> = writable({});
// export const logged_in: Writable<boolean> = writable(false);

export const enable_auth = true;

/** token expiration, advisory only */
export let token_expiration = 0;

let _logged_in = false;

let cache_: Cache|undefined;
let cache_initialized = false;

const EnsureCache = async () => {
  if (cache_initialized) {
    return cache_;
  }
  if (typeof caches !== 'undefined') {
    cache_initialized = true;
    cache_ = await caches.open(DOCUMENT_CACHE);
    const keys = await cache_.keys();
    for (const key of keys) {
      // console.info("delete", key);
      await cache_.delete(key);
    }
    return cache_;
  }
  return undefined;
};

const Delay = (seconds = 1) => {
  return new Promise<void>(resolve => {
    window.setTimeout(() => resolve(), seconds * 1000);
  });
};

export const IsLoggedIn = () => _logged_in;

export const FormatTime = (seconds: number, precision = 2) => {

  let minutes = Math.floor(seconds/60);
  seconds = seconds % 60;

  const seconds_text = ((seconds < 10) ? '0' : '') + seconds.toFixed(precision);

  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  const minutes_text = ((minutes < 10) ? '0' : '') + minutes;

  return hours + ':' + minutes_text + ':' + seconds_text;
  
};

let refresh = 0;

const UpdateSessionData = (token: string) => {

  // console.info("USD")

  // eh... don't do this? we're flushing the list unecessarily if this is 
  // called after a refresh. (referring to setting logged_in -> false).
  //
  // moving into the test so it will only be called on !refresh.

  if (refresh) {
    window.clearTimeout(refresh);
    refresh = 0;
  }
  else {
    _logged_in = false;
    setLoggedIn(false);
 
  }

  if (token) {
    try {
      const payload = jose.decodeJwt(token);
      const time = new Date().getTime() / 1000;

      // console.info("exp", payload.exp, "time", time);

      token_expiration = payload.exp || -1;

      if (payload.exp && payload.exp < time) {
        
        // console.info("token expired!");

        requestAnimationFrame(() => {

          // we're relying on side-effects of the access method
          // to store updated credentials (if they are provided)

          AccessResource('/api/status', {}).then((result) => {
            // console.info("X");
          });

        });
      }
      else {

        setSession(payload);
        _logged_in = !!payload.username;
        setLoggedIn(_logged_in);

        // console.info("Logged in?", _logged_in)

        if (payload.exp) {

          token_expiration = payload.exp || -1;
          const delta = ((payload.exp - time) + 5) * 1000;

          // console.info("token valid for", FormatTime(payload.exp - time));
          // console.info('setting refresh in', Math.ceil(delta), `(${Math.ceil(delta)/1000}s)`)

          refresh = window.setTimeout(() => {

            // console.info("REFRESH")

            requestAnimationFrame(() => {
              AccessResource('/api/status', {}).then((result) => {

                // at this point if the stored token is not valid, we need 
                // to log out. if the token was refreshed the method call
                // would have stored the update.

                // the standard process would call back to this method, not
                // sure if we want to do that though. presume we've failed...
              
                let success = false;
                try {

                  const check_token = localStorage.getItem(AUTH_KEY) || '';
                  if (check_token) {

                    const payload = jose.decodeJwt(check_token);
                    const time = new Date().getTime() / 1000;

                    /*
                    console.info({
                      payload, 
                      exp: new Date((payload.exp || 0) * 1000),
                    })
                    */

                    // FIXME: should check ID? (...)

                    if (payload.exp && payload.exp > time) {
                      success = true;
                    }

                  }
                }
                catch (err) {
                  // ...
                }
                
                if (!success) {

                  _logged_in = false;
                  setLoggedIn(_logged_in);
                  ClearTokens();
                  goto('/');

                }

              });
            });
    
          }, Math.ceil(delta));
        }

        return;
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  setSession({});

};

/**
 * this can't be inlined because it needs to run after reactivity
 * has "started" or whatever solid is doing
 */
export function Init() {
  if (typeof localStorage !== 'undefined' && localStorage.getItem) {
    const data = localStorage.getItem(AUTH_KEY) || '';
    UpdateSessionData(data);
  };
}

/**
 * if we're using cache, we need a method to flush one request. seems to work.
 * UPDATE: call with no URI and we'll flush everything
 */
export const FlushCache = async (uri?: string) => {

  const cache = await EnsureCache();
  if (cache) {
    if (uri) {
      const result = await cache.delete( new Request(BACKEND + uri, { method: 'GET' }));
    }
    else {
      console.info('flushing everything');
      const keys = await cache.keys();
      for (const key of keys) {
        await cache.delete(key);
      }
    }
  }

};

/**
 * FIXME: make this private, add some save/save-as routines (do they 
 * need to be different? only for parameters)
 */
export const PushInNetworkCache = async (url: string, data: any) => {
  const request = new Request(BACKEND + url, {
    method: 'GET'
  });
  const response = new Response(JSON.stringify(data));
  const cache = await EnsureCache();
  if (cache) {
    await cache.put(request, response);
  }
};

/** 
 * fetch, but including authentication 
 * 
 * we now have a cache we're using for documents -- it's a browser 
 * "cache" object which caches requests. in order to provide an out from
 * the cache, we flush it on page load so a hard refresh will wipe it.
 * 
 */
export const AccessResource = async (
      uri: string, 
      payload?: any, 
      delay = 0, 
      use_cache = false, 
      refresh_cache = false ): Promise<any> => {

  const auth_token = typeof localStorage === 'undefined' ? undefined : localStorage.getItem(AUTH_KEY);

  const headers = auth_token ? {
    Authorization: `Bearer ${auth_token}`,
  } : undefined;

  let pending = delay ? Delay(delay) : Promise.resolve();
  
  // console.info("fetching", uri, headers);

  const request = new Request(BACKEND + uri, {
    credentials: 'include',
    method: payload ? 'POST' : 'GET',
    body: payload ? JSON.stringify(payload) : undefined,
    headers,
  });

  // let cache: Cache|undefined;
  
  const cache = await EnsureCache();

  if (use_cache && cache && !refresh_cache) {

    const result = await cache.match(request);
    if (result) {

      // console.info("fetched from cache:", uri);

      return result; // no auth stuff
    }
  }

  let result = await fetch(request);

  if (use_cache && cache) {

    await cache.put(request, result);
    const temp = await cache.match(request);
    
    if (temp) {
      result = temp;
    }
    else {
      throw new Error('cache store failed');
    }

  }

  await pending;

  // if we refreshed out-of-band, update token

  UpdateAuth(result);
  return result;

};

export const ClearTokens = () => {
  UpdateSessionData('');
  localStorage.removeItem(AUTH_KEY); // cookie?
  _logged_in = false;
  setLoggedIn(_logged_in);
};

export const Logout = async () => {

  // FIXME: call back end to flush refresh token

  await AccessResource('/api/logout');
  ClearTokens();
  
};

export const TestState = async () => {
  const response = await AccessResource('/api/test-state');
  if (response.ok) {
    const json = await response.json();
    console.info({json});
  }
};

export const Contact = async(message: string) => {

  const delay = Math.random() * .5;
  const result = await AccessResource('/api/contact', {
    message
  }, delay);

  if (result.ok) {
    return true; // await result.json();
  }

  return false;

};

export const CheckAvailability = async ({ email, username }: { email?: string, username?: string }) => {

  if (username && username.length < 5) {
    return false;    
  }

  const delay = Math.random() * .5;
  const result = await AccessResource('/api/username-exists', {
    email, username
  }, delay);

  if (result.ok) {
    return await result.json();
  }

  return false;

};

export const RecoverAccount = async ({ email }: {email: string}) => {

  if (email) {
    const delay = 1.7 + Math.random() * 2;

    const result = await AccessResource('/api/recover-account', {
      email,
    }, delay);

    return result.ok;

  }

  return false;

};

export const CreateAccount = async ({username, email}: { username: string, email: string }) => {

  if (username && email) {
    const delay = 1.7 + Math.random() * 2;

    const result = await AccessResource('/api/create-account', {
      username,
      email,
    }, delay);

    return result.ok;
  }

};

export const ResetPassword = async ({username, password, token}: {username: string, password: string, token: string}) => {

  if (username && password && token) {

    const delay = 1.7 + Math.random() * 2;

    const result = await AccessResource('/api/recover', {
      username,
      password,
      token,
    }, delay);

    return result.ok;

  }

  return false;

};

/**
 * we're sending auth tokens out-of-band as headers, so any request
 * should check if there's an update. if you don't care about the 
 * result of this function you can just ignore it.
 */
export const UpdateAuth = (response: Response) => {
  const auth = response.headers.get('Authorization');

  // console.info("update auth...");

  if (auth) {

    const parts = auth.split(/\s+/);
    if (parts[1] && parts[0] === 'Bearer') {

      // console.info("Updating auth token", parts[1]);

      StoreToken(parts[1]);
      return true;
    }
  }
  else {
    // console.info("no auth header");

  }

  return false;
};

export const Login = async (username: string, password: string): Promise<boolean> => {

  ClearTokens();

  if (username && password) {
    const delay = undefined; // 1.7 + Math.random() * 2;
    const result = await AccessResource('/api/login', {
      username,
      password,
    }, delay);

    return result.ok;
  
  }

  return false;

};

export const StoreToken = (jwt: string) => { // (json: { jwt: string, refresh: string }) => {
  localStorage.setItem(AUTH_KEY, jwt); // cookie?
  UpdateSessionData(jwt);
};

