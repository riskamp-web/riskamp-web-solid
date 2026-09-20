
import { Accessor, createEffect, createMemo, createSignal, For, on } from 'solid-js';
import { Dialog, type Props as DialogProps } from '~/components/dialogs/dialog-base/dialog';
import { t, languages, UpdateLanguage, SystemLocale } from '~/i18n/i18n';
import style from './language-dialog.module.css';
import { SpreadsheetType } from '~/lib/spreadsheet-type';
import { persistentData, setPersistentData } from '~/lib/app-data';

interface Props extends DialogProps<boolean> {
  sheet: Accessor<SpreadsheetType|undefined>;
}

export function LanguageDialog(props: Props) {

  const [selectedLanguage, setSelectedLanguage] = createSignal('');
  const [acceptEnabled, setAcceptEnabled] = createSignal(false);

  const [systemSetting, setSystemSetting] = createSignal('');
  const [decimalSeparator, setDecimalSeparator] = createSignal<','|'.'|''>('');

  // eslint-disable-next-line no-unassigned-vars
  let decimal_select: HTMLSelectElement|undefined;

  createEffect(on(props.open, value => {
    if (value) {
      setSystemSetting(SystemLocale());

      const lang = persistentData.locale_settings?.ui_language;
      if (lang) {
        setSelectedLanguage(lang.substring(0, 2));
        setDecimalSeparator(persistentData?.locale_settings?.decimal_separator || '');
      }
    }
  }));

  const calculatedDecimalSeparator = createMemo(() => {

    const current = decimalSeparator();
    switch (current) {
      case ',':
      case '.':
        return current;
    }

    const lang = SystemLocale();
    const fmt = new Intl.NumberFormat(lang,
      {minimumFractionDigits: 1}).format(3.3).replace(/\d/g, '');

    // console.info("LF", lang, fmt);

    if (fmt === '.' || fmt === ',') {
      return fmt;
    }

    return '.';

  });

  async function Apply() {

    const lang = selectedLanguage();

    // call update language method (sets UI lang)
    await UpdateLanguage(lang||SystemLocale());

    // set persistent data
    if (lang) {
      setPersistentData({
        locale_settings: {
          ui_language: lang,
          spreadsheet_language: lang.substring(0, 2),
          decimal_separator: decimal_select?.value as ('.'|','),
        }
      });
    }
    else {
      setPersistentData({
        locale_settings: undefined,
      });
    }

    /*
    const lang = selectedLanguage();
    // await UpdateLanguage(lang);
    // setPersistentData({explicit_locale: lang});
    props.sheet()?.LoadLanguage(lang);
    props.setOpen(false);
    */
  }

  return <>
    <Dialog {...props} escape modal closebox resizeable moveable>
      <header>{t('select-language-dialog.title')}</header>
      <section classList={{[style.body]: true, [style.expanded]: true }}>
        
        <div classList={{[style.control]: true, 'flex-grow': true }}>
          <label>{t('select-language-dialog.select-language')}</label>
          <ul classList={{[style.listbox]: true}}>
            <li classList={{ [style.selected]: !selectedLanguage() }}
                onclick={_ => {
                  setSelectedLanguage('');
                  setAcceptEnabled(true);
                  setDecimalSeparator('');
                }}>
              <span>
                {t('select-language-dialog.system-setting')}
              </span>
              <span class={style.detail}>{systemSetting()}</span>
            </li>
            <For each={languages}>
              {(entry) => <li onclick={_ => {
                  setSelectedLanguage(entry.code);
                  setAcceptEnabled(true);
                  setDecimalSeparator(entry.decimal_separator);
                }} 
                ondblclick={_ => {
                  setSelectedLanguage(entry.code);
                  setAcceptEnabled(true);
                  setDecimalSeparator(entry.decimal_separator);
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
        </div>
        
        <div class={style.control}>
          <label>{t('select-language-dialog.decimal-separator')}</label>
          <div>
            <select ref={decimal_select} class="select" value={calculatedDecimalSeparator()} disabled={selectedLanguage() === ''}>
              <option value=','>{t('select-language-dialog.decimal-separator-comma')}</option>
              <option value='.'>{t('select-language-dialog.decimal-separator-dot')}</option>
            </select>
          </div>
        </div>

      </section>
      <footer>
        <button class="button-primary" disabled={!acceptEnabled()} onclick={_ => Apply()}>
          {t('standard-buttons.apply.title')}
        </button>
        <button onclick={() => props.setOpen(false)}>{t('dialog-close-label')}</button>
      </footer>
    </Dialog>
  </>;

}

