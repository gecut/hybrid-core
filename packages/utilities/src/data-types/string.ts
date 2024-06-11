import type {Nullable} from '@gecut/types';

export const stringUtils = {
  sanitizer<T extends Nullable<string>>(data: T): NonNullable<T> {
    return String(data ?? '') as NonNullable<T>;
  },
};
