import { conjugator } from '.';
import conjTables from './conj-tables.json';

const conjugatorInstance = new conjugator();

export const jconj = (wordData: WordData, pos: number) => {
  const { kanji, kana, type } = wordData;
  // @ts-ignore
  const result = conjugatorInstance.conjugate(kanji, kana, pos, conjTables);
  return result;
};
