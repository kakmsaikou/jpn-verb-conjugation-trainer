import { SOW_LIST, POLARITY_LIST, TENSE_LIST } from './../const/index';
import { useConfigStore } from '../stores/useConfigStore';
import { getKey, getKeyFuck } from './getKey';

// 这坨代码是个屎山，要改需要把 config 的数据结构都改了
const configStore = useConfigStore();

export const getVoices = (pos: Pos, form: WordForm, voices: Voices, type: WordType) => {
  if (pos === 'verb') {
    getVerbVoices(form, voices);
  } else if (pos === 'adj') {
    avoidPurePlainAdj(voices, configStore.tempConfig.adj!, type);
  }
};

const getVerbVoices = (form: WordForm, voices: Voices) => {
  switch (form) {
    case 'plain':
      {
        const { polarity, tense } = configStore.tempConfig.verb!;
        form === 'plain' ? (voices.polite = false) : (voices.polite = true);
        avoidPurePlainVerb(voices, polarity, tense);
      }
      break;
    case 'masu':
      {
        const { polarity, tense } = configStore.tempConfig.verb!;
        voices.polite = true;
        voices.negative = getKey(polarity) === 'negative';
        voices.present = getKey(tense) === 'present';
      }
      break;
    case 'te':
      voices.polite = false;
      voices.negative = false;
      break;
  }
};

// 用于动词
const avoidPurePlainVerb = (voices: Voices, polarity: Record<Polarity, boolean>, tense: Record<Tense, boolean>) => {
  voices.negative = getKey(polarity) === 'negative';
  voices.present = getKey(tense) === 'present';
  if (!voices.negative && voices.present) {
    avoidPurePlainVerb(voices, polarity, tense);
  }
};

// 用于形容词
const avoidPurePlainAdj = (voices: Voices, adjConfig: adjConfig, type: WordType) => {
  voices.polite = getKeyFuck(adjConfig, SOW_LIST) === 'polite';
  voices.negative = getKeyFuck(adjConfig, POLARITY_LIST) === 'negative';
  voices.present = getKeyFuck(adjConfig, TENSE_LIST) === 'present';

  // 防止出现「イ形 + 简体 + 肯定 + 现在」的结果
  if (type === 'adj_i' && !voices.polite && !voices.negative && voices.present) {
    avoidPurePlainAdj(voices, adjConfig, type);
  }
};
