export const VERB_FORM_LIST: VerbForm[] = [
  'politeForm',
  'politeNegativeForm',
  'politePastForm',
  'politePastNegativeForm',
  'gerundForm',
  'simplePastForm',
  'simpleNegativeForm',
  'simplePastNegativeForm',
  'imperativeForm',
  'volitionalForm',
  'potentialForm',
  'causativeForm',
  'causativePassiveForm',
  'prohibitiveForm',
];

export const ADJ_TENSE_LIST: AdjTense[] = [
  'simpleNegativeTense',
  'simplePastTense',
  'simplePastNegativeTense',
  'politeNegativeTense',
  'politePastTense',
  'politePastNegativeTense',
];

export const VERB_TYPE_LIST: VerbType[] = ['v5', 'v1', 'suru', 'kuru'];
export const ADJ_TYPE_LIST: AdjType[] = ['adj_i', 'adj_na'];

export const POS_LIST: Pos[] = ['verb', 'adj'];

export const BILINGUAL_LIST: Record<
  Pos  | WordAttribute | VerbType | AdjType | AdjTense,
  string
> = {
  verb: '动词',
  adj: '形容词',
  politeForm: 'ます形',
  politeNegativeForm: '敬语否定形',
  politePastForm: '敬语过去形',
  politePastNegativeForm: '敬语过去否定形',
  gerundForm: 'て形',
  simplePastForm: 'た形',
  simpleNegativeForm: 'ない形',
  simplePastNegativeForm: '过去否定形',
  imperativeForm: '命令形',
  volitionalForm: '意志形',
  potentialForm: '可能形',
  causativeForm: '使役形',
  causativePassiveForm: '使役被动形',
  prohibitiveForm: '禁止形',
  simpleNegativeTense: '否定形',
  simplePastTense: '过去形',
  simplePastNegativeTense: '过去否定形',
  politeNegativeTense: '敬语否定形',
  politePastTense: '敬语过去形',
  politePastNegativeTense: '敬语过去否定形',
  v1: '一段动词',
  v5: '五段动词',
  suru: 'サ变动词',
  kuru: 'カ变动词',
  adj_i: 'イ形容词',
  adj_na: 'ナ形容词',
};

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
    politeForm: true,
    politeNegativeForm: false,
    politePastForm: false,
    politePastNegativeForm: false,
    gerundForm: true,
    simplePastForm: false,
    simpleNegativeForm: false,
    simplePastNegativeForm: false,
    imperativeForm: false,
    volitionalForm: false,
    potentialForm: false,
    causativeForm: false,
    causativePassiveForm: false,
    prohibitiveForm: false,
  },
  adj: {
    adj_i: true,
    adj_na: true,
    simpleNegativeTense: true,
    simplePastTense: true,
    simplePastNegativeTense: true,
    politeNegativeTense: false,
    politePastTense: false,
    politePastNegativeTense: false,
  },
};
