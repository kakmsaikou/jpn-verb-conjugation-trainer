import { useAttributeWeightsStore } from '../stores/useAttributeWeightStore';

const attributeWeightStore = useAttributeWeightsStore();

export const getAttributeByWeight = (config: Record<any, boolean>, attributeList: WordAttribute[]) => {
  const usedAttributeList = Object.keys(config).filter(
    key => config[key] === true && attributeList.includes(key as WordAttribute)
  ) as WordAttribute[];
  const usedAttributeWeights = {} as Record<WordAttribute, number>;
  for (let item of usedAttributeList) {
    usedAttributeWeights[item] = attributeWeightStore.getWeight(item);
  }
  console.log(usedAttributeWeights);
};
