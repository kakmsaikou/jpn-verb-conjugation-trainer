const v5Endings: Record<string, number> = {
  ぶ: 31,
  ぐ: 32,
  く: 33,
  む: 35,
  ぬ: 36,
  る: 37,
  す: 39,
  つ: 40,
  う: 41,
};

// 根据平假名获得对应的 pos 值，pos 值是 jconj 转换动词参数
export const getPosNum = (wordData: WordData): number => {
  const { kana, type } = wordData;
  if(type === 'adj_i') return 1;
  if (type === 'v1') return 28;
  if (type === 'v5') {
    const kanaEndsWith = kana.charAt(kana.length - 1);
    return v5Endings[kanaEndsWith];
  }
  if (type === 'kuru') return 45;
  if (type === 'suru') return 47;
  return 0;
};
