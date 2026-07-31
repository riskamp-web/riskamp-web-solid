
import { SpreadsheetType } from '~/lib/spreadsheet-type';
import { goto } from '~/lib/navigate';
import { spinner } from '~/components/spinner/spinner-control';

import * as cache from '~/docs/local-cache';
import * as documents2 from '~/docs/documents2';

/** check if the path is valid for load/save operations */
export function IsValidPath(path = '') {
  return !path || /^@[^/]+\/.+$/.test(path);
}

export function CacheCUrrentState(sheet?: SpreadsheetType, document_path = '', version: string|string[]|undefined = undefined) {

  // const cache_path = params.document_path || '';

  if (sheet && IsValidPath(document_path)) {

    console.info("Calling cache set", {path: document_path, version});

    cache.Set(document_path, typeof version === 'string' ? version : undefined, {
      data: sheet.SerializeDocument({
        preserve_simulation_data: true,
      }),
      cached: new Date().getTime(),
      // canonical_version: version || 0,
      // historical_version,
    });
  }

}

export async function RevertDocument(sheet?: SpreadsheetType, path = '') {

  // we should only be called if there's a path, but we might as well check
  if (path) {

    // window.dispatchEvent(new CustomEvent('show-spinner'));
    spinner.show();

    // flush local cache
    await cache.Delete(path);

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
      // network_version.set(path, sheet.state);
      // canonical_version = sheet.state;
      // historical_version = undefined;

      // console.info("NVSx2", page_pathname, sheet.state);
    }
    catch (err) {
      // ? FIXME: what to do in this case
      console.error(err);
      goto('/');
    }

    // window.dispatchEvent(new CustomEvent('hide-spinner'));
    spinner.hide();
    
  }

};

export async function TryLoadPath(sheet?: SpreadsheetType, path = '', version: string|string[]|undefined = undefined) {

  if (!sheet) {
    console.warn("mising sheet");
    goto('/');
    return false;
  }

  if (path.startsWith('@')) {

    console.info(2, {path, version});

    const match = path.match(/^(@[^/]+)\/(.+)$/);

    if (!match) {

      // FIXME: warn?

      console.warn("invalid path");
      goto('/');
      return false;
    }

    if (version) {
      if (Array.isArray(version)) {
        console.warn("invalid version");
        goto('/');
        return false;
      }
    }

    // const [_, user, file] = match;
    // console.info({user, file});

    spinner.show();

    let data = await cache.Get(path, version);
    if (data?.data) {

      console.info("Returning from cache");

      sheet.LoadDocument(data.data);
      spinner.hide();
      return true;
    }

    try {

      console.info("dot dot dot");

      if (version) {
        data = await documents2.GetDocumentVersion(path, version, true);
      }
      else {
        data = await documents2.GetDocument(path, true);
      }
      sheet.LoadDocument(data);
      spinner.hide();
      return true;
    }
    catch (err) {
      console.error(err);
      goto('/');
      spinner.hide();
      return false;
    }

  }
  else {
    spinner.show();

    const data = await cache.Get('', undefined);
    if (data?.data) {
      try {
        sheet.LoadDocument(data.data);
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