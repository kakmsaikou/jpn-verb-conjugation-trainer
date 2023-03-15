export const deepClone = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  let result: any;
  if (Array.isArray(obj)) {
    result = [];
    for (let i = 0; i < obj.length; i++) {
      result.push(deepClone(obj[i]));
    }
  } else {
    result = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = deepClone(obj[key]);
      }
    }
  }
  return result;
};
