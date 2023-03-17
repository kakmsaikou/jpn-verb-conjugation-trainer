import { defineStore } from 'pinia';
import { INIT_CONFIG } from '../const';
import { cloneTrueKeys } from '../utils/cloneTrueKeys';


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
      // cloneTrueKeys 用于过滤掉 config 中值为 false 的键，得到一个保留了所有值为 true 的键的对象
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
