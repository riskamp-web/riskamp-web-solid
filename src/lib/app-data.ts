import { createStore, reconcile } from 'solid-js/store';
import { createEffect, on } from 'solid-js';
import { type Model } from 'treb-llm-support';

interface SessionData {
  active_tab: number;
  llm_tab_split: number;
}

interface PersistentData {
  lhs: boolean;
  stepped: boolean; 
  trials: number; // FIXME: should be per-sheet
  llm_model: Model|undefined;
  llm_api_keys: Record<string, string>;
}

interface AppData {
  persisted: PersistentData;
  session: SessionData;
}

export const [sessionData, setSessionData] = createStore<SessionData>({
  active_tab: 1,
  llm_tab_split: 70,
});

export const [persistentData, setPersistentData] = createStore<PersistentData>({
  lhs: true,
  stepped: false,
  trials: 6781,
  llm_model: undefined,
  llm_api_keys: {},
});

export function InitAppData() {

  if (localStorage) {
    const json = localStorage.getItem('app-data');
    if (json) {
      try {
        const data = JSON.parse(json) as Partial<PersistentData>;
        setPersistentData(data);
      }
      catch (err) {
        console.error(err);
      }
    }
  }

  createEffect(() => {
    const json = JSON.stringify(persistentData);
    localStorage.setItem('app-data', json);
  });

}
