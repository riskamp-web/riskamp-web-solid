
import { Accessor, createMemo } from 'solid-js';
import style from './toolbar.module.css';
import { persistentData, setPersistentData } from '~/lib/app-data';
import { bootstrap_icons } from 's5-icon-lib';
import { produce } from 'solid-js/store';
import { SpreadsheetType } from '~/lib/spreadsheet-type';
import { t } from '~/i18n/i18n';

interface Props {
  sheet: Accessor<SpreadsheetType|undefined>;
}

export function ThemeSelector(props: Props) {
  
  function CycleTheme() {
    switch (persistentData.explicit_theme) {
      case 'dark':
        setPersistentData(produce(s => { s.explicit_theme = undefined }));
        break;
      case 'light':
        setPersistentData(produce(s => { s.explicit_theme = 'dark' }));
        break;
      default:
        setPersistentData(produce(s => { s.explicit_theme = 'light' }));
        break;
    }

    requestAnimationFrame(() => props.sheet()?.UpdateTheme());
    
  }

  const theme_icon = createMemo(() => {
    switch (persistentData.explicit_theme) {
      case 'dark':
        return bootstrap_icons.moon;
      case 'light':
        return bootstrap_icons.sun;
      default:
        return bootstrap_icons.circle_half;
    }
  });

  const theme_title = createMemo(() => {
    switch (persistentData.explicit_theme) {
      case 'dark':
        return 'theme-toggle.dark-theme';
      case 'light':
        return 'theme-toggle.light-theme';
      default:
        return 'theme-toggle.system-theme';
    }
  });

  return <button class={style['toolbar-button']} 
              title={t(theme_title())}
              innerHTML={theme_icon()} onclick={CycleTheme} />;

}