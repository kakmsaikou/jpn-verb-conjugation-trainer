/*
 * 这个函数用于从一个对象中随机获取一个key
 * 一般和 cloneTrueKeys 函数配合使用
 */
export const getKey = <T>(config: Record<any, boolean>, keyList: T[]): T => {
  const usedKeyList = Object.keys(config).filter(key => config[key] === true && keyList.includes(key as T)) as T[];
  return usedKeyList[Math.floor(Math.random() * usedKeyList.length)];
};
