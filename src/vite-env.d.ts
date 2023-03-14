/// <reference types="vite/client" />

interface WordData {
  kanji: string;
  kana: string;
  type: 'v1' | 'v5' | 'suru' | 'kuru';
  meaning: string
}

// TODO 找一下怎么声明全局变量
const WORD_FORM_LIST = ['ます形', 'て形', 'た形'] as const;

type Form = typeof WORD_FORM_LIST[number];