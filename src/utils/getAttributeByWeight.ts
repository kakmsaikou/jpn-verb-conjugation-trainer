import { useAttributeWeightsStore } from '../stores/useAttributeWeightStore';

const attributeWeightStore = useAttributeWeightsStore();

export const getAttributeByWeight = (config: Record<any, boolean>, attributeList: WordAttribute[]): WordAttribute => {
  // 获取被选中的形式的数组
  const usedAttributeList = Object.keys(config).filter(
    key => config[key] === true && attributeList.includes(key as WordAttribute)
  ) as WordAttribute[];
  // 获取被选中的形式的权重及总权重
  const usedAttributeWeights = {} as Record<WordAttribute, number>;
  let totalWeight = 0;
  for (let item of usedAttributeList) {
    usedAttributeWeights[item] = attributeWeightStore.getWeight(item);
    totalWeight += usedAttributeWeights[item];
  }
  // 计算被选中的形式的概率及总概率
  const probabilityList = {} as Record<WordAttribute, number>;
  let totalProbability = 0;
  for (let item of usedAttributeList) {
    probabilityList[item] = usedAttributeWeights[item] / totalWeight;
    totalProbability += probabilityList[item];
  }
  // 保证概率为 1
  if (totalProbability !== 1) {
    for (let item of usedAttributeList) {
      probabilityList[item] = probabilityList[item] /= totalProbability;
    }
  }
  // 生成随机数并选择题型
  const random = Math.random();
  let cumulativeProbability = 0;
  let selectedAttribute;
  for (let item of usedAttributeList) {
    cumulativeProbability += probabilityList[item];
    if (random <= cumulativeProbability) {
      selectedAttribute = item;
      break;
    }
  }
  if (!selectedAttribute) selectedAttribute = usedAttributeList[usedAttributeList.length - 1];
  return selectedAttribute;
};
