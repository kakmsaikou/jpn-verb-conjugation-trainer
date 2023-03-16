import { useFormStore } from '../stores/useFormStore';
import { jconj } from '../plugins/jconj/jconj';
import { getPos } from './getPos';

const regex = /(?<=【).+?(?=】)/;
const formStore = useFormStore();

export const convertWordForm = (wordData: WordData, form: string) => {
  const pos = getPos(wordData);
  // const jconjResults = jconj(wordData, pos)[0];
  // for (let key in jconjResults) {
  //   const match = jconjResults[key].match(regex);
  //   if (match === null) return;
  //   console.log('| ' + jconjResults[key].substring(0, match.index! - 1) + ' | *' + key + ' |');
  // }
  if (pos === 0) return ['单词的 type 属性不正确', '单词的 type 属性不正确'];
  const jconjResult = jconj(wordData, pos)[0][formStore.posFormKey(pos)];

  // jconj 的返回结果格式为 やります【やります】，把它转化为数组
  // 转化为数组是为了方便后续 include 操作
  const convertResult: string[] = [];
  const match = jconjResult.match(regex);
  if (match) {
    convertResult[0] = jconjResult.substring(0, match.index! - 1);
    convertResult[1] = match[0];
  }
  return convertResult;
};
