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

const getPosNum = (wordData: WordData): number => {
  const { kana, type } = wordData;
  if (type === 'i') return 1;
  if (type === 'na') return 15;
  if (type === 'v1') return 28;
  if (type === 'v5') {
    const kanaEndsWith = kana.charAt(kana.length - 1);
    return v5Endings[kanaEndsWith];
  }
  if (type === 'kuru') return 45;
  if (type === 'suru') return 48;
  return 0;
};

export const getTransword = (
  wordData: WordData,
  form: WordForm
): [string, string] => {
  const pos = wordData.kana === 'いく' ? 34 : getPosNum(wordData);
  const tempWordData =
    wordData.type !== 'na'
      ? wordData
      : {
          ...wordData,
          kanji: wordData.kanji + 'だ',
          kana: wordData.kana + 'だ',
        };
  const transwords = jconj(tempWordData, pos)[0];

  let conj: number = 0;
  let neg: boolean = false;
  let fml: boolean = false;

  switch (form) {
    // 动词
    case 'verbPoliteForm':
    case 'verbPoliteNegativeForm':
      conj = 1;
      fml = true;
      break;
    case 'verbPolitePastNegativeForm':
      neg = true;
    case 'verbPolitePastForm':
      conj = 2;
      fml = true;
      break;
    case 'verbGerundForm':
      conj = 3;
      break;
    case 'verbSimplePastForm':
      conj = 2;
      break;
    case 'verbSimpleNegativeForm':
      conj = 1;
      neg = true;
      break;
    case 'verbSimplePastNegativeForm':
      conj = 2;
      neg = true;
      break;
    case 'verbPotentialForm':
      conj = 5;
      break;
    case 'verbCausativeForm':
      conj = 7;
      break;
    case 'verbCausativePassiveForm':
      conj = 8;
      break;
    case 'verbVolitionalForm':
      conj = 9;
      break;
    case 'verbImperativeForm':
      conj = 10;
      break;
    case 'verbProhibitiveForm':
      conj = 10;
      neg = true;
      break;
    // 形容词
    case 'adjSimpleNegativeForm':
      conj = 1;
      neg = true;
      break;
    case 'adjSimplePastForm':
      conj = 2;
      break;
    case 'adjSimplePastNegativeForm':
      conj = 2;
      neg = true;
      break;
    case 'adjPoliteNegativeForm':
      conj = 1;
      neg = true;
      fml = true;
      break;
    case 'adjPolitePastForm':
      conj = 2;
      fml = true;
      break;
    case 'adjPolitePastNegativeForm':
      conj = 2;
      neg = true;
      fml = true;
      break;
  }

  const key = [pos, conj, neg, fml].join(',');
  const transword = transwords[key];
  const match = transword.match(/(?<=【).+?(?=】)/);

  const transwordArray: [string, string] = match
    ? [transword.substring(0, match.index! - 1), match[0]]
    : ['transwrdList[key] 错误', 'transwrdList[key] 错误'];

  // 一段动词的否定形 'verbPoliteNegativeForm' 的 conj 和其他样式不一样，否定形不能直接用 conj 来检索
  if (['verbPoliteNegativeForm'].includes(form)) {
    for (let i = 0; i < transwordArray.length; i++) {
      transwordArray[i] = transwordArray[i].slice(0, -2) + 'ません';
    }
  }

  return transwordArray;
};
