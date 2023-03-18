type RecursiveObject = {
  [key: string]: boolean | RecursiveObject;
};

// 这个函数用于克隆一个对象，只克隆对象中值为true的属性
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