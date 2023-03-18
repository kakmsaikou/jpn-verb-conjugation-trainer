/// <reference types="vite/client" />

// 动词配置相关
type VerbType = 'v1' | 'v5' | 'suru' | 'kuru';
type VerbForm = 'masu' | 'te' | 'ta' | 'nai';
interface VerbData extends BaseWordData {
  type: VerbType;
}

// 形容词配置相关
type AdjType = 'adj_i';
type AdjForm = 'adj';
interface AdjData extends BaseWordData {
  type: AdjType;
}

// 通用配置相关
type Pos = 'verb' | 'adj';
type Sow = 'plain' | 'polite'; // Style of Writing 文体
type Polarity = 'affirmative' | 'negative';
type Tense = 'present' | 'past';
type VerbForm = 'masu' | 'te' | 'ta' | 'nai';

type Config = {
  pos: Record<Pos, boolean>;
  verb: Record<VerbForm, boolean>;
  adj: {
    sow: Record<Sow, boolean>;
    polarity: Record<Polarity, boolean>;
    tense: Record<Tense, boolean>;
  };
};
type Voice = 'present' | 'negative' | 'polite';
type Voices = Record<Voice, boolean>;
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
