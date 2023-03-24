import { useWordStore } from './../stores/useWordStore';
import { useConfigStore } from './../stores/useConfigStore';
import { SOW_LIST, POLARITY_LIST, TENSE_LIST, VERB_FORM_LIST } from './../const/index';
import { getKey } from './getKey';

const configStore = useConfigStore();

export const getVoices = () => {
  const wordStore = useWordStore();
  const tempVoices: Voices = {
    present: true,
    negative: false,
    polite: false,
  };
  if (wordStore.pos === 'verb') {
    getVerbVoices(tempVoices, configStore.tempConfig.verb!, wordStore.form);
  } else if (wordStore.pos === 'adj') {
    avoidOverflow(tempVoices, configStore.tempConfig.adj!, wordStore.word.type as AdjType);
  }
  return tempVoices;
};

const getVerbVoices = (voices: Voices, verbConfig: VerbConfig, form: WordForm) => {
  switch (form) {
    case 'masu':
      voices.polite = true;
    case 'plain':
      avoidOverflow(voices, verbConfig, form);
      break;
    case 'te':
      voices.polite = false;
      voices.negative = false;
      break;
  }
};

function avoidOverflow(voices: Voices, config: VerbConfig, form: VerbForm): void;
function avoidOverflow(voices: Voices, config: AdjConfig, type: AdjType): void;
function avoidOverflow(voices: any, config: any, typeOrForm: any) {
  voices.negative = getKey(config, POLARITY_LIST) === 'negative';
  voices.present = getKey(config, TENSE_LIST) === 'present';
  if (VERB_FORM_LIST.includes(typeOrForm)) {
    if (typeOrForm === 'plain' && !voices.negative && voices.present) {
      avoidOverflow(voices, config, typeOrForm);
    }
  } else {
    voices.polite = getKey(config, SOW_LIST) === 'polite';
    console.log(typeOrForm);
    if (typeOrForm === 'adj_i' && !voices.polite && !voices.negative && voices.present) {
      avoidOverflow(voices, config, typeOrForm);
    }
  }
}
