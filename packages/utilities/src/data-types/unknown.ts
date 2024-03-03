export const unknownUtils = {
  isEqual<T>(a: T, b: T): boolean {
    if (typeof a !== typeof b) {
      return false;
    }

    if (typeof a === 'object') {
      if (a === null || b === null) {
        return a === b;
      }

      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b as T & object);

      if (aKeys.length !== bKeys.length) {
        return false;
      }

      if (Array.isArray(a) && Array.isArray(b)) {
        for (let i = 0; i < aKeys.length; i++) {
          if (a[i] !== b[i]) {
            return false;
          }
        }
      }
      else {
        for (const key of aKeys) {
          if (!bKeys.includes(key)) {
            return false;
          }
        }
      }

      return true;
    }

    return a === b;
  },
};
