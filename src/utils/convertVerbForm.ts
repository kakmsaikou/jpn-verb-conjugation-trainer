import { jconj } from '../plugins/jconj/jconj';
import { getPos } from './getPos';

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

export const convertVerbForm = (wordData: WordData, form: string) => {
  // jconj 函数用于获得单词的所有变形的对象集
  const pos = getPos(wordData);
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
