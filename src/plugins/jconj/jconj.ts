import { conjugator } from '.';
import conjTables from './conj-tables.json';

const conjugatorInstance = new conjugator();
/*
jconj 函数用于获得单词的所有变形
它的返回值是一个对象，对象的 key 是变形的类型参数，value 是变形的结果
比如
对于后面的参数，根据不同的变形有不同的值，其中：
原型：,1,false,false
ます形：,1,false,true
て形：,3,false,false
た形：,2,false,false
ない形：,1,true,false
ば形：,37,13,false,false
*/

export const jconj = (wordData: WordData, pos: number) => {
  const { kanji, kana, type } = wordData;
  // @ts-ignore
  const result = conjugatorInstance.conjugate(kanji, kana, pos, conjTables);
  return result;
};
