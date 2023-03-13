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

/*
Number POS 对照表，详细参考：https://cobysy.github.io/jconj/
POS = 28  一段动词
POS = 29 一段动词 -kureru特殊类
POS = 30  五段动词 -aru特殊类
POS = 31  五段动词 -bu结尾
POS = 32  五段动词 -gu结尾
POS = 33  五段动词 -ku结尾
POS = 34  五段动词 -iku/yuku特殊类
POS = 35  五段动词 -mu结尾
POS = 36  五段动词 -nu结尾
POS = 37  五段动词 -ru结尾
POS = 38 五段动词 -ru结尾（不规则动词）
POS = 39  五段动词 -su结尾
POS = 40 五段动词 -tsu结尾
POS = 41 五段动词 -u结尾
POS = 42 五段动词 -u结尾（特殊类）
vk Kuru verb - special class POS = 43
vs noun or participle which takes the aux. verb suru POS = 44 名词或动词分词，需要助动词-suru
vs-i suru verb - irregular POS = 45 不规则动词
vs-s suru verb - special class POS = 46 助动词-suru特殊类
*/
export const jconj = (wordData: any, pos: number) => {
  const { kanji, kana, type } = wordData;
  // @ts-ignore
  const result = conjugatorInstance.conjugate(kanji, kana, pos, conjTables);
  return result;
};
