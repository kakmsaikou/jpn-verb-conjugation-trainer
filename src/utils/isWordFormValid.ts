export const isWordFormValid = (obj: Record<any, boolean>) => {
  for (let key of Object.keys(obj)) {
    const value = obj[key as keyof typeof obj];
    if (value === true) {
      return true;
    }
  }
  return false;
};
