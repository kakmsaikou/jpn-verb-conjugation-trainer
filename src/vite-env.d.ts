/// <reference types="vite/client" />

interface WordData {
  kanji: string;
  kana: string;
  type: 'v1' | 'v5' | 'suru' | 'kuru';
  meaning: string
}