
import { t } from '~/i18n/i18n';
import { Dialog, Position, type Props as DialogProps } from '../dialog-base/dialog';
import { SpreadsheetType } from '~/lib/spreadsheet-type';
import style from './comment-dialog.module.css';
import { createEffect, createSignal } from 'solid-js';
import { on } from 'solid-js';

interface Props<T> extends DialogProps<T> {
  sheet: () => SpreadsheetType|undefined;
}

export function CommentDialog(props: Props<boolean>) {

  // eslint-disable-next-line no-unassigned-vars
  let textarea: HTMLTextAreaElement|undefined;

  const bindLayout = createSignal<Position|undefined>();

  createEffect(on(props.open, open => {
    if (open) {
      const sheet = props.sheet();
      if (textarea && sheet) {
        textarea.value = '';
        const sel = sheet.grid.GetSelection();
        sheet.ScrollIntoView(sel.target, false);
        const cell_data = sheet.grid.active_sheet.CellData(sel.target);
        textarea.value = cell_data.note || '';
      }
    }
  }));

  function HandleKey(event: KeyboardEvent) {
    if (event.key === 'Enter' && event.ctrlKey) {
      Save();
    }
  }

  function Save() {
    const sheet = props.sheet();
    if (textarea && sheet) {
      sheet.grid.SetNote(undefined, textarea.value || '');
    }
    props.setOpen(false);
  }

  function Clear() {
    const sheet = props.sheet();
    if (sheet) {
      sheet.grid.SetNote(undefined, undefined);
    }
    props.setOpen(false);
  }

  return <Dialog {...props} moveable escape modal resizeable {...bindLayout}>
      <section class={style.layout}> 
        <textarea ref={textarea} class={style.textarea} onkeydown={HandleKey}></textarea>
        <div class={style.buttons}>
          <button class="control-button button-primary" onclick={_ => Save()}>{t('comment-dialog.save-button.label')}</button>
          <button class="control-button " onclick={_ => Clear()}>{t('comment-dialog.remove-comment-button.label')}</button>
        </div>
      </section>
    </Dialog>;
  
}
