
import { Accessor, createEffect, createMemo, createSignal, For, Match, on, onCleanup, onMount, Show, Switch } from 'solid-js';
import { SpreadsheetType } from '~/lib/spreadsheet-type';
import { type ToolbarCommand, type ToolbarCommandKey } from '../toolbar/toolbar-commands';
import style from './command-palette.module.css';
import { t } from '~/i18n/i18n';
import { UA } from '~/lib/UA';
import fuzzysort from 'fuzzysort';
import { commands, type PaletteCommand } from './command-list';
import type { Parameter, TextParameter } from './support-functions';
import { ResolveThemeColor, IsHTMLColor, IsThemeColor, ThemeColorIndex } from '@trebco/treb/treb-base-types';

import { ListControl, type ListRef } from './list-control';

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

export function CommandPalette(props: Props) {

  // eslint-disable-next-line no-unassigned-vars
  let popover: HTMLDivElement|undefined;

  // eslint-disable-next-line no-unassigned-vars
  let input: HTMLDivElement|undefined;

  // eslint-disable-next-line no-unassigned-vars
  let container: HTMLDivElement|undefined;

  const [open, setOpen] = createSignal(false);
  const ua = UA();

  let list_ref: ListRef|undefined;

  /////////////

  /** not a signal */
  let active_command: PaletteCommand | undefined;

  /** this is a signal */
  const [activeParameter, setActiveParameter] = createSignal<Parameter|undefined>();

  function TryParseNumber(text: string) {

    const parsed = {value: 0, error: false};

    const sheet = props.sheet();
    if (sheet) {

      const value = sheet.ParseNumber(text);

      if (typeof value === 'number') {
        parsed.value = value;
        parsed.error = false;
        return parsed;
      }

    }
    else {
      parsed.error = true;
    }

    return parsed;

  }

  /**
   * FIXME: i18n
   */
  function TryParseBoolean(text: string, default_value = false) {

    const parsed = {value: default_value, error: false};
    text = text.trim();

    if (!text) {
      return parsed;
    }

    if (/^(?:true|t|yes)$/i.test(text)) {
      parsed.value = true;
    }
    else if (/^(?:false|f|no)$/i.test(text)) {
      parsed.value = false;
    }
    else {
      parsed.error = true;
    }

    return parsed;
  }

  function NextParameter(command: PaletteCommand, sheet: SpreadsheetType, current?: Parameter, override?: string) {

    if (!command.parameters) {
      ExecCommand(command, sheet);
      return;
    }

    if (current) {

      const value = typeof override === 'string' ? override : input?.textContent || '';

      // capture value

      switch (current.type) {
        case 'text':
          current.value = value;
          break;

        case 'number':
          {
            const parsed = TryParseNumber(value);
            if (parsed.error) {
              console.info("INVALID");
              return; // ?
            }
            current.value = parsed.value;
          }
          break;

        case 'boolean':
          {
            const parsed = TryParseBoolean(value);
            if (parsed.error) {
              // ...
              console.info("INVALID");
              return; // ?
            }
            current.value = parsed.value;
          }
          break;

        case 'color':
          current.value = {
            type: 'text',
            text: value,
          };
          break;

        default:
          console.warn("UNHANDLED TYPE (x1)", current.type);
          break;
      }
      
      // advance to next parameter

      for (let i = 0; i < command.parameters.length; i++) {
        if (command.parameters[i] === current) {
          current = command.parameters[i + 1];
          if (!current) {
            ExecCommand(command, sheet);
            return; // done
          }
          else {
            break;
          }
        }
      }
      
    }
    else {
      active_command = command;

      if (command.init) {
        command.init(CreateContext(command, sheet));
      }
      if (input) {
        input.textContent = '';
      }

      current = command.parameters[0];
    }

    setActiveParameter(current);
    let prepopulate = '';

    if (current.type === 'text') {
      prepopulate = current.value || '';
    }
    else if (current.type === 'color') {
      if (IsThemeColor(current.value)) {
        prepopulate = `theme ${current.value.theme} ${current.value.tint}`;
      }
      else if (IsHTMLColor(current.value)) {
        prepopulate = current.value.text;
      }
    }
    else {
      // ...
    }

    if (input) {
      input.textContent = prepopulate;
    }
    requestAnimationFrame(() => SelectText());

  }

  function ExecCommand(command: PaletteCommand, sheet: SpreadsheetType) {

    active_command = undefined;
    setActiveParameter();

    if (command.fn) {
      command.fn(CreateContext(command, sheet));
    }
    
    requestAnimationFrame(() => sheet.Focus());
  }

  function SelectCommand(event: Event|undefined, command: PaletteCommand, sheet: SpreadsheetType) {
    // console.info("Select command");
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    NextParameter(command, sheet);
  }

  /////////////

  function Focus(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === '.') {
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

  function ListDelta(delta: number) {
    if (list_ref) {
      list_ref.delta(delta);

      // if we're in a list of choices for a 
      // parameter, copy the text and select it

      const parameter = activeParameter();
      if (parameter) {
        const index = list_ref.index();
        const choice = parameter.choices?.[index];
        if (choice) {
          if (input) {
            input.textContent = typeof choice === 'string' ? choice : choice.value;
            requestAnimationFrame(SelectText);
          }
        }
      }

    }
  }

  function HandleKeyDown(event: KeyboardEvent) {

    let delta = 0;

    switch (event.key) {
      case 'Enter':
        {
          const sheet = props.sheet();
          const active_parameter = activeParameter();
          if (sheet) {

            event.stopPropagation();
            event.preventDefault();

            if (active_command && active_parameter) {
              NextParameter(active_command, sheet, active_parameter);
              return;
            }

            const command = results()[selectedIndex()];
            if (command) {
              SelectCommand(event, command, sheet);
            }

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
        setActiveParameter();
        active_command = undefined;
        props.sheet()?.Focus();
        break;

      default: 
        return;
    }

    if (delta) {
      ListDelta(delta);
    }

    event.stopPropagation();
    event.preventDefault();

  }

  const [query, setQuery] = createSignal('');
  let last_query = '';

  function HandleInput(event: Event) {
    if (event.target instanceof HTMLElement) {
      if (!activeParameter()) {
        last_query = (event.target.textContent || '').trim();
        setQuery(last_query);
      }
    }
  }

  const [results, setResults] = createSignal<PaletteCommand[]>([]);

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
      setSelectedIndex(-1);
    }
  }));

  function SelectText() {
    if (input) {
      const range = document.createRange();
      range.selectNodeContents(input);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  function FocusIn(_: Event) {

    if (open()) {
      return;
    }

    setOpen(true);
    if (input) {
      input.textContent = last_query;
    }
    requestAnimationFrame(() => SelectText());
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
    setActiveParameter();
    active_command = undefined;

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

  const [placeholder, setPlaceholder] = createSignal(
    t('command-palette-ui.command-palette.label') + ` - ${command_or_control} +  .`
  );

  const [selectedIndex, setSelectedIndex] = createSignal(0);

  function ClickParameter(event: Event, choice: string | { label: string, value: string }, index: number) {
    const sheet = props.sheet();
    const active_parameter = activeParameter();
    if (sheet && active_parameter && active_command) {

      event.stopPropagation();
      event.preventDefault();

      NextParameter(active_command, sheet, active_parameter, typeof choice === 'string' ? choice : choice.value);

    }
  }

  function HandleClick(event: Event, result: PaletteCommand) {
    const sheet = props.sheet();
    if (sheet) {
      SelectCommand(event, result, sheet);
    }
  }

  function ParameterInput(local: {parameter: Parameter}) {

    return <>
            <Show when={local.parameter.label}>
              <div class={style.label}>
                {local.parameter.label || ''}
              </div>
            </Show>
            <Switch>
              <Match when={local.parameter.choices}>
                <ListControl list={() => local.parameter.choices||[]} 
                            onclick={ClickParameter}
                            ref={ref => list_ref = ref}
                            label={item => typeof item === 'string' ? item : item.label} />
              </Match>
              <Match when={local.parameter.type === 'color'}>
                ...
              </Match>
              <Match when={true}>
                ...
              </Match>
            </Switch>
          </>;

  }

  return <>
      <div class={style.container}
          ref={container}
          style={`anchor-name: --${container_id}`}
          onfocusin={FocusIn}
          onfocusout={FocusOut}
          onkeydown={HandleKeyDown}
          id={container_id} >

        <div contenteditable
             class={style['palette-editor']}
             ref={input}
             onkeydown={HandleKeyDown}
             oninput={HandleInput}
             data-prompt={activeParameter() ? '...' : '>'}
             data-placeholder={placeholder()}
          />

        <div class={style.menu} 
            ref={popover}
            popover="manual" 
            id={popover_id} 
            tabindex={-1}
            data-anchor={`--${container_id}`} style={inline_style}>

          <Switch>
            <Match when={activeParameter()}>
              <ParameterInput parameter={activeParameter() as Parameter} />
            </Match>
            <Match when={true}>
              <ListControl selectedIndex={selectedIndex}
                           setSelectedIndex={setSelectedIndex}
                           onclick={HandleClick}
                           list={results} 
                           ref={ref => list_ref = ref}
                           label={result => result.label} />
            </Match>
          </Switch>

        </div>
      </div>

    </>;

}
