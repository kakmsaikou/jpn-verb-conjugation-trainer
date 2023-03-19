import { useWordStore } from './useWordStore';
import { myJconj } from '../utils/myJconj';
import { defineStore } from 'pinia';

type State = {
  _correctAnswer: string[] | null;
};
type Getter = {
  correctAnswer: (state: State) => string[];
  answer: () => string;
  isAnswerCorrect: () => (answer: string) => boolean;
};
type Actions = {
  refreshCorrectAnswer: () => void;
};

const WordStore = useWordStore();

export const useInquiryStore = defineStore<string, State, Getter, Actions>('correctAnswer', {
  state: () => ({
    _correctAnswer: null,
  }),
  getters: {
    correctAnswer: state => {
      if (state._correctAnswer === null) {
        const { present, negative, polite } = WordStore.voices;
        state._correctAnswer = myJconj(WordStore.word, present, negative, polite);
      }
      return state._correctAnswer;
    },
    answer(){
      return this.correctAnswer[0] === this.correctAnswer[1] ? this.correctAnswer[0] : this.correctAnswer[1] + '\n' + this.correctAnswer[0]
    },
    isAnswerCorrect() {
      return (answer: string) => this.correctAnswer.includes(answer);
    },
  },
  actions: {
    refreshCorrectAnswer() {
      WordStore.refreshWord();
      const { present, negative, polite } = WordStore.voices;
      this._correctAnswer = myJconj(WordStore.word, present, negative, polite);
    },
  },
});
