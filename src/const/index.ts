export const VERB_FORM_LIST: VerbForm[] = [
  'verbPoliteForm',
  'verbPoliteNegativeForm',
  'verbPolitePastForm',
  'verbPolitePastNegativeForm',
  'verbGerundForm',
  'verbSimplePastForm',
  'verbSimpleNegativeForm',
  'verbSimplePastNegativeForm',
  'verbImperativeForm',
  'verbVolitionalForm',
  'verbPotentialForm',
  'verbCausativeForm',
  'verbCausativePassiveForm',
  'verbProhibitiveForm',
];

export const ADJ_TENSE_LIST: AdjTense[] = [
  'adjSimpleNegativeForm',
  'adjSimplePastForm',
  'adjSimplePastNegativeForm',
  'adjPoliteNegativeForm',
  'adjPolitePastForm',
  'adjPolitePastNegativeForm',
];

export const VERB_TYPE_LIST: VerbType[] = ['v5', 'v1', 'suru', 'kuru'];
export const ADJ_TYPE_LIST: AdjType[] = ['adj_i', 'adj_na'];

export const POS_LIST: Pos[] = ['verb', 'adj'];

export const BILINGUAL_LIST: Record<
  Pos | WordForm | VerbType | AdjType | AdjTense,
  string
> = {
  verb: '动词',
  adj: '形容词',
  verbPoliteForm: 'ます形',
  verbPoliteNegativeForm: '敬语否定形',
  verbPolitePastForm: '敬语过去形',
  verbPolitePastNegativeForm: '敬语过去否定形',
  verbGerundForm: 'て形',
  verbSimplePastForm: 'た形',
  verbSimpleNegativeForm: 'ない形',
  verbSimplePastNegativeForm: '过去否定形',
  verbImperativeForm: '命令形',
  verbVolitionalForm: '意志形',
  verbPotentialForm: '可能形',
  verbCausativeForm: '使役形',
  verbCausativePassiveForm: '使役被动形',
  verbProhibitiveForm: '禁止形',
  adjSimpleNegativeForm: '否定形',
  adjSimplePastForm: '过去形',
  adjSimplePastNegativeForm: '过去否定形',
  adjPoliteNegativeForm: '敬语否定形',
  adjPolitePastForm: '敬语过去形',
  adjPolitePastNegativeForm: '敬语过去否定形',
  v1: '一段动词',
  v5: '五段动词',
  suru: 'サ变动词',
  kuru: 'カ变动词',
  adj_i: 'イ形容词',
  adj_na: 'ナ形容词',
};

export const INIT_CONFIG: Config = {
  pron: '平假名',
  target: 0,
  voice: false,
  getFormByWeight: false,
  pos: {
    verb: true,
    adj: false,
  },
  verb: {
    v1: true,
    v5: true,
    suru: true,
    kuru: true,
    verbPoliteForm: true,
    verbPoliteNegativeForm: false,
    verbPolitePastForm: false,
    verbPolitePastNegativeForm: false,
    verbGerundForm: true,
    verbSimplePastForm: false,
    verbSimpleNegativeForm: false,
    verbSimplePastNegativeForm: false,
    verbImperativeForm: false,
    verbVolitionalForm: false,
    verbPotentialForm: false,
    verbCausativeForm: false,
    verbCausativePassiveForm: false,
    verbProhibitiveForm: false,
  },
  adj: {
    adj_i: true,
    adj_na: true,
    adjSimpleNegativeForm: true,
    adjSimplePastForm: true,
    adjSimplePastNegativeForm: true,
    adjPoliteNegativeForm: false,
    adjPolitePastForm: false,
    adjPolitePastNegativeForm: false,
  },
};
