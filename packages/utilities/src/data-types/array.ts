import {numberUtils} from './number';

export const arrayUtils = {
  is: Array.isArray,
  sanitize<T extends unknown[]>(array: T): T {
    return array.filter((item, index) => array.indexOf(item) === index) as T;
  },
  range(count: number): number[] {
    return Array.from({length: count}, (_, i) => i + 1);
  },
  joinString(separator = ' ', ...values: (unknown | undefined | null)[]): string {
    values = values.map((value) => String(value));

    return values.join(separator);
  },
  random: {
    choice<T>(arr: T[]): T {
      return arr[numberUtils.random.number(arr.length - 1)];
    },
  },
};
