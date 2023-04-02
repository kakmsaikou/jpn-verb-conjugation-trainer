/// <reference types="vite/client" />

// 动词配置相关
type VerbType = 'v1' | 'v5' | 'suru' | 'kuru';
type VerbForm =
  | 'politeForm'
  | 'politePastForm'
  | 'politeNegativeForm'
  | 'politePastNegativeForm'
  | 'gerundForm'
  | 'simpleNegativeForm'
  | 'simplePastForm'
  | 'simplePastNegativeForm'
  | 'imperativeForm'
  | 'volitionalForm'
  | 'potentialForm'
  | 'causativeForm'
  | 'causativePassiveForm'
  | 'prohibitiveForm';
interface VerbData extends BaseWordData {
  type: VerbType;
}

// 形容词配置相关
type AdjType = 'adj_i' | 'adj_na';
type AdjTense =
  | 'simpleNegativeTense'
  | 'simplePastTense'
  | 'simplePastNegativeTense'
  | 'politeNegativeTense'
  | 'politePastTense'
  | 'politePastNegativeTense';
interface AdjData extends BaseWordData {
  type: AdjType;
}

// 通用配置相关
type Pos = 'verb' | 'adj';
interface BaseWordData {
  kanji: string;
  kana: string;
  meaning: string;
}
interface WordData extends BaseWordData {
  type: VerbType | AdjType;
}
type WordType = VerbType | AdjType;
type WordAttribute = VerbForm | AdjTense;
// userConfig 参数相关
type VerbConfig = Record<VerbType | VerbForm, boolean>;
type AdjConfig = Record<AdjType | AdjTense, boolean>;
type Pron = '平假名' | '罗马音' | '无注音';
type Config = {
  pron: Pron;
  voice: boolean;
  pos: Record<Pos, boolean>;
  verb: VerbConfig;
  adj: AdjConfig;
};
