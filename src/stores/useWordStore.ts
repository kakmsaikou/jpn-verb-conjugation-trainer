import { getTransword } from './../utils/getTransword';
import { getKey } from './../utils/getKey';
import { useConfigStore } from './useConfigStore';
import { defineStore } from 'pinia';
import { verbList } from '../assets/wordData/verbList';
import { adjList } from '../assets/wordData/adjList';
import { getIndex } from '../utils/getIndex';
import {
  POS_LIST,
  VERB_FORM_LIST,
  VERB_TYPE_LIST,
  ADJ_TYPE_LIST,
  MAX_RANDOM_WORDS_COUNT,
  BILINGUAL_LIST,
  ADJ_TENSE_LIST,
} from '../const';
import { getWordList } from '../utils/getWordList';

type State = {
  pos: Pos;
  _form: WordAttribute | null;
  _word: WordData | null;
  _answerArr: [string, string] | null;
};
type Getters = {
  form: () => WordAttribute;
  word: () => WordData;
  selectedWordList: () => WordData[];
  answerArr: () => [string, string];
  answer: () => string;
  answerKana: () => string;
  isAnswerCorrect: () => (answer: string) => boolean;
  kana: () => string;
  kanji: () => string;
  meaning: () => string;
  type: () => WordType;
  formKanji: () => string;
};
type Actions = {
  refreshPos: () => void;
  refreshForm: () => void;
  refreshWordData: () => void;
  refreshAnswer: () => void;
  refreshWord: () => void;
};

const configStore = useConfigStore();

/*
 * 顺序：
 *   1. 获取词性 pos，包括动词、形容词，比如 verb、adj
 *   2. 获取形态 form，包括ます形、て形等等
 *   3. 获取单词 wordData
 *   4. 获取 correctAnswer
 */
export const useWordStore = defineStore<string, State, Getters, Actions>('Word', {
  state: () => ({
    pos: configStore.tempConfig.pos ? getKey(configStore.tempConfig.pos, POS_LIST) : 'verb',
    _form: null,
    _word: null,
    _voices: null,
    _answerArr: null,
  }),
  getters: {
    // 获得形态 masu、te、ta、nai 和 adj
    form() {
      if (this._form === null) {
        this._form =
          this.pos === 'verb'
            ? getKey(configStore.tempConfig.verb!, VERB_FORM_LIST)
            : getKey(configStore.tempConfig.adj!, ADJ_TENSE_LIST);
      }
      return this._form;
    },
    selectedWordList() {
      return VERB_FORM_LIST.includes(this.form as VerbForm)
        ? getWordList(configStore.tempConfig.verb!, VERB_TYPE_LIST, verbList)
        : getWordList(configStore.tempConfig.adj!, ADJ_TYPE_LIST, adjList);
    },
    word() {
      if (this._word === null) {
        const randomIndex = getIndex(this.selectedWordList, MAX_RANDOM_WORDS_COUNT);
        this._word = this.selectedWordList[randomIndex];
      }
      return this._word;
    },
    answerArr() {
      if (this._answerArr === null) {
        if (this.pos === 'adj') {
          this._answerArr = getTransword(this.word, this.form);
        } else {
          this._answerArr = getTransword(this.word, this.form);
        }
      }
      return this._answerArr;
    },
    answer() {
      return this.answerArr[0] === this.answerArr[1] ? this.answerArr[0] : this.answerArr[1] + '\n' + this.answerArr[0];
    },
    answerKana() {
      return this.answerArr[0];
    },
    isAnswerCorrect() {
      return (answer: string) => this.answerArr.includes(answer);
    },
    kanji() {
      return this.word.kanji;
    },
    kana() {
      return this.word.kana;
    },
    meaning() {
      return this.word.meaning;
    },
    type() {
      return BILINGUAL_LIST[this.word.type] as WordType;
    },
    formKanji() {
      return BILINGUAL_LIST[this.form] ? BILINGUAL_LIST[this.form] : this.form;
    },
  },
  actions: {
    refreshPos() {
      this.pos = configStore.tempConfig.pos ? getKey(configStore.tempConfig.pos, POS_LIST) : 'verb';
    },
    refreshForm() {
      this._form =
        this.pos === 'verb'
          ? getKey(configStore.tempConfig.verb!, VERB_FORM_LIST)
          : getKey(configStore.tempConfig.adj!, ADJ_TENSE_LIST);
    },
    refreshWordData() {
      const index = getIndex(this.selectedWordList, MAX_RANDOM_WORDS_COUNT);
      this._word = this.selectedWordList[index];
    },
    refreshAnswer() {
      if (this.pos === 'adj') {
        this._answerArr = getTransword(this.word, this.form);
      } else {
        this._answerArr = getTransword(this.word, this.form);
      }
    },
    refreshWord() {
      this.refreshPos();
      this.refreshForm();
      this.refreshWordData();
      this.refreshAnswer();
    },
  },
});
