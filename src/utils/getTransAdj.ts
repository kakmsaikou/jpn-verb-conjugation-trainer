import { jconj } from '../plugins/jconj/jconj';

const getPosNum = (wordData: WordData): number => {
  const { type } = wordData;
  if (type === 'adj_i') return 1;
  if (type === 'adj_na') return 15;
  return 0;
};

export const getTransAdj = (wordData: WordData, tense: AdjTense): [string, string] => {
  const pos = getPosNum(wordData);
  const tempWordData =
    wordData.type !== 'adj_na' ? wordData : { ...wordData, kanji: wordData.kanji + 'だ', kana: wordData.kana + 'だ' };

  const transwords = jconj(tempWordData, pos)[0];

  let conj: number = 0;
  let neg: boolean = false;
  let fml: boolean = false;

  switch (tense) {
    case 'simpleNegativeTense':
      conj = 1;
      neg = true;
      break;
    case 'simplePastTense':
      conj = 2;
      break;
    case 'simplePastNegativeTense':
      conj = 2;
      neg = true;
      break;
    case 'politeNegativeTense':
      conj = 1;
      neg = true;
      fml = true;
      break;
    case 'politePastTense':
      conj = 2;
      fml = true;
      break;
    case 'politePastNegativeTense':
      conj = 2;
      neg = true;
      fml = true;
      break;
  }

  const key = [pos, conj, neg, fml].join(',');
  const transword = transwords[key];
  const match = transword.match(/(?<=【).+?(?=】)/);

  const transwordArr: [string, string] = match
    ? [transword.substring(0, match.index! - 1), match[0]]
    : ['transwrdList[key] 错误', 'transwrdList[key] 错误'];

  return transwordArr;
};
