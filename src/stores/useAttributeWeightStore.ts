import { defineStore } from 'pinia';

type State = {
  attributeWeights: Record<WordAttribute, number>;
};
type Actions = {
  updateAttributeWeights: (attribute: WordAttribute, isCorrect: boolean) => void;
};

export const useAttributeWeightsStore = defineStore<string, State, {}, Actions>('attributeStore', {
  state: () => ({
    attributeWeights: JSON.parse(localStorage.getItem('attributeWeights') || 'null') || {},
  }),
  actions: {
    updateAttributeWeights(attribute, isCorrect) {
      if (!this.attributeWeights[attribute] || typeof this.attributeWeights[attribute] !== 'number') {
        this.attributeWeights[attribute] = 1;
      }
      this.attributeWeights[attribute] = isCorrect
        ? this.attributeWeights[attribute] * 0.9
        : this.attributeWeights[attribute] * 1.1;
      localStorage.setItem('attributeWeights', JSON.stringify(this.attributeWeights));
    },
  },
});
