import { useConfigStore } from './useConfigStore';
import { defineStore } from 'pinia';
import { BILINGUAL_LIST } from '../const';
import { getVoices } from '../utils/getVoices';
import { getKey } from '../utils/getKey';

type State = {
  _pos: Pos | null;
  _voices: Voices;
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

const configStore = useConfigStore();

/*
 * 顺序：
 *   1. 获取词性 pos，包括动词、形容词，比如 verb、adj
 *   2. 获取形态 form，包括ます形、て形，比如 plain、masu、te、ta、nai 和 adj（形容词只有 adj）
 *   3. 获取语态 voices，包括敬体、时态、否定形，是 myJconj 的查询参数，比如 {present: true, negative: false, polite: false}
 */
// 这一页有好多 ! 断言，有空记得去掉
export const useFormStore = defineStore<string, State, Getters, Actions>('formStore', {
  state: () => ({
    _pos: null,
    _form: null,
    _voices: {
      present: true,
      negative: false,
      polite: false,
    },
  }),
  getters: {
    // 获得词性 verb、adj
    posStr() {
      if (this._pos === null) {
        return (this._pos = configStore.tempConfig.pos ? getKey(configStore.tempConfig.pos) : 'verb');
      }
      return this._pos;
    },
    // 获得形态 masu、te、ta、nai 和 adj
    form() {
      if (this.posStr === 'verb') {
        return (this._form = getKey(configStore.tempConfig.verb!));
      } else {
        return (this._form = 'adj');
      }
    },
    // 获得语态
    voices() {
      getVoices(this.posStr, this.form, this._voices);
      return this._voices;
    },
    formKanji() {
      if (this.posStr === 'verb') {
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
      this._pos = configStore.tempConfig.pos ? getKey(configStore.tempConfig.pos) : 'verb';
    },
    refreshVoices() {
      // 每次获得 voices 前，都要刷新 pos
      this.refreshPos();
      getVoices(this.posStr, this.form, this._voices);
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
