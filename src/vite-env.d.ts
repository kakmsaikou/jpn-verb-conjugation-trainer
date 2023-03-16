/// <reference types="vite/client" />

// 动词配置相关
type VerbType = 'v1' | 'v5' | 'suru' | 'kuru';
type VerbForm = 'masu' | 'te' | 'ta' | 'nai' | 'ba' | 'masu_neg';
interface VerbData extends BaseWordData {
  type: VerbType;
}

// 形容词配置相关
type AdjType = 'adj_i';
interface AdjData extends BaseWordData {
  type: AdjType;
}

// 通用配置相关
interface Config {
  verb: Record<VerbForm, boolean>;
}
type WordType = VerbType | AdjType;
interface BaseWordData {
  kanji: string;
  kana: string;
  meaning: string;
}
interface WordData extends BaseWordData {
  type: VerbType | AdjType;
}




