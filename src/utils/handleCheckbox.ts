import { SOW_LIST, TENSE_LIST, POLARITY_LIST } from './../const/index';

type VoiceRecord = Record<Sow, boolean> | Record<Tense, boolean> | Record<Polarity, boolean>;

const autoCheck = (voice: any, key: any, voiceList: string[]) => {
  if (!voice[voiceList[0]] === !voice[voiceList[1]]) {
    const target = voiceList[1 - voiceList.indexOf(key)];
    voice[target] = true;
  }
};

export const handleCheckbox = (voice: VoiceRecord, key: Sow | Tense | Polarity): void => {
  if (SOW_LIST.includes(key as Sow)) {
    autoCheck(voice, key, SOW_LIST);
  } else if (TENSE_LIST.includes(key as Tense)) {
    autoCheck(voice, key, TENSE_LIST);
  } else if (POLARITY_LIST.includes(key as Polarity)) {
    autoCheck(voice, key, POLARITY_LIST);
  }
};
