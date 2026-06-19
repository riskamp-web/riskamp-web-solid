
import { Accessor, createEffect, createMemo, createSignal, For, on, onCleanup, onMount } from 'solid-js';
import { SpreadsheetType } from '~/lib/spreadsheet-type';
import { type ToolbarCommand, type ToolbarCommandKey } from '../toolbar/toolbar-commands';
import style from './command-palette.module.css';
import { t } from '~/i18n/i18n';
import { UA } from '~/lib/UA';
import fuzzysort from 'fuzzysort';
import { commands, type PaletteCommand } from './command-list';

export interface Props {
  sheet: Accessor<SpreadsheetType|undefined>;
  oncommand: (command: ToolbarCommand & { key: ToolbarCommandKey}) => void|Promise<void>;
}

function CreateContext(command: PaletteCommand, sheet: SpreadsheetType) {

  // handle split, use active (focused) pane

  let target = sheet;
  if ((target as any).focus_target !== target) {
    target = (target as any).focus_target;
  }

  return { 
    sheet: target, 
    // options, 
    parameters: command.parameters, 
    // dispatcher, 
    selection_state: target.selection_state,
    document_styles: target.document_styles,
  };
};

function SelectCommand(event: Event|undefined, command: PaletteCommand, sheet: SpreadsheetType) {

  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  if (command.fn) {
    command.fn(CreateContext(command, sheet));
  }

  sheet.Focus();

}

export function CommandPalette(props: Props) {

  let popover: HTMLDivElement|undefined;
  let input: HTMLDivElement|undefined;
  let container: HTMLDivElement|undefined;

  const [open, setOpen] = createSignal(false);
  const ua = UA();

  function Focus(event: KeyboardEvent) {
    if (event.key === '.') {
      input?.focus();
    };
  }

  const popover_id = crypto.randomUUID();
  const container_id = crypto.randomUUID();

  //
  // style is inlined so it will work with the polyfill (required for firefox)
  // Q: is that still true in 2026? FIXME: check
  //
  const inline_style = [
    `min-width: anchor-size(--${container_id});`,
    `position-anchor: --${container_id};`,
    `top: anchor(--${container_id} bottom);`,
    `left: anchor(--${container_id} left);`,
  ].join(' ');

  onMount(() => {
    window.addEventListener('keydown', Focus);
  });

  onCleanup(() => {
    window.removeEventListener('keydown', Focus);
  });

  function HandleKeyDown(event: KeyboardEvent) {

    let delta = 0;

    switch (event.key) {
      case 'Enter':
        {
          const command = results()[selectedIndex()];
          const sheet = props.sheet();
          if (command && sheet) {
            SelectCommand(event, command, sheet);
          }
        }
        break;

      case 'ArrowDown':
        delta = 1;
        break;

      case 'ArrowUp':
        delta = -1;
        break;

      case 'Escape':
        props.sheet()?.Focus();
        break;

      default: 
        return;
    }

    const count = resultsCount();
    if (delta && count) {
      let target = selectedIndex() + delta;

      /* don't roll
      if (target < 0) {
        target = count - 1;
      }
      else if (target >= count) {
        target = 0;
      }
      */

      target = Math.max(0, Math.min(target, resultsCount() - 1));

      setSelectedIndex(target);
      requestAnimationFrame(() => {
        const element = node_list[target];
        if (element) {
          element.scrollIntoView({
            inline: 'nearest',
            block: 'nearest',
            // behavior: 'smooth',
          })
        }
        else {
          console.info("No?")
        }
      });
    }

    event.stopPropagation();
    event.preventDefault();

  }

  const [query, setQuery] = createSignal('');
  let last_query = '';

  function HandleInput(event: Event) {
    if (event.target instanceof HTMLElement) {
      last_query = (event.target.textContent || '').trim();
      setQuery(last_query);
    }
  }

  const [results, setResults] = createSignal<PaletteCommand[]>([]);
  const resultsCount = createMemo(() => results().length);

  let node_list: HTMLElement[] = [];

  createEffect(on(query, query => {
    if (query) {
      const fs_results = fuzzysort.go(query, commands, {
        all: false,
        keys: ['label', 'alt'],
        threshold: .35,
      });
      setResults(fs_results.map(result => result.obj));
      setSelectedIndex(0);
    }
    else {
      setResults([]);
      node_list = [];
      setSelectedIndex(-1);
    }
  }));

  function FocusIn(_: Event) {
    setOpen(true);
    if (input) {
      input.textContent = last_query;
    }
    requestAnimationFrame(() => {
      if (input) {
        const range = document.createRange();
        range.selectNodeContents(input);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    });
    setQuery(last_query);
  }

  function FocusOut(event: FocusEvent) {

    if (event.relatedTarget instanceof HTMLElement && container?.contains(event.relatedTarget)) {
      return;
    }

    if (!event.relatedTarget) {
      //
    }

    setOpen(false);
    if (input) {
      input.textContent = '';
    }
    
  }

  createEffect(on(open, open => {
    if (open) {
      popover?.showPopover();
    }
    else {
      popover?.hidePopover();
    }
  }));

  const command_or_control = ua.is_mac ? 'Cmd' : 'Ctrl';

  const [prompt, setPrompt] = createSignal('>');
  const [placeholder, setPlaceholder] = createSignal(
    t('command-palette-ui.command-palette.label') + ` - ${command_or_control} +  .`
  );

  const [selectedIndex, setSelectedIndex] = createSignal(0);

  return <>
      <div class={style.container}
          ref={container}
          style={`anchor-name: --${container_id}`}
          onfocusin={FocusIn}
          onfocusout={FocusOut}
          onkeydown={HandleKeyDown}
          id={container_id} >

        <div contenteditable
             ref={input}
             onkeydown={HandleKeyDown}
             oninput={HandleInput}
             data-prompt={prompt()}
             data-placeholder={placeholder()}
          />

        <div class={style.menu} 
            ref={popover}
            popover="manual" 
            id={popover_id} 
            tabindex={0}
            data-anchor={`--${container_id}`} style={inline_style}>
          <div>
            {/* 
            <div>{t('command-palette-ui.start-typing')}</div>
            */}
            <menu class={style.results}>
              <For each={results()}>{(result, index) => 
                <li onmouseenter={() => setSelectedIndex(index())}
                    ref={element => node_list[index()] = element}
                    classList={{
                  [style.selected]: selectedIndex() === index(),
                }}>{result.label}</li>  
              }</For>
            </menu>
          </div>
        </div>
      </div>

    </>;

}
