// 根据输入的 config 返回一个 form 对象
type Sow = 'plain' | 'polite';
type Polarity = 'affirmative' | 'negative';
type Tense = 'present' | 'past';
type VerbForm = 'masu' | 'te' | 'ta' | 'nai';

type Config = {
  pos: {
    verb: boolean;
    adj: boolean;
  };
  verb: Record<VerbForm, boolean>;
  adj: {
    // Style of Writing 文体
    sow: Record<Sow, boolean>;
    polarity: Record<Polarity, boolean>;
    tense: Record<Tense, boolean>;
  };
};

const config: Config = {
  pos: {
    verb: true,
    adj: false,
  },
  verb: {
    masu: true,
    te: true,
    ta: true,
    nai: true,
  },
  adj: {
    sow: {
      plain: true,
      polite: true,
    },
    polarity: {
      affirmative: true,
      negative: false,
    },
    tense: {
      present: true,
      past: true,
    },
  },
};

export const createForm = (config: Config) => {
  // 获得词性 pos
  const selectedPos: Pos = getKey(config.pos);
  // voice 语态
  const voice = {
    present: true,
    negative: false,
    polite: false,
  };
  // 根据词性获得敬体、时态、否定形
  if (selectedPos === 'verb') {
    const _form: VerbForm = getKey(config.verb);
    voice.present = false;
    switch (_form) {
      case 'masu':
        voice.polite = true;
        voice.negative = false;
        break;
      case 'te':
        voice.polite = false;
        voice.negative = false;
        break;
      case 'ta':
        voice.polite = false;
        voice.negative = false;
        break;
      case 'nai':
        voice.polite = false;
        voice.negative = true;
        break;
    }
  } else if (selectedPos === 'adj') {
    const { sow, polarity, tense } = config.adj;
    voice.polite = getKey(sow) === 'polite';
    voice.negative = getKey(polarity) === 'negative';
    voice.present = getKey(tense) === 'present';
  }
  return voice;
};

const getKey = (obj: Record<any, boolean>) => {
  const keyList = Object.keys(obj).filter(key => obj[key as keyof typeof obj]);
  const key = keyList[Math.floor(Math.random() * keyList.length)] as keyof typeof obj;
  return key;
};

export const test = () => {
  for (let i = 0; i < 15; i++) {
    console.log(createForm(config))
  }
};
