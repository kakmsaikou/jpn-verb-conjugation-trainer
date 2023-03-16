import { useFormStore } from './useFormStore';
import { useWordDataStore } from './useWordData';
import { defineStore } from 'pinia';
import { convertWordForm } from '../utils/convertWordForm';

type State = {
  _correctAnswer: string[] | null;
};
type Getter = {
  correctAnswer: (state: State) => string[];
  isKanjiKanaEqual: () => boolean;
  kanji: () => string;
  kana: () => string;
  isAnswerCorrect: () => (answer: string) => boolean;
};
type Actions = {
  refreshCorrectAnswer: () => void;
};

const wordDataStore = useWordDataStore();
const formStore = useFormStore();

export const useCorrectAnswerStore = defineStore<string, State, Getter, Actions>('correctAnswer', {
  state: () => ({
    _correctAnswer: null,
  }),
  getters: {
    correctAnswer: state => {
      if (state._correctAnswer === null) {
        state._correctAnswer = convertWordForm(wordDataStore.wordData, formStore.form);
      }
      return state._correctAnswer;
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
    isAnswerCorrect() {
      return (answer: string) => this.correctAnswer.includes(answer);
    },
  },
  actions: {
    refreshCorrectAnswer() {
      // 必须要先刷新 form 在刷新 wordData，否则会出现 form 和 wordData 不匹配的情况
      // TODO 可以考虑吧 formStore.refreshForm() 直接放在 wordDataStore.refreshWordData() 里面
       formStore.refreshForm();
      wordDataStore.refreshWordData();
      this._correctAnswer = convertWordForm(wordDataStore.wordData, formStore.form);
    },
  },
});
