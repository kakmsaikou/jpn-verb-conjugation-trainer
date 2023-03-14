import { defineStore } from 'pinia';
import { wordDataList } from '../assets/wordDataList';
import { getArrayRandomIndex } from '../utils/getRandomIndex';

type State = {
  lastWordKanji: string;
  currentWordData: WordData | null;
};
type Getters = {
  wordData: () => WordData;
  kanji: () => string;
  kana: () => string;
  meaning: () => string;
};
type Actions = {
  refreshWordData: () => void;
};

const MAX_RANDOM_WORDS_COUNT = 3;

export const useWordDataStore = defineStore<string, State, Getters, Actions>('wordData', {
  state: () => ({
    lastWordKanji: '',
    currentWordData: null,
  }),
  getters: {
    wordData() {
      if (this.currentWordData === null) {
        const randomIndex = getArrayRandomIndex(wordDataList, MAX_RANDOM_WORDS_COUNT);
        this.currentWordData = wordDataList[randomIndex];
      }
      return this.currentWordData;
    },
    kanji(){
      return this.wordData.kanji;
    },
    kana(){
      return this.wordData.kana;
    },
    meaning(){
      return this.wordData.meaning;
    },
  },
  actions: {
    refreshWordData() {
      const randomIndex = getArrayRandomIndex(wordDataList, MAX_RANDOM_WORDS_COUNT);
      // 下面这段你可能会觉得我在脱裤子放屁。但如果不这么写的话，会出现内存内数组被篡改导致连续两次出现同一个单词的情况
      if (this.lastWordKanji === wordDataList[randomIndex].kanji) {
        return randomIndex > 1 ? wordDataList[randomIndex - 1] : wordDataList[randomIndex + 1];
      }
      this.lastWordKanji = wordDataList[randomIndex].kanji;
      // console.log(`wordDataList[${randomIndex}]:` + wordDataList[randomIndex].kanji);
      this.currentWordData = wordDataList[randomIndex];
    },
  },
});
