export const VERB_FORM_LIST: VerbForm[] = ['masu', 'te', 'ta', 'nai', 'ba', 'masu_neg'];

export const FORM_KEY_MAP: Record<VerbForm, string> = {
  masu: ',1,false,true',
  te: ',3,false,false',
  ta: ',2,false,false',
  nai: ',1,true,false',
  ba: ',4,false,false',
  masu_neg: ',1,true,true',
};

export const FORM_KANJI_MAP: Record<VerbForm, string> = {
  masu: 'ます形',
  te: 'て形',
  ta: 'た形',
  nai: 'ない形',
  ba: 'ば形',
  masu_neg: 'ます的否定形',
};

// 最大几次内单词不会重复
export const MAX_RANDOM_WORDS_COUNT = 3;

export const INIT_CONFIG: Config = {
  verb: {
    masu: true,
    te: true,
    ta: true,
    nai: true,
    ba: true,
    masu_neg: true,
  },
};
