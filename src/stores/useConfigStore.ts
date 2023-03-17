import { defineStore } from 'pinia';
import { INIT_CONFIG } from '../const';
import { cloneTrueKeys } from '../utils/createForm';

type State = {
  _config: Config | null;
};
type Getters = {
  config: (state: State) => Config;
  tempConfig: () => Partial<Config>;
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
    tempConfig() {
      const tempConfig = cloneTrueKeys(this.config) as Partial<Config>;
      return tempConfig ;
    },
  },
  actions: {
    setConfig(config: Config) {
      this._config = config;
      localStorage.setItem('_config', JSON.stringify(config));
    },
  },
});
