import { VueElementConstructor } from 'vue';
import { conjugator } from '.';
import conjTables from './conj-tables.json';

const conjugatorInstance = new conjugator();

export const jconj = (wordData: any) => {
  const { kanji, kana, type } = wordData;
  /*
  Number POS 对照表，详细参考：https://cobysy.github.io/jconj/
  v1 Ichidan verb POS = 28  一段动词
  v1-s Ichidan verb - kureru special class POS = 29 一段动词 -kureru特殊类
  v5aru Godan verb - -aru special class POS = 30  五段动词 -aru特殊类
  v5b Godan verb with `bu' ending POS = 31  五段动词 -bu结尾
  v5g Godan verb with `gu' ending POS = 32  五段动词 -gu结尾
  v5k Godan verb with `ku' ending POS = 33  五段动词 -ku结尾
  v5k-s Godan verb - Iku/Yuku special class POS = 34  五段动词 -iku/yuku特殊类
  v5m Godan verb with `mu' ending POS = 35  五段动词 -mu结尾
  v5n Godan verb with `nu' ending POS = 36  五段动词 -nu结尾
  v5r Godan verb with `ru' ending POS = 37  五段动词 -ru结尾
  v5r-i Godan verb with `ru' ending (irregular verb) POS = 38 五段动词 -ru结尾（不规则动词）
  v5s Godan verb with `su' ending POS = 39  五段动词 -su结尾
  v5t Godan verb with `tsu' ending POS = 40 五段动词 -tsu结尾
  v5u Godan verb with `u' ending POS = 41 五段动词 -u结尾
  v5u-s Godan verb with `u' ending (special class) POS = 42 五段动词 -u结尾（特殊类）
  vk Kuru verb - special class POS = 43
  vs noun or participle which takes the aux. verb suru POS = 44 名词或动词分词，需要助动词-suru
  vs-i suru verb - irregular POS = 45 不规则动词
  vs-s suru verb - special class POS = 46 助动词-suru特殊类
  */
  // @ts-ignore
  const result = conjugatorInstance.conjugate(kanji, kana, 37, conjTables);
  return result;
};
