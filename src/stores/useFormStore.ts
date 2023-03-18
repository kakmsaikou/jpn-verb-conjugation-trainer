import { useConfigStore } from './useConfigStore';
import { defineStore } from 'pinia';
import { FORM_KANJI_MAP } from '../const';
import { getKey } from '../utils/createForm';

type State = {
  _pos: Pos | null;
  _voices: Record<Voice, boolean> | null;
  _form: WordForm | null;
};
type Getters = {
  posStr: () => Pos;
  form: () => WordForm;
  voices: () => Record<Voice, boolean>;
  formKanji: () => string;
};
type Actions = {
  refreshPos: () => void;
  refreshForm: () => void;
  refreshVoices: () => void;
};

const INIT_VOICES = {
  present: true,
  negative: false,
  polite: false,
};

const configStore = useConfigStore();

/*
 * 顺序：
 *   1. 获取词性 pos，包括动词、形容词，比如 verb、adj
 *   2. 获取形态 form，包括ます形、て形，比如 masu、te、ta、nai 和 adj
 *   3. 获取语态 voices，包括敬体、时态、否定形，是查询参数，比如 {present: true, negative: false, polite: false}
 */
// 这一页有好多 ! 断言，有空记得去掉
export const useFormStore = defineStore<string, State, Getters, Actions>('formStore', {
  state: () => ({
    _pos: null,
    _form: null,
    _voices: null,
  }),
  getters: {
    // 获得词性
    posStr() {
      if (this._pos === null) {
        return (this._pos = configStore.tempConfig.pos ? getKey(configStore.tempConfig.pos) : 'verb');
      }
      return this._pos;
    },
    // 获得形态
    form() {
      if (this.posStr === 'verb') {
        return (this._form = getKey(configStore.tempConfig.verb!));
      } else {
        return (this._form = 'adj');
      }
    },
    // 获得语态
    voices() {
      if (this._voices === null) {
        this._voices = INIT_VOICES;
      }
      if (this.posStr === 'verb') {
        this._voices.present = false;
        switch (this.form) {
          case 'masu':
            this._voices.polite = true;
            this._voices.negative = false;
            break;
          case 'te':
            this._voices.polite = false;
            this._voices.negative = false;
            break;
          case 'ta':
            this._voices.polite = false;
            this._voices.negative = false;
            break;
          case 'nai':
            this._voices.polite = false;
            this._voices.negative = true;
            break;
        }
      } else if (this.posStr === 'adj') {
        const { sow, polarity, tense } = configStore.tempConfig.adj!;
        this._voices.polite = getKey(sow) === 'polite';
        this._voices.negative = getKey(polarity) === 'negative';
        this._voices.present = getKey(tense) === 'present';
      }
      return this._voices;
    },
    formKanji() {
      if (this.posStr === 'verb') {
        return FORM_KANJI_MAP[this.form] ? FORM_KANJI_MAP[this.form] : this.form;
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
      this._pos = configStore.tempConfig.pos ? getKey(configStore.tempConfig.pos) : 'verb';
    },
    refreshVoices() {
      // 每次获得 voices 前，都要刷新 pos
      this.refreshPos();
      if (this._voices === null) {
        this._voices = INIT_VOICES;
      }
      if (this.posStr === 'verb') {
        this._voices.present = false;
        switch (this.form) {
          case 'masu':
            this._voices.polite = true;
            this._voices.negative = false;
            break;
          case 'te':
            this._voices.polite = false;
            this._voices.negative = false;
            break;
          case 'ta':
            this._voices.polite = false;
            this._voices.negative = false;
            break;
          case 'nai':
            this._voices.polite = false;
            this._voices.negative = true;
            break;
        }
      } else if (this.posStr === 'adj') {
        const { sow, polarity, tense } = configStore.tempConfig.adj!;
        this._voices.polite = getKey(sow) === 'polite';
        this._voices.negative = getKey(polarity) === 'negative';
        this._voices.present = getKey(tense) === 'present';
      }
    },
    refreshForm() {
      // 每次获得 form 前，都要刷新 voices
      this.refreshVoices();
      if (this._form === null) {
        if (this.posStr === 'verb') {
          this._form = getKey(configStore.tempConfig.verb!);
        } else {
          this._form = 'adj';
        }
      }
    },
  },
});
