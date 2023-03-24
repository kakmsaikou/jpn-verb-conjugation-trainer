// 这个函数用于克隆一个对象，只克隆对象中值为true的属性
export const cloneTrueKeys = (obj: any): any => {
  const newObj = {};
  const traverse = (source: any, clone: any) => {
    for (const key in source) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        clone[key] = {};
        traverse(source[key], clone[key]);
      } else if (source[key] === true) {
        clone[key] = true;
      }
    }
  };
  traverse(obj, newObj);
  return newObj;
};
