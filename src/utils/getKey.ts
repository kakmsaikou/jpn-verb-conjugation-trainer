export const getKey = (obj: Record<any, boolean>) => {
  const keyList = Object.keys(obj);
  const key = keyList[Math.floor(Math.random() * keyList.length)] as keyof typeof obj;
  return key;
};