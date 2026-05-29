import { createStore, reconcile } from 'solid-js/store';
import { createEffect, on } from 'solid-js';

interface AppData {
  persisted: {
    lhs: boolean;
    stepped: boolean; 
    trials: number; // FIXME: should be per-sheet
  };
  ephemeral: {
    active_tab: number;
    llm_tab_split: number;
  };
}

export const [appData, setAppData] = createStore<AppData>({

  persisted: {
    lhs: true,
    stepped: false,
    trials: 6781,
  },

  ephemeral: {
    active_tab: 1,
    llm_tab_split: 70,
  },

});

export function InitAppData() {

  if (localStorage) {
    const json = localStorage.getItem('app-data');
    if (json) {
      try {
        const data = JSON.parse(json) as Partial<AppData>;
        setAppData(data);
      }
      catch (err) {
        console.error(err);
      }
    }
  }

  createEffect(() => {
    const json = JSON.stringify(appData);
    localStorage.setItem('app-data', json);
  });

}
