export const getWordList = (
  wordConfig: VerbConfig | AdjConfig,
  typeList: VerbType[] | AdjType[],
  wordList: WordData[]
) => {
  const selectedTypes = Object.keys(wordConfig).filter(key =>
    typeList.includes(key as VerbType & AdjType)
  );
  return wordList.filter(word => selectedTypes.includes(word.type));
};
