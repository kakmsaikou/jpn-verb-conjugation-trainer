export const VERB_FORM_LIST: VerbForm[] = ['plain', 'masu', 'te'];
export const ADJ_FORM_LIST: AdjForm[] = ['adj'];

export const VERB_TYPE_LIST: VerbType[] = ['v5', 'v1', 'suru', 'kuru'];
export const ADJ_TYPE_LIST: AdjType[] = ['adj_i', 'adj_na'];

export const SOW_LIST: Sow[] = ['plain', 'polite'];
export const POLARITY_LIST: Polarity[] = ['affirmative', 'negative'];
export const TENSE_LIST: Tense[] = ['present', 'past'];

export const BILINGUAL_LIST: Record<Pos | Sow | Polarity | Tense | WordForm | VerbType | AdjType, string> = {
  verb: '动词',
  adj: '形容词',
  plain: '基本形 / 简体',
  polite: '敬体',
  affirmative: '肯定',
  negative: '否定',
  present: '现在',
  past: '过去',
  masu: 'ます形',
  te: 'て形',
  v1: '一段动词',
  v5: '五段动词',
  suru: 'サ变动词',
  kuru: 'カ变动词',
  adj_i: 'イ形容词',
  adj_na: 'ナ形容词',
};

// 最大几次内单词不会重复
export const MAX_RANDOM_WORDS_COUNT = 0 as const;

export const INIT_CONFIG: Config = {
  pos: {
    verb: true,
    adj: true,
  },
  verb: {
    type_list: {
      v1: true,
      v5: true,
      suru: true,
      kuru: true,
    },
    plain: true,
    masu: true,
    te: true,
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
    adj_i: true,
    adj_na: true,
    plain: true,
    polite: true,
    affirmative: true,
    negative: true,
    present: true,
    past: true,
  },
};
