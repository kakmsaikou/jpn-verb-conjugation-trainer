const sow: [string, string] = ['plain', 'polite'];
const tense: [string, string] = ['present', 'past'];
const polarity: [string, string] = ['affirmative', 'negative'];

function handleCheckbox(voice: Record<Sow, boolean>, key: Sow): void;
function handleCheckbox(voice: Record<Tense, boolean>, key: Tense): void;
function handleCheckbox(voice: Record<Polarity, boolean>, key: Polarity): void;
function handleCheckbox(voice: any, key: any): void {
  if (sow.includes(key)) {
    autoCheck(voice, key, sow);
  } else if (tense.includes(key)) {
    autoCheck(voice, key, tense);
  } else if (polarity.includes(key)) {
    autoCheck(voice, key, polarity);
  }
}

const autoCheck = (voice: any, key: any, voiceList: [string, string]) => {
  if (!voice[voiceList[0]] === !voice[voiceList[1]]) {
    const target = voiceList[1 - voiceList.indexOf(key)];
    voice[target] = true;
  }
};

export default handleCheckbox;
