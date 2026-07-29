/**
 * documents -- backstage redesign, first pass.
 *
 * UI/UX only: canned data, nothing wired to the document service. star, access
 * and delete write to the store in documents-data.ts so the states are
 * demonstrable; rename / move / duplicate are inert placeholders.
 *
 * i18n: strings are hardcoded english for now. the redesign is contained to
 * src/routes/(backstage), so extracting them into ~/i18n waits until the design
 * settles. ('documents-page.title' is an existing key, so the toolbar title is
 * already localized.)
 */

import { For, JSX, Match, ParentProps, Show, Switch, createMemo, createSignal, onCleanup, onMount } from 'solid-js';
import { A } from '@solidjs/router';

import { useLayoutContext } from '~/components/layout-context';

import { requireAuth } from './dev-access';

import bs from './backstage.module.css';
import style from './documents.module.css';

import { Alert, CaretDown, Check, Clock, Close, Copy, Folder, Globe, Lock, Overflow, Plus, Search, Sheet, Star, Trash } from './backstage-icons';

import {
  ACCESS_PRIVATE, ACCESS_PUBLIC, BackstageDocument, NOW, RECENT_WINDOW, SortDirection, SortKey,
  displayName, documentUrl, documents, failed, findPathCollision, flattenFolders, folderOf,
  folderTree, formatAbsolute, formatRelative, formatStamp, isUnnamed, loadDocuments, loaded,
  pathFor, refreshDocuments, setDocuments, sortDocuments,
} from './documents-data';

type Scope = 'all' | 'starred' | 'recent' | 'private';

/* public is the default access level, so the useful scope is the exception: the
   handful of documents that aren't shared */
const SCOPES: { key: Scope, label: string, icon: (props: { size?: number }) => JSX.Element }[] = [
  { key: 'all', label: 'All documents', icon: Sheet },
  { key: 'starred', label: 'Starred', icon: (props) => <Star {...props} /> },
  { key: 'recent', label: 'Recent', icon: Clock },
  { key: 'private', label: 'Private', icon: Lock },
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
      {props.trigger ?? <Overflow />}
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

  const { setTitle } = useLayoutContext();
  setTitle('documents-page.title');
  onCleanup(() => setTitle(undefined));

  // the layout redirects to /sign-in without a session; see (backstage).tsx.
  // in dev, /documents?dev opens the page without one -- see dev-access.ts
  requireAuth('signed-in');

  const [scope, setScope] = createSignal<Scope>('all');
  const [folder, setFolder] = createSignal<string | undefined>();
  const [search, setSearch] = createSignal('');
  const [sortKey, setSortKey] = createSignal<SortKey>('modified');
  const [sortDirection, setSortDirection] = createSignal<SortDirection>('desc');
  const [selected, setSelected] = createSignal<number | undefined>();
  const [checked, setChecked] = createSignal<Set<number>>(new Set());
  const [renaming, setRenaming] = createSignal(false);
  const [renameDraft, setRenameDraft] = createSignal('');
  const [copied, setCopied] = createSignal(false);

  let last_trigger: HTMLElement | undefined;
  let search_input: HTMLInputElement | undefined;

  // no-op if another visit already filled the store; loaded() drives the skeleton
  onMount(() => { loadDocuments(); });

  /* ---- derived ---- */

  const folders = createMemo(() => flattenFolders(folderTree(documents as BackstageDocument[])));

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

  const checkedCount = () => checked().size;

  /* ---- actions ---- */

  const openDetail = (doc: BackstageDocument, trigger?: HTMLElement) => {
    last_trigger = trigger;
    setSelected(doc.id);
  };

  const closeDetail = () => {
    setRenaming(false);
    setSelected(undefined);
    last_trigger?.focus();
    last_trigger = undefined;
  };

  const toggleStar = (id: number) => setDocuments(doc => doc.id === id, 'starred', starred => !starred);

  /* rename is driven from the detail panel; the row menu just opens the panel
     with the field already in edit mode */
  const startRename = (doc: BackstageDocument) => {
    setSelected(doc.id);
    setRenameDraft(displayName(doc));
    setRenaming(true);
  };

  /** where the current draft would put the document */
  const renameTarget = () => {
    const doc = detail();
    return doc ? pathFor(folderOf(doc.path), renameDraft().trim()) : '';
  };

  /* the slug is the document's identity, so a rename that would collide inside
     the folder is blocked rather than silently disambiguated */
  const renameProblem = createMemo(() => {

    const doc = detail();
    if (!renaming() || !doc) { return undefined; }

    const name = renameDraft().trim();
    if (!name) { return 'Enter a name.'; }

    const target = renameTarget();
    if (target.endsWith('/')) { return 'Name needs at least one letter or number.'; }

    const clash = findPathCollision(documents as BackstageDocument[], target, doc.id);
    return clash
      ? `“${displayName(clash)}” already uses this address.`
      : undefined;

  });

  const commitRename = () => {

    const doc = detail();
    if (renameProblem()) { return; } // stay in edit mode until it resolves

    const name = renameDraft().trim();
    const target = renameTarget();

    // the path is derived, so a rename is also a move -- both fields change,
    // and naming a legacy document is how it stops being unnamed
    if (doc && name && (name !== doc.name || target !== doc.path)) {
      setDocuments(row => row.id === doc.id, row => ({ ...row, name, path: target }));
    }

    setRenaming(false);

  };

  /** blur can't stay in edit mode, so an invalid draft is abandoned */
  const cancelOrCommitRename = () => {
    if (renameProblem()) { setRenaming(false); }
    else { commitRename(); }
  };

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
      if (renaming()) {
        setRenaming(false);
      }
      else if (search()) {
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
        <CaretDown />
      </button>
    </div>;

  const RowMenu = (props: { doc: BackstageDocument }) =>
    <ActionMenu label={`Actions for ${displayName(props.doc)}`} class={style['row-menu-button']}>
      <MenuItem icon={<Sheet />}>Open</MenuItem>
      <MenuItem icon={<Copy />}>Duplicate</MenuItem>
      <MenuItem onclick={() => startRename(props.doc)}>Rename…</MenuItem>
      <MenuItem icon={<Folder />}>Move to…</MenuItem>
      <hr />
      <MenuItem
          icon={props.doc.access === ACCESS_PUBLIC ? <Lock /> : <Globe />}
          onclick={() => setAccess([props.doc.id], props.doc.access === ACCESS_PUBLIC ? ACCESS_PRIVATE : ACCESS_PUBLIC)}>
        {props.doc.access === ACCESS_PUBLIC ? 'Make private' : 'Make public'}
      </MenuItem>
      <MenuItem icon={<Clock />} onclick={() => openDetail(props.doc)}>Version history</MenuItem>
      <hr />
      <MenuItem icon={<Trash />} danger onclick={() => remove([props.doc.id])}>Delete</MenuItem>
    </ActionMenu>;

  /* ---- render ---- */

  return <div class={bs.page}>

    <nav class={bs.rail} aria-label='Document filters'>

      <div class={bs['rail-section']}>
        <For each={SCOPES}>{(item) =>
          <button
              type='button'
              classList={{ [bs['rail-item']]: true, [bs.active]: scope() === item.key && !folder() }}
              aria-current={scope() === item.key && !folder() ? 'true' : undefined}
              onclick={() => selectScope(item.key)}>
            {item.icon({})}
            <span class={bs['rail-label']}>{item.label}</span>
            <span class={bs['rail-count']}>{counts()[item.key]}</span>
          </button>
        }</For>
      </div>

      <div class={bs['rail-section']}>
        <div class={bs['section-label']}>Folders</div>
        <Show when={folders().length} fallback={
          <div class={bs['rail-item']} style='cursor: default'>
            <span class={bs['rail-label']}>No folders</span>
          </div>
        }>
          <For each={folders()}>{(node) =>
            <button
                type='button'
                classList={{ [bs['rail-item']]: true, [bs.active]: folder() === node.path }}
                aria-current={folder() === node.path ? 'true' : undefined}
                style={`padding-left: ${8 + node.depth * 13}px`}
                onclick={() => selectFolder(node.path)}>
              <Folder />
              <span class={bs['rail-label']}>{node.name}</span>
              <span class={bs['rail-count']}>{node.count}</span>
            </button>
          }</For>
        </Show>
      </div>

    </nav>

    <div class={bs.content}>

      <header class={bs['content-header']}>
        <Show when={!checkedCount()} fallback={
          <div class={style['selection-bar']}>
            <span class={style['selection-count']}>{checkedCount()} selected</span>
            <div class={style['selection-divider']} />
            <button type='button' class={`${bs.button} ${bs['button-quiet']} ${bs['button-collapse']}`}
                aria-label='Make selected documents public'
                onclick={() => setAccess([...checked()], ACCESS_PUBLIC)}>
              <Globe /> <span class={bs['button-label']}>Make public</span>
            </button>
            <button type='button' class={`${bs.button} ${bs['button-quiet']} ${bs['button-collapse']}`}
                aria-label='Make selected documents private'
                onclick={() => setAccess([...checked()], ACCESS_PRIVATE)}>
              <Lock /> <span class={bs['button-label']}>Make private</span>
            </button>
            <button type='button' class={`${bs.button} ${bs['button-danger']} ${bs['button-collapse']}`}
                aria-label='Delete selected documents'
                onclick={() => remove([...checked()])}>
              <Trash /> <span class={bs['button-label']}>Delete</span>
            </button>
            <div class={bs.spacer} />
            <button type='button' class={`${bs.button} ${bs['button-quiet']}`} onclick={() => setChecked(new Set<number>())}>
              Cancel
            </button>
          </div>
        }>
          <div class={bs['search-field']}>
            <Search class={bs['search-icon']} />
            <input
                ref={search_input}
                type='search'
                class={bs['search-input']}
                placeholder='Search documents'
                aria-label='Search documents'
                value={search()}
                oninput={(event) => setSearch(event.currentTarget.value)} />
            <Show when={search()}>
              <button
                  type='button'
                  class={`${bs['icon-button']} ${bs['search-clear']}`}
                  aria-label='Clear search'
                  onclick={() => { setSearch(''); search_input?.focus(); }}>
                <Close />
              </button>
            </Show>
          </div>

          <select
              class={bs['scope-select']}
              aria-label='Filter'
              value={folder() ?? scope()}
              onchange={(event) => {
                const value = event.currentTarget.value;
                value.startsWith('/') ? selectFolder(value) : selectScope(value as Scope);
              }}>
            <For each={SCOPES}>{(item) => <option value={item.key}>{item.label}</option>}</For>
            <For each={folders()}>{(node) =>
              <option value={node.path}>{' '.repeat(node.depth * 2)}{node.name}</option>
            }</For>
          </select>

          <div class={bs.spacer} />

          <button type='button' class={`${bs.button} ${bs['button-primary']} ${bs['button-collapse']}`} aria-label='New document'>
            <Plus /> <span class={bs['button-label']}>New document</span>
          </button>
        </Show>
      </header>

      <div classList={{ [style.table]: true, [style.selecting]: !!checkedCount() }} role='table' aria-label='Documents'>

        <div class={style['table-header']} role='row'>
          <div class={`${style.cell} ${style['cell-center']}`} role='columnheader'>
            <input
                type='checkbox'
                class={`${style.check} ${style['check-all']}`}
                aria-label='Select all documents'
                checked={!!visible().length && checkedCount() >= visible().length}
                onchange={toggleAll} />
          </div>
          <div class={`${style.cell} ${style['cell-center']}`} role='columnheader'><span class='sr-only'>Starred</span></div>
          <SortHeader column='name' label='Name' class={style['cell-name']} />
          <SortHeader column='path' label='Folder' class={style['cell-path']} />
          <SortHeader column='access' label='Access' class={style['cell-access']} />
          <SortHeader column='modified' label='Modified' class={style['cell-modified']} />
          <div class={style.cell} role='columnheader'><span class='sr-only'>Actions</span></div>
        </div>

        <div class={style['table-body']} role='rowgroup'>
          <Switch>

            {/* before the skeleton: a failed load leaves the store unloaded, and
                the skeleton would otherwise run forever */}
            <Match when={failed()}>
              <div class={`${style['body-full']} ${bs['empty-state']}`} role='alert'>
                <Alert size={34} />
                <div class={bs['empty-title']}>Couldn’t load your documents</div>
                <div class={bs['empty-detail']}>
                  The list didn’t come back from the server. Nothing has been lost — your
                  documents are still there.
                </div>
                <button
                    type='button'
                    class={`${bs.button} ${bs['empty-action']}`}
                    onclick={() => refreshDocuments()}>
                  Try again
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
                  <div class={`${bs.skeleton} ${style['skeleton-bar']}`} style='width: 66%' />
                  <div />
                </div>
              }</For>
            </Match>

            <Match when={!documents.length}>
              <div class={`${style['body-full']} ${bs['empty-state']}`}>
                <Sheet size={34} />
                <div class={bs['empty-title']}>No documents yet</div>
                <div class={bs['empty-detail']}>
                  Spreadsheets you create or import will show up here, along with their version history.
                </div>
                <button type='button' class={`${bs.button} ${bs['button-primary']} ${bs['empty-action']}`}>
                  <Plus /> New document
                </button>
              </div>
            </Match>

            <Match when={!visible().length && search()}>
              <div class={`${style['body-full']} ${bs['empty-state']}`}>
                <Search size={34} />
                <div class={bs['empty-title']}>No documents match “{search()}”</div>
                <div class={bs['empty-detail']}>Search covers every folder. Try a shorter term.</div>
                <button type='button' class={`${bs.button} ${bs['empty-action']}`} onclick={() => setSearch('')}>
                  Clear search
                </button>
              </div>
            </Match>

            <Match when={!visible().length}>
              <div class={`${style['body-full']} ${bs['empty-state']}`}>
                <Folder size={34} />
                <div class={bs['empty-title']}>Nothing here</div>
                <div class={bs['empty-detail']}>
                  {folder()
                    ? `No documents in ${folder()}.`
                    : 'No documents match this filter.'}
                </div>
                <button type='button' class={`${bs.button} ${bs['empty-action']}`} onclick={() => selectScope('all')}>
                  Show all documents
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
                        aria-label={`Select ${displayName(doc)}`}
                        checked={checked().has(doc.id)}
                        onclick={(event) => event.stopPropagation()}
                        onchange={() => toggleChecked(doc.id)} />
                  </div>

                  <div class={`${style.cell} ${style['cell-center']}`} role='cell'>
                    <button
                        type='button'
                        classList={{ [bs['icon-button']]: true, [style.star]: true, [style.starred]: doc.starred }}
                        aria-label={doc.starred ? `Unstar ${displayName(doc)}` : `Star ${displayName(doc)}`}
                        aria-pressed={doc.starred}
                        onclick={(event) => { event.stopPropagation(); toggleStar(doc.id); }}>
                      <Star filled={doc.starred} />
                    </button>
                  </div>

                  <div class={`${style.cell} ${style['cell-name']}`} role='cell'>
                    <A
                        href={documentUrl(doc)}
                        classList={{ [style.unnamed]: isUnnamed(doc) }}
                        title={isUnnamed(doc) ? 'This document has no name yet' : undefined}
                        onclick={(event) => event.stopPropagation()}>
                      {displayName(doc)}
                    </A>
                  </div>

                  <div class={`${style.cell} ${style['cell-path']}`} role='cell'>
                    {folderOf(doc.path) || '/'}
                  </div>

                  <div class={`${style.cell} ${style['cell-access']}`} role='cell'>
                    <Show
                        when={doc.access === ACCESS_PUBLIC}
                        fallback={<span class={`${style['access-pill']} ${style['access-private']}`}>Private</span>}>
                      <span class={`${style['access-pill']} ${style['access-public']}`}>Public</span>
                    </Show>
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
            {visible().length === documents.length
              ? `${documents.length} document${documents.length === 1 ? '' : 's'}`
              : `${visible().length} of ${documents.length} documents`}
          </span>
          <Show when={search() && folder()}>
            <span>· searching all folders</span>
          </Show>
        </Show>
      </footer>

      {/* detail panel; stays mounted so it can slide out with its content intact */}
      <aside
          classList={{ [bs['slide-over']]: true, [bs.open]: selected() !== undefined }}
          aria-label='Document details'
          aria-hidden={selected() === undefined}>
        <Show when={detail()}>{(doc) => <>

          <div class={bs['panel-header']}>
            <div class={style['panel-title']}>

              <Show
                  when={renaming()}
                  fallback={
                    <div class={style['panel-name']}>
                      <Show when={doc().starred}>
                        <Star filled class={`${style.star} ${style.starred}`} />
                      </Show>
                      <button
                          type='button'
                          classList={{
                            [style['rename-target']]: true,
                            [style.unnamed]: isUnnamed(doc()),
                          }}
                          title='Rename'
                          onclick={() => startRename(doc())}>
                        {displayName(doc())}
                      </button>
                    </div>
                  }>
                <input
                    class={style['rename-input']}
                    aria-label='Document name'
                    value={renameDraft()}
                    ref={(el) => queueMicrotask(() => { el.focus(); el.select(); })}
                    aria-invalid={!!renameProblem()}
                    oninput={(event) => setRenameDraft(event.currentTarget.value)}
                    onblur={cancelOrCommitRename}
                    onkeydown={(event) => {
                      if (event.key === 'Enter') { event.preventDefault(); commitRename(); }
                      // escape is handled globally; don't let it also close the panel
                      if (event.key === 'Escape') { event.stopPropagation(); setRenaming(false); }
                    }} />
              </Show>

              {/* the address is derived from the name, so renaming moves the
                  document -- show where it lands, or why it can't */}
              <Show
                  when={renaming()}
                  fallback={
                    <div class={style['panel-path']}>
                      <span class={style['panel-uri']}>{documentUrl(doc())}</span>
                      <button
                          type='button'
                          class={`${bs['icon-button']} ${style['copy-link']}`}
                          aria-label={copied() ? 'Link copied' : 'Copy link'}
                          title={copied() ? 'Copied' : 'Copy link'}
                          onclick={copyLink}>
                        <Show when={copied()} fallback={<Copy />}>
                          <Check class={style['copy-confirmed']} />
                        </Show>
                      </button>
                    </div>
                  }>
                <Show
                    when={renameProblem()}
                    fallback={
                      <div class={style['rename-preview']}>
                        <span class={style['panel-uri']}>/@duncan{renameTarget()}</span>
                      </div>
                    }>
                  <div class={style['rename-error']} role='alert'>{renameProblem()}</div>
                </Show>
              </Show>

              {/* legacy documents have only a slug, so the title above is just
                  the address repeated -- say so rather than let it look like a
                  badly-cased name */}
              <Show when={isUnnamed(doc()) && !renaming()}>
                <div class={style['unnamed-hint']}>
                  No name yet — this is the address. Renaming sets one.
                </div>
              </Show>

            </div>
            <button type='button' class={bs['icon-button']} aria-label='Close details' onclick={closeDetail}>
              <Close />
            </button>
          </div>

          <div class={bs['panel-body']}>

            <div class={bs['field-row']}>
              <span class={bs['field-label']}>Access</span>
              <div class={bs.segmented}>
                <button
                    type='button'
                    classList={{ [bs.active]: doc().access === ACCESS_PUBLIC }}
                    onclick={() => setAccess([doc().id], ACCESS_PUBLIC)}>
                  <Globe /> Public
                </button>
                <button
                    type='button'
                    classList={{ [bs.active]: doc().access === ACCESS_PRIVATE }}
                    onclick={() => setAccess([doc().id], ACCESS_PRIVATE)}>
                  <Lock /> Private
                </button>
              </div>
            </div>

            <div class={bs['field-row']}>
              <span class={bs['field-label']}>Starred</span>
              <div>
                <button
                    type='button'
                    classList={{ [bs['icon-button']]: true, [style.star]: true, [style.starred]: doc().starred }}
                    aria-pressed={doc().starred}
                    aria-label={doc().starred ? 'Unstar this document' : 'Star this document'}
                    onclick={() => toggleStar(doc().id)}>
                  <Star filled={doc().starred} />
                </button>
              </div>
            </div>

            <div class={bs['field-row']}>
              <span class={bs['field-label']}>Created</span>
              <span>{formatAbsolute(doc().created)}</span>
            </div>

            <div class={bs['field-row']}>
              <span class={bs['field-label']}>Modified</span>
              <span>{formatRelative(doc().modified)}</span>
            </div>

            <div class={style['panel-section']}>
              <div class={bs['section-label']} style='padding: 0'>
                Versions
              </div>

              <div class={style['version-list']}>
                <For each={doc().versions}>{(version, index) =>
                  <div class={style['version-row']}>
                    <span class={style['version-tag']}>v{version.version}</span>
                    <span class={style['version-date']}>{formatStamp(version.modified)}</span>
                    <Show when={index() === 0} fallback={
                      <ActionMenu label={`Actions for version ${version.version}`} class={style['version-action']}>
                        <MenuItem icon={<Sheet />}>Open this version</MenuItem>
                        <MenuItem icon={<Copy />}>Duplicate as new document</MenuItem>
                        <MenuItem icon={<Check />}>Restore</MenuItem>
                      </ActionMenu>
                    }>
                      <span class={style['version-current']}>current</span>
                    </Show>
                  </div>
                }</For>
              </div>

              <div class={style['version-note']}>
                {doc().versions.length === 1
                  ? 'Only one version so far. Older versions appear here as you save.'
                  : `Keeping the last ${doc().versions.length} versions.`}
              </div>
            </div>

          </div>

          <div class={bs['panel-footer']}>
            <A href={documentUrl(doc())} class={`${bs.button} ${bs['button-primary']}`}>Open</A>
            <button type='button' class={bs.button}><Copy /> Duplicate</button>
            <div class={bs.spacer} />
            <button type='button' class={`${bs.button} ${bs['button-danger']}`} onclick={() => remove([doc().id])}>
              <Trash /> Delete
            </button>
          </div>

        </>}</Show>
      </aside>

    </div>

  </div>;

}
