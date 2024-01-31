function isEqual(a: unknown, b: unknown): boolean {
  // If both a and b are the same object (or primitive), they're equal
  if (a === b) return true;

  // If either a or b is null or not an object, they're not equal
  if (a === null || typeof a !== 'object' || b === null || typeof b !== 'object') return false;

  // Compare the number of keys in a and b
  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);
  if (keysA.length !== keysB.length) return false;

  // Check if the values for each key in a are equal to the values in b
  for (let key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!isEqual((a as { [key: string]: unknown })[key], (b as { [key: string]: unknown })[key])) return false;
  }

  return true;
}

export default isEqual;
