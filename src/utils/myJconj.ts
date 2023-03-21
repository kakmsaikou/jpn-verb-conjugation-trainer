import { VERB_TYPE_LIST, ADJ_TYPE_LIST } from './../const/index';
import { getPosNum } from './getPosNum';
import { jconj } from '../plugins/jconj/jconj';
/*
 * 输入 wordData、present、formal、negative 会返回对应字符串
 * 其中 wordData 是一个对象，包含了五个属性： kanji、kana、meaning、type
 */
type MyJconj = (
  wordData: WordData,
  present: boolean,
  negative: boolean,
  polite: boolean,
  form: WordForm
) => [string, string];
export const myJconj: MyJconj = (wordData, present = true, negative = false, polite = false, form) => {
  // formal 和 negative 都是可以直接拼接的，只有 present 需要特殊处理
  let transwrdList;
  const pos = getPosNum(wordData);
  if (wordData.type === 'adj_na') {
    const tempWordData: WordData = {
      kanji: wordData.kanji + 'だ',
      kana: wordData.kana + 'だ',
      meaning: wordData.meaning,
      type: 'adj_na',
    };
    transwrdList = jconj(tempWordData, pos)[0];
  } else {
    transwrdList = jconj(wordData, pos)[0];
  }

  // 根据 formal、past、negative 构造查询参数
  let conj: number = 0;
  const { type } = wordData;
  if (VERB_TYPE_LIST.includes(type as VerbType)) {
    switch (form) {
      case 'plain':
        conj = present ? 1 : 2;
        break;
      case 'masu':
        // 敬体、敬体过去形、敬体否定形、敬体否定过去形
        conj = present ? 1 : 2;
        break;
      case 'te':
        conj = 3;
        break;
    }
  } else if (ADJ_TYPE_LIST.includes(type as AdjType)) {
    conj = present ? 1 : 2;
  }
  const key = [pos, conj, negative, polite].join(',');
  const transwrd = transwrdList[key];
  const match = transwrd.match(/(?<=【).+?(?=】)/);
  return match
    ? [transwrd.substring(0, match.index! - 1), match[0]]
    : ['transwrdList[key] 错误', 'transwrdList[key] 错误'];
};
