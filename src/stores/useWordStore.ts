import { getTransword } from './../utils/getTransword';
import { getKey } from './../utils/getKey';
import { useConfigStore } from './useConfigStore';
import { defineStore } from 'pinia';
import { getVoices } from '../utils/getVoices';
import { verbList } from '../assets/wordData/verbList';
import { adjList } from '../assets/wordData/adjList';
import { getIndex } from '../utils/getIndex';
import { myJconj } from '../utils/myJconj';
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
import { getTransAdj } from '../utils/getTransAdj';

type State = {
  pos: Pos;
  _form: WordForm | null | AdjTense;
  _word: WordData | null;
  _voices: Voices | null;
  _answerArr: [string, string] | null;
};
type Getters = {
  form: () => WordForm | AdjTense;
  word: () => WordData;
  voices: () => Record<Voice, boolean>;
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
    _voices: null,
    _answerArr: null,
  }),
  getters: {
    // 获得形态 masu、te、ta、nai 和 adj
    form() {
      if (this._form === null) {
        const tempForm: WordForm =
          this.pos === 'verb'
            ? getKey(configStore.tempConfig.verb!, VERB_FORM_LIST)
            : getKey(configStore.tempConfig.adj!, ADJ_TENSE_LIST);
        return (this._form = tempForm);
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
    // 获得语态
    voices() {
      if (this._voices === null) {
        this._voices = {
          present: true,
          negative: false,
          polite: false,
        };
        Object.assign(this._voices, getVoices());
      }
      return this._voices;
    },
    answerArr() {
      if (this._answerArr === null) {
        if (this.pos === 'adj') {
          this._answerArr = getTransAdj(this.word, this.form);
        } else {
          this._answerArr = getTransword(this.word, this.form, this.voices);
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
    refreshVoices() {
      if (this._voices !== null) {
        Object.assign(this._voices, getVoices());
      }
    },
    refreshAnswer() {
      if (this.pos === 'adj') {
        this._answerArr = getTransAdj(this.word, this.form);
      } else {
        this._answerArr = getTransword(this.word, this.form, this.voices);
      }
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
