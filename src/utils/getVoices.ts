import { useConfigStore } from '../stores/useConfigStore';
import { getKey } from './getKey';

const configStore = useConfigStore();

export const getVoices = (posStr: Pos, form: WordForm, voices: Voices, type: WordType) => {
  if (posStr === 'verb') {
    getVerbVoices(form, voices);
  } else if (posStr === 'adj') {
    avoidPurePlain(voices, configStore.tempConfig.adj!, type);
  }
};

const getVerbVoices = (form: WordForm, voices: Voices) => {
  voices.present = false;
  switch (form) {
    case 'plain':
      {
        const { polarity, tense } = configStore.tempConfig.verb!;
        voices.polite = false;
        setNegAndPresForPlain(voices, polarity, tense);
      }
      break;
    case 'masu':
      {
        const { polarity, tense } = configStore.tempConfig.verb!;
        voices.polite = true;
        setNegAndPres(voices, polarity, tense);
      }
      break;
    case 'te':
      voices.polite = false;
      voices.negative = false;
      break;
  }
};

// 用于形容词
const avoidPurePlain = (voices: Voices, voiceConfig: VoicesConfig, type: WordType) => {
  const { sow, polarity, tense } = voiceConfig;
  voices.polite = getKey(sow) === 'polite';
  setNegAndPres(voices, polarity, tense);
  
  // 防止出现「简体 + 肯定 + 现在」的结果
  if (!voices.polite && type !== 'adj_na') {
    if (!voices.negative && voices.present) {
      avoidPurePlain(voices, voiceConfig, type);
    }
  }
};

// 用于动词
const setNegAndPres = (voices: Voices, polarity: Record<Polarity, boolean>, tense: Record<Tense, boolean>) => {
  voices.negative = getKey(polarity) === 'negative';
  voices.present = getKey(tense) === 'present';
};

const setNegAndPresForPlain = (voices: Voices, polarity: Record<Polarity, boolean>, tense: Record<Tense, boolean>) => {
  voices.negative = getKey(polarity) === 'negative';
  voices.present = getKey(tense) === 'present';
  if(!voices.negative && voices.present) {
    setNegAndPresForPlain(voices, polarity, tense);
  }
}
