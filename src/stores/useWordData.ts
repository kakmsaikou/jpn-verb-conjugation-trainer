import { verbList } from './../assets/wordData/verbList';
import { adjList } from './../assets/wordData/adjList';
import { ADJ_FORM_LIST, VERB_FORM_LIST } from './../const/index';
import { useFormStore } from './useFormStore';
import { defineStore } from 'pinia';
import { MAX_RANDOM_WORDS_COUNT } from '../const';
import { getArrayRandomIndex } from '../utils/getRandomIndex';

type State = {
  _wordData: WordData | null;
};
type Getters = {
  filteredWordList: () => WordData[];
  wordData: (state: State) => WordData;
  kanji: () => string;
  kana: () => string;
  meaning: () => string;
};
type Actions = {
  refreshWordData: () => void;
};

const formStore = useFormStore();

export const useWordDataStore = defineStore<string, State, Getters, Actions>('wordData', {
  state: () => ({
    _wordData: null,
  }),
  getters: {
    filteredWordList: () => {
      if (VERB_FORM_LIST.includes(formStore.form as VerbForm)) {
        return verbList;
      }
      return adjList;
    },
    wordData() {
      if (this._wordData === null) {
        const randomIndex = getArrayRandomIndex(this.filteredWordList, MAX_RANDOM_WORDS_COUNT);
        this._wordData = this.filteredWordList[randomIndex];
      }
      return this._wordData;
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
      // 刷新 wordData 前必须要先刷新 form，否则会出现 form 和 wordData 不匹配的情况
      formStore.refreshForm();
      const index = getArrayRandomIndex(this.filteredWordList, MAX_RANDOM_WORDS_COUNT);
      this._wordData = this.filteredWordList[index];
    },
  },
});
