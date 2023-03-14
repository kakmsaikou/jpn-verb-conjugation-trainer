import { defineStore } from 'pinia';

type State = {
  excludeWordFormList: Set<Form>;
};
type Getters = {
  filteredFormList: () => Form[];
  form: () => Form;
};
type Actions = {
  excludeForm: (form: Form) => void;
  includeForm: (form: Form) => void;
};

const WORD_FORM_LIST = ['ます形', 'て形', 'た形'] as const;

export const useFormStore = defineStore<string, State, Getters, Actions>('formStore', {
  state: () => ({
    excludeWordFormList: new Set(),
  }),
  getters: {
    filteredFormList() {
      const excludeList = Array.from(this.excludeWordFormList);
      return WORD_FORM_LIST.filter(item => !excludeList.includes(item as Form)) as Form[];
    },
    form() {
      const index = Math.floor(Math.random() * this.filteredFormList.length);
      return this.filteredFormList[index];
    },
  },
  actions: {
    excludeForm(form: Form) {
      this.excludeWordFormList.add(form);
    },
    includeForm(form: Form) {
      if (this.excludeWordFormList.has(form)) {
        this.excludeWordFormList.delete(form);
      }
    },
  },
});
