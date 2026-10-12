
import style from '../sidebar.module.css';
import { Register } from '../registry';
import { t } from '~/i18n/i18n';
import { produce } from 'solid-js/store';
import { createMemo, createSignal, For, on, onCleanup, onMount, ParentProps, Show } from 'solid-js';

import { type SidebarProps } from '../sidebar-main';
import { EmbeddedSheetEvent } from '@trebco/treb';
import { IsCellAddress, Area } from '@trebco/treb/treb-base-types';
import { icons } from '~/components/icon-sets';
import { InteractiveSidebar } from '../interactive-sidebar';
import { RenderGraph } from './util';
import { MCEmbeddedSheetEvent } from 'riskamp-web';
import { type FitSection, persistentData, setPersistentData } from '~/lib/app-data';

export function Sidebar(props: SidebarProps) {

  // eslint-disable-next-line no-unassigned-vars
  let parameter_element: HTMLDivElement|undefined;
  const initial_value = props.sheet()?.GetSelection(true) || '';
  const [data, setData] = createSignal<number[]>([]);
  // let distribution_select: HTMLSelectElement|undefined;
  const [selectedIndex, setSelectedIndex] = createSignal(0);
  // eslint-disable-next-line no-unassigned-vars
  let chart_container: HTMLDivElement|undefined;

  const number_format = 'General';
  let subscription = 0;

  // the chart takes whatever height the other sections leave, which
  // changes with the window, the sidebar split, and collapsing sections

  const resize_observer = new ResizeObserver(entries => {
    for (const entry of entries) {
      setGraphSize({
        width: Math.floor(entry.contentRect.width),
        height: Math.floor(entry.contentRect.height),
      });
    }
  });

  onMount(() => {
    requestAnimationFrame(() => {
      parameter_element?.focus();
      // RedrawInternal();
    });

    const sheet = props.sheet();
    if (sheet) {
      if (subscription) {
        sheet.Cancel(subscription);
      }
      subscription = sheet.Subscribe((event: EmbeddedSheetEvent|MCEmbeddedSheetEvent) => {
        switch (event.type) {
          case 'simulation-complete':
            TollUpdate();
            break;
        }
      });
    }

    if (chart_container) {
      resize_observer.observe(chart_container);
    }
    requestAnimationFrame(() => TollUpdate());

  });

  onCleanup(() => {
    resize_observer.disconnect();
    const sheet = props.sheet();
    if (sheet && subscription) {
      sheet.Cancel(subscription);
      subscription = 0;
    }
  });


  function KeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      event.preventDefault();
      props.sheet()?.Focus();
    }
  }

  const fitResults = createMemo(() => {
    const _data = data();
    const sheet = props.sheet();
    if (!sheet || _data.length <= 2) {
      return [];
    }
    const fr = sheet.Fit(data(), "Value");
    // console.info({data, fr});
    return fr;
  });

  const results = createMemo(on([fitResults, selectedIndex], () => {
    const index = selectedIndex();
    const results = fitResults()[index];
    return results || undefined;
  }));

  const errorTable = createMemo(() => {
    const error_table: string[][] = [
        [t('fit-data-panel.statistics.mean_square_error')],
        [t('fit-data-panel.statistics.aggregate_error')],
        [t('fit-data-panel.statistics.max_error')],
        [t('fit-data-panel.statistics.mean_error')],
      ];
    const selected = results();
    const sheet = props.sheet();
    if (selected && sheet) {
      error_table[0][1] = sheet?.FormatNumber(selected.error.mean_square, 'General') || '';
      error_table[1][1] = sheet?.FormatNumber(selected.error.aggregate, 'General') || '';
      error_table[2][1] = sheet?.FormatNumber(selected.error.max, 'General') || '';
      error_table[3][1] = sheet?.FormatNumber(selected.error.mean, 'General') || '';
    }
    return error_table;
  });

  const spreadsheetFunction = createMemo(() => {
    const selected = results();
    const sheet = props.sheet();
    if (selected && sheet) {
      const argument_separator = sheet?.parser.argument_separator || ',';

      const params = Object.values(selected.parameters).map(value => {
        return sheet?.FormatNumber(value, number_format) || '';
      }).join(argument_separator + ' ');

      return `=${selected.distribution.replace(/\W+/g, '')}Value(${params})`;

    }
    return '';
  });

  const parametersTable = createMemo(() => {
    const table: string[][] = [];
    const selected = results();
    const sheet = props.sheet();
    if (selected && sheet) {
      for (const [key, value] of Object.entries(selected.parameters)) {
        table.push([
          key, 
          sheet.FormatNumber(value, number_format) || '',
        ]);
      }
    }
    return table;
  });

  const graphData = createMemo(() => {

    let sample_path = '';
    let data_points = '';

    const sample = results();


    if (sample) {

    // console.info("R", result);

    let theoretical_min = 0;
    let theoretical_max = 0;

    let points = data().slice(0);

    let data_max = Math.max(...points);
    let data_min = Math.min(...points);

    switch (sample.distribution) {
      case 'Beta':
        theoretical_min = 0;
        theoretical_max = 1;
        data_min = 0;
        data_max = 1;
        break;

      case 'Normal':
        theoretical_min = -3.5;
        theoretical_max =  3.5;

        data_min = -3.5 * sample.parameters.stdev + sample.parameters.mean;
        data_max =  3.5 * sample.parameters.stdev + sample.parameters.mean;

        break;

      case 'Half-normal':
        data_min = theoretical_min = 0; // atm we're not rendering at all for negative data
        data_max = theoretical_max = Math.max(sample.stats.max, 3.5 * sample.parameters.stdev);

        // console.info("HN", theoretical_min, theoretical_max, result.sample);

        break;

      case 'Log-normal':
        theoretical_min = -3.5;
        theoretical_max =  3.5;
        
        {
          points = points.map(point => Math.log(point));
          // data_max = Math.max(...points);
          // data_min = Math.min(...points);

          // const stats = CalculateStats(points);
          data_min = -3.5 * sample.parameters.stdev + sample.parameters.mean;
          data_max =  3.5 * sample.parameters.stdev + sample.parameters.mean;


        }

        break;

      case 'Uniform':
        theoretical_min = -0.0;
        theoretical_max =  1.0;
        break;

      case 'PERT':
      case 'Triangular':
        theoretical_min = -0.0;
        theoretical_max =  1.0;
        break;

      case 'Weibull':
        data_min = theoretical_min = Math.min(data_min, ...sample.sample);
        data_max = theoretical_max = Math.max(data_max, ...sample.sample);
        break;

    }

    sample_path = RenderGraph(graphSize(),sample.sample, theoretical_min, theoretical_max, 'line');
    data_points = RenderGraph(graphSize(), points, data_min, data_max, 'points');

  }

  return { sample_path, data_points };

});


  /*
  const samplePath = createMemo(() => {
    return '';
  });

  const dataPoints = createMemo(() => {
    return '';
  });
  */

  const [graphSize, setGraphSize] = createSignal({ height: 100, width: 100 });

  function TollUpdate() {

    const text = parameter_element?.textContent || '';
    const sheet = props.sheet();

    setData([]);

    if (text && sheet) {
      const resolved = sheet.Resolve(text);
      if (!resolved) {
        return;
      }
      if (IsCellAddress(resolved)) {
        return;
      }

      let area = new Area(resolved.start, resolved.end);
      const target = sheet.grid.model.sheets.Find(resolved.start.sheet_id || 0);
      if (target) {

        if (area.start.row === Infinity
            || area.start.column === Infinity
            || area.end.row === Infinity
            || area.end.column === Infinity ) {
            // the model's Area comes from TREB's source, ours from its
            // build: the same class under two module paths
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            area = target.RealArea(area as any) as any as Area;
        }

        const values = sheet.Evaluate(sheet.Unresolve(area));
        if (Array.isArray(values)) {

          const temp: number[] = [];

          for (const row of values) {
            for (const element of row) {
              switch (typeof element) {
                case 'number':
                  temp.push(element);
                  break;

                case 'undefined':
                  if (!persistentData.fit_ignore_blanks) {
                    temp.push(0);
                  } 
                  break;
                  
                case 'boolean':
                  if (!persistentData.fit_ignore_boolean) {
                    temp.push(element ? 1 : 0);
                  }
                  break;

                case 'string':
                  if (!persistentData.fit_ignore_strings) {
                    if (element === '') {
                      temp.push(0);
                    }
                    else {
                      temp.push(1);
                    }
                  }
                  break;
              }

            }
          }

          /*
          const temp = values.map(row => {
            return row.map(element => {
              switch (typeof element) {
                case 'undefined':
                  return 0;
                case 'number':
                  return element;
                case 'boolean':
                  return element ? 1 : 0;
                case 'string':
                  if (element === '') {
                    return 0;
                  }
                  return 1;
              }
              return 0;
            });
          });
          setData(temp.flat());
          */

          setData(temp);
        }
      }
    }
  }

  const [copiedData, setCopiedData] = createSignal('');

  async function CopyData(text?: string) {

    if (!text) {
      return;
    }
    
    try {
      await navigator.clipboard.writeText(text);
      setCopiedData(text);
      setTimeout(() => setCopiedData(''), 3000);
    }
    catch (err) {
      setCopiedData('');
      console.error(err);
    }
  }
  
  // the result sections below the chart all collapse, so a short panel
  // can give the chart more room. the copy button works either way.

  function CollapsibleSection(props: ParentProps<{ section: FitSection, title: string, data: string }>) {
    const id = `fit-${props.section}-${crypto.randomUUID()}`;
    const collapsed = () => !!persistentData.fit_collapsed[props.section];
    const copied = () => !!copiedData() && copiedData() === props.data;
    return <div classList={{ section: true, 'flex-column': true, [style.collapsed]: collapsed() }}>
      <h1 class={style['copy-header']}>
        <button class={style['section-toggle']}
                aria-expanded={!collapsed()}
                aria-controls={id}
                onclick={() => setPersistentData(produce(draft => {
                  draft.fit_collapsed[props.section] = !collapsed();
                }))}>
          <span class={style.caret} innerHTML={icons.caret_down} />
          <span>{props.title}</span>
        </button>
        <button disabled={!results()}
                title={
                  copied() ?
                    t('ui-interaction.copy-to-clipboard.copied') :
                    t('ui-interaction.copy-to-clipboard.label')
                  }
                onclick={() => CopyData(props.data)}
                innerHTML={
                  copied() ?
                  icons.copy_confirmed :
                  icons.copy} />
      </h1>
      <Show when={!collapsed()}>
        <div id={id} class="flex-column">{props.children}</div>
      </Show>
    </div>;
  }

  function FormatCopyData(table: string[][]) {
    return table.map(row => row.join('\t')).join('\n');
  }

  return <InteractiveSidebar {...props}>
    <div class={style['fit-data-layout']}>

      <div class="section flex-column">
      <div class="flex-row">
          <div class="reference-editor tc contenteditable-placeholder flex-grow" 
                data-selection-target 
                tabindex="0"
                role="textbox" 
                spellcheck="false"
                contenteditable="true"
                onkeydown={KeyDown}
                data-placeholder={t('fit-data-panel.select-range')}
                oninput={() => TollUpdate()}
                onchange={() => TollUpdate()}
                ref={parameter_element}>{initial_value}</div>
        </div>
    </div>

    <div class="section flex-column">
      <h1>
        <span>{t('fit-data-panel.candidate-distributions.label')}</span>
        <select class="select" onchange={e => setSelectedIndex(Number(e.currentTarget.value) || 0)}>
          <For each={fitResults()}>
            {(result, index) => <option value={index()}>{result.distribution}</option>}
          </For>
        </select>
      </h1>
      <p>
        <span>{t('fit-data-panel.candidate-distributions.description')}</span>
      </p>
    </div>

    <div class={style["graph-container"]} ref={chart_container}>
      <svg xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="none"
          vector-effect="non-scaling-stroke"
          viewBox={`0 0 ${graphSize().width} ${graphSize().height}`}
          class="graph" >
        <Show when={graphData()}>
          <path d={graphData().data_points} class={style['fit-data']}></path>
          <path d={graphData().sample_path} class={style['fit-theoretical']}></path>
        </Show>
      </svg>   
    </div>

    <CollapsibleSection section='function'
                        title={t('fit-data-panel.spreadsheet-function')}
                        data={spreadsheetFunction() || ''}>
      <input type="text" class="input" disabled value={spreadsheetFunction()} />
    </CollapsibleSection>

    <CollapsibleSection section='parameters'
                        title={t('fit-data-panel.distribution-parameters')}
                        data={FormatCopyData(parametersTable())}>
      <div class={style.boxed}>
        <For each={parametersTable()}>
          {row => <div class={style.row}>
              <div>{row[0]}</div>
              <div>{row[1]}</div>
              <div class="flex-grow" />
            </div>}
        </For>
      </div>
    </CollapsibleSection>

    <CollapsibleSection section='error'
                        title={t('fit-data-panel.statistics.error')}
                        data={FormatCopyData(errorTable())}>
      <div class={style.boxed}>
        <For each={errorTable()}>
          {row => <div class={style.row}>
              <div>{row[0]}</div>
              <div>{row[1]}</div>
              <div class="flex-grow" />
            </div>}
        </For>
      </div>
    </CollapsibleSection>

  </div>
  </InteractiveSidebar>;

}

Register('fit-data', Sidebar);

