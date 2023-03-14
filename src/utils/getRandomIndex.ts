const usedIndexes: number[] = [];

export const getArrayRandomIndex = (arr: WordData[], uniqueCount: number): number => {
  const max = arr.length;
  let randomIndex = Math.floor(Math.random() * max);
  if (usedIndexes.length >= 3) {
    usedIndexes.shift();
  }
  while (usedIndexes.includes(randomIndex)) {
    randomIndex = Math.floor(Math.random() * max);
  }
  usedIndexes.push(randomIndex);
  return randomIndex;
};
