function handleCheckbox(voice: Record<Sow, boolean>, key: Sow): void;
function handleCheckbox(voice: Record<Tense, boolean>, key: Tense): void;
function handleCheckbox(voice: Record<Polarity, boolean>, key: Polarity): void;
function handleCheckbox(voice: any, key: any): void {
  if (['plain', 'polite'].includes(key)) {
    if (!voice.plain === !voice.polite) {
      voice[key] = true;
    }
  }
  if (['present', 'past'].includes(key)) {
    if (!voice.present === !voice.past) {
      voice[key] = true;
    }
  }
  if (['affirmative', 'negative'].includes(key)) {
    if (!voice.affirmative === !voice.negative) {
      voice[key] = true;
    }
  }
}

export default handleCheckbox;