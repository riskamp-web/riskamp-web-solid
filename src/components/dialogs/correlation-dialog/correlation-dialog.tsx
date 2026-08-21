
import { Accessor, createEffect, createSignal, on, onCleanup, onMount } from 'solid-js';
import style from './correlation-dialog.module.css';
import { Dialog, type Size, type Props as DialogProps } from '~/components/dialogs/dialog-base/dialog';
import { SpreadsheetType } from '~/lib/spreadsheet-type';
import { RiskAMPWeb } from 'riskamp-web';
import { CellStyle, CellValue } from '@trebco/treb';
import { format, t } from '~/i18n/i18n';

export interface CorrelationDialogData {
  adjusted: CellValue[][];
  style: CellStyle[][]|undefined;
  err: number;
}

export interface Props extends DialogProps<boolean> {
  sheet: Accessor<SpreadsheetType|undefined>;
  data: Accessor<CorrelationDialogData|undefined>;
}

export function CorrelationDialog(props: Props) {

  createEffect(on(props.open, value => {
    if (value) {
      const sheet = props.sheet();
      if (sheet && local_sheet) {
        local_sheet.scale = sheet.scale;
        local_sheet.Reset();
        const data = props.data();
        if (data) {
          const n = data.adjusted.length;

          local_sheet.SetRange({
            start: { row: 0, column: 0 },
            end: { row: n, column: n },
          }, data.adjusted);

          if (data.style) {

            console.info("DS", data.style);

            local_sheet.ApplyStyle({
              start: { row: 0, column: 0 },
              end: { row: n, column: n },
            }, data.style[0][0]);
          }

        }
      }
    }
    else {
      requestAnimationFrame(() => props.sheet()?.Focus());
    }
  }));

  // eslint-disable-next-line no-unassigned-vars
  let container: HTMLDivElement|undefined;

  let local_sheet: SpreadsheetType|undefined;

  onMount(() => {
    if (container && 1) {
      local_sheet = RiskAMPWeb.CreateSpreadsheet({
        container,
        collapsed: true,
        resizable: false,
        dnd: false,
        formula_bar: false,
        toolbar: false,
        expand: true,
      }) as SpreadsheetType;

      // (window as any).local_sheet = local_sheet; // dev

    }
  });

  onCleanup(() => {

  });

  const [size, setSize] = createSignal<Size|undefined>({width: 500, height: 450});
 
  function close(result: boolean) {
    props.setResult?.(result);
    props.setOpen(false);
  }

  return <Dialog modal moveable escape closebox resizeable {...props} bindsize={[size, setSize]} >

    <header>CMAT</header>
    <section class={style['container-section']}>
      <div class={style['outer-container']}>
        <div class={style['dialog-sheet']} ref={container}></div>
      </div>
      <div class={style.message}>
        {format(t('correlation-matrix.solution-text'), {
          error: props.sheet()?.FormatNumber(props.data()?.err || 0, 'percent') || '??',
        })}

      </div>
    </section>
    <footer>
      <div class={style.buttons}> 
        <button autofocus class="button-primary" onclick={() => close(true)}>{t('correlation-matrix.accept-changes')}</button>
        <button onclick={() => close(false)}>{t('correlation-matrix.close-dialog')}</button>

      </div>
    </footer>
  </Dialog>;

}
