export function isEqual<T>(a: T, b: T): boolean {
  // Early exit for identical references
  if (a === b) {
    return true;
  }

  // Handle null and undefined values
  if (a == null || b == null) {
    return false;
  }

  // Check types
  if (typeof a !== typeof b) {
    return false;
  }

  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  // Handle objects
  if (typeof a === 'object' && typeof b === 'object') {
    const aKeys = Object.keys(a) as (keyof typeof a)[];
    const bKeys = Object.keys(b) as (keyof typeof b)[];

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    for (const key of aKeys) {
      if (!bKeys.includes(key) || !isEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }

  // Handle primitive values
  return a === b;
}
