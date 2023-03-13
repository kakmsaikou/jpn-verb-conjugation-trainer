import { jconj } from '../plugins/jconj/jconj';

interface ConvertResult {
  kanji: string;
  kana: string;
}

const regex = /(?<=【).+?(?=】)/;
const formKeyMap: Record<string, string> = {
  ます形: ',1,false,true',
  て形: ',3,false,false',
  た形: ',2,false,false',
  ない形: ',1,true,false',
  ば形: ',13,false,false',
};
const v5Endings: Record<string, number> = {
  ぶ: 31,
  ぐ: 32,
  く: 33,
  む: 35,
  ぬ: 36,
  る: 37,
  す: 39,
  つ: 40,
  う: 41,
};
// 根据平假名获得对应的 pos 值，pos 值是 jconj 转换动词参数
const getPos = (kana: string, type: string): number => {
  if (type === 'v1') return 28;
  if (type === 'v5') {
    const kanaEndsWith = kana.charAt(kana.length - 1);
    return v5Endings[kanaEndsWith];
  }
  // TODO，暂时防止报错，后面再改
  return 31;
};

export const convertVerbForm = (wordData: WordData, form: string) => {
  // jconj 函数用于获得单词的所有变形
  const pos = getPos(wordData.kana, wordData.type);
  const jconjResult = jconj(wordData, pos)[0][pos + formKeyMap[form]];

  // jconj 的返回结果格式为 やります【やります】，把它转化为对象
  const convertResult: ConvertResult = { kanji: '', kana: '' };
  const match = jconjResult.match(regex);
  if (match) {
    convertResult.kanji = jconjResult.substring(0, match.index! - 1);
    convertResult.kana = match[0];
  }
  return convertResult;
};
