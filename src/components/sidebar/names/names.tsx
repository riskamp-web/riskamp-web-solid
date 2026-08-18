
import { createMutable, createEffect, onMount, createSignal } from '~/lib/solid-compat';
import { on } from '~/lib/solid-compat';
import style from '../sidebar.module.css';
import { Register } from '../registry';
import { t } from '~/i18n/i18n';

import { createMemo, For, Match, onCleanup, Switch } from 'solid-js';

import FindWorker from './find-worker?worker';
import { type SidebarProps } from '../sidebar-main';
import { EmbeddedSheetEvent, EmbeddedSpreadsheet } from '@trebco/treb';
import { Area, IsArea, IsCellAddress } from '@trebco/treb/treb-base-types';
import { icons } from '~/components/icon-sets';
import { sessionData, setSessionData } from '~/lib/app-data';
import { ExpressionUnit } from '@trebco/treb/treb-parser';
import { MCEmbeddedSheetEvent } from 'riskamp-web';
import { Splitter } from '~/components/splitter/splitter';

interface NamedExpression {
  type: 'expression';
  expression: ExpressionUnit;
}

interface NamedRange {
  type: 'range';
  area: Area;
}

/** @internal */
type Named = (NamedExpression | NamedRange) & {
  name: string;     // canonical name
  scope?: number;   // scope to sheet by ID
};

export function Sidebar(props: SidebarProps) {

  const [names, setNames] = createSignal<Named[]>([]);

  function UpdateNames() {
    const sheet = props.sheet();
    if (sheet) {
      const arr = Array.from(sheet.model.named.list) as Named[];
      setNames(arr);
    }
  }

  let subscription = 0;

  createEffect(on(props.bind[0], open => {
    const sheet = props.sheet();
    if (open === 'names') {
      UpdateNames();
      if (sheet) {
        if (subscription) {
          sheet.Cancel(subscription);
        }
        subscription = sheet.Subscribe((event: EmbeddedSheetEvent|MCEmbeddedSheetEvent) => {
          switch (event.type) {
            case 'load':
            case 'reset':
              UpdateNames();
              break;
          }
        });
      }
    }
    else {
      if (sheet && subscription) {
        sheet.Cancel(subscription);
        subscription = 0;
      }
    }
  }));

  onMount(() => {
    UpdateNames();
  })

  function RenderNamed(named: Named) {
    const sheet = props.sheet();
    if (sheet) {
      switch (named.type) {
        case 'expression':
          return sheet.parser.Render(named.expression);
          break;

        case 'range':
          return sheet.Unresolve(named.area, true, false);
          break;
      }
    }
    return '';
  }

  const [lambdaText, setLambdaText] = createSignal('');

  function Click(event: Event, named: Named) {
    const sheet = props.sheet();
    if (sheet) {
      switch (named.type) {
        case 'range':
          setLambdaText('');
          try {
            sheet.Select(named.area);
          }
          catch (err) {
            console.error(err);
          }
          break;

        case 'expression':
          setLambdaText(sheet.parser.Render(named.expression));
          break;
      }
    }
  }

  function Scope(named: Named) {
    if (!named.scope) {
      return t('names-panel.name-scope.workbook');
    }

    const sheet = props.sheet();
    if (sheet) {
      const target = sheet.model.sheets.Find(named.scope);
      if (target) {
        return target.name;
      }
    }

    return '?';

  }

  function DeleteName(event: Event, named: Named) {
    event.stopPropagation();
    console.info({named});
    const sheet = props.sheet();
    if (sheet) {
      sheet.ClearName(named.name);
      requestAnimationFrame(() => {
        UpdateNames();
        sheet.Focus();
      });
    }
  }

  const [split, setSplit] = createSignal(50);

  return <div class={style['names-layout']}>

    <div classList={{
      "flex-grow": true,
      "grid-table": true,
      [style['names-table']]: true,
       }} >

      <div classList={{
        "grid-table-header": true,
      }}>
        <div></div>
        <div>{t('names-panel.header.name')}</div>
        <div>{t('names-panel.header.name-scope')}</div>
        <div>{t('names-panel.header.value')}</div>
        <div></div>
      </div>

      <div class="grid-table-body">

        <For each={names()}>{named => 
          <div class="grid-table-row" onclick={e => Click(e, named)}>
            <div innerHTML={named.type === 'expression' ? icons.developer : icons.insert_table} />
            <div>
              <button class="text-button" onclick={e => Click(e, named)}>
                {named.name}
              </button>
            </div>
            <div>{Scope(named)}</div>
            <div>{RenderNamed(named)}</div>
            <button classList={{
                'text-button': true,
                [style['delete-button']]: true,
                }} 
              title={t('names-panel.label.delete-name')} 
              onclick={e => DeleteName(e, named)}
              innerHTML={icons.close}/>
          </div>  
        }</For>
      </div>

    </div>

    <div class={style['names-controls']}>
      <button class="control-button">
        <span class="flex-row" innerHTML={icons.developer}></span>
        <span>{t('names-panel.label.edit-name')}</span>
      </button>
      <button class="control-button button-primary">
        <span class="flex-row" innerHTML={icons.plus}></span>
        <span>{t('names-panel.label.define-name')}</span>
      </button>
    </div>

  </div>;
}

Register('names', Sidebar);

