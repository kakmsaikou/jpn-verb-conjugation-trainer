import { useConfigStore } from './useConfigStore';
import { defineStore } from 'pinia';

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

const FORM_LIST: Form[] = ['masu', 'te', 'ta'];
const FORM_KEY_MAP: Record<Form, string> = {
  masu: ',1,false,true',
  te: ',3,false,false',
  ta: ',2,false,false',
  // ない形: ',1,true,false',
  // ば形: ',13,false,false',
};
const FORM_KANJI_MAP: Record<Form, string> = {
  masu: 'ます形',
  te: 'て形',
  ta: 'た形',
  // ない形: 'ない',
  // ば形: 'ば',
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
