/*
* 这个函数用于从一个对象中随机获取一个key
* 一般和 cloneTrueKeys 函数配合使用
*/
export const getKey = (obj: Record<any, boolean>) => {
  const keyList = Object.keys(obj);
  const key = keyList[Math.floor(Math.random() * keyList.length)] as keyof typeof obj;
  return key;
};