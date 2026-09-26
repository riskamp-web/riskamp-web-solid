
import { ParentProps, Switch, Match, For, Show, createEffect, createSignal, createMemo, onSettled, untrack } from 'solid-js';
import style from './toolbar.module.css';
import shared from '../../style/shared.module.css';
import { Logo } from '../logo';
import { DropMenu } from '~/components/drop-menu/drop-menu';
import { t } from '~/i18n/i18n';

import '~/components/tabs.css';

import { toolbarConfig as toolbar_config, setToolbarConfig, UpdateToolbarConfig } from './toolbar-store';
import { ButtonControl, Control, Icon as ToolbarIcon, TextButtonControl, 
    CompositeMenuControl, MoreControl, ComboBoxControl, SplitButtonControl, ColorButtonControl, SteppedGroup, 
    IsToolbarMessage} from './toolbar-utils';
import { ListCommand, ToolbarCommand } from './toolbar-commands';
import { session, loggedIn } from '~/lib/auth';

import { icons } from '~/components/icon-sets';
import { MenuButton } from '../menu-button/menu-button';
import { SpreadsheetType } from '~/lib/spreadsheet-type';
import { EmbeddedSheetEvent, MCEmbeddedSheetEvent } from 'riskamp-web';
import { ResolveColors, UpdateSaveState, UpdateState } from './util';
import { ColorButton } from './toolbar-color-picker';
import { CompositeMenu } from './composite-menu';
// SOLID2: command palette stage
// import { CommandPalette } from '../command-palette/command-palette';
import { sessionData, setSessionData } from '~/lib/app-data';
// import { CommandPaletteDialog } from '../dialogs/command-palette-dialog/command-palette-dialog';
import { ThemeSelector } from './theme-selector';

//////////////

////////////

interface Props {
  oncommand: (command: ToolbarCommand) => void|Promise<void>;
  sidebar: () => string|undefined;
  sheet: () => SpreadsheetType|undefined;
  document_path: string|undefined;
};

const tab_group_name = crypto.randomUUID();

/*
function Literal(text: string) {
  // const literalHtml = "<p>This is <strong>bold</strong> text.</p>";

  return (
    <div ref={(el) => (el.innerHTML = text)} />
  );
}

function RenderButton(control: ButtonControl) {
  return <>
    <button class={style['toolbar-button']} ref={(el) => (el.innerHTML = control.command.icon || '')} />
  </>;
}


function RenderTextButton(control: TextButtonControl) {
  return <>
    <button class={style['toolbar-button']} >
      <div ref={(el) => (el.innerHTML = control.command.icon || '')} />
      <div>{t(control.command.title)}</div>
    </button>
  </>;
}
*/

export function Toolbar(props: ParentProps<Props>) {

 
  // track the sheet's state into the toolbar (active formats, colors, ...).
  // the subscription is released when the sheet changes or the toolbar goes.
  createEffect(props.sheet, sheet => {
    if (!sheet) {
      return;
    }

    const subscription = sheet.Subscribe((event: MCEmbeddedSheetEvent|EmbeddedSheetEvent) => {
      switch (event.type) {
        case 'theme-change':
        case 'load':
        case 'reset':
        case 'document-change':
          setToolbarConfig(config => { ResolveColors(sheet, config); });
          // fall through

        case 'selection':
        case 'annotation-selection':
        case 'focus-view':
        case 'view-change':
          setToolbarConfig(config => { UpdateState(sheet, config); });
          break;

      }
    });

    // the updaters read the store and t() as they go: snapshots, refreshed on
    // every sheet event, not dependencies of this effect.
    untrack(() => setToolbarConfig(config => {
      ResolveColors(sheet, config);
      UpdateState(sheet, config);
    }));

    return () => sheet.Cancel(subscription);
  });

  const spreadsheet_dirty = createMemo(() => sessionData.document_version !== sessionData.last_saved_version);

  const status_menu = createMemo(() => loggedIn() ? toolbar_config.status_menu_signed_in : toolbar_config.status_menu_signed_out);


  // UpdateSaveState also reads loggedIn(); it has to be tracked here, since
  // the effect function itself is untracked.
  createEffect(() => ({
    sheet: props.sheet(),
    dirty: spreadsheet_dirty(),
    path: !!props.document_path,
    logged_in: loggedIn(),
  }), ({ sheet, dirty, path }) => {
    if (sheet) {
      // loggedIn() is read again inside, but it's already tracked above
      untrack(() => setToolbarConfig(config => { UpdateSaveState(sheet, config, dirty, path, false); }));
    }
  });
  
  function GetInitialWidth() {
    return window.innerWidth;
  }

  const [width, setWidth] = createSignal(GetInitialWidth());

  /**
   * this signal (memo) indicates we're dropping the command 
   * palette from the toolbar, use a dialog instead. 
   * FIXME: tune the threshold...
   */
  const useDialogCommandPalette = createMemo(() => width() < 1200);

  const hideThemeSwitcher = createMemo(() => width() < 1300);

  // const [commandPaletteDialogOpen, setCommandPaletteDialogOpen] = createSignal(false);

  function ResizeHandler() {  
    setWidth(window.innerWidth);
  }

  onSettled(() => {
    window.addEventListener('resize', ResizeHandler);
    return () => window.removeEventListener('resize', ResizeHandler);
  });

  function HandleCommand(event: Event, command: ToolbarCommand) {
    if (event?.target instanceof HTMLElement) {
      CloseContainingPopover(event.target);
    }
    props.oncommand?.(command);
  }

  function CloseContainingPopover(element: Element) {
    let parent = element.parentElement;
    for (;;) {
      if (!parent) { break; }
      if (parent.hasAttribute('popover')) {
        parent.hidePopover();
        break;
      }
      parent = parent.parentElement;
    }
  }

  function HandleMenuItem(event: Event, command: ToolbarCommand) {
    if (event.target instanceof HTMLElement) {
      CloseContainingPopover(event.target);
    }
    props.oncommand?.(command);
  }

  function UpdateNumberFormat(event: Event, command: ToolbarCommand, item?: {value: string, label: string}) {

    if (item) {
      UpdateToolbarConfig(() => {
        command.text = item.label;
        command.value = item.value;
      });
    }
    else if (event.target instanceof HTMLInputElement) {

      /*
      // what's going on here?? //

      const value = 
        NumberFormatCache.SymbolicName(event.target.value || '');
      */

      const value = event.target.value || '';
      UpdateToolbarConfig(() => {
        command.text = command.value = value;
      });
    }

    HandleCommand(event, command);

  }

  function ComboBox(props: {control: ComboBoxControl}) {
    return <div class="flex-row gap-0_5">
        <Show when={props.control.command.icon}>
          <div class="icon" innerHTML={props.control.command.icon}></div>
        </Show>
        <MenuButton>
          <MenuButton.Static>
            <input type="text" 
                   class={["input", props.control.width || '' ].join(' ')} 
                   placeholder={t(props.control.command.title)} 
                   value={props.control.command.text || ''} 
                   onChange={e => UpdateNumberFormat(e, props.control.command)}
                   /> 
          </MenuButton.Static>
          <MenuButton.Menu>
            <menu class={{ [style.text]: true, [style.overflow]: true }}>
              <For each={(props.control.command as ListCommand).values || []}>
                {item => <Switch>
                  <Match when={item === 'separator'}>
                    <hr />
                  </Match>
                  <Match when={true}>
                    <li>
                      <button class={style['menu-item']} 
                          onClick={e => UpdateNumberFormat(e, props.control.command, item as { value: string, label: string })}>
                        {(item as { value: string, label: string }).label}
                      </button>
                    </li>
                  </Match>
                </Switch>}
              </For>
            </menu>
          </MenuButton.Menu>
        </MenuButton>
      </div>;
  }

  function More(props: {control: MoreControl}) {
    return <>
      <MenuButton single_button_style>
        <MenuButton.Static class={style['toolbar-button']}>
          <div class=""
            title={t('toolbar.more-commands-button.label')}
            innerHTML={icons.overflow} />
        </MenuButton.Static>
        <MenuButton.Menu>
          <menu class={style.horizontal}>
            <For each={props.control.controls}>
              {item => <li><RenderButton control={item as ButtonControl}/></li>}
            </For>
          </menu>          
        </MenuButton.Menu>
      </MenuButton>
    </>;
  }



  function RenderButton(props: {control: ButtonControl}) {

    /*
    let [icon, setIcon] = createSignal(props.control.command.icon);
    let [title, setTitle] = createSignal(props.control.command.title);

    // const active = false; // !!props.control.command.value;

    if (props.control.command.type === 'toggle') {
      if (props.control.command.value) {
        setIcon(props.control.command.active?.icon || icon);
        setTitle(props.control.command.active?.title || title);
      }
    }
    */

    function title() {
      let title = props.control.command.title;
      if (props.control.command.type === 'toggle' && props.control.command.value) {
        title = props.control.command.active?.title || title;
      } 
      return title;
    }

    function icon() {
      let icon = props.control.command.icon;
      if (props.control.command.type === 'toggle' && props.control.command.value) {
        icon = props.control.command.active?.icon || icon;
      } 
      return icon;
    }

    // what is this, one match always set? makes no sense. written by
    // a human, no doubt

    return  <Switch>
              <Match when={true}>
                <button class={{ 
                          [style['toolbar-button']]: true,
                          [style.active]: !!props.control.command.value,
                        }} 
                        onClick={e => HandleCommand(e, props.control.command)}
                        title={t(title())}
                        innerHTML={icon() || ''} />
              </Match>
            </Switch>;

  }

  function SplitButton(props: {control: SplitButtonControl, sheet: () => SpreadsheetType|undefined}) {

    // we're formatting the numbers here which implies 
    // we know what this control is; it's not really 
    // generic. this might bite later. we could force it
    // into the config, but that might be overoptimizing.

    // ALSO: we're using localization, and hoping that passing in
    // the dummy text (which is translated) will make this update 
    // on a locale change

    function Reformat(text: string, _dummy: string) {

      // not great reaching around for Localization here. a better
      // option might be to just format a number and read it.

      const mark = (props.sheet()?.Localization as any)?.decimal_separator;
      if (mark === ',') {
        return text.replace(/\./, mark);
      }
      else {
        return text;
      }

    }

    return <div class={style['toolbar-split-button']}>
        <button title={t(props.control.commands[0].title)}
                onClick={e => HandleCommand(e, props.control.commands[0])}>
          {Reformat(props.control.commands[0].text || '', t(props.control.commands[0].title))}
        </button>
        <button title={t(props.control.commands[1].title)}
                onClick={e => HandleCommand(e, props.control.commands[1])}>
          {Reformat(props.control.commands[1].text || '', t(props.control.commands[1].title))}
        </button>
      </div>;
     
  }

  function GroupControls(local: { controls: Control[] }) {
    return <>
      <div class={style.group}>
        <For each={local.controls}>{(item) =>
          <Switch>
            <Match when={item.type === 'composite-menu'}>
              <CompositeMenu item={item as CompositeMenuControl} HandleCommand={HandleCommand}/>
            </Match>
            <Match when={item.type === 'button'}>
              <RenderButton control={item as ButtonControl}/>
            </Match>
            <Match when={item.type === 'text-button'}>
              <button class={{[style['toolbar-button']]: true, [style['text-button']]: true }}
                      onClick={e => HandleCommand(e, (item as TextButtonControl).command)}>
                <span innerHTML={(item as TextButtonControl).command.icon || ''} />
                <span>{t((item as TextButtonControl).command.title)}</span>
              </button>
            </Match>
            <Match when={item.type === 'color-button'}>
              <ColorButton HandleCommand={HandleCommand} control={item as ColorButtonControl} sheet={props.sheet}/>
            </Match>
            <Match when={item.type === 'icon'}>
              <div class={style['toolbar-icon']} innerHTML={(item as ToolbarIcon).icon || ''} />
            </Match>
            <Match when={item.type === 'label'}>
              <div>{`label`}</div>
            </Match>
            <Match when={item.type === 'combo-box'}>
              <ComboBox control={item as ComboBoxControl} />
            </Match>
            <Match when={item.type === 'more'}>
              <More control={item as MoreControl} />
            </Match>
            <Match when={item.type === 'split-button'}>
              <SplitButton sheet={props.sheet} control={item as SplitButtonControl} />
            </Match>
            <Match when={true}>
              <div>{item.type}</div>
            </Match>
          </Switch>
        }</For>
      </div>
    </>;
  }

  function SteppedGroup(local: {steps: SteppedGroup['steps']}) {
    // sort a copy: sorting the config's own (store) array in place would be a
    // write outside the setter.
    const steps = createMemo(() => [...local.steps].sort((a, b) => ((b.step || 0) - (a.step || 0))));
    const group = createMemo(() => {
      const current = width();
      for (const step of steps()) {
        const compare = step.step || 0;
        if (current >= compare) {
          return step.controls || [];
        }
      }
      return [];
    });
    return <GroupControls controls={group()} />;
  }

  return <>
    <div class={{
      [style.toolbar]: true,
      'tab-container': true,
    }}>
        
        <div class={style.logo}>
          <Logo/>
        </div>
        
        <div class={style.menubar}>
          <For each={toolbar_config.menus||[]}>
            {menu => <>
              <DropMenu label={t(menu.label)}>
                <menu>
                  <For each={menu.items || []}>
                    {item => <li>
                      {item === 'separator' ? <hr/> :
                        <button class={style['menu-item']} disabled={item.enabled === false} onClick={event => HandleMenuItem(event, item)}>
                          <Switch>
                            <Match when={item.menuicon && item.icon}>
                              <div class='display-contents' innerHTML={item.icon || ''} />
                            </Match>
                            <Match when={true}>
                              <div class={style['svg-placeholder']}></div>
                            </Match>
                          </Switch>
                          <span>{t(item.title)}</span>
                            <div class={style['right-align']}>
                              <div class={{[style.dot]: true, [style['dot-visible']]: props.sidebar?.() === item.key}}></div>
                            </div>
                        </button>}
                    </li>}
                  </For>
                </menu>
              </DropMenu>
            </>}
          </For>
        </div>

        <div class={style.separator}></div>

          <For each={toolbar_config.tabs}>
            {(tab, index) => <div class="tab-pane">
              <label class={{"tab": true, [style.tab]: true}}>
                <input type="radio" 
                      data-label={t(tab.label)} 
                      name={tab_group_name} 
                      checked={index() === sessionData.active_tab} 
                      onChange={e => { if (e.currentTarget.checked) { setSessionData(s => { s.active_tab = index(); }) }}}
                      />
              </label>
              <div class={{
                  'tab-content': true,
                  [style['tab-content']]: true,
                  }}>
                    
                <For each={tab.groups || []}>
                  {group => 
                    <Switch>
                      <Match when={Array.isArray(group)}>
                        <GroupControls controls={group as Control[]} />
                      </Match>
                      <Match when={true}>
                        <SteppedGroup steps={(group as SteppedGroup).steps} />
                      </Match>
                    </Switch>
                  }
                </For>

                </div>
            </div>}
          </For>


        <div class={style.separator}></div>

        <div class={style['command-palette-container']}>
          {/* SOLID2: command palette stage -- restore the inline palette /
              dialog switch (on useDialogCommandPalette()) */}
          <div data-use-dialog={useDialogCommandPalette()} />
        </div>

        <div class={style['status-pill-container']}>
          {/* 
          <div>
            {sessionData.document_version}/
            {props.sheet()?.state}/
            {sessionData.last_saved_version}
          </div>
          */}

          <DropMenu disabled={!spreadsheet_dirty()} label={
            <div class={{[shared.pill]: true, [style['status-pill']]: true, [style.status_pill_visible]: spreadsheet_dirty()}}>
              <div class="flex-row gap-0_5">
                <span>  
                  {t('status-pill.messages.unsaved-changes')}
                </span>
                <span class={style.caret} innerHTML={icons.caret_down} />
              </div>
            </div>    
          }>

                <menu>
                  <For each={status_menu() || []}>
                    {item => <li>
                      {item === 'separator' ? <hr/> : IsToolbarMessage(item) ? <div class={{
                          [style['menu-message']]: true, 
                         }}>
                        {t(item.text)}</div>
                      :
                        <button class={style['menu-item']} disabled={item.enabled === false} onClick={event => HandleMenuItem(event, item)}>
                          <Switch>
                            <Match when={item.menuicon && item.icon}>
                              <div class='display-contents' innerHTML={item.icon || ''} />
                            </Match>
                            <Match when={true}>
                              <div class={style['svg-placeholder']}></div>
                            </Match>
                          </Switch>
                          <span>{t(item.title)}</span>
                            <div class={style['right-align']}>
                              <div class={{[style.dot]: true, [style['dot-visible']]: props.sidebar?.() === item.key}}></div>
                            </div>
                        </button>}
                    </li>}
                  </For>
                </menu>

          </DropMenu>

        </div>

        <div class={style.login}>
          <Switch>
            <Match when={loggedIn()}>
              <DropMenu label={session().email || ''}>
              <menu>
                <a class={{[style['menu-item']]: true, [style.disabled]: true }} href='/account'>
                  <div class={style['svg-placeholder']}></div>
                  <span>{t('toolbar.menu-commands.account-page')}</span>
                </a>
                <a class={style['menu-item']} href='/documents'>
                  <div class={style['svg-placeholder']}></div>
                  <span>{t('toolbar.menu-commands.documents')}</span>
                </a>

                <hr />
                <a class={style['menu-item']} href='/sign-out'>
                  <div class='display-contents' innerHTML={icons.sign_out}></div>
                  <span>{t('toolbar.menu-commands.sign-out')}</span>
                </a>
              </menu>
            </DropMenu>

            </Match>
            <Match when={true}>
              <a href='/sign-in'>{t('auth.link.sign-in.text')}</a>
            </Match>
          </Switch>
        </div>

        {/* FIXME: dynamic showing/hiding should be done with CSS */}

        <div class={
            hideThemeSwitcher() ? style['hidden-element'] : style.separator
          }></div>

        <div class={style['theme-toggle']}>
          <Show when={!hideThemeSwitcher()}>
            <ThemeSelector sheet={props.sheet} />
          </Show>
        </div>

        {/* 
          <button class={style['toolbar-button']} 
                  title={t(theme_title())}
                  innerHTML={theme_icon()} onclick={CycleTheme}></button>
        </div>
        */}

        <div class={style.separator}></div>

        <div class={style.trailer}>
          <For each={toolbar_config.trailer || []}>
            {item =><>
              <button class={style['toolbar-button']} 
                      disabled={(item as ButtonControl).command.enabled === false}
                      onClick={e => HandleCommand(e, (item as ButtonControl).command)}
                      title={t((item as ButtonControl).command.title)}
                      innerHTML={(item as ButtonControl).command.icon || ''} />          
            </>}
          </For>
        </div>

    </div>
  </>;
};
