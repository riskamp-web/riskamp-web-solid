
import * as auth from '~/lib/auth';
import { DocumentsRow } from './documents';

export const PushDocument = async (path: string, data: unknown) => {

  if (path.endsWith('/')) {
    path = path.substring(0, path.length - 1)
  }

  await auth.PushInNetworkCache('/api/get-document?path=' + path, data);
};

export const GetDocumentVersion = async(path: string, version: string, cache = true, refresh_cache = false) => {

  if (path.endsWith('/')) {
    path = path.substring(0, path.length - 1)
  }

  console.info("DHE2", path, version);

  // FIXME: use proper query constructor

  //const data = await auth.AccessResource('/api/document-history-entry-2', { path, version }, undefined, cache, refresh_cache);
  const data = await auth.AccessResource('/api/document-history-entry-2?path=' + path + '&version=' + version, undefined, undefined, cache, refresh_cache);

  if (data.ok) {

    const json = await data.json();

    console.info("OK?", json);

    return json;
  }
  else {
    console.info("ERR", data.err());
  }

  // we should cache this as well (the error)? ...

  throw new Error(data.status?.toString());

};

export const GetDocument = async (path: string, cache = true, refresh_cache = false) => {

  // wtf is this -- should we handle server side? (yes?)

  if (path.endsWith('/')) {
    path = path.substring(0, path.length - 1)
  }

  // FIXME: use proper query constructor

  const data = await auth.AccessResource('/api/get-document?path=' + path, undefined, undefined, cache, refresh_cache);

  if (data.ok) {
    const json = await data.json();
    return json;
  }

  // we should cache this as well (the error)? ...

  throw new Error(data.status?.toString());

};

export async function UpdateDocument(pathname: string, args: {
      name?: string;
      document?: string;
      access?: 'public'|'private';
      starred?: boolean;
      api_version?: number;
      new_path?: string;
    }): Promise<Partial<DocumentsRow>|false> {
  
  const access = (typeof args.access === 'string') ? (args.access === 'public' ? 1 : 0) : undefined;

  if (pathname.endsWith('/')) {
    pathname = pathname.substring(0, pathname.length - 1)
  }

  console.info("Pathname?", pathname);

  try {
    const result = await auth.AccessResource('/api/update-document', {
      pathname,
      name: args.name,
      document: args.document,
      access,
      starred: args.starred,
      api_version: args.api_version,
      new_path: args.new_path,
    });

    if (result.ok) {
      return await result.json();
    }

  }
  catch {
    // 
  }

  return false;

}

export async function StoreDocument(
    pathname: string, 
    name: string, 
    document: string, 
    access: number): Promise<Partial<DocumentsRow>|false> {
  
  const delay = 1 + Math.random() * 1;

  try {
    const result = await auth.AccessResource('/api/store-document', {
      pathname,
      name,
      document,
      access,
      api_version: 2,
    }, delay);

    if (result.ok) {
      return await result.json();
    }
  }
  catch {
    // 
  }

  return false;
  
}


