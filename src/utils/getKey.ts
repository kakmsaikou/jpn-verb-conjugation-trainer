/*
 * 这个函数用于从一个对象中随机获取一个key
 * 一般和 cloneTrueKeys 函数配合使用
 */
export const getKey = (obj: Record<any, boolean>, keyList: string[]) => {
  const usedKeyList = Object.keys(obj).filter(key => obj[key] === true && keyList.includes(key));
  return usedKeyList[Math.floor(Math.random() * usedKeyList.length)] as keyof typeof obj;
};
