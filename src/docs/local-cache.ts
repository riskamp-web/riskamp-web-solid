/**
 * this cache is used to store files. as such we should probably
 * switch to using OPFS.
 * 
 * we probably want to switch over gracefully so we should keep 
 * the cache but make it read-only, and eventually we can drop it
 * altogether.
 */

import type { MCTREBDocument } from 'riskamp-web';

export interface CachedDocumentType {
  data?: MCTREBDocument;
  canonical_version?: number;
  cached?: number;
}

export class CacheFactory {

  private static instance?: CacheFactory;

  public static async Instance() {
    if (!this.instance) {
      const cache = await caches.open('local');
      this.instance = new CacheFactory(cache);
    }
    return this.instance;
  }

  private constructor(private cache: Cache) {}

  public CacheURL(key: string, version?: string) {
    let url = '/local-cache?key=' + key;
    if (version) {
      url += '&version=' + version;
    }
    return url;
  }

  public async Set(key: string, version: string|undefined, data: CachedDocumentType) {
    const response = new Response(JSON.stringify(data));
    await this.cache.put(this.CacheURL(key, version), response);
  }

  public async Get(key: string, version: string|undefined): Promise<CachedDocumentType|undefined> {
    const response = await this.cache.match(this.CacheURL(key, version));
    if (response) {
      return response.json();
    }
    return undefined;
  }

  public async Delete(key: string, version: string|undefined) {
    return await this.cache.delete(this.CacheURL(key, version));
  }

  public async Flush() {
    for (const key of await this.cache.keys()) {
      await this.cache.delete(key);
    }
  }

  public async ListKeys() {
    const keys: string[] = [];
    for (const key of await this.cache.keys()) {
      const match = key.url.match(/key=(.*?)$/);
      if (match) {
        keys.push(match[1]);
      }
    }
    return keys;
  }

}

/*
let cache_: Cache | undefined;
let cache_initialized = false;

// removing top-level await, requires that we load the cache at some
// point and don't overlap with any other operation

const EnsureCache = async () => {
  if (cache_initialized) {
    return cache_;
  }
  if (typeof caches !== 'undefined') {
    cache_initialized = true;
    cache_ = await caches.open('local');
    return cache_;
  }
  return undefined;
};

/ * * canonical URL for key * /
const CacheURL = (key: string, version?: string) => {
  let url = '/local-cache?key=' + key;
  if (version) {
    url += '&version=' + version;
  }
  return url;
}

export const Set = async (key: string, version: string|undefined, data: unknown) => {
  const cache = await EnsureCache();
  if (cache) {
    const response = new Response(JSON.stringify(data));
    await cache.put(CacheURL(key, version), response);
    return true;
  }
  return false;
};

export const Get = async (key: string, version: string|undefined) => {
  const cache = await EnsureCache();
  if (cache) {
    const response = await cache.match(CacheURL(key, version));
    if (response) {
      return response.json();
    }
    return undefined;
  }
  throw new Error('no cache');
};

export const Delete = async (key: string, version: string|undefined) => {
  const cache = await EnsureCache();
  if (cache) {
    return await cache.delete(CacheURL(key, version));
  }
  return false;
};

export const Flush = async () => {
  const cache = await EnsureCache();
  if (cache) {
    for (const key of await cache.keys()) {
      await cache.delete(key);
    }
  }
};

export const ListKeys = async () => {
  const keys: string[] = [];
  const cache = await EnsureCache();
  if (cache) {
    for (const key of await cache.keys()) {
      const match = key.url.match(/key=(.*?)$/);
      if (match) {
        keys.push(match[1]);
      }
    }
  }
  return keys;
}
*/

