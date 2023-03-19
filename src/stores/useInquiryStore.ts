import { useFuckStore } from './useFuckStore';
import { myJconj } from '../utils/myJconj';
import { defineStore } from 'pinia';

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

const fuckStore = useFuckStore();

export const useInquiryStore = defineStore<string, State, Getter, Actions>('correctAnswer', {
  state: () => ({
    _correctAnswer: null,
  }),
  getters: {
    correctAnswer: state => {
      if (state._correctAnswer === null) {
        const { present, negative, polite } = fuckStore.voices;
        state._correctAnswer = myJconj(fuckStore.word, present, negative, polite);
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
      fuckStore.refreshFuck();
      const { present, negative, polite } = fuckStore.voices;
      this._correctAnswer = myJconj(fuckStore.word, present, negative, polite);
    },
  },
});
