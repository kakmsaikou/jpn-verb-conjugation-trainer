/// <reference types="vite/client" />

type VerbType = 'v1' | 'v5' | 'suru' | 'kuru';

type AdjType = 'adj_i';

type Form = 'masu' | 'te' | 'ta' | 'nai' | 'ba' | 'masu_neg';

interface Config {
  verb: Record<Form, boolean>;
}

interface BaseWordData {
  kanji: string;
  kana: string;
  meaning: string;
}

interface WordData extends BaseWordData {
  type: VerbType | AdjType;
}

interface VerbData extends BaseWordData {
  type: VerbType;
}

interface AdjData extends BaseWordData {
  type: AdjType;
}
