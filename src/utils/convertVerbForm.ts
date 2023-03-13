import { jconj } from "../plugins/jconj/jconj";

interface ConvertResult {
  kanji: string;
  kana: string;
}

const regex = /(?<=【).+?(?=】)/;
const formKeyMap: Record<string, string> = {
  'ます形': ',1,false,true',
  'て形': ',3,false,false',
  'た形': ',2,false,false',
  'ない形': ',1,true,false',
  'ば形': ',13,false,false',
}

export const convertVerbForm = (wordData: WordData, form: string) => {
  // jconj 函数用于获得单词的所有变形
  const jconjResult = jconj(wordData)[0][37 + formKeyMap[form]];
  
  // jconj 的返回结果格式为 やります【やります】，把它转化为对象
  const convertResult: ConvertResult = {kanji:'', kana:''}
  const match = jconjResult.match(regex);
  if (match) {
    convertResult.kanji = jconjResult.substring(0, match.index! -1);
    convertResult.kana = match[0];
  }
  return convertResult;
}