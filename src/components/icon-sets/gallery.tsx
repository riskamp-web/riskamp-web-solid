
import { createEffect, createMemo, createSignal, For, Show } from 'solid-js';

import style from './gallery.module.css';
import { icon_sets, type IconSetName } from './registry';
import { ICON_GROUPS, ICON_GROUP_LABELS, type IconGroup, type IconName } from './types';

const set_names = Object.keys(icon_sets) as IconSetName[];
const groups = Object.keys(ICON_GROUPS) as IconGroup[];

/**
 * The controls persist. Drawing an icon means edit, save, reload, look -- and
 * losing the set and the filter on every reload means re-finding the one glyph
 * you're working on, every time.
 */
const STORAGE_KEY = 'icon-gallery';

function load(): { set_name: IconSetName, filter: string } {

  const fallback = { set_name: set_names[0], filter: '' };

  try {
    const text = localStorage.getItem(STORAGE_KEY);
    if (text) {
      const json = JSON.parse(text);

      // a set can be renamed or dropped from the registry while a stale name
      // sits in storage; that would paint an empty grid, so check it.
      return {
        set_name: set_names.includes(json.set_name) ? json.set_name : fallback.set_name,
        filter: typeof json.filter === 'string' ? json.filter : fallback.filter,
      };
    }
  }
  catch {
    console.error('parse failed');
  }

  return fallback;

}

function save(set_name: IconSetName, filter: string) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ set_name, filter }));
}

/**
 * Dev page: paints every icon in a set, grouped and labeled.
 *
 * The point is to judge a candidate set in one screen instead of hunting
 * through toolbar tabs, menus and dialogs for glyphs that only appear in
 * transient UI.
 */
export default function IconGallery() {

  const stored = load();

  const [set_name, setSetName] = createSignal<IconSetName>(stored.set_name);
  const [filter, setFilter] = createSignal(stored.filter);

  createEffect(() => save(set_name(), filter()));

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
