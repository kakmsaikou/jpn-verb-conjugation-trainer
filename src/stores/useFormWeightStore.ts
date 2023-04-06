import { defineStore } from 'pinia';

type State = {
  formWeights: Record<WordForm, number>;
};
type Getters = {
  getWeight: (state: State) => (form: WordForm) => number;
};
type Actions = {
  updateFormWeights: (
    form: WordForm,
    isCorrect: boolean
  ) => void;
  cleanFormWeights: () => void;
};

export const useFormWeightsStore = defineStore<
  string,
  State,
  Getters,
  Actions
>('formStore', {
  state: () => ({
    formWeights:
      JSON.parse(localStorage.getItem('formWeights') || 'null') || {},
  }),
  getters: {
    getWeight: state => {
      return (form: WordForm) => {
        if (
          !state.formWeights[form] ||
          typeof state.formWeights[form] !== 'number'
        ) {
          state.formWeights[form] = 1;
        }
        return state.formWeights[form];
      };
    },
  },
  actions: {
    updateFormWeights(form, isCorrect) {
      if (
        !this.formWeights[form] ||
        typeof this.formWeights[form] !== 'number'
      ) {
        this.formWeights[form] = 1;
      }
      this.formWeights[form] =
        Math.round(
          (isCorrect
            ? this.formWeights[form] * 0.95
            : this.formWeights[form] * 1.5) * 100
        ) / 100;
      this.formWeights[form] < 0.5 &&
        (this.formWeights[form] = 0.5);
      this.formWeights[form] > 5 &&
        (this.formWeights[form] = 5);
      localStorage.setItem(
        'formWeights',
        JSON.stringify(this.formWeights)
      );
    },
    cleanFormWeights() {
      this.formWeights = {} as Record<WordForm, number>;
      localStorage.setItem(
        'formWeights',
        JSON.stringify(this.formWeights)
      );
    },
  },
});
