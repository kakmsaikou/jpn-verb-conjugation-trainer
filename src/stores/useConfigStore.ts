import { defineStore } from 'pinia';

type State = {
  _config: Config | null;
};
type Getters = {
  config: (state: State) => Config;
};

type Actions = {};

export const useConfigStore = defineStore<string, State, Getters, Actions>('userConfig', {
  state: () => ({
    _config: null,
  }),
  getters: {
    config: state => {
      if (state._config === null) {
        const userConfig = localStorage.getItem('_config');
        if (userConfig) {
          state._config = JSON.parse(userConfig);
        } else {
          state._config = {
            verb: {
              masu: true,
              te: true,
              ta: true,
            },
          };
        }
      }
      return state._config as Config;
    },
  },
  actions: {},
});
