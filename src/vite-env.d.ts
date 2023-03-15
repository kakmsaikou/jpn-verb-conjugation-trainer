/// <reference types="vite/client" />

interface WordData {
  kanji: string;
  kana: string;
  type: 'v1' | 'v5' | 'suru' | 'kuru';
  meaning: string;
}

type Form = 'masu' | 'te' | 'ta';

interface Config {
  verb: {
    masu: boolean;
    te: boolean;
    ta: boolean;
  };
}
