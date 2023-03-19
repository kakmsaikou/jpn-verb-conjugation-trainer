import { useConfigStore } from './useConfigStore';
import { defineStore } from 'pinia';
import { BILINGUAL_LIST, MAX_RANDOM_WORDS_COUNT, VERB_FORM_LIST } from '../const';
import { getVoices } from '../utils/getVoices';
import { getKey } from '../utils/getKey';
import { verbList } from '../assets/wordData/verbList';
import { adjList } from '../assets/wordData/adjList';
import { getArrayRandomIndex } from '../utils/getRandomIndex';

type State = {
  pos: Pos;
  _form: WordForm | null;
  _word: WordData | null;
  _voices: Voices;
};
type Getters = {
  form: () => WordForm;
  word: () => WordData;
  voices: () => Record<Voice, boolean>;
  selectedWordList: () => WordData[];
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
  refreshFuck: () => void;
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
export const useFuckStore = defineStore<string, State, Getters, Actions>('Fuck', {
  state: () => ({
    pos: configStore.tempConfig.pos ? getKey(configStore.tempConfig.pos) : 'verb',
    _form: null,
    _word: null,
    _voices: {
      present: true,
      negative: false,
      polite: false,
    },
  }),
  getters: {
    // 获得形态 masu、te、ta、nai 和 adj
    form() {
      if (this._form === null) {
        return this.pos === 'verb' ? getKey(configStore.tempConfig.verb!) : 'adj';
      }
      return this._form;
    },
    selectedWordList() {
      if (VERB_FORM_LIST.includes(this.form as VerbForm)) {
        const selectedTypes = Object.keys(configStore.tempConfig.verb!.type_list);
        return verbList.filter(verb => selectedTypes.includes(verb.type));
      } else {
        const usedAdjList = Object.keys(configStore.tempConfig.adj!.type_list);
        return adjList.filter(adj => usedAdjList.includes(adj.type));
      }
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
      getVoices(this.pos, this.form, this._voices);
      return this._voices;
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
      this.pos = configStore.tempConfig.pos ? getKey(configStore.tempConfig.pos) : 'verb';
    },
    refreshForm() {
      this.pos === 'verb' ? getKey(configStore.tempConfig.verb!) : 'adj';
    },
    refreshWordData() {
      const index = getArrayRandomIndex(this.selectedWordList, MAX_RANDOM_WORDS_COUNT);
      this._word = this.selectedWordList[index];
    },
    refreshVoices() {
      getVoices(this.pos, this.form, this._voices);
    },
    refreshFuck() {
      this.refreshPos();
      this.refreshForm();
      this.refreshWordData();
      this.refreshVoices();
    },
  },
});
