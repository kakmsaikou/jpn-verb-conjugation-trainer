import { defineStore } from 'pinia';

type State = {
  attributeWeights: Record<WordAttribute, number>;
};
type Getters = {
  getWeight: (state: State) => (attribute: WordAttribute) => number;
};
type Actions = {
  updateAttributeWeights: (attribute: WordAttribute, isCorrect: boolean) => void;
  cleanAttributeWeights: () => void;
};

export const useAttributeWeightsStore = defineStore<string, State, Getters, Actions>('attributeStore', {
  state: () => ({
    attributeWeights: JSON.parse(localStorage.getItem('attributeWeights') || 'null') || {},
  }),
  getters: {
    getWeight: state => {
      return (attribute: WordAttribute) => {
        if (!state.attributeWeights[attribute] || typeof state.attributeWeights[attribute] !== 'number') {
          state.attributeWeights[attribute] = 1;
        }
        return state.attributeWeights[attribute];
      };
    },
  },
  actions: {
    updateAttributeWeights(attribute, isCorrect) {
      if (!this.attributeWeights[attribute] || typeof this.attributeWeights[attribute] !== 'number') {
        this.attributeWeights[attribute] = 1;
      }
      this.attributeWeights[attribute] =
        Math.round(
          (isCorrect ? this.attributeWeights[attribute] * 0.95 : this.attributeWeights[attribute] * 1.5) * 100
        ) / 100;
      this.attributeWeights[attribute] < 0.5 && (this.attributeWeights[attribute] = 0.5);
      this.attributeWeights[attribute] > 5 && (this.attributeWeights[attribute] = 5);
      localStorage.setItem('attributeWeights', JSON.stringify(this.attributeWeights));
    },
    cleanAttributeWeights() {
      this.attributeWeights = {} as Record<WordAttribute, number>;
      localStorage.setItem('attributeWeights', JSON.stringify(this.attributeWeights));
    },
  },
});
