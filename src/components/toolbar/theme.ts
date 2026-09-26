import { setPersistentData } from '~/lib/app-data';
import { SpreadsheetType } from '~/lib/spreadsheet-type';

// these live in a .ts, not beside ThemeSelector: in a .tsx, solid-refresh
// (dev HMR) wraps every exported PascalCase function as a component, and a
// component-wrapped call from an effect or onSettled is an error in 2.0.

export function ApplyThemeColors() {
  const container = document.querySelector('.treb-grid');
  // console.info({container});
  if (container) {
    const computed = getComputedStyle(container);
    for (let i = 0; i < 5; i++) {
      const key = `--treb-applied-theme-color-${i + 1}`; 
      const value = computed.getPropertyValue(key) || '';
      // console.info({key, value});
      
      document.body.style.setProperty(`--chart-series-${i + 1}-color`, value);
    }
  }

}

/** centralizing and unifying */
export function SetTheme(sheet?: SpreadsheetType, theme?: 'dark'|'light'|'system') {

  // console.info("Set theme", theme);

  if (theme === 'dark'|| theme === 'light') {
    setPersistentData(s => { s.explicit_theme = theme; });
  }
  else {
    setPersistentData(s => { s.explicit_theme = undefined; });
  }
  requestAnimationFrame(() => {
    sheet?.UpdateTheme();
    ApplyThemeColors();
  });
}
