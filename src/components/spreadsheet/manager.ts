
import { SpreadsheetType } from '~/lib/spreadsheet-type';
import { goto } from '~/lib/navigate';
import { spinner } from '~/components/spinner/spinner-control';

// import * as cache from '~/docs/local-cache';
import * as documents2 from '~/docs/documents2';
import { sessionData, setSessionData } from '~/lib/app-data';

import { CacheFactory } from '~/docs/local-cache';
import type { LoadSource, MCTREBDocument } from 'riskamp-web';
import { toast } from '../toast/toast-control';
import { t } from '~/i18n/i18n';

/** check if the path is valid for load/save operations */
export function IsValidPath(path = '') {
  return !path || /^@[^/]+\/.+$/.test(path);
}

export function CacheCUrrentState(sheet?: SpreadsheetType, document_path = '', version: string|string[]|undefined = undefined) {

  // const cache_path = params.document_path || '';

  if (sheet && IsValidPath(document_path)) {

    console.info("Calling cache set", {path: document_path, version}, 'cv', sessionData.last_saved_version);

    // not sure why this function is not asymc, but matching
    // the old implementation...

    CacheFactory.Instance().then(cache => {
      cache.Set(document_path, typeof version === 'string' ? version : undefined, {
        data: sheet.SerializeDocument({
          preserve_simulation_data: true,
        }),
        cached: new Date().getTime(),
        canonical_version: sessionData.last_saved_version || 0,
      });
    });

    setSessionData('document_version', sheet.state || 0);


  }

}

export async function RemoveFromCache(path = '', version: string|string[]|undefined = undefined) {
  const cache = await CacheFactory.Instance();
  await cache.Delete(path, typeof version === 'string' ? version : undefined);
}

export async function RevertDocument(sheet?: SpreadsheetType, path = '', version: string|string[]|undefined = undefined) {

  // we should only be called if there's a path, but we might as well check
  if (path) {

    // window.dispatchEvent(new CustomEvent('show-spinner'));
    spinner.show();

    const cache = await CacheFactory.Instance();

    // flush local cache
    await cache.Delete(path, typeof version === 'string' ? version : undefined);

    /*
    if (historical_version) {
      await cache.Delete(path + '//' + historical_version);
      historical_version = undefined;
    }
    */

    // flush network cache? (...)
    const refresh_cache = false;

    // there's a possibility this will fail...
    try {
      const data = await documents2.GetDocument(path, true, refresh_cache);
      sheet?.LoadDocument(data);
    }
    catch (err) {
      // ? FIXME: what to do in this case
      console.error(err);
      goto('/');

      // toast.error('Load error 1');
    }

    // window.dispatchEvent(new CustomEvent('hide-spinner'));
    spinner.hide();
    
  }

};

export async function TryLoadPath(sheet?: SpreadsheetType, path = '', version: string|string[]|undefined = undefined) {

  if (!sheet) {

    // this is just a catastrophic error

    console.warn("mising sheet");
    goto('/');
    return false;
  }

  if (path.startsWith('@')) {

    // console.info(2, {path, version});

    const match = path.match(/^(@[^/]+)\/(.+)$/);

    if (!match) {
      toast.error(t('load-error.loading-document-failed'));
      goto('/', { replace: true });
      return false;
    }

    if (version) {
      if (Array.isArray(version)) {
        toast.error(t('load-error.loading-document-failed'));
        goto('/', { replace: true });
        return false;
      }
    }

    spinner.show();

    const cache = await CacheFactory.Instance();
    const data = await cache.Get(path, version);
    if (data?.data) {

      // console.info("Returning from cache");

      sheet.LoadDocument(data.data, { source: 'cache' as LoadSource });
      setSessionData('last_saved_version', data.canonical_version || 0);

      spinner.hide();
      return true;

    }

    try {
      let doc: MCTREBDocument;
      if (version) {
        doc = await documents2.GetDocumentVersion(path, version, false); // , true);
      }
      else {
        doc = await documents2.GetDocument(path, false); // , true);
      }
      sheet.LoadDocument(doc);

      spinner.hide();
      return true;
    }
    catch (err) {

      // this error generally means the document doesn't exist, 
      // or it's private and you don't own it

      console.error(err);
      toast.error(t('load-error.loading-document-failed'));
      goto('/', { replace: true });
      spinner.hide();
      return false;
      
    }

  }
  else if (path) {

    // there's a path, but it doesn't start with an @user,
    // so it's presumably invalid. we'll replace the URL 
    // with root and it will pull in the default doc on the 
    // load pass

    toast.error(t('load-error.loading-document-failed'));
    goto('/', {
      replace: true,
    });

  }
  else {

    // no path, load the default

    spinner.show();

    const cache = await CacheFactory.Instance();
    const data = await cache.Get('', undefined);
    if (data?.data) {
      try {
        console.info("Returning from cache (default document)");
        sheet.LoadDocument(data.data, { source: 'cache' as LoadSource });
        setSessionData('last_saved_version', data.canonical_version || 0);
      }
      catch (err) {
        console.error(err);
        sheet.Reset();
      }
    }
    else {
      sheet.Reset();
    }

    spinner.hide();

  }

  return true;

}