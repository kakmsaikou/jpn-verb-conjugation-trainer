import { defineStore } from 'pinia';

type State = {
  excludeWordFormList: Set<Form>;
  _form: Form | null;
};
type Getters = {
  filteredFormList: (state: State) => Form[];
  form: () => Form;
  posFormKey: () => (pos: number) => string;
};
type Actions = {
  removeForm: (form: Form) => void;
  returnForm: (form: Form) => void;
  refreshForm: () => void;
};

const FORM_LIST: Form[] = ['ます形', 'て形', 'た形'];
const FORM_KEY_MAP: Record<Form, string> = {
  ます形: ',1,false,true',
  て形: ',3,false,false',
  た形: ',2,false,false',
  // ない形: ',1,true,false',
  // ば形: ',13,false,false',
};

export const useFormStore = defineStore<string, State, Getters, Actions>('formStore', {
  state: () => ({
    excludeWordFormList: new Set(),
    _form: null,
  }),
  getters: {
    filteredFormList: state => {
      const excludeList = Array.from(state.excludeWordFormList);
      return FORM_LIST.filter(item => !excludeList.includes(item as Form)) as Form[];
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
  },
  actions: {
    removeForm(form: Form) {
      this.excludeWordFormList.add(form);
    },
    returnForm(form: Form) {
      if (this.excludeWordFormList.has(form)) {
        this.excludeWordFormList.delete(form);
      }
    },
    refreshForm() {
      const index = Math.floor(Math.random() * this.filteredFormList.length);
      this._form = this.filteredFormList[index];
    },
  },
});
