
import type { EmbeddedSpreadsheet } from 'riskamp-web';
// import type InfoDialog from './components/info-dialog.svelte';

/** replacement for TREB enum type */
export type TREBDialogType = ''|'info'|'error'|'warning'|'success'|'about'|'initial';

/** this is a TREB type that's not properly exported */
export interface TREBDialogOptions {
  title: string;
  message: string;
  icon: string | boolean;
  close_box: boolean;
  timeout: number;
  type: TREBDialogType;
}

/** we're overriding the dialog, handy to have a type */
export interface TREBDialog {
  Update?: (options: Partial<TREBDialogOptions>, delta?: boolean) => void;
  HideDialog?: () => void;
  ShowDialog?: (options: Partial<TREBDialogOptions>) => Promise<void>;
}

export const HijackDialog = (sheet: EmbeddedSpreadsheet & { dialog?: TREBDialog } /*, info_dialog: InfoDialog*/ ) => {

  const original_dialog = sheet.dialog;

  sheet.dialog = {

    /*
    Update: (
      options: Partial<TREBDialogOptions>,
      delta?: boolean
    ): void => {
      console.info('dialog: update', options, delta);
    },
    */
    Update: () => {},

    HideDialog: () => {
      // console.info('dialog: hidedialog');
    },

    ShowDialog: (options: Partial<TREBDialogOptions>): Promise<void> => {
      
      // console.info('dialog: showdialog', options);

      switch (options.type) {
        case 'error':
          /*
          return info_dialog.Show({
            header: 'Error',
            style: 'error',
            text: options.message,
            timeout: options.timeout,
          });
          */
          console.warn("missing info dialog!");
          console.info(options.message);
          return Promise.resolve();
        
        case 'about':
          if (original_dialog?.ShowDialog) {
            return original_dialog.ShowDialog(options);
          }
      }

      return Promise.resolve();
    },
  };

};