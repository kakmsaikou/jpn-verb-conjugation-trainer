import { getKey } from './../utils/getKey';
import { useConfigStore } from './useConfigStore';
import { defineStore } from 'pinia';
import { getVoices } from '../utils/getVoices';
import { verbList } from '../assets/wordData/verbList';
import { adjList } from '../assets/wordData/adjList';
import { getArrayRandomIndex } from '../utils/getRandomIndex';
import { myJconj } from '../utils/myJconj';
import {
  POS_LIST,
  VERB_FORM_LIST,
  VERB_TYPE_LIST,
  ADJ_TYPE_LIST,
  MAX_RANDOM_WORDS_COUNT,
  BILINGUAL_LIST,
} from '../const';
import { getWordList } from '../utils/getWordList';

type State = {
  pos: Pos;
  _form: WordForm | null;
  _word: WordData | null;
  _voices: Voices;
  _answerArr: [string, string] | null;
};
type Getters = {
  form: () => WordForm;
  word: () => WordData;
  voices: () => Record<Voice, boolean>;
  selectedWordList: () => WordData[];
  answerArr: () => [string, string];
  answer: () => string;
  isAnswerCorrect: () => (answer: string) => boolean;
  kana: () => string;
  kanji: () => string;
  meaning: () => string;
  type: () => string;
  formKanji: () => string;
};
type Actions = {
  refreshPos: () => void;
  refreshForm: () => void;
  refreshWordData: () => void;
  refreshVoices: () => void;
  refreshAnswer: () => void;
  refreshWord: () => void;
};

const configStore = useConfigStore();

/*
 * 顺序：
 *   1. 获取词性 pos，包括动词、形容词，比如 verb、adj
 *   2. 获取形态 form，包括ます形、て形，比如 plain、masu、te、ta、nai 和 adj（形容词只有 adj）
 *   3. 获取单词 wordData
 *   4. 获取语态 voices，包括敬体、时态、否定形，是 myJconj 的查询参数，比如 {present: true, negative: false, polite: false}
 *   5. 获取 correctAnswer
 */
export const useWordStore = defineStore<string, State, Getters, Actions>('Word', {
  state: () => ({
    pos: configStore.tempConfig.pos ? getKey(configStore.tempConfig.pos, POS_LIST) : 'verb',
    _form: null,
    _word: null,
    _voices: {
      present: true,
      negative: false,
      polite: false,
    },
    _answerArr: null,
  }),
  getters: {
    // 获得形态 masu、te、ta、nai 和 adj
    form() {
      if (this._form === null) {
        return this.pos === 'verb' ? getKey(configStore.tempConfig.verb!, VERB_FORM_LIST) : 'adj';
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
        const randomIndex = getArrayRandomIndex(this.selectedWordList, MAX_RANDOM_WORDS_COUNT);
        this._word = this.selectedWordList[randomIndex];
      }
      return this._word;
    },
    // 获得语态
    voices() {
      getVoices(this.pos, this.form, this._voices, this.word.type);
      return this._voices;
    },
    answerArr() {
      if (this._answerArr === null) {
        const { present, negative, polite } = this.voices;
        this._answerArr = myJconj(this.word, present, negative, polite, this.form);
      }
      return this._answerArr;
    },
    answer() {
      return this.answerArr[0] === this.answerArr[1] ? this.answerArr[0] : this.answerArr[1] + '\n' + this.answerArr[0];
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
      return BILINGUAL_LIST[this.word.type];
    },
    formKanji() {
      if (this.pos === 'verb') {
        if (this.form === 'plain') {
          const polite = '基本形';
          const negative = this.voices.negative ? '，否定' : '';
          const present = this.voices.present ? '' : '，过去';
          const formKanji = polite + negative + present;
          switch (formKanji) {
            case '基本形，否定':
              return 'ない形';
            case '基本形，过去':
              return 'た形';
            case '基本形，否定，过去':
              return 'なか形，过去';
          }
          return polite + negative + present;
        } else if (this.form === 'masu') {
          const polite = 'ます形';
          const negative = this.voices.negative ? '，否定' : '';
          const present = this.voices.present ? '' : '，过去';
          return polite + negative + present;
        } else {
          return BILINGUAL_LIST[this.form] ? BILINGUAL_LIST[this.form] : this.form;
        }
      } else {
        const polite = this.voices.polite ? '敬体' : '简体';
        const negative = this.voices.negative ? '，否定' : '';
        const present = this.voices.present ? '' : '，过去';
        return polite + negative + present;
      }
    },
  },
  actions: {
    refreshPos() {
      this.pos = configStore.tempConfig.pos ? getKey(configStore.tempConfig.pos, POS_LIST) : 'verb';
    },
    refreshForm() {
      this.pos === 'verb' ? getKey(configStore.tempConfig.verb!, VERB_FORM_LIST) : 'adj';
    },
    refreshWordData() {
      const index = getArrayRandomIndex(this.selectedWordList, MAX_RANDOM_WORDS_COUNT);
      this._word = this.selectedWordList[index];
    },
    refreshVoices() {
      getVoices(this.pos, this.form, this._voices, this.word.type);
    },
    refreshAnswer() {
      const { present, negative, polite } = this.voices;
      this._answerArr = myJconj(this.word, present, negative, polite, this.form);
    },
    refreshWord() {
      this.refreshPos();
      this.refreshForm();
      this.refreshWordData();
      this.refreshVoices();
      this.refreshAnswer();
    },
  },
});
