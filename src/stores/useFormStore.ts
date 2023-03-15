import { useConfigStore } from './useConfigStore';
import { defineStore } from 'pinia';
import { FORM_KANJI_MAP, FORM_KEY_MAP, FORM_LIST } from '../const';

type State = {
  _form: Form | null;
};
type Getters = {
  filteredFormList: () => Form[];
  form: () => Form;
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
    filteredFormList: () => {
      const filteredFormList = FORM_LIST.filter(item => !configStore.unselectedFormOptions.includes(item));
      return filteredFormList;
    },
    form() {
      if (this._form === null) {
        const index = Math.floor(Math.random() * this.filteredFormList.length);
        this._form = this.filteredFormList[index];
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
      const index = Math.floor(Math.random() * this.filteredFormList.length);
      this._form = this.filteredFormList[index];
    },
  },
});
