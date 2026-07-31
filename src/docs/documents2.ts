
import * as auth from '~/lib/auth';

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
