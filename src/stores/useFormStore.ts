import { defineStore } from 'pinia';

type State = {
  excludeWordFormList: Set<Form>;
  currentForm: Form | null;
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
    currentForm: null,
  }),
  getters: {
    filteredFormList: state => {
      const excludeList = Array.from(state.excludeWordFormList);
      return FORM_LIST.filter(item => !excludeList.includes(item as Form)) as Form[];
    },
    form() {
      if (this.currentForm === null) {
        const index = Math.floor(Math.random() * this.filteredFormList.length);
        this.currentForm = this.filteredFormList[index];
      }
      return this.currentForm;
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
      this.currentForm = this.filteredFormList[index];
    },
  },
});
