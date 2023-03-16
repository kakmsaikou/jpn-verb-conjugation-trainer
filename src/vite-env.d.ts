/// <reference types="vite/client" />

interface WordData {
  kanji: string;
  kana: string;
  type: 'v1' | 'v5' | 'suru' | 'kuru';
  meaning: string;
}

type Form = 'masu' | 'te' | 'ta' | 'nai' | 'ba' | 'masu_neg'

interface Config {
  verb: Record<Form, boolean>
}

