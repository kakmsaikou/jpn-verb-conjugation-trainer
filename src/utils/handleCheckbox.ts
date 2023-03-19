type VoiceRecord = Record<Sow, boolean> | Record<Tense, boolean> | Record<Polarity, boolean>;

const sow: [string, string] = ['plain', 'polite'];
const tense: [string, string] = ['present', 'past'];
const polarity: [string, string] = ['affirmative', 'negative'];

const autoCheck = (voice: any, key: any, voiceList: [string, string]) => {
  if (!voice[voiceList[0]] === !voice[voiceList[1]]) {
    const target = voiceList[1 - voiceList.indexOf(key)];
    voice[target] = true;
  }
};

export const handleCheckbox = (voice: VoiceRecord, key: keyof VoiceRecord): void => {
  if (sow.includes(key)) {
    autoCheck(voice, key, sow);
  } else if (tense.includes(key)) {
    autoCheck(voice, key, tense);
  } else if (polarity.includes(key)) {
    autoCheck(voice, key, polarity);
  }
};

export default handleCheckbox;
