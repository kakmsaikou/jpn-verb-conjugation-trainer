export const VERB_FORM_LIST: VerbForm[] = ['plain', 'masu', 'te', 'ta'];
export const ADJ_FORM_LIST: AdjForm[] = ['adj'];
export const WORD_FORM_LIST = [...VERB_FORM_LIST, ...ADJ_FORM_LIST] as const;

export const VERB_TYPE_LIST: VerbType[] = ['v1', 'v5', 'suru', 'kuru'];
export const ADJ_TYPE_LIST: AdjType[] = ['adj_i'];

export const BILINGUAL_LIST: Record<Pos | Sow | Polarity | Tense | WordForm, string> = {
  verb: '动词',
  adj: '形容词',
  plain: '基本形/简体',
  polite: '敬体',
  affirmative: '肯定',
  negative: '否定',
  present: '现在',
  past: '过去',
  masu: 'ます形',
  te: 'て形',
  ta: 'た形',
};

// 最大几次内单词不会重复
export const MAX_RANDOM_WORDS_COUNT = 3 as const;

export const INIT_CONFIG: Config = {
  pos: {
    verb: true,
    adj: true,
  },
  verb: {
    plain: true,
    masu: true,
    te: true,
    ta: true,
    polarity: {
      affirmative: true,
      negative: true,
    },
    tense: {
      present: true,
      past: true,
    },
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
};
