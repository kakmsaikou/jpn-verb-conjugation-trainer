import { useConfigStore } from '../stores/useConfigStore';

const configStore = useConfigStore();
export const useVoice = () => {
  const utterance = new SpeechSynthesisUtterance();
  utterance.lang = 'ja-JP';
  let count = 0;

  const speak = (text: string) => {
    if(count === 0){
      const voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google 日本語');
      if (voice) {
        utterance.voice = voice;
        count++
      }
    }
    if (configStore.config.voice === true) {
      utterance.text = text;
      speechSynthesis.speak(utterance);
    }
  };

  return { speak };
};
