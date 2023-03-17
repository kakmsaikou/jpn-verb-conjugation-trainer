type RecursiveObject = {
  [key: string]: boolean | RecursiveObject;
};

export const cloneTrueKeys = (obj: RecursiveObject): RecursiveObject => {
  const newObj: RecursiveObject = {};
  const traverse = (source: RecursiveObject, clone: RecursiveObject) => {
    for (const key in source) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        clone[key] = {};
        traverse(source[key] as RecursiveObject, clone[key] as RecursiveObject);
      } else if (source[key] === true) {
        clone[key] = true;
      }
    }
  };
  traverse(obj, newObj);
  return newObj;
};

export const createForm = (tempConfig: any) => {
  if (!tempConfig.pos || !tempConfig.verb || !tempConfig.adj) return;
  // 获得词性 pos
  const selectedPos: Pos = getKey(tempConfig.pos);
  // voice 语态
  const voice = {
    present: true,
    negative: false,
    polite: false,
  };
  // 根据词性获得敬体、时态、否定形
  if (selectedPos === 'verb') {
    const _form: VerbForm = getKey(tempConfig.verb);
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
    const { sow, polarity, tense } = tempConfig.adj;
    voice.polite = getKey(sow) === 'polite';
    voice.negative = getKey(polarity) === 'negative';
    voice.present = getKey(tense) === 'present';
  }
  return voice;
};

export const getKey = (obj: Record<any, boolean>) => {
  // debugger
  const keyList = Object.keys(obj);
  const key = keyList[Math.floor(Math.random() * keyList.length)] as keyof typeof obj;
  return key;
};

// export const test = () => {
//   for (let i = 0; i < 15; i++) {
//     console.log(createForm(config));
//   }
  // const tempConfig: Partial<Config> = cloneTrueKeys(config);
  // console.log(tempConfig);
// };
