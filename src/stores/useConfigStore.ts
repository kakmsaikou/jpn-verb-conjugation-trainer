import { defineStore } from 'pinia';

type State = {
  _config: Config | null;
};
type Getters = {
  config: (state: State) => Config;
  unselectedFormOptions: () => Form[];
};
type Actions = {
  setConfig: (config: Config) => void;
};

const INIT_CONFIG: Config = {
  verb: {
    masu: true,
    te: true,
    ta: true,
  },
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
      const unselectedFormOptions: Form[] = [];
      for (const key in verb) {
        const value = verb[key as keyof typeof verb];
        if (value === false) {
          unselectedFormOptions.push(key as Form);
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
