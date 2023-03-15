import { useFormStore } from './useFormStore';
import { useWordDataStore } from './useWordData';
import { defineStore } from 'pinia';
import { convertVerbForm } from '../utils/convertVerbForm';

type State = {
  currentCorrectAnswer: string[] | null;
};
type Getter = {
  correctAnswer: () => string[];
  isKanjiKanaEqual: () => boolean;
  kanji: () => string;
  kana: () => string;
};
type Actions = {
  isAnswerCorrect: (answer: string) => boolean;
  refreshCorrectAnswer: () => void;
};

const wordDataStore = useWordDataStore();
const formStore = useFormStore();

export const useCorrectAnswerStore = defineStore<string, State, Getter, Actions>('correctAnswer', {
  state: () => ({
    currentCorrectAnswer: null,
  }),
  getters: {
    correctAnswer() {
      if (this.currentCorrectAnswer === null) {
        this.currentCorrectAnswer = convertVerbForm(wordDataStore.wordData, formStore.form);
      }
      return this.currentCorrectAnswer;
    },
    kanji() {
      return this.correctAnswer[0];
    },
    kana() {
      return this.correctAnswer[1];
    },
    isKanjiKanaEqual() {
      return this.correctAnswer[0] === this.correctAnswer[1];
    },
  },
  actions: {
    isAnswerCorrect(answer: string) {
      return this.correctAnswer.includes(answer);
    },
    refreshCorrectAnswer() {
      wordDataStore.refreshWordData();
      formStore.refreshForm();
      this.currentCorrectAnswer = convertVerbForm(wordDataStore.wordData, formStore.form);
    },
  },
});
