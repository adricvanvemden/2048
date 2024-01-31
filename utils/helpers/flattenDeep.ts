function flattenDeep(arr: any[]): any[] {
  if (!Array.isArray(arr)) {
    return [arr];
  }

  return arr.reduce((acc, val) => {
    return acc.concat(flattenDeep(val));
  }, []);
}

export default flattenDeep;
