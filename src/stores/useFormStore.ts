import { useConfigStore } from './useConfigStore';
import { defineStore } from 'pinia';
import { FORM_KANJI_MAP, FORM_KEY_MAP } from '../const';

type State = {
  _form: WordForm | null;
};
type Getters = {
  form: () => WordForm;
  posFormKey: () => (pos: number) => string;
  formKanji: () => string;
};
type Actions = {
  refreshForm: () => void;
};

const configStore = useConfigStore();

export const useFormStore = defineStore<string, State, Getters, Actions>('formStore', {
  state: () => ({
    _form: null,
  }),
  getters: {
    form() {
      if (this._form === null) {
        const index = Math.floor(Math.random() * configStore.usedFormOptions.length);
        this._form = configStore.usedFormOptions[index];
      }
      return this._form;
    },
    posFormKey() {
      return (pos: number) => pos + FORM_KEY_MAP[this.form];
    },
    formKanji() {
      return FORM_KANJI_MAP[this.form] ? FORM_KANJI_MAP[this.form] : this.form;
    },
  },
  actions: {
    refreshForm() {
      const index = Math.floor(Math.random() * configStore.usedFormOptions.length);
      this._form = configStore.usedFormOptions[index];
    },
  },
});
