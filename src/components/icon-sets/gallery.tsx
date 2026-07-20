
import { createMemo, createSignal, For, Show } from 'solid-js';

import style from './gallery.module.css';
import { icon_sets, type IconSetName } from './registry';
import { ICON_GROUPS, ICON_GROUP_LABELS, type IconGroup, type IconName } from './types';

const set_names = Object.keys(icon_sets) as IconSetName[];
const groups = Object.keys(ICON_GROUPS) as IconGroup[];

/**
 * Dev page: paints every icon in a set, grouped and labeled.
 *
 * The point is to judge a candidate set in one screen instead of hunting
 * through toolbar tabs, menus and dialogs for glyphs that only appear in
 * transient UI.
 */
export default function IconGallery() {

  const [set_name, setSetName] = createSignal<IconSetName>(set_names[0]);
  const [filter, setFilter] = createSignal('');

  const icons = createMemo(() => icon_sets[set_name()] as Record<IconName, string>);

  /** group -> names matching the filter */
  const matches = createMemo(() => {
    const text = filter().trim().toLowerCase();
    return groups.map(group => ({
      group,
      names: (ICON_GROUPS[group] as readonly IconName[])
        .filter(name => !text || name.toLowerCase().includes(text)),
    })).filter(entry => entry.names.length > 0);
  });

  const total = createMemo(() => matches().reduce((n, entry) => n + entry.names.length, 0));

  return (
    <div class={style.gallery}>

      <header class={style.header}>
        <h1>Icons</h1>

        <label class={style.field}>
          <span>Set</span>
          <select value={set_name()}
                  onchange={e => setSetName(e.currentTarget.value as IconSetName)}>
            <For each={set_names}>{name => <option value={name}>{name}</option>}</For>
          </select>
        </label>

        <label class={style.field}>
          <span>Filter</span>
          <input type="search"
                 placeholder="name contains..."
                 value={filter()}
                 oninput={e => setFilter(e.currentTarget.value)} />
        </label>

        <div class={style.count}>
          {total()} icon{total() === 1 ? '' : 's'}
        </div>
      </header>

      <Show when={total() > 0} fallback={<p class={style.empty}>No icons match that filter.</p>}>
        <For each={matches()}>{({ group, names }) =>
          <section class={style.group}>
            <h2>
              {ICON_GROUP_LABELS[group]}
              <span class={style.groupcount}>{names.length}</span>
            </h2>
            <div class={style.grid}>
              <For each={names}>{name =>
                <div class={style.cell} title={name}>
                  <div class={style.icon} innerHTML={icons()[name] || ''} />
                  <div class={style.name}>{name}</div>
                </div>
              }</For>
            </div>
          </section>
        }</For>
      </Show>

    </div>
  );
}
