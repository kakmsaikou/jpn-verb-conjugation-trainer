import { useConfigStore } from '../stores/useConfigStore';
import { getKey } from './getKey';

const configStore = useConfigStore();

export const getVoices = (posStr: Pos, form: WordForm, voices: Voices) => {
  if (posStr === 'verb') {
    getVerbVoices(form, voices);
  } else if (posStr === 'adj') {
    getAdjVoices(voices);
  }
};

const getVerbVoices = (form: WordForm, voices: Voices) => {
  voices.present = false;
  switch (form) {
    case 'masu':
      voices.polite = true;
      voices.negative = false;
      break;
    case 'te':
      voices.polite = false;
      voices.negative = false;
      break;
    case 'ta':
      voices.polite = false;
      voices.negative = false;
      break;
    case 'nai':
      voices.polite = false;
      voices.negative = true;
      break;
  }
};

const getAdjVoices = (voices: Voices) => {
  const { sow, polarity, tense } = configStore.tempConfig.adj!;

  const avoidPurePlain = (voices: Voices) => {
    voices.polite = getKey(sow) === 'polite';
    voices.negative = getKey(polarity) === 'negative';
    voices.present = getKey(tense) === 'present';

    // 防止出现「简体 + 肯定 + 现在」的结果
    if (!voices.polite) {
      if (!voices.negative && voices.present) {
        avoidPurePlain(voices);
      }
    }
  };
  avoidPurePlain(voices);
};
