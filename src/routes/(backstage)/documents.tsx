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
import { A, useNavigate } from '@solidjs/router';

import { useLayoutContext } from '~/components/layout-context';
import { format, t, type StringKey } from '~/i18n/i18n';

import { requireAuth } from '~/backstage/dev-access';

import { IconName, icons } from '~/components/icon-sets';

import bs from './backstage.module.css';
import style from './documents.module.css';
import shared from '../../style/shared.module.css';

import {
  ACCESS_PRIVATE, ACCESS_PUBLIC, BackstageDocument, DocumentScope, NOW, RECENT_WINDOW, SortDirection, SortKey,
  displayName, documentUrl, documents, failed, flattenFolders, folderOf,
  folderTree, formatAbsolute, formatCount, formatNumber, formatRelative, formatStamp, historyOf,
  isUnnamed, loadDocuments, loadHistory, loaded, ownerOf, refreshDocuments, retryHistory,
  savedView, saveView, setDocuments, sortDocuments, pathOf,
  renameDocument,
} from '~/backstage/documents-data';

import { UpdateDocument } from '~/docs/documents2';
import { SaveAsDialog, SaveAsDocument, SaveAsResult } from '~/components/dialogs/save-as-dialog/save-as-dialog';
import { session } from '~/lib/auth';
import { AwaitSignal } from '~/lib/await-signal';
import { toast } from '~/components/toast/toast-control';

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
const SCOPES: { key: Scope, label: StringKey, icon: () => JSX.Element }[] = [
  { key: 'all', label: 'documents-page.scope.all', icon: () => <Icon name='insert_table' /> },
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
        ontoggle={(event) => setOpen((event as ToggleEvent).newState === 'open')}
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

  const navigate = useNavigate();

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

  /* where the list was scrolled to. part of the saved view for the same reason
     the open panel is: opening a document unmounts the page, and coming back to
     the top of a list you'd scrolled through is a chore. updated from the body's
     onscroll below, throttled -- a raw scroll would write localStorage every
     frame */
  const [scroll, setScroll] = createSignal(saved.scroll);

  /* the open panel is part of the view too: reading a document's history means
     opening versions one at a time, and coming back to a closed panel each time
     makes that a chore. what's *ticked* still isn't saved -- a tick is a thing
     you're about to act on, and restoring one reads as the page having done
     something on its own */
  const [selected, setSelected] = createSignal<number | undefined>();
  const [checked, setChecked] = createSignal<Set<number>>(new Set());
  const [copied, setCopied] = createSignal(false);

  let last_trigger: HTMLElement | undefined;
  /* eslint-disable-next-line no-unassigned-vars -- assigned through ref= below,
     which the rule doesn't count as an assignment */
  let search_input: HTMLInputElement | undefined;
  /* eslint-disable-next-line no-unassigned-vars -- ref, same as search_input */
  let table_body: HTMLDivElement | undefined;

  // no-op if another visit already filled the store; loaded() drives the skeleton
  onMount(() => { loadDocuments(); });

  /* the saved view names the open document by path, but the panel keys off the
     row id -- and on a cold load there are no rows to resolve it against yet.
     so re-open when they arrive, and only once: without the latch, closing the
     panel would re-run this and re-open it.

     a saved path can outlive the document, the same way a saved folder can. no
     match means nothing to open, and the save effect below clears it. */
  let restored = !saved.open;

  createEffect(() => {
    if (restored || !loaded()) { return; }
    restored = true;
    const open = documents.find(doc => doc.path === saved.open);
    if (open) { setSelected(open.id); }
  });

  /* a memo, not a plain read: it's derived from the store, so every star or
     access change would otherwise re-run the save effect below. same path in,
     same string out, and nothing downstream hears about it */
  const openPath = createMemo(() => {
    const id = selected();
    return id === undefined ? undefined : documents.find(doc => doc.id === id)?.path;
  });

  /* one effect for all seven, so saving is a single write and no handler has to
     remember to do it. it also runs on mount, writing back what it just read */
  createEffect(() => saveView({
    scope: scope(),
    folder: folder(),
    search: search(),
    sort: sortKey(),
    direction: sortDirection(),
    scroll: scroll(),
    open: openPath(),
  }));

  /* the body scrolls under a fixed header, so the offset to keep is its
     scrollTop. throttled to one read per frame-ish window: scroll fires many
     times a second and every distinct value re-runs the save effect above */
  let scroll_timer: number | undefined;
  const onScroll = () => {
    if (scroll_timer !== undefined) { return; }
    scroll_timer = window.setTimeout(() => {
      scroll_timer = undefined;
      setScroll(table_body?.scrollTop ?? 0);
    }, 150);
  };
  onCleanup(() => { if (scroll_timer !== undefined) { window.clearTimeout(scroll_timer); } });

  /* ---- derived ---- */

  const folders = createMemo(() => flattenFolders(folderTree(documents as BackstageDocument[])));

  /* the consolidated display label for each folder, keyed by its lowercased slug
     path -- so a document's folder renders with the same (first-seen) casing the
     rail shows, not whatever casing that one document's own name happens to carry */
  const folderLabels = createMemo(() => new Map(folders().map(node => [node.path, node.name])));

  /* a document's folder as the tree displays it: the canonical pretty segment for
     each ancestor, joined, leading slash. falls back to the raw segment if a label
     is somehow missing. '' for a document at the owner's root */
  const folderLabel = (doc: BackstageDocument): string => {
    const labels = folderLabels();
    let key = '';
    return folderOf(doc.path).split('/').filter(Boolean)
      .map(segment => { key += '/' + segment.toLowerCase(); return labels.get(key) ?? segment; })
      .join('/');
  };

  /* a saved folder can outlive the folder itself -- folders are derived from
     paths, so the last document leaving one deletes it. a rail selection that
     matches nothing draws an empty list with no visible cause, so drop it once
     the rows are in and it turns out not to be there */
  createEffect(() => {
    const path = folder();
    if (!loaded() || !path) { return; }
    // matched case-insensitively -- folders consolidate that way, so a saved
    // selection with different casing still names a real one -- and snapped to
    // the node's canonical (lowercased) path so the rail active-state matches
    const match = folders().find(node => node.path.toLowerCase() === path.toLowerCase());
    if (!match) { setFolder(undefined); }
    else if (match.path !== path) { setFolder(match.path); }
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
      // folders resolve case-insensitively; the selection is the node's
      // lowercased path, so fold the document's folder to match
      const folder = active_folder.toLowerCase();
      list = list.filter(doc => {
        const own = folderOf(doc.path).toLowerCase();
        return own === folder || own.startsWith(folder + '/');
      });
    }

    return sortDocuments(list, sortKey(), sortDirection());

  });

  /* restore the saved offset once the rows are in -- there's nothing to scroll
     against before then. once only, mirroring the open-panel latch above:
     onscroll would otherwise keep re-triggering this. saved.scroll is read
     untracked, so a later save doesn't re-scroll the list */
  let scroll_restored = !saved.scroll;
  createEffect(() => {
    if (scroll_restored || !loaded() || !visible().length) { return; }
    scroll_restored = true;
    if (table_body) { table_body.scrollTop = saved.scroll; }
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

  const toggleStar = (doc: BackstageDocument) => {
    UpdateDocument(pathOf(doc.path), { starred: !doc.starred });
    setDocuments(candidate => candidate.id === doc.id, 'starred', starred => !starred);
  }

  /** a past version's address: the document, with the version as a parameter */
  const versionUrl = (doc: BackstageDocument, version: number) =>
    `${documentUrl(doc)}?version=${version}`;

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

    // NOTE: no toast for this? not even on error? (...)
    // FIXME: we need a bulk op update method
    
    const set = new Set(ids);
    const docs = documents.filter(test => set.has(test.id));
    for (const doc of docs) {
      UpdateDocument(pathOf(doc.path), {
        access: access === ACCESS_PUBLIC ? 'public' : 'private',
      });
    }
    setDocuments(doc => set.has(doc.id), 'access', access);
  };

  const remove = (ids: number[]) => {

    // FIXME: needs back-end, toast
    // FIXME: we need a bulk op update method

    const set = new Set(ids);
    setDocuments(list => list.filter(doc => !set.has(doc.id)));
    if (selected() !== undefined && set.has(selected()!)) { setSelected(undefined); }
    setChecked(previous => {
      const next = new Set(previous);
      ids.forEach(id => next.delete(id));
      return next;
    });
  };

  const rename = async (id: number) => {
    
    // two ways we can do this. either store the id, and 
    // retrieve it in the callback, or have the callback
    // store the result, and look for it here. both options
    // are kind of clunky. let's go with option A for now...

    const sad: SaveAsDocument = {};

    rename_path = '';
    for (const doc of documents) {
      if (doc.id === id) {

        // here we're persisting the folder. not sure if this is
        // useful or not, perhaps we'll find out with some use.

        // eh in practice it doesn't work, it's confusing

        // const name = doc.name;
        // const index = name.lastIndexOf('/');
        // sad.folder = index >= 0 ? name.substring(0, index) : '';
        
        rename_path = doc.path;
        sad.access = doc.access;
        break;
      }
    }
    
    if (rename_path) {
      setSaveAsDocument(sad);
      setSaveAsDialogOpen(true);
    }

  };

  const duplicate = (_id: number) => {
    // TODO: duplicate the document.
  };

  const toggleChecked = (id: number) => setChecked(previous => {
    const next = new Set(previous);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
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

  /* ---- save as dialog ----*/

  const [saveAsDialogOpen, setSaveAsDialogOpen] = createSignal(false);
  const [saveAsDocument, setSaveAsDocument] = createSignal<SaveAsDocument|undefined>();

  // this field will be set when you trigger a rename operation;
  // we can use it in the callback method 

  let rename_path = '';

  async function HandleRename(result: SaveAsResult) {

    if (rename_path) {
      const update_result = await UpdateDocument(pathOf(rename_path), { 
        access: result.access === ACCESS_PRIVATE ? 'private' : 'public',
        name: result.name,
        new_path: pathOf(result.path), 
      }, 1 + Math.random());

      if (update_result) {

        // local rename
        renameDocument(rename_path, result);
       
        // toast
        toast.success(t('documents-page.messages.rename_succeeded'));
        
      }
      else {
        toast.success(t('documents-page.messages.rename_failed'));
      }

    }

  }


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
            [shared['bare-button']]: true,
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
      <MenuItem icon={<Icon name='insert_table' />}>{t('documents-page.action.open')}</MenuItem>
      <MenuItem icon={<Icon name='copy' />} onclick={() => duplicate(props.doc.id)}>{t('documents-page.action.duplicate')}</MenuItem>
      {/* rename and move are one operation here -- editing the path changes both the
          folder and the leaf -- so a single entry covers them */}
      <MenuItem icon={<Icon name='rename' />} onclick={() => rename(props.doc.id)}>{t('documents-page.action.rename')}</MenuItem>
      <hr />
      <MenuItem
          icon={props.doc.access === ACCESS_PUBLIC ? <Icon name='lock_cells' /> : <Icon name='public' />}
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
        <div classList={{[shared['micro-label']]: true, [bs['section-label']]: true}}>{t('documents-page.rail.folders')}</div>
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
              <Icon name='public' /> <span class={bs['button-label']}>{t('documents-page.action.make-public')}</span>
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
                if (value.startsWith('/')) { selectFolder(value); } else { selectScope(value as Scope); }
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

        <div classList={{[shared['micro-label']]: true, [style['table-header']]: true}} role='row'>
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

        <div ref={table_body} class={style['table-body']} role='rowgroup' onscroll={onScroll}>
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
                <Icon name='insert_table' />
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
                        onclick={(event) => { event.stopPropagation(); toggleStar(doc); }}>
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
                      <span classList={{[shared.pill]: true, [style['owner-tag']]: true}}>{ownerOf(doc.path)}</span>
                    }>
                      {folderLabel(doc)}
                    </Show>
                  </div>

                  <div class={`${style.cell} ${style['cell-access']}`} role='cell'>
                    <Show
                        when={doc.access === ACCESS_PUBLIC}
                        fallback={<span classList={{[shared.pill]: true, [style['access-pill']]: true, [style['access-private']]: true}}>
                          {t('documents-page.access.private')}
                        </span>}>
                      <span classList={{[shared.pill]: true, [style['access-pill']]: true, [style['access-public']]: true}}>
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
                {/* the title is the panel's open affordance -- the footer used to
                    carry an Open button, but a linked title is the more obvious one
                    and frees the footer for rename/duplicate/delete */}
                <A
                    href={documentUrl(doc())}
                    title={t('documents-page.panel.open.title')}
                    classList={{ [style['panel-name-link']]: true, [style.unnamed]: isUnnamed(doc()) }}>
                  {displayName(doc())}
                </A>
              </div>

              <div class={style['panel-path']}>
                {/* the path itself, not documentUrl() -- the leading slash it adds
                    reads as noise here; copyLink() below still builds a full url */}
                <span classList={{[shared.truncate]: true, [style['panel-uri']]: true}}>{doc().path}</span>
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
                  <Icon name='public' /> {t('documents-page.access.public')}
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
                    onclick={() => toggleStar(doc())}>
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
              <div class={bs['panel-heading']}>
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
                        classList={{[shared['bare-button']]: true, [style['version-retry']]: true}}
                        onclick={() => retryHistory(doc().path)}>
                      {t('documents-page.history.retry')}
                    </button>
                  </div>
                </Match>

                <Match when={detailHistory()?.status === 'ready' && detailHistory()!.versions}>{(versions) => <>
                  <div class={style['version-list']}>
                    <For each={versions()}>{(version) =>
                      <div class={style['version-row']}>
                        {/* a link rather than the menu's button: opening a past
                            version is the row's obvious action, and a link is
                            the thing you can middle-click or copy the address
                            of. the menu keeps its own entry for discoverability */}
                        <A
                            class={style['version-tag']}
                            href={versionUrl(doc(), version.version)}
                            title={format(t('documents-page.history.open.label'), { version: version.version })}
                            aria-label={format(t('documents-page.history.open.label'), { version: version.version })}>
                          {format(t('documents-page.version.short'), { version: version.version })}
                        </A>
                        <span class={style['version-date']}>{formatStamp(version.modified)}</span>
                        <ActionMenu
                            label={format(t('documents-page.history.menu.label'), { version: version.version })}
                            class={style['version-action']}>
                          <MenuItem onclick={() => navigate(versionUrl(doc(), version.version))}
                                    icon={<Icon name='insert_table' />}>{t('documents-page.history.open.text')}</MenuItem>
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

          {/* open lives on the linked title above. rename keeps its label -- an
              icon-only rename would be as non-obvious as the inline edit it
              replaced -- but now carries the pencil, while duplicate and delete
              compress to icon buttons so the row survives a long translation at
              this fixed panel width. both stay labelled in the row menu, and
              carry title/aria-label here. */}
          <div class={bs['panel-footer']}>
            <button type='button' class={bs.button} onclick={() => rename(doc().id)}>
              <Icon name='rename' />
              <span>{t('documents-page.action.rename')}</span>
            </button>
            <div class={bs.spacer} />
            <button
                type='button'
                class={bs['icon-button']}
                aria-label={t('documents-page.action.duplicate')}
                title={t('documents-page.action.duplicate')}
                onclick={() => duplicate(doc().id)}>
              <Icon name='copy' />
            </button>
            <button
                type='button'
                classList={{ [bs['icon-button']]: true, [style['panel-delete']]: true }}
                aria-label={t('documents-page.action.delete')}
                title={t('documents-page.action.delete')}
                onclick={() => remove([doc().id])}>
              <Icon name='trash' />
            </button>
          </div>

        </>}</Show>
      </aside>

    </div>

    <SaveAsDialog
      dialogTitle='save-as-dialog.rename-title'
      open={saveAsDialogOpen}
      setOpen={setSaveAsDialogOpen}
      owner={() => '@' + (session().username || '')}
      documents={() => documents}
      document={saveAsDocument}
      allowOverwrite={false}
      onSave={HandleRename} />


  </div>;

}
