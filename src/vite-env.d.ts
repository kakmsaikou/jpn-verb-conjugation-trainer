/// <reference types="vite/client" />

// 动词配置相关
type VerbType = 'v1' | 'v5' | 'suru' | 'kuru';
type VerbForm = typeof VERB_FORM_LIST[number];
interface VerbData extends BaseWordData {
  type: VerbType;
}

// 形容词配置相关
type AdjType = 'adj_i';
type AdjForm = 'adj_pain' | 'adj_formal';
interface AdjData extends BaseWordData {
  type: AdjType;
}

// 通用配置相关
interface Config {
  verb: Record<VerbForm, boolean>;
  adj: Record<AdjForm, boolean>;
}
type WordType = VerbType | AdjType;
type WordForm = VerbForm | AdjForm;
interface BaseWordData {
  kanji: string;
  kana: string;
  meaning: string;
}
interface WordData extends BaseWordData {
  type: VerbType | AdjType;
}
