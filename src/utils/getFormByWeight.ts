import { useFormWeightsStore } from '../stores/useFormWeightStore';

const formWeightsStore = useFormWeightsStore();

export const getFormByWeight = (
  config: Record<any, boolean>,
  formList: WordForm[]
): WordForm => {
  // 获取被选中的形式的数组
  const usedFormList = Object.keys(config).filter(
    key => config[key] === true && formList.includes(key as WordForm)
  ) as WordForm[];
  // 获取被选中的形式的权重及总权重
  const usedFormWeights = {} as Record<WordForm, number>;
  let totalWeight = 0;
  for (let item of usedFormList) {
    usedFormWeights[item] = formWeightsStore.getWeight(item);
    totalWeight += usedFormWeights[item];
  }
  // 计算被选中的形式的概率及总概率
  const probabilityList = {} as Record<WordForm, number>;
  let totalProbability = 0;
  for (let item of usedFormList) {
    probabilityList[item] = usedFormWeights[item] / totalWeight;
    totalProbability += probabilityList[item];
  }
  // 保证概率为 1
  if (totalProbability !== 1) {
    for (let item of usedFormList) {
      probabilityList[item] = probabilityList[item] /= totalProbability;
    }
  }
  // 生成随机数并选择题型
  const random = Math.random();
  let cumulativeProbability = 0;
  let selectedForm;
  for (let item of usedFormList) {
    cumulativeProbability += probabilityList[item];
    if (random <= cumulativeProbability) {
      selectedForm = item;
      break;
    }
  }
  if (!selectedForm)
    selectedForm = usedFormList[usedFormList.length - 1];
  return selectedForm;
};
