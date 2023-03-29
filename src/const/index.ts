export const VERB_FORM_LIST: VerbForm[] = [
  'plain',
  'masu',
  'te',
  'simple_past_form',
  'negative_form',
  'imperative',
  'volitional',
  'potential',
  'causative',
  'causative_passive',
  'prohibitive',
];
export const ADJ_FORM_LIST: AdjForm[] = ['adj'];

export const VERB_TYPE_LIST: VerbType[] = ['v5', 'v1', 'suru', 'kuru'];
export const ADJ_TYPE_LIST: AdjType[] = ['adj_i', 'adj_na'];

export const POS_LIST: Pos[] = ['verb', 'adj'];
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
  simple_past_form: 'た形',
  negative_form: 'ない形',
  imperative: '命令形',
  volitional: '意志形',
  potential: '可能形',
  causative: '使役形',
  causative_passive: '使役被动形',
  prohibitive: '禁止形',
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
  pron: '平假名',
  voice: false,
  pos: {
    verb: true,
    adj: false,
  },
  verb: {
    v1: true,
    v5: true,
    suru: true,
    kuru: true,
    plain: true,
    masu: true,
    te: true,
    simple_past_form: false,
    negative_form: false,
    imperative: false,
    volitional: false,
    potential: false,
    causative: false,
    causative_passive: false,
    prohibitive: false,
    affirmative: true,
    negative: true,
    present: true,
    past: true,
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
