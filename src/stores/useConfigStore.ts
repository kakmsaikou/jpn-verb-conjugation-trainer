import { defineStore } from 'pinia';
import { INIT_CONFIG } from '../const';

type State = {
  _config: Config | null;
};
type Getters = {
  config: (state: State) => Config;
  unselectedFormOptions: () => VerbForm[];
};
type Actions = {
  setConfig: (config: Config) => void;
};

export const useConfigStore = defineStore<string, State, Getters, Actions>('userConfig', {
  state: () => ({
    _config: null,
  }),
  getters: {
    config: state => {
      const config = state._config || JSON.parse(localStorage.getItem('_config') || 'null') || INIT_CONFIG;
      state._config = config;
      return state._config as Config;
    },
    unselectedFormOptions() {
      const {verb} = this.config;
      const unselectedFormOptions: VerbForm[] = [];
      for (const key in verb) {
        const value = verb[key as keyof typeof verb];
        if (value === false) {
          unselectedFormOptions.push(key as VerbForm);
        }
      }
      return unselectedFormOptions;
    },
  },
  actions: {
    setConfig(config: Config) {
      this._config = config;
      localStorage.setItem('_config', JSON.stringify(config));
    },
  },
});
