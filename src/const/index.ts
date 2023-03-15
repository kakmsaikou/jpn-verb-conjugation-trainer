export const FORM_LIST: Form[] = ['masu', 'te', 'ta'];

export const FORM_KEY_MAP: Record<Form, string> = {
  masu: ',1,false,true',
  te: ',3,false,false',
  ta: ',2,false,false',
  // ない形: ',1,true,false',
  // ば形: ',13,false,false',
};

export const FORM_KANJI_MAP: Record<Form, string> = {
  masu: 'ます形',
  te: 'て形',
  ta: 'た形',
  // ない形: 'ない',
  // ば形: 'ば',
};

// 最大几次内单词不会重复
export const MAX_RANDOM_WORDS_COUNT = 3;

export const INIT_CONFIG: Config = {
  verb: {
    'masu': true,
    'te': true,
    "ta": true,
  },
};