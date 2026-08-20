
import { Accessor, createEffect, createSignal, on, onCleanup, onMount } from 'solid-js';
import style from './correlation-dialog.module.css';
import { Dialog, type Size, type Props as DialogProps } from '~/components/dialogs/dialog-base/dialog';
import { SpreadsheetType } from '~/lib/spreadsheet-type';
import { type EmbeddedSpreadsheet, type MCEmbeddedSpreadsheetOptions, RiskAMPWeb } from 'riskamp-web';

interface Props extends DialogProps<boolean> {
  sheet: Accessor<SpreadsheetType|undefined>;
}

export function CorrelationDialog(props: Props) {

  createEffect(on(props.open, value => {
    if (value) {
      const sheet = props.sheet();
      if (sheet && local_sheet) {
        local_sheet.scale = sheet.scale;
        const sel = sheet.GetSelection();
        const data = sheet.GetRange(sel);
        let style = sheet.GetStyle(sel);

        if (style) {
          if (Array.isArray(style)) {
            style = style[0][0];
          }
          console.info("S", style);
          sheet.ApplyStyle('A1:Z99', style, false);
        }
        else {
          sheet.ApplyStyle('A1:Z99', {}, false);
        }

        local_sheet.SetRange('A1', data, {
          spill: true,
        });

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
        toolbar: false,
        expand: true,
      }) as SpreadsheetType;
      (window as any).local_sheet = local_sheet;
    }
  });

  onCleanup(() => {

  });

  const [size, setSize] = createSignal<Size|undefined>({width: 500, height: 450});

  return <Dialog modal moveable escape closebox resizeable {...props} bindsize={[size, setSize]}>
    <header>CMAT</header>
    <section class={style['container-section']}>
      <div class={style['outer-container']}>
        <div class={style['dialog-sheet']} ref={container}></div>
      </div>
    </section>
    <footer>
      <div class={style.buttons}> 
        <button autofocus class="button-primary">...</button>
        <button >...</button>

      </div>
    </footer>
  </Dialog>;

}
