
import { HandleInput, HandleFocusIn, HandleKeyDown, Init, UpdateNodes } from '~/lib/interactive-components';
import { Dialog, Props as DialogProps } from '~/components/dialog-base/dialog';
import { createEffect, on, ParentProps, splitProps } from 'solid-js';
import { SpreadsheetType } from '~/lib/spreadsheet-type';
import type { DependencyList } from 'riskamp-web';

export interface Props extends DialogProps<boolean> {
  clear_primary_selection?: boolean;
  sheet?: SpreadsheetType
  update?: (dependencies: DependencyList) => void;
}

export function InteractiveDialog(props: ParentProps<Props>) {

  let root_node: HTMLDivElement|undefined;

  const [local, base_props] = splitProps(props, ['children', 'sheet', 'update', 'clear_primary_selection']);
  const [open, setOpen] = base_props.bind;

  let initialized = false;
  createEffect(on(open, (value) => {
    if (value) {
      if (root_node) {
        Init(root_node, local.sheet, local.clear_primary_selection, local.update);
        initialized = true;
      }
    }
    else {
      if (initialized) {
        local.sheet?.ExternalEditor(); // flush
        initialized = false;
      }
    }
  }, { defer: true }));

  return <>
      <Dialog {...base_props}>
        <div ref={root_node} 
              oninput={e => HandleInput(e, root_node as HTMLElement, local.sheet, local.update)} 
              onfocusin={HandleFocusIn} 
              onkeydown={e => HandleKeyDown(e, root_node as HTMLElement)} 
              class="display-contents">

          {local.children}

        </div>
      </Dialog>
  </>;

}
