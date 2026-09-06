
import { Accessor, createEffect, createSignal, For, on } from 'solid-js';
import { Dialog, type Props as DialogProps } from '~/components/dialogs/dialog-base/dialog';
import { t, languages, currentLocale, UpdateLanguage } from '~/i18n/i18n';
import style from './language-dialog.module.css';
import { SpreadsheetType } from '~/lib/spreadsheet-type';
import { setPersistentData } from '~/lib/app-data';

interface Props extends DialogProps<boolean> {
  sheet: Accessor<SpreadsheetType|undefined>;
}

export function LanguageDialog(props: Props) {

  const [selectedLanguage, setSelectedLanguage] = createSignal('en');
  const [acceptEnabled, setAcceptEnabled] = createSignal(false);

  createEffect(on(props.open, value => {
    if (value) {
      const lang = currentLocale().substring(0, 2) || 'en';
      setSelectedLanguage(lang);
      setAcceptEnabled(false);
    }
  }));

  async function Apply() {
    const lang = selectedLanguage();
    await UpdateLanguage(lang);
    setPersistentData({explicit_language: lang});
    props.sheet()?.LoadLanguage(lang);
    props.setOpen(false);
  }

  return <>
    <Dialog {...props} escape modal closebox resizeable moveable>
      <header>{t('select-language-dialog.title')}</header>
      <section>
          <ul classList={{[style.listbox]: true, [style.expanded]: true}}>
            <For each={languages}>
              {(entry) => <li onclick={_ => {
                  setSelectedLanguage(entry.code);
                  setAcceptEnabled(true);
                }} 
                ondblclick={_ => {
                  setSelectedLanguage(entry.code);
                  setAcceptEnabled(true);
                  Apply();
                }}
                classList={{ [style.selected]: entry.code === selectedLanguage() }}>
                <div>
                  {entry.name}
                </div>
              </li>
              }
            </For>
          </ul>
      </section>
      <footer>
        <button class="button-primary" disabled={!acceptEnabled()} onclick={_ => Apply()}>
          {t('standard-buttons.accept.title')}
        </button>
        <button onclick={() => props.setOpen(false)}>{t('dialog-close-label')}</button>
      </footer>
    </Dialog>
  </>;

}

