import { jconj } from '../plugins/jconj/jconj';

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
const getPosNum = (wordData: WordData): number => {
  const { kana, type } = wordData;
  if (type === 'adj_i') return 1;
  if (type === 'adj_na') return 15;
  if (type === 'v1') return 28;
  if (type === 'v5') {
    const kanaEndsWith = kana.charAt(kana.length - 1);
    return v5Endings[kanaEndsWith];
  }
  if (type === 'kuru') return 45;
  if (type === 'suru') return 48;
  return 0;
};

export const getTransword = (wordData: WordData, form: WordForm, voices: Voices): [string, string] => {
  const pos = getPosNum(wordData);
  const transwords = jconj(wordData, pos)[0];

  // 根据 formal、past、negative 构造查询参数
  let conj: number = 0;
  let neg: boolean = false;
  let fml: boolean = false;

  switch (form) {
    // 一段动词的否定形的 conj 和其他样式不一样，否定形不能直接用 conj 来检索
    case 'politeForm':
    case 'politeNegativeForm':
    case 'politePastForm':
    case 'politePastNegativeForm':
      conj = 1;
      fml = true;
      break;
    case 'gerundForm':
      conj = 3;
      break;
    case 'simplePastForm':
      conj = 2;
      break;
    case 'simpleNegativeForm':
      conj = 1;
      neg = true;
      break;
    case 'simplePastNegativeForm':
      conj = 2;
      neg = true;
      break;
    case 'potential':
      conj = 5;
      break;
    case 'causative':
      conj = 7;
      break;
    case 'causativePassive':
      conj = 8;
      break;
    case 'volitional':
      conj = 9;
      break;
    case 'imperative':
      conj = 10;
      break;
    case 'prohibitive':
      conj = 10;
      neg = true;
      break;
  }

  const key = [pos, conj, neg, fml].join(',');
  const transword = transwords[key];
  const match = transword.match(/(?<=【).+?(?=】)/);

  const transwordArr: [string, string] = match
    ? [transword.substring(0, match.index! - 1), match[0]]
    : ['transwrdList[key] 错误', 'transwrdList[key] 错误'];

  if (['politeNegativeForm', 'politePastForm', 'politePastNegativeForm'].includes(form)) {
    let suffix = '';
    switch (form) {
      case 'politeNegativeForm':
        suffix = 'ません';
        break;
      case 'politePastForm':
        suffix = 'ました';
        break;
      case 'politePastNegativeForm':
        suffix = 'ませんでした';
        break;
    }
    for (let i = 0; i < transwordArr.length; i++) {
      transwordArr[i] = transwordArr[i].slice(0, -2) + suffix;
    }
  }

  return transwordArr;
};
