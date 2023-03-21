import { useConfigStore } from './../stores/useConfigStore';
import { SOW_LIST, POLARITY_LIST, TENSE_LIST } from './../const/index';
import { getKey } from './getKey';

// 这坨代码是个屎山，要改需要把 config 的数据结构都改了
const configStore = useConfigStore();

export const getVoices = (pos: Pos, form: WordForm, voices: Voices, type: WordType) => {
  if (pos === 'verb') {
    getVerbVoices(form, voices, configStore.tempConfig.verb!);
  } else if (pos === 'adj') {
    avoidPurePlainAdj(voices, configStore.tempConfig.adj!, type);
  }
};

const getVerbVoices = (form: WordForm, voices: Voices, verbConfig: VerbConfig) => {
  switch (form) {
    case 'plain':
      {
        form === 'plain' ? (voices.polite = false) : (voices.polite = true);
        avoidPurePlainVerb(voices, verbConfig);
      }
      break;
    case 'masu':
      {
        // const { polarity, tense } = configStore.tempConfig.verb!;
        voices.polite = true;
        voices.negative = getKey(verbConfig, POLARITY_LIST) === 'negative';
        voices.present = getKey(verbConfig, TENSE_LIST) === 'present';
      }
      break;
    case 'te':
      voices.polite = false;
      voices.negative = false;
      break;
  }
};

// 用于动词
const avoidPurePlainVerb = (voices: Voices, verbConfig: VerbConfig) => {
  voices.negative = getKey(verbConfig, POLARITY_LIST) === 'negative';
  voices.present = getKey(verbConfig, TENSE_LIST) === 'present';
  if (!voices.negative && voices.present) {
    avoidPurePlainVerb(voices, verbConfig);
  }
};

// 用于形容词
const avoidPurePlainAdj = (voices: Voices, adjConfig: AdjConfig, type: WordType) => {
  voices.polite = getKey(adjConfig, SOW_LIST) === 'polite';
  voices.negative = getKey(adjConfig, POLARITY_LIST) === 'negative';
  voices.present = getKey(adjConfig, TENSE_LIST) === 'present';
  // 防止出现「イ形 + 简体 + 肯定 + 现在」的结果
  if (type === 'adj_i' && !voices.polite && !voices.negative && voices.present) {
    avoidPurePlainAdj(voices, adjConfig, type);
  }
};
