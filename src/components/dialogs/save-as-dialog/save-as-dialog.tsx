
import { type Accessor, createEffect, createSignal, createUniqueId, For, on, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Dialog, type Props as DialogProps } from '~/components/dialogs/dialog-base/dialog';
import { icons } from '~/components/icon-sets';
import { t } from '~/i18n/i18n';
import {
  ACCESS_PRIVATE, ACCESS_PUBLIC,
  findPathCollision, flattenFolders, folderTree, pathFor, slugSegment,
} from '~/backstage/documents-data';
import type { BackstageDocument } from '~/backstage/documents-store';
import style from './save-as-dialog.module.css';

/** left-to-right mark (U+200E): see the .path span below */
const LRM = String.fromCharCode(0x200e);

export interface SaveAsResult {
  /** the full path, e.g. @dwerner/finance/portfolio-var */
  path: string;
  /** owner-relative folder, leading-slash form ('' = the owner's root) */
  folder: string;
  /** the normalized last segment */
  slug: string;
  /** the pretty full path to store in the document's name field: folder
   * segments (typed casing) plus the leaf, e.g. "Finance/Reports/My Model" */
  name: string;
  /** ACCESS_PUBLIC | ACCESS_PRIVATE -- the store's numeric form. the api takes
   * a string, so a caller persisting this maps it the way setAccess() in
   * documents.tsx does: access === ACCESS_PUBLIC ? 'public' : 'private' */
  access: number;
}

interface Props extends DialogProps<SaveAsResult | undefined> {
  /** the owner handle, e.g. @dwerner */
  owner: Accessor<string>;
  /** existing documents, for collision checks and folder suggestions */
  documents: Accessor<BackstageDocument[]>;
  /** seed the name field (rename) */
  initialName?: string;
  /** seed the folder field, leading-slash form or '' (rename / move) */
  initialFolder?: string;
  /** seed the access control (rename / move, so a private document isn't
   * silently made public). omitted means ACCESS_PUBLIC, the default level */
  initialAccess?: number;
  /** a document id to exclude from the collision check (renaming in place) */
  ignoreId?: number;
  /** primary result channel */
  onSave?: (result: SaveAsResult) => void;
}

/**
 * turn whatever a user typed into a folder -- 'finance/Reports/', '/finance/reports'
 * -- into the leading-slash form paths are stored in, with each segment run through
 * the same slug rule as the name. '' is the owner's root.
 *
 * pathFor() doesn't slugify folder segments, but doing it here keeps the generated
 * path clean and consistent with the slug the user is watching below.
 */
function normalizeFolder(raw: string): string {
  const segments = raw.split('/').map(segment => slugSegment(segment)).filter(Boolean);
  return segments.length ? '/' + segments.join('/') : '';
}

export function SaveAsDialog(props: Props) {

  // one store so a single reactive read covers every field
  const [fields, setFields] = createStore({ name: '', folder: '', access: ACCESS_PUBLIC });
  const [copied, setCopied] = createSignal(false);

  const list_id = createUniqueId();

  // seed the fields each time the dialog opens (mirrors run-simulation-dialog)
  createEffect(on(props.open, value => {
    if (value) {
      setCopied(false);
      setFields({
        name: props.initialName ?? '',
        // stored folders carry a leading slash; the field shows it without one
        folder: (props.initialFolder ?? '').replace(/^\//, ''),
        access: props.initialAccess ?? ACCESS_PUBLIC,
      });
    }
  }));

  /* ---- derived ---- */

  // folders typed into the name field: everything before its last separator
  const nameFolderPart = () => {
    const cut = fields.name.lastIndexOf('/');
    return cut < 0 ? '' : fields.name.slice(0, cut);
  };

  // the name's own last segment, casing preserved
  const nameLeaf = () => fields.name.slice(fields.name.lastIndexOf('/') + 1);

  // true when the name is dictating the folder -- the folder field goes read-only
  const shadowed = () => nameFolderPart() !== '';

  // what the folder field shows: the name's folder part when shadowed, else its own
  const folderDisplay = () => shadowed() ? nameFolderPart() : fields.folder;

  // the effective folder in stored, leading-slash form
  const folder = () => normalizeFolder(shadowed() ? nameFolderPart() : fields.folder);

  const slug = () => slugSegment(nameLeaf());
  const fullPath = () => pathFor(props.owner(), folder(), nameLeaf());

  // the folder segments as typed -- casing and punctuation preserved -- dropping
  // any that slug to nothing, so they stay parallel with the slugged path above
  const prettyFolders = () =>
    (shadowed() ? nameFolderPart() : fields.folder)
      .split('/').map(segment => segment.trim()).filter(segment => slugSegment(segment) !== '');

  // the pretty path persisted in the document's name field: pretty folders plus
  // the leaf, its typed casing intact. the slugged path above stays the identity
  const displayPath = () => [...prettyFolders(), nameLeaf().trim()].filter(Boolean).join('/');
  // a matching path no longer blocks saving -- it's a heads-up that Save will
  // overwrite; the caller is expected to confirm before clobbering
  const collision = () => findPathCollision(props.documents(), fullPath(), props.ignoreId);
  const valid = () => slug() !== '';

  const folderOptions = () =>
    flattenFolders(folderTree(props.documents())).map(node => node.path.replace(/^\//, ''));

  /* ---- actions ---- */

  function save() {
    if (!valid()) { return; }
    const result: SaveAsResult = {
      path: fullPath(),
      folder: folder(),
      slug: slug(),
      name: displayPath(),
      access: fields.access,
    };
    props.onSave?.(result);
    props.setResult?.(result);
    props.setOpen(false);
  }

  // copy the generated document link, mirroring the documents-page detail panel
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(new URL('/' + fullPath(), location.origin).href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
    catch {
      // clipboard can be blocked (insecure context, denied permission); the path
      // is visible in the preview, so fail quietly
    }
  }

  function InputKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      if (valid() && event.target instanceof HTMLElement) {
        event.target.blur();
        queueMicrotask(save);
      }
    }
  }

  return (
    <Dialog modal escape closebox moveable resizeable {...props}
            class={[style['dialog-root'], props.class].filter(Boolean).join(' ')}>
      <header>
        <span>{t('save-as-dialog.title')}</span>
      </header>
      <section class={style.layout}>

        <label class={style.field}>
          <span class={style['field-label']}>{t('save-as-dialog.folder')}</span>
          <input type="text"
                 class="input"
                 classList={{ [style.shadowed]: shadowed() }}
                 list={list_id}
                 readonly={shadowed()}
                 placeholder={t('save-as-dialog.folder-placeholder')}
                 value={folderDisplay()}
                 onInput={e => { if (!shadowed()) { setFields('folder', e.currentTarget.value); } }}
                 onkeydown={InputKeyDown} />
          <datalist id={list_id}>
            <For each={folderOptions()}>{option => <option value={option} />}</For>
          </datalist>
        </label>

        <label class={style.field}>
          <span class={style['field-label']}>{t('save-as-dialog.name')}</span>
          <input type="text"
                 class="input"
                 autofocus
                 placeholder={t('save-as-dialog.name-placeholder')}
                 value={fields.name}
                 onInput={e => setFields('name', e.currentTarget.value)}
                 onkeydown={InputKeyDown} />
        </label>

        {/* a button pair isn't labelable, so this row is a div with its own
            group label rather than the <label> the two fields above use.
            lock/unlock stand in until the documents page's globe moves into
            the shared icon set -- then public takes the globe. */}
        <div class={style.field}>
          <span class={style['field-label']}>{t('save-as-dialog.access')}</span>
          <div class={style.segmented} role="group" aria-label={t('save-as-dialog.access')}>
            <button type="button"
                    classList={{ [style.active]: fields.access === ACCESS_PUBLIC }}
                    aria-pressed={fields.access === ACCESS_PUBLIC}
                    onclick={() => setFields('access', ACCESS_PUBLIC)}>
              <span class={style.icon} innerHTML={icons.unlock_cells} />
              {t('save-as-dialog.public')}
            </button>
            <button type="button"
                    classList={{ [style.active]: fields.access === ACCESS_PRIVATE }}
                    aria-pressed={fields.access === ACCESS_PRIVATE}
                    onclick={() => setFields('access', ACCESS_PRIVATE)}>
              <span class={style.icon} innerHTML={icons.lock_cells} />
              {t('save-as-dialog.private')}
            </button>
          </div>
        </div>

        <div class={style.preview}>
          <span class={style['preview-label']}>{t('save-as-dialog.preview-label')}</span>
          <div class={style['preview-value']}>
            <Show when={slug()} fallback={<span class={style.placeholder}>{t('save-as-dialog.empty')}</span>}>
              <div class={style['path-row']}>
                {/* leading LRM anchors the '@' so the rtl ellipsis (see .path) can't
                    reorder it to the far end; the copied value uses fullPath() directly */}
                <span class={style.path}>{LRM + fullPath()}</span>
                <button type="button"
                        class={style['copy-button']}
                        aria-label={copied() ? t('save-as-dialog.copy-link-copied') : t('save-as-dialog.copy-link')}
                        title={copied() ? t('save-as-dialog.copy-link-copied') : t('save-as-dialog.copy-link')}
                        onclick={copyLink}>
                  <Show when={copied()}
                        fallback={<span class={style.icon} innerHTML={icons.copy} />}>
                    <span class={`${style.icon} ${style['copy-confirmed']}`} innerHTML={icons.copy_confirmed} />
                  </Show>
                </button>
              </div>
            </Show>
          </div>
        </div>

        {/* the overwrite warning sits below the box and keeps its space when
            hidden, so showing it never resizes the dialog */}
        <div classList={{ [style.warning]: true, [style.hidden]: !collision() }}>
          {t('save-as-dialog.collision')}
        </div>

      </section>
      <footer>
        <button class="button-primary" disabled={!valid()} onclick={save}>
          {collision() ? t('save-as-dialog.overwrite') : t('save-as-dialog.save')}
        </button>
        <button onclick={() => props.setOpen(false)}>{t('dialog-close-label')}</button>
      </footer>
    </Dialog>
  );

}
