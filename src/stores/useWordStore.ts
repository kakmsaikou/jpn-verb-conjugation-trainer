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
  _selectedWordData: WordData | null;
  _answerArr: [string, string] | null;
};
type Getters = {
  attribute: () => WordAttribute;
  selectWordData: () => WordData;
  selectedWordList: () => WordData[];
  transwordArray: () => [string, string];
  formattedAnswer: () => string;
  isAnswerCorrect: () => (answer: string) => boolean;
  formattedType: () => WordType;
  formattedKanji: () => string;
};
type Actions = {
  refreshPos: () => void;
  refreshAttribute: () => void;
  refreshWordData: () => void;
  refreshAnswer: () => void;
  refreshWord: () => void;
};

const configStore = useConfigStore();

/*
 * 顺序：
 *   1. 获取词性 pos，包括动词、形容词，比如 verb、adj
 *   2. 获取形态 attribute，包括ます形、て形等等
 *   3. 获取单词 wordData
 *   4. 获取 correctAnswer
 */
export const useWordStore = defineStore<string, State, Getters, Actions>('Word', {
  state: () => ({
    pos: configStore.tempConfig.pos ? getKey(configStore.tempConfig.pos, POS_LIST) : 'verb',
    _form: null,
    _selectedWordData: null,
    _voices: null,
    _answerArr: null,
  }),
  getters: {
    // 获得形态 masu、te、ta、nai 和 adj
    attribute() {
      if (this._form === null) {
        this._form =
          this.pos === 'verb'
            ? getKey(configStore.tempConfig.verb!, VERB_FORM_LIST)
            : getKey(configStore.tempConfig.adj!, ADJ_TENSE_LIST);
      }
      return this._form;
    },
    selectedWordList() {
      return VERB_FORM_LIST.includes(this.attribute as VerbForm)
        ? getWordList(configStore.tempConfig.verb!, VERB_TYPE_LIST, verbList)
        : getWordList(configStore.tempConfig.adj!, ADJ_TYPE_LIST, adjList);
    },
    selectWordData() {
      if (this._selectedWordData === null) {
        const randomIndex = getIndex(this.selectedWordList, MAX_RANDOM_WORDS_COUNT);
        this._selectedWordData = this.selectedWordList[randomIndex];
      }
      return this._selectedWordData;
    },
    transwordArray() {
      if (this._answerArr === null) {
        if (this.pos === 'adj') {
          this._answerArr = getTransword(this.selectWordData, this.attribute);
        } else {
          this._answerArr = getTransword(this.selectWordData, this.attribute);
        }
      }
      return this._answerArr;
    },
    formattedAnswer() {
      return this.transwordArray[0] === this.transwordArray[1]
        ? this.transwordArray[0]
        : this.transwordArray[1] + '\n' + this.transwordArray[0];
    },
    isAnswerCorrect() {
      return (answer: string) => this.transwordArray.includes(answer);
    },
    formattedType() {
      return BILINGUAL_LIST[this.selectWordData.type] as WordType;
    },
    formattedKanji() {
      return BILINGUAL_LIST[this.attribute] ? BILINGUAL_LIST[this.attribute] : this.attribute;
    },
  },
  actions: {
    refreshPos() {
      this.pos = configStore.tempConfig.pos ? getKey(configStore.tempConfig.pos, POS_LIST) : 'verb';
    },
    refreshAttribute() {
      this._form =
        this.pos === 'verb'
          ? getKey(configStore.tempConfig.verb!, VERB_FORM_LIST)
          : getKey(configStore.tempConfig.adj!, ADJ_TENSE_LIST);
    },
    refreshWordData() {
      const index = getIndex(this.selectedWordList, MAX_RANDOM_WORDS_COUNT);
      this._selectedWordData = this.selectedWordList[index];
    },
    refreshAnswer() {
      if (this.pos === 'adj') {
        this._answerArr = getTransword(this.selectWordData, this.attribute);
      } else {
        this._answerArr = getTransword(this.selectWordData, this.attribute);
      }
    },
    refreshWord() {
      this.refreshPos();
      this.refreshAttribute();
      this.refreshWordData();
      this.refreshAnswer();
    },
  },
});
