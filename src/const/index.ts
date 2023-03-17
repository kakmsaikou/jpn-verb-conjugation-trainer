export const VERB_FORM_LIST = ['masu', 'te', 'ta', 'nai', 'ba', 'masu_neg'] as const;
export const ADJ_FORM_LIST = ['adj_plain', 'adj_formal'] as const;
export const WORD_FORM_LIST = [...VERB_FORM_LIST, ...ADJ_FORM_LIST] as const;

export const VERB_TYPE_LIST = ['v1', 'v5', 'suru', 'kuru'] as const;
export const ADJ_TYPE_LIST = ['adj_i'] as const;

export const FORM_KEY_MAP: Record<WordForm, string> = {
  masu: ',1,false,true',
  te: ',3,false,false',
  ta: ',2,false,false',
  nai: ',1,true,false',
  ba: ',4,false,false',
  masu_neg: ',1,true,true',
  adj_plain: ',1,false,false',
  adj_formal: ',1,false,true',
} as const;

export const FORM_KANJI_MAP: Record<WordForm, string> = {
  masu: 'ます形',
  te: 'て形',
  ta: 'た形',
  nai: 'ない形',
  ba: 'ば形',
  masu_neg: 'ます的否定形',
  adj_plain: '简体',
  adj_formal: '敬体',
} as const;

// 最大几次内单词不会重复
export const MAX_RANDOM_WORDS_COUNT = 3 as const;

export const INIT_CONFIG: Config = {
  verb: {
    masu: true,
    te: true,
    ta: true,
    nai: true,
    ba: true,
    masu_neg: true,
  },
  adj: {
    adj_plain: true,
    adj_formal: true,
  },
  pos: {
    verb: true,
    adj: true,
  }
} as const;
