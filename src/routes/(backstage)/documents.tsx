/**
 * documents -- backstage redesign, first pass.
 *
 * UI/UX only: canned data, nothing wired to the document service. star, access
 * and delete write to the store in documents-data.ts so the states are
 * demonstrable; rename / move / duplicate are inert placeholders.
 *
 * i18n: extracted. every string on this page is a 'documents-page.*' key in
 * ~/i18n/lang/en.ts, including the aria-labels and the sr-only text. values are
 * spliced in with format(), never concatenated, so a translation can move them
 * -- see the comment on that block in en.ts. dates, counts, sort order and
 * plural forms follow currentLocale() through intl() in documents-data.ts.
 */

import { For, JSX, Match, ParentProps, Show, Switch, createEffect, createMemo, createSignal, onCleanup, onMount } from 'solid-js';
import { A } from '@solidjs/router';

import { useLayoutContext } from '~/components/layout-context';
import { format, t, type I18N } from '~/i18n/i18n';

import { requireAuth } from '~/backstage/dev-access';

import { IconName, icons } from '~/components/icon-sets';

import bs from './backstage.module.css';
import style from './documents.module.css';

/* the app set has no public/private pair and no plain document glyph, so those
   two stay local for now; everything else on this page comes from ~/components/
   icon-sets. see backstage-icons.tsx */
import { Globe, Sheet } from './backstage-icons';

import {
  ACCESS_PRIVATE, ACCESS_PUBLIC, BackstageDocument, DocumentScope, NOW, RECENT_WINDOW, SortDirection, SortKey,
  displayName, documentUrl, documents, failed, flattenFolders, folderOf,
  folderTree, formatAbsolute, formatCount, formatNumber, formatRelative, formatStamp, historyOf,
  isUnnamed, loadDocuments, loadHistory, loaded, ownerOf, refreshDocuments, retryHistory,
  savedView, saveView, setDocuments, sortDocuments,
} from '~/backstage/documents-data';

/* the union lives next to the data: the saved view stores a scope, so
   ~/lib/app-data has to be able to type one */
type Scope = DocumentScope;

/**
 * the app icon set ships svg markup as strings, so an icon is an element with
 * the markup inside it rather than a component. the svg is sized in css, in
 * .icon -- the set draws at 20px and the box is fixed there, so a glyph that
 * arrives at another size can't shift a row.
 */
function Icon(props: { name: IconName, class?: string }) {
  return <span class={`${bs.icon} ${props.class || ''}`} innerHTML={icons[props.name]} />;
}

/** starred is optional on the row -- absent means not starred */
const isStarred = (doc: BackstageDocument) => !!doc.starred;

/* public is the default access level, so the useful scope is the exception: the
   handful of documents that aren't shared.

   the labels are *keys*, resolved at each render site rather than here: t()
   reads a store, and calling it out here -- at module scope, outside any
   tracking scope -- would snapshot english into the array for the life of the
   page. this is the trap command-list.ts fell into. */
const SCOPES: { key: Scope, label: keyof I18N, icon: () => JSX.Element }[] = [
  { key: 'all', label: 'documents-page.scope.all', icon: () => <Sheet /> },
  { key: 'starred', label: 'documents-page.scope.starred', icon: () => <Icon name='star' /> },
  { key: 'recent', label: 'documents-page.scope.recent', icon: () => <Icon name='recent' /> },
  { key: 'private', label: 'documents-page.scope.private', icon: () => <Icon name='lock_cells' /> },
];

/* ------------------------------------------------------------------ */
/* menu                                                                */
/* ------------------------------------------------------------------ */

/** module counter rather than randomUUID, so SSR and client agree on ids */
let menu_uid = 0;

/**
 * popover menu anchored to its trigger, aligned to the trigger's right edge.
 * same mechanism as ~/components/drop-menu (popover + css anchor positioning),
 * but with an icon trigger and right alignment.
 */
function ActionMenu(props: ParentProps<{ label: string, class?: string, trigger?: JSX.Element }>) {

  const uid = `bs-menu-${++menu_uid}`;
  const anchor = `--${uid}`;
  const [open, setOpen] = createSignal(false);

  // inline so the anchor names stay unique per instance
  const menu_style = [
    `position-anchor: ${anchor}`,
    `position-try-fallbacks: flip-block`,
    `top: anchor(${anchor} bottom)`,
    `right: anchor(${anchor} right)`,
    'left: auto',
    'bottom: auto',
    'margin: 4px 0 0 0',
  ].join('; ');

  return <>
    <button
        type='button'
        class={`${bs['icon-button']} ${props.class || ''}`}
        style={`anchor-name: ${anchor}`}
        popovertarget={uid}
        aria-label={props.label}
        aria-expanded={open()}
        onclick={(event) => event.stopPropagation()}>
      {props.trigger ?? <Icon name='overflow' />}
    </button>

    <div
        popover
        id={uid}
        class={bs.menu}
        style={menu_style}
        ontoggle={(event: any) => setOpen(event.newState === 'open')}
        onclick={(event) => {
          event.stopPropagation();
          // close on any item activation
          if ((event.target as HTMLElement).closest('button')) {
            (event.currentTarget as HTMLElement & { hidePopover: () => void }).hidePopover();
          }
        }}>
      <menu>
        {props.children}
      </menu>
    </div>
  </>;

}

function MenuItem(props: ParentProps<{ icon?: JSX.Element, danger?: boolean, onclick?: () => void }>) {
  return <li>
    <button
        type='button'
        classList={{ [bs['menu-item']]: true, [bs.danger]: !!props.danger }}
        onclick={() => props.onclick?.()}>
      {props.icon ?? <span class={bs['menu-icon-placeholder']} />}
      <span>{props.children}</span>
    </button>
  </li>;
}

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

export default function Documents() {

  const { setTitle, setUserPanel } = useLayoutContext();
  setTitle('documents-page.title');
  setUserPanel(true);

  onCleanup(() => {
    setTitle(undefined);
    setUserPanel(false);
  });

  // the layout redirects to /sign-in without a session; see (backstage).tsx.
  // in dev, /documents?dev opens the page without one -- see dev-access.ts
  requireAuth('signed-in');

  /* the list you narrowed to is the list you should come back to, so these four
     start from the saved view rather than from nothing -- read once, here, so
     the signals are the page's own state from then on. see savedView() */
  const saved = savedView();

  const [scope, setScope] = createSignal<Scope>(saved.scope);
  const [folder, setFolder] = createSignal<string | undefined>(saved.folder);
  const [search, setSearch] = createSignal(saved.search);
  const [sortKey, setSortKey] = createSignal<SortKey>(saved.sort);
  const [sortDirection, setSortDirection] = createSignal<SortDirection>(saved.direction);

  /* what's open and what's ticked are deliberately *not* saved: they're about
     the thing you're doing, not the list you're looking at, and coming back to a
     stale selection reads as the page having done something on its own */
  const [selected, setSelected] = createSignal<number | undefined>();
  const [checked, setChecked] = createSignal<Set<number>>(new Set());
  const [copied, setCopied] = createSignal(false);

  let last_trigger: HTMLElement | undefined;
  let search_input: HTMLInputElement | undefined;

  // no-op if another visit already filled the store; loaded() drives the skeleton
  onMount(() => { loadDocuments(); });

  /* one effect for all five, so saving is a single write and no handler has to
     remember to do it. it also runs on mount, writing back what it just read */
  createEffect(() => saveView({
    scope: scope(),
    folder: folder(),
    search: search(),
    sort: sortKey(),
    direction: sortDirection(),
  }));

  /* ---- derived ---- */

  const folders = createMemo(() => flattenFolders(folderTree(documents as BackstageDocument[])));

  /* a saved folder can outlive the folder itself -- folders are derived from
     paths, so the last document leaving one deletes it. a rail selection that
     matches nothing draws an empty list with no visible cause, so drop it once
     the rows are in and it turns out not to be there */
  createEffect(() => {
    const path = folder();
    if (!loaded() || !path) { return; }
    if (!folders().some(node => node.path === path)) { setFolder(undefined); }
  });

  const counts = createMemo(() => ({
    all: documents.length,
    starred: documents.filter(doc => doc.starred).length,
    recent: documents.filter(doc => NOW - doc.modified < RECENT_WINDOW).length,
    private: documents.filter(doc => doc.access === ACCESS_PRIVATE).length,
  }));

  const visible = createMemo(() => {

    const query = search().trim().toLowerCase();
    const active_scope = scope();
    const active_folder = folder();

    let list = documents as BackstageDocument[];

    switch (active_scope) {
      case 'starred':
        list = list.filter(doc => doc.starred);
        break;
      case 'recent':
        list = list.filter(doc => NOW - doc.modified < RECENT_WINDOW);
        break;
      case 'private':
        list = list.filter(doc => doc.access === ACCESS_PRIVATE);
        break;
    }

    if (query) {
      // search flattens: it looks past the selected folder, on the theory that
      // if you're typing a name you don't want to be told it's somewhere else
      list = list.filter(doc => (displayName(doc) + ' ' + doc.path).toLowerCase().includes(query));
    }
    else if (active_folder) {
      const folder = active_folder;
      list = list.filter(doc => {
        const own = folderOf(doc.path);
        return own === folder || own.startsWith(folder + '/');
      });
    }

    return sortDocuments(list, sortKey(), sortDirection());

  });

  /** the panel keeps showing the last document while it slides out */
  const detail = createMemo<BackstageDocument | undefined>((previous) => {
    const id = selected();
    if (id === undefined) { return previous; }
    return documents.find(doc => doc.id === id);
  });

  /* history isn't part of the list query, so opening the panel is what asks for
     it. loadHistory() is idempotent, so reopening the same document costs
     nothing and the effect can stay this blunt. */
  createEffect(() => {
    const doc = detail();
    if (doc && selected() !== undefined) { loadHistory(doc.path); }
  });

  /** the open document's history, or undefined before anything has asked */
  const detailHistory = createMemo(() => {
    const doc = detail();
    return doc ? historyOf(doc.path) : undefined;
  });

  const checkedCount = () => checked().size;

  /* ---- actions ---- */

  const openDetail = (doc: BackstageDocument, trigger?: HTMLElement) => {
    last_trigger = trigger;
    setSelected(doc.id);
  };

  const closeDetail = () => {
    setSelected(undefined);
    last_trigger?.focus();
    last_trigger = undefined;
  };

  const toggleStar = (id: number) => setDocuments(doc => doc.id === id, 'starred', starred => !starred);

  const copyLink = async () => {
    const doc = detail();
    if (!doc) { return; }
    const link = new URL(documentUrl(doc), location.origin).href;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
    catch {
      // clipboard can be blocked (insecure context, denied permission); the
      // link is still visible in the panel, so fail quietly
    }
  };

  const setAccess = (ids: number[], access: number) => {
    const set = new Set(ids);
    setDocuments(doc => set.has(doc.id), 'access', access);
  };

  const remove = (ids: number[]) => {
    const set = new Set(ids);
    setDocuments(list => list.filter(doc => !set.has(doc.id)));
    if (selected() !== undefined && set.has(selected()!)) { setSelected(undefined); }
    setChecked(previous => {
      const next = new Set(previous);
      ids.forEach(id => next.delete(id));
      return next;
    });
  };

  const toggleChecked = (id: number) => setChecked(previous => {
    const next = new Set(previous);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const toggleAll = () => setChecked(previous => {
    const rows = visible();
    return previous.size >= rows.length ? new Set<number>() : new Set(rows.map(doc => doc.id));
  });

  const sortBy = (key: SortKey) => {
    if (sortKey() === key) {
      setSortDirection(direction => direction === 'asc' ? 'desc' : 'asc');
    }
    else {
      setSortKey(key);
      // dates read newest-first by default, text reads a-z
      setSortDirection(key === 'modified' ? 'desc' : 'asc');
    }
  };

  const selectScope = (next: Scope) => {
    setScope(next);
    setFolder(undefined);
  };

  const selectFolder = (path: string) => {
    setScope('all');
    setFolder(current => current === path ? undefined : path);
  };

  /* ---- keyboard ---- */

  onMount(() => {
    const onkeydown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') { return; }
      if (search()) {
        setSearch('');
        search_input?.focus();
      }
      else if (selected() !== undefined) {
        closeDetail();
      }
      else if (checkedCount()) {
        setChecked(new Set<number>());
      }
    };
    window.addEventListener('keydown', onkeydown);
    onCleanup(() => window.removeEventListener('keydown', onkeydown));
  });

  /* ---- fragments ---- */

  const SortHeader = (props: { column: SortKey, label: string, class?: string }) =>
    <div class={`${style.cell} ${props.class || ''}`} role='columnheader' aria-sort={
      sortKey() === props.column ? (sortDirection() === 'asc' ? 'ascending' : 'descending') : 'none'
    }>
      <button
          type='button'
          classList={{
            [style['sort-button']]: true,
            [style.sorted]: sortKey() === props.column,
            [style.ascending]: sortKey() === props.column && sortDirection() === 'asc',
          }}
          onclick={() => sortBy(props.column)}>
        <span>{props.label}</span>
        <Icon name='caret_down' class={style['sort-caret']} />
      </button>
    </div>;

  const RowMenu = (props: { doc: BackstageDocument }) =>
    <ActionMenu
        label={format(t('documents-page.row.menu.label'), { name: displayName(props.doc) })}
        class={style['row-menu-button']}>
      <MenuItem icon={<Sheet />}>{t('documents-page.action.open')}</MenuItem>
      <MenuItem icon={<Icon name='copy' />}>{t('documents-page.action.duplicate')}</MenuItem>
      <MenuItem>{t('documents-page.action.rename')}</MenuItem>
      <MenuItem icon={<Icon name='folder' />}>{t('documents-page.action.move')}</MenuItem>
      <hr />
      <MenuItem
          icon={props.doc.access === ACCESS_PUBLIC ? <Icon name='lock_cells' /> : <Globe />}
          onclick={() => setAccess([props.doc.id], props.doc.access === ACCESS_PUBLIC ? ACCESS_PRIVATE : ACCESS_PUBLIC)}>
        {props.doc.access === ACCESS_PUBLIC
          ? t('documents-page.action.make-private')
          : t('documents-page.action.make-public')}
      </MenuItem>
      <MenuItem icon={<Icon name='recent' />} onclick={() => openDetail(props.doc)}>
        {t('documents-page.action.version-history')}
      </MenuItem>
      <hr />
      <MenuItem icon={<Icon name='trash' />} danger onclick={() => remove([props.doc.id])}>
        {t('documents-page.action.delete')}
      </MenuItem>
    </ActionMenu>;

  /* ---- render ---- */

  return <div class={bs.page}>

    <nav class={bs.rail} aria-label={t('documents-page.rail.label')}>

      <div class={bs['rail-section']}>
        <For each={SCOPES}>{(item) =>
          <button
              type='button'
              classList={{ [bs['rail-item']]: true, [bs.active]: scope() === item.key && !folder() }}
              aria-current={scope() === item.key && !folder() ? 'true' : undefined}
              onclick={() => selectScope(item.key)}>
            {item.icon()}
            <span class={bs['rail-label']}>{t(item.label)}</span>
            <span class={bs['rail-count']}>{formatNumber(counts()[item.key])}</span>
          </button>
        }</For>
      </div>

      <div class={bs['rail-section']}>
        <div class={bs['section-label']}>{t('documents-page.rail.folders')}</div>
        <Show when={folders().length} fallback={
          <div class={bs['rail-item']} style='cursor: default'>
            <span class={bs['rail-label']}>{t('documents-page.rail.no-folders')}</span>
          </div>
        }>
          <For each={folders()}>{(node) =>
            <button
                type='button'
                classList={{ [bs['rail-item']]: true, [bs.active]: folder() === node.path }}
                aria-current={folder() === node.path ? 'true' : undefined}
                style={`padding-left: ${8 + node.depth * 13}px`}
                onclick={() => selectFolder(node.path)}>
              <Icon name='folder' />
              <span class={bs['rail-label']}>{node.name}</span>
              <span class={bs['rail-count']}>{formatNumber(node.count)}</span>
            </button>
          }</For>
        </Show>
      </div>

    </nav>

    <div class={bs.content}>

      <header class={bs['content-header']}>
        <Show when={!checkedCount()} fallback={
          <div class={style['selection-bar']}>
            <span class={style['selection-count']}>
              {format(t('documents-page.selection.count'), { count: formatNumber(checkedCount()) })}
            </span>
            <div class={style['selection-divider']} />
            <button type='button' class={`${bs.button} ${bs['button-quiet']} ${bs['button-collapse']}`}
                aria-label={t('documents-page.selection.make-public.label')}
                onclick={() => setAccess([...checked()], ACCESS_PUBLIC)}>
              <Globe /> <span class={bs['button-label']}>{t('documents-page.action.make-public')}</span>
            </button>
            <button type='button' class={`${bs.button} ${bs['button-quiet']} ${bs['button-collapse']}`}
                aria-label={t('documents-page.selection.make-private.label')}
                onclick={() => setAccess([...checked()], ACCESS_PRIVATE)}>
              <Icon name='lock_cells' /> <span class={bs['button-label']}>{t('documents-page.action.make-private')}</span>
            </button>
            <button type='button' class={`${bs.button} ${bs['button-danger']} ${bs['button-collapse']}`}
                aria-label={t('documents-page.selection.delete.label')}
                onclick={() => remove([...checked()])}>
              <Icon name='trash' /> <span class={bs['button-label']}>{t('documents-page.action.delete')}</span>
            </button>
            <div class={bs.spacer} />
            <button type='button' class={`${bs.button} ${bs['button-quiet']}`} onclick={() => setChecked(new Set<number>())}>
              {t('documents-page.action.cancel')}
            </button>
          </div>
        }>
          <div class={bs['search-field']}>
            <Icon name='find' class={bs['search-icon']} />
            <input
                ref={search_input}
                type='search'
                class={bs['search-input']}
                placeholder={t('documents-page.search.placeholder')}
                aria-label={t('documents-page.search.label')}
                value={search()}
                oninput={(event) => setSearch(event.currentTarget.value)} />
            <Show when={search()}>
              <button
                  type='button'
                  class={`${bs['icon-button']} ${bs['search-clear']}`}
                  aria-label={t('documents-page.search.clear.label')}
                  onclick={() => { setSearch(''); search_input?.focus(); }}>
                <Icon name='close' />
              </button>
            </Show>
          </div>

          <select
              class={bs['scope-select']}
              aria-label={t('documents-page.filter.label')}
              value={folder() ?? scope()}
              onchange={(event) => {
                const value = event.currentTarget.value;
                value.startsWith('/') ? selectFolder(value) : selectScope(value as Scope);
              }}>
            <For each={SCOPES}>{(item) => <option value={item.key}>{t(item.label)}</option>}</For>
            <For each={folders()}>{(node) =>
              <option value={node.path}>{' '.repeat(node.depth * 2)}{node.name}</option>
            }</For>
          </select>

          <div class={bs.spacer} />

          <button type='button' class={`${bs.button} ${bs['button-primary']} ${bs['button-collapse']}`}
              aria-label={t('documents-page.action.new-document')}>
            <Icon name='new_spreadsheet' /> <span class={bs['button-label']}>{t('documents-page.action.new-document')}</span>
          </button>
        </Show>
      </header>

      <div classList={{ [style.table]: true, [style.selecting]: !!checkedCount() }} role='table'
          aria-label={t('documents-page.table.label')}>

        <div class={style['table-header']} role='row'>
          <div class={`${style.cell} ${style['cell-center']}`} role='columnheader'>
            <input
                type='checkbox'
                class={`${style.check} ${style['check-all']}`}
                aria-label={t('documents-page.table.select-all.label')}
                checked={!!visible().length && checkedCount() >= visible().length}
                onchange={toggleAll} />
          </div>
          <div class={`${style.cell} ${style['cell-center']}`} role='columnheader'>
            <span class='sr-only'>{t('documents-page.column.starred')}</span>
          </div>
          <SortHeader column='name' label={t('documents-page.column.name')} class={style['cell-name']} />
          <SortHeader column='path' label={t('documents-page.column.folder')} class={style['cell-path']} />
          <SortHeader column='access' label={t('documents-page.column.access')} class={style['cell-access']} />
          <SortHeader column='version' label={t('documents-page.column.version')} class={style['cell-version']} />
          <SortHeader column='modified' label={t('documents-page.column.modified')} class={style['cell-modified']} />
          <div class={style.cell} role='columnheader'><span class='sr-only'>{t('documents-page.column.actions')}</span></div>
        </div>

        <div class={style['table-body']} role='rowgroup'>
          <Switch>

            {/* before the skeleton: a failed load leaves the store unloaded, and
                the skeleton would otherwise run forever */}
            <Match when={failed()}>
              <div class={`${style['body-full']} ${bs['empty-state']}`} role='alert'>
                <Icon name='warning' />
                <div class={bs['empty-title']}>{t('documents-page.error.title')}</div>
                <div class={bs['empty-detail']}>
                  {t('documents-page.error.detail')}
                </div>
                <button
                    type='button'
                    class={`${bs.button} ${bs['empty-action']}`}
                    onclick={() => refreshDocuments()}>
                  {t('documents-page.error.retry')}
                </button>
              </div>
            </Match>

            <Match when={!loaded()}>
              <For each={Array.from({ length: 8 }, (_, index) => index)}>{(index) =>
                <div class={style['skeleton-row']} aria-hidden='true'>
                  <div />
                  <div />
                  <div class={`${bs.skeleton} ${style['skeleton-bar']}`} style={`width: ${52 + ((index * 37) % 46)}%`} />
                  <div class={`${bs.skeleton} ${style['skeleton-bar']} ${style['cell-path']}`} style='width: 45%' />
                  <div class={`${bs.skeleton} ${style['skeleton-bar']} ${style['cell-access']}`} style='width: 60%' />
                  <div class={`${bs.skeleton} ${style['skeleton-bar']} ${style['cell-version']}`} style='width: 50%' />
                  <div class={`${bs.skeleton} ${style['skeleton-bar']}`} style='width: 66%' />
                  <div />
                </div>
              }</For>
            </Match>

            <Match when={!documents.length}>
              <div class={`${style['body-full']} ${bs['empty-state']}`}>
                <Sheet />
                <div class={bs['empty-title']}>{t('documents-page.empty.title')}</div>
                <div class={bs['empty-detail']}>
                  {t('documents-page.empty.detail')}
                </div>
                <button type='button' class={`${bs.button} ${bs['button-primary']} ${bs['empty-action']}`}>
                  <Icon name='new_spreadsheet' /> {t('documents-page.action.new-document')}
                </button>
              </div>
            </Match>

            <Match when={!visible().length && search()}>
              <div class={`${style['body-full']} ${bs['empty-state']}`}>
                <Icon name='find' />
                <div class={bs['empty-title']}>
                  {format(t('documents-page.no-match.title'), { query: search() })}
                </div>
                <div class={bs['empty-detail']}>{t('documents-page.no-match.detail')}</div>
                <button type='button' class={`${bs.button} ${bs['empty-action']}`} onclick={() => setSearch('')}>
                  {t('documents-page.no-match.action')}
                </button>
              </div>
            </Match>

            <Match when={!visible().length}>
              <div class={`${style['body-full']} ${bs['empty-state']}`}>
                <Icon name='folder' />
                <div class={bs['empty-title']}>{t('documents-page.empty-filter.title')}</div>
                <div class={bs['empty-detail']}>
                  {folder()
                    ? format(t('documents-page.empty-filter.detail-folder'), { folder: folder()! })
                    : t('documents-page.empty-filter.detail')}
                </div>
                <button type='button' class={`${bs.button} ${bs['empty-action']}`} onclick={() => selectScope('all')}>
                  {t('documents-page.empty-filter.action')}
                </button>
              </div>
            </Match>

            <Match when={visible().length}>
              <For each={visible()}>{(doc) =>
                <div
                    classList={{ [style['table-row']]: true, [style.selected]: selected() === doc.id }}
                    role='row'
                    onclick={(event) => openDetail(doc, event.currentTarget as HTMLElement)}>

                  <div class={`${style.cell} ${style['cell-center']}`} role='cell'>
                    <input
                        type='checkbox'
                        class={style.check}
                        aria-label={format(t('documents-page.row.select.label'), { name: displayName(doc) })}
                        checked={checked().has(doc.id)}
                        onclick={(event) => event.stopPropagation()}
                        onchange={() => toggleChecked(doc.id)} />
                  </div>

                  <div class={`${style.cell} ${style['cell-center']}`} role='cell'>
                    <button
                        type='button'
                        classList={{ [bs['icon-button']]: true, [style.star]: true, [style.starred]: isStarred(doc) }}
                        aria-label={format(
                          t(isStarred(doc) ? 'documents-page.row.unstar.label' : 'documents-page.row.star.label'),
                          { name: displayName(doc) })}
                        aria-pressed={isStarred(doc)}
                        onclick={(event) => { event.stopPropagation(); toggleStar(doc.id); }}>
                      <Icon name='star' />
                    </button>
                  </div>

                  <div class={`${style.cell} ${style['cell-name']}`} role='cell'>
                    <A
                        href={documentUrl(doc)}
                        classList={{ [style.unnamed]: isUnnamed(doc) }}
                        title={isUnnamed(doc) ? t('documents-page.row.unnamed.title') : undefined}
                        onclick={(event) => event.stopPropagation()}>
                      {displayName(doc)}
                    </A>
                  </div>

                  <div class={`${style.cell} ${style['cell-path']}`} role='cell'>
                    <Show when={folderOf(doc.path)} fallback={
                      <span class={style['owner-tag']}>{ownerOf(doc.path)}</span>
                    }>
                      {folderOf(doc.path)}
                    </Show>
                  </div>

                  <div class={`${style.cell} ${style['cell-access']}`} role='cell'>
                    <Show
                        when={doc.access === ACCESS_PUBLIC}
                        fallback={<span class={`${style['access-pill']} ${style['access-private']}`}>
                          {t('documents-page.access.private')}
                        </span>}>
                      <span class={`${style['access-pill']} ${style['access-public']}`}>
                        {t('documents-page.access.public')}
                      </span>
                    </Show>
                  </div>

                  {/* the version *number*, which the list query returns -- not a
                      count of the history, which would need a fetch per row */}
                  <div class={`${style.cell} ${style['cell-version']}`} role='cell'>
                    {format(t('documents-page.version.short'), { version: doc.version })}
                  </div>

                  <div class={`${style.cell} ${style['cell-modified']}`} role='cell' title={formatAbsolute(doc.modified)}>
                    {formatRelative(doc.modified)}
                  </div>

                  <div class={`${style.cell} ${style['cell-center']}`} role='cell'>
                    <RowMenu doc={doc} />
                  </div>

                </div>
              }</For>
            </Match>

          </Switch>
        </div>

      </div>

      <footer class={bs['content-footer']}>
        <Show when={loaded()}>
          <span>
            {/* which form the count takes is the locale's call, not english's
                -- formatCount() asks Intl.PluralRules. see documents-data.ts */}
            {visible().length === documents.length
              ? formatCount(documents.length,
                'documents-page.footer.count.one', 'documents-page.footer.count.other')
              : format(t('documents-page.footer.filtered'),
                { count: formatNumber(visible().length), total: formatNumber(documents.length) })}
          </span>
          <Show when={search() && folder()}>
            {/* the dot is a separator, not a word -- it stays out of the string */}
            <span>· {t('documents-page.footer.searching-all')}</span>
          </Show>
        </Show>
      </footer>

      {/* detail panel; stays mounted so it can slide out with its content intact */}
      <aside
          classList={{ [bs['slide-over']]: true, [bs.open]: selected() !== undefined }}
          aria-label={t('documents-page.panel.label')}
          aria-hidden={selected() === undefined}>
        <Show when={detail()}>{(doc) => <>

          <div class={bs['panel-header']}>
            <div class={style['panel-title']}>

              <div class={style['panel-name']}>
                <Show when={doc().starred}>
                  <Icon name='star' class={`${style.star} ${style.starred}`} />
                </Show>
                <span classList={{ [style.unnamed]: isUnnamed(doc()) }}>
                  {displayName(doc())}
                </span>
              </div>

              <div class={style['panel-path']}>
                <span class={style['panel-uri']}>{documentUrl(doc())}</span>
                <button
                    type='button'
                    class={`${bs['icon-button']} ${style['copy-link']}`}
                    aria-label={copied()
                      ? t('documents-page.panel.copy-link.copied.label')
                      : t('documents-page.panel.copy-link.label')}
                    title={copied()
                      ? t('documents-page.panel.copy-link.copied.title')
                      : t('documents-page.panel.copy-link.label')}
                    onclick={copyLink}>
                  <Show when={copied()} fallback={<Icon name='copy' />}>
                    <Icon name='copy_confirmed' class={style['copy-confirmed']} />
                  </Show>
                </button>
              </div>

              {/* legacy documents have only a slug, so the title above is just
                  the address repeated -- say so rather than let it look like a
                  badly-cased name */}
              <Show when={isUnnamed(doc())}>
                <div class={style['unnamed-hint']}>
                  {t('documents-page.panel.unnamed-hint')}
                </div>
              </Show>

            </div>
            <button type='button' class={bs['icon-button']}
                aria-label={t('documents-page.panel.close.label')} onclick={closeDetail}>
              <Icon name='close' />
            </button>
          </div>

          <div class={bs['panel-body']}>

            <div class={bs['field-row']}>
              <span class={bs['field-label']}>{t('documents-page.panel.field.access')}</span>
              <div class={bs.segmented}>
                <button
                    type='button'
                    classList={{ [bs.active]: doc().access === ACCESS_PUBLIC }}
                    onclick={() => setAccess([doc().id], ACCESS_PUBLIC)}>
                  <Globe /> {t('documents-page.access.public')}
                </button>
                <button
                    type='button'
                    classList={{ [bs.active]: doc().access === ACCESS_PRIVATE }}
                    onclick={() => setAccess([doc().id], ACCESS_PRIVATE)}>
                  <Icon name='lock_cells' /> {t('documents-page.access.private')}
                </button>
              </div>
            </div>

            <div class={bs['field-row']}>
              <span class={bs['field-label']}>{t('documents-page.panel.field.starred')}</span>
              <div>
                <button
                    type='button'
                    classList={{ [bs['icon-button']]: true, [style.star]: true, [style.starred]: isStarred(doc()) }}
                    aria-pressed={isStarred(doc())}
                    aria-label={t(isStarred(doc())
                      ? 'documents-page.panel.unstar.label'
                      : 'documents-page.panel.star.label')}
                    onclick={() => toggleStar(doc().id)}>
                  <Icon name='star' />
                </button>
              </div>
            </div>

            <div class={bs['field-row']}>
              <span class={bs['field-label']}>{t('documents-page.panel.field.created')}</span>
              <span>{formatAbsolute(doc().created)}</span>
            </div>

            <div class={bs['field-row']}>
              <span class={bs['field-label']}>{t('documents-page.panel.field.modified')}</span>
              <span>{formatRelative(doc().modified)}</span>
            </div>

            {/* the current version, which the list below deliberately doesn't
                carry -- and the Version column is the first thing to drop as the
                table narrows, so the panel is the only place left showing it */}
            <div class={bs['field-row']}>
              <span class={bs['field-label']}>{t('documents-page.panel.field.version')}</span>
              <span>{format(t('documents-page.version.short'), { version: doc().version })}</span>
            </div>

            <div class={style['panel-section']}>
              {/* history is what the current version superseded -- the active
                  one isn't in the list, so the heading says so */}
              <div class={bs['section-label']} style='padding: 0'>
                {t('documents-page.history.title')}
              </div>

              {/* history arrives separately from the row, so this section has
                  its own loading and failed states -- see loadHistory() */}
              <Switch fallback={
                <div class={style['version-loading']} aria-live='polite'>
                  <For each={Array.from({ length: 3 }, (_, index) => index)}>{(index) =>
                    <div class={`${bs.skeleton} ${style['version-skeleton']}`}
                        style={`width: ${76 - (index * 12)}%`} aria-hidden='true' />
                  }</For>
                  <span class='sr-only'>{t('documents-page.history.loading')}</span>
                </div>
              }>

                <Match when={detailHistory()?.status === 'failed'}>
                  <div class={style['version-note']} role='alert'>
                    {t('documents-page.history.error')}
                    <button
                        type='button'
                        class={style['version-retry']}
                        onclick={() => retryHistory(doc().path)}>
                      {t('documents-page.history.retry')}
                    </button>
                  </div>
                </Match>

                <Match when={detailHistory()?.status === 'ready' && detailHistory()!.versions}>{(versions) => <>
                  <div class={style['version-list']}>
                    <For each={versions()}>{(version) =>
                      <div class={style['version-row']}>
                        <span class={style['version-tag']}>
                          {format(t('documents-page.version.short'), { version: version.version })}
                        </span>
                        <span class={style['version-date']}>{formatStamp(version.modified)}</span>
                        <ActionMenu
                            label={format(t('documents-page.history.menu.label'), { version: version.version })}
                            class={style['version-action']}>
                          <MenuItem icon={<Sheet />}>{t('documents-page.history.open')}</MenuItem>
                          <MenuItem icon={<Icon name='copy' />}>{t('documents-page.history.duplicate')}</MenuItem>
                          <MenuItem icon={<Icon name='confirm' />}>{t('documents-page.history.restore')}</MenuItem>
                        </ActionMenu>
                      </div>
                    }</For>
                  </div>

                  <div class={style['version-note']}>
                    <Switch fallback={formatCount(versions().length,
                      'documents-page.history.kept.one', 'documents-page.history.kept.other')}>
                      <Match when={!versions().length}>
                        {t('documents-page.history.none')}
                      </Match>
                    </Switch>
                  </div>
                </>}</Match>

              </Switch>
            </div>

          </div>

          <div class={bs['panel-footer']}>
            <A href={documentUrl(doc())} class={`${bs.button} ${bs['button-primary']}`}>
              {t('documents-page.action.open')}
            </A>
            <button type='button' class={bs.button}>
              <Icon name='copy' /> {t('documents-page.action.duplicate')}
            </button>
            <div class={bs.spacer} />
            <button type='button' class={`${bs.button} ${bs['button-danger']}`} onclick={() => remove([doc().id])}>
              <Icon name='trash' /> {t('documents-page.action.delete')}
            </button>
          </div>

        </>}</Show>
      </aside>

    </div>

  </div>;

}
