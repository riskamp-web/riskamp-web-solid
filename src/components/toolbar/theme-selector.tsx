
import { Accessor, createMemo } from 'solid-js';
import style from './toolbar.module.css';
import { persistentData, setPersistentData } from '~/lib/app-data';
import { icons } from '~/components/icon-sets';
import { produce } from 'solid-js/store';
import { SpreadsheetType } from '~/lib/spreadsheet-type';
import { StringKey, t } from '~/i18n/i18n';

interface Props {
  sheet: Accessor<SpreadsheetType|undefined>;
}

/** centralizing and unifying */
export function SetTheme(sheet?: SpreadsheetType, theme?: 'dark'|'light'|'system') {

  console.info("Set theme", theme);

  if (theme === 'dark'|| theme === 'light') {
    setPersistentData(produce(s => { s.explicit_theme = theme }));
  }
  else {
    setPersistentData(produce(s => { s.explicit_theme = undefined }));
  }
  requestAnimationFrame(() => sheet?.UpdateTheme());
}

export function ThemeSelector(props: Props) {
  
  function CycleTheme() {
    switch (persistentData.explicit_theme) {
      case 'dark': 
        SetTheme(props.sheet(), 'system'); 
        break;
      case 'light': 
        SetTheme(props.sheet(), 'dark'); 
        break;
      default:
        SetTheme(props.sheet(), 'light'); 
        break;
    }
  }

  const theme = createMemo<{ icon: string, title: StringKey }>(() => {
    switch (persistentData.explicit_theme) {
      case 'dark':
        return { icon: icons.theme_dark, title: 'theme-toggle.dark-theme' };
      case 'light':
        return { icon: icons.theme_light, title: 'theme-toggle.light-theme' };
      default:
        return { icon: icons.theme_system, title: 'theme-toggle.system-theme' };
    }
  });

  return <button class={style['toolbar-button']} 
              title={t(theme().title)}
              innerHTML={theme().icon} onclick={CycleTheme} />;

}

