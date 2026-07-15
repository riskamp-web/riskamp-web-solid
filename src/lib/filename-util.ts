import { SpreadsheetType } from './spreadsheet-type';

/**
 * we don't use the sheet "document_name" directly anymore, although we 
 * should still support it (perhaps we should update it here?).
 * 
 * if there's no name in the user data, there might be a path
 * name from where it's saved, so use that
 * 
 * UPDATE: adding an "imported from" field in user data, so we can use
 * that temporarily if necessary
 * 
 */
export function GenerateFilename(sheet: SpreadsheetType, path?: string) {

  let base = `untitled document`;

  if (sheet.document_name) {
    base = sheet.document_name;
  }
  else if (path) {

    // for the path we want to drop any directory components
    const parts = path.split('/');
    base = parts[parts.length - 1];

  }
  else if (sheet.user_data?.imported_from) {
    base = sheet.user_data.imported_from;
    if (/^.+\.\w+$/.test(base)) {
      base = base.replace(/\.[^.]+$/, '');
    }
  }

  base = base.replace(/\W+/g, '-').toLocaleLowerCase();
  return base;

}
