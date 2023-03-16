import { VERB_TYPE_LIST, ADJ_TYPE_LIST } from './../const/index';
import { getPos } from './getPos';
/*
输入 wordData、formal、past、negative 会返回对应字符串
其中 wordData 是一个对象，包含了五个属性： kanji、kana、meaning、type
*/

import { jconj } from '../plugins/jconj/jconj';

const form = 'masu';

// formal 和 negative 都是可以直接拼接的，只有 past 需要特殊处理
export const myJconj = (
  wordData: WordData,
  present: boolean = true,
  negative: boolean = false,
  formal: boolean = false
) => {
  const pos = getPos(wordData);
  const transwrdList = jconj(wordData, pos)[0];
  // 根据 formal、past、negative 构造查询参数
  let conj: number = 0;
  const { type } = wordData;
  if (VERB_TYPE_LIST.includes(type as VerbType)) {
    // 说明这是个动词
    if (form === 'masu') {
      // conj = past ===
    }
  } else if (ADJ_TYPE_LIST.includes(type as AdjType)) {
    // 说明这是个形容词
    conj = present ? 1 : 2;
  }
  const key = [pos, conj, negative, formal].join(',');
  const transwrd = transwrdList[key];
  return transwrd;
};

export const test = () => {
  const wordData: WordData = { kanji: '新しい', kana: 'あたらしい', type: 'adj_i', meaning: '新' };
  const result = myJconj(wordData, true, false, false);
  console.log(result);
};
