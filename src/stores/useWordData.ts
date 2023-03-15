import { defineStore } from 'pinia';
import { wordDataList } from '../assets/wordDataList';
import { getArrayRandomIndex } from '../utils/getRandomIndex';

type State = {
  _wordData: WordData | null;
};
type Getters = {
  wordData: (state: State) => WordData;
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
    _wordData: null,
  }),
  getters: {
    wordData: state => {
      if (state._wordData === null) {
        const randomIndex = getArrayRandomIndex(wordDataList, MAX_RANDOM_WORDS_COUNT);
        state._wordData = wordDataList[randomIndex];
      }
      return state._wordData;
    },
    kanji() {
      return this.wordData.kanji;
    },
    kana() {
      return this.wordData.kana;
    },
    meaning() {
      return this.wordData.meaning;
    },
  },
  actions: {
    refreshWordData() {
      const index = getArrayRandomIndex(wordDataList, MAX_RANDOM_WORDS_COUNT);
      this._wordData = wordDataList[index];
    },
  },
});
