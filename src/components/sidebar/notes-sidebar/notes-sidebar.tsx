
import style from '../sidebar.module.css';
import { Register } from '../registry';
import { t } from '~/i18n/i18n';
import { createMemo, createSignal, Match, onCleanup, onMount, Switch } from 'solid-js';
import { type SidebarProps } from '../sidebar-main';
import { EmbeddedSheetEvent } from '@trebco/treb';
import { IsArea, IsCellAddress } from '@trebco/treb/treb-base-types';
import { sessionData, setSessionData } from '~/lib/app-data';

// TEMP

import { Format } from 'treb-llm-support';

const group = crypto.randomUUID();

export function NotesSidebar(props: SidebarProps) {

  const [notes, setNotes] = createSignal('');
  const formatted = createMemo(() => Format(notes()));

  // eslint-disable-next-line no-unassigned-vars
  let markdown: HTMLDivElement|undefined;

  // eslint-disable-next-line no-unassigned-vars
  let textarea: HTMLTextAreaElement|undefined;

  onMount(() => {
    const sheet = props.sheet();
    if (sheet) {
      const data = sheet.user_data as { note: string } | undefined;
      setNotes(data?.note || '');
    }

    requestAnimationFrame(() => {
      let scroll = sessionData.notes?.view_scroll || 0;
      if (scroll && markdown) {
        markdown.scrollTop = scroll;
      }
      scroll = sessionData.notes?.edit_scroll || 0;
      if (scroll && textarea) {
        textarea.scrollTop = scroll;
      }
    });

  });

  if (!sessionData.notes) {
    setSessionData({ notes: {
      view_scroll: 0,
      edit_scroll: 0,
      tab: 0,
    }});
  }

  function SaveScrollPosition(event: Event, key: 'view'|'edit') {
    if (event.target instanceof HTMLElement) {
      const top = event.target.scrollTop;
      switch (key) {
        case 'view':
          setSessionData('notes', 'view_scroll', top);
          break;
        case 'edit':
          setSessionData('notes', 'edit_scroll', top);
          break;
      }
    }
  }

  function HandleClick(event: MouseEvent) {
    if (event.target instanceof HTMLAnchorElement) {
      const href = event.target.href || '';
      if (/^ref:\/\//i.test(href)) {

        event.stopPropagation();
        event.preventDefault();

        const sheet = props.sheet();
        if (sheet) {

          let unencoded = decodeURIComponent(href.substring(6));
          const resolved = sheet.Resolve(unencoded);

          if (resolved) {
            sheet.Select(resolved);
            if (IsCellAddress(resolved)) {
              sheet.grid.ActivateSheetID(resolved.sheet_id || 0);
              sheet.ScrollIntoView(resolved, true);
            }
            if (IsArea(resolved)) {
              sheet.grid.ActivateSheetID(resolved.start.sheet_id || 0);
              sheet.ScrollIntoView(resolved.start, true);
            }
          }
          else {
            if (/^'.*'$/.test(unencoded)) {
              unencoded = unencoded.substring(1, unencoded.length -1);
            }
            const target = sheet.grid.model.sheets.Find(unencoded);
            if (target) {
              sheet.grid.ActivateSheetID(target.id);
              sheet.Select();
            }
          }

        }
      }
    }
  }

  function UpdateNotes(event: Event) {
    const sheet = props.sheet();
    if (sheet && event.target instanceof HTMLTextAreaElement) {
      const note = event.target.value || '';
      const user_data = sheet.user_data || {};
      user_data.note = note;
      sheet.user_data = user_data;
      setNotes(note);
    }
  }

  function ShowTab(event: Event, index = 0) {
    event.stopPropagation();
    event.preventDefault();
    setSessionData('notes', 'tab', index);
  }

  const [openNotesChecked, setOpenNotesChecked] = createSignal(true);

  function HandleOpenNotes(event: Event) {
    const sheet = props.sheet();
    if (sheet) {
      if (event.target instanceof HTMLInputElement) {
        const checked = event.target.checked;
        const user_data = sheet.user_data || {};
        user_data.auto_show_notes = checked;
        sheet.user_data = user_data;
      }
    }
  }

  let subscription = 0;

  onMount(() => {

    // on mount, subscribe to spreadsheet events. we want to update
    // the checkbox if the sheet changes (FIXME: what about changing
    // notes as well?)

    const sheet = props.sheet();
    if (sheet) {
      subscription = sheet.Subscribe((event: EmbeddedSheetEvent) => {
        switch(event.type) {
          case 'load':
          case 'reset':
            {
              const user_data = sheet?.user_data || {};
              setOpenNotesChecked(user_data.auto_show_notes !== false);
            }
            break;
        }
      });
    }
    const user_data = sheet?.user_data || {};
    setOpenNotesChecked(user_data.auto_show_notes !== false);
  });

  onCleanup(() => {

    // clean up subscription

    if (subscription) {
      const sheet = props.sheet();
      if (sheet) {
        sheet.Cancel(subscription);
        subscription = 0;
      }
    }
  });

  //
  // FIXME: instead of saving separate scroll positions, might
  // be interesting to try and sync position in the two renderings.
  // probably best approach is to do that via % of height? 
  //

  return <div class={style['notes-layout2']}>
    <div class={style['tab-layout']}>
      <div class={style.tab}>
        <input data-label="View" 
               type="radio" 
               name={group} 
               onclick={e => { if (e.currentTarget.checked) { setSessionData('notes', 'tab', 0)} }}
               checked={sessionData.notes?.tab === 0} />
        <div classList={{ markdown: true, [style['tab-panel']]: true }}
             ref={markdown}
             onclick={HandleClick}
             onscroll={e => SaveScrollPosition(e, 'view')}
             innerHTML={formatted()} />
      </div>
      <div class={style.tab}>
        <input data-label="Edit Markdown" 
               type="radio" 
               name={group} 
               onclick={e => { if (e.currentTarget.checked) { setSessionData('notes', 'tab', 1)} }}
               checked={sessionData.notes?.tab === 1} />
        <textarea classList={{ [style['tab-panel']]: true }} ref={textarea}
                  onchange={e => UpdateNotes(e)}
                  onscroll={e => SaveScrollPosition(e, 'edit')}>{notes()}</textarea>
      </div>

      <div class={style.controls}>
        <div>
          <Switch>
            <Match when={sessionData.notes?.tab === 1}>
              <a href='#' onclick={e => ShowTab(e, 0)}>{t('sidebar.notes-panel.view_formatted')}</a>
            </Match>
            <Match when={true}>
              <a href='#' onclick={e => ShowTab(e, 1)}>{t('sidebar.notes-panel.edit_markdown')}</a>
            </Match>
          </Switch>
        </div>
        <div>
          <label class={style['composite-label']}>
            <input type="checkbox" checked={openNotesChecked()} onclick={HandleOpenNotes}/>
            <span>{t('sidebar.notes-panel.open-notes-with-spreadsheet')}</span>
          </label>
        </div>
      </div>

    </div>
    {/*
    <div class={style.controls}>
      controls {sessionData.notes?.view_scroll}, {sessionData.notes?.edit_scroll}
    </div>
    */}
  </div>;
}

Register('notes', NotesSidebar);

