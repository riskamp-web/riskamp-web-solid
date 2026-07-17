
import { Accessor, createSignal, onCleanup, onMount } from 'solid-js';
import { CommandPalette } from '~/components/command-palette/command-palette';
import { Dialog, type Props as DialogProps } from '~/components/dialogs/dialog-base/dialog';
import { SpreadsheetType } from '~/lib/spreadsheet-type';
import { UA } from '~/lib/UA';


interface Props extends Omit<DialogProps<boolean>, 'open'|'setOpen'> {
  sheet: Accessor<SpreadsheetType|undefined>;
}

export function CommandPaletteDialog(props: Props) {

  const [open, setOpen] = createSignal<boolean>(false);

  function Activate(event: KeyboardEvent) {
    const mac = UA().is_mac;
    if (event.key === '.' && ((mac && event.metaKey) || (!mac && event.ctrlKey))) {
      setOpen(true);
    };
  }

  const HandleCommand = () => {

  };

  onMount(() => {
    window.addEventListener('keydown', Activate);
  });

  onCleanup(() => {
    window.removeEventListener('keydown', Activate);
  });

  return <>
    <Dialog {...props} open={open} setOpen={setOpen} escape modal>
      <CommandPalette sheet={props.sheet} dialog oncommand={HandleCommand}/>
    </Dialog>
  </>;
}
