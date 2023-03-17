export const VERB_FORM_LIST: VerbForm[] = ['masu', 'te', 'ta', 'nai'];
export const ADJ_FORM_LIST: AdjForm[] = ['adj'];
export const WORD_FORM_LIST = [...VERB_FORM_LIST, ...ADJ_FORM_LIST] as const;

export const VERB_TYPE_LIST: VerbType[] = ['v1', 'v5', 'suru', 'kuru'];
export const ADJ_TYPE_LIST: AdjType[] = ['adj_i'];

export const FORM_KANJI_MAP: Record<WordForm, string> = {
  masu: 'ます形',
  te: 'て形',
  ta: 'た形',
  nai: 'ない形',
  adj: '形容词',
} as const;

export const BILINGUAL_LIST = {
  verb: '动词',
  adj: '形容词',
  plain: '简体',
  polite: '敬体',
  affirmative: '肯定',
  negative: '否定',
  present: '现在',
  past: '过去',
};

// 最大几次内单词不会重复
export const MAX_RANDOM_WORDS_COUNT = 3 as const;

export const INIT_CONFIG: Config = {
  verb: {
    masu: true,
    te: true,
    ta: true,
    nai: true,
  },
  adj: {
    sow: {
      plain: true,
      polite: true,
    },
    polarity: {
      affirmative: true,
      negative: true,
    },
    tense: {
      present: true,
      past: true,
    },
  },
  pos: {
    verb: true,
    adj: true,
  },
} as const;
