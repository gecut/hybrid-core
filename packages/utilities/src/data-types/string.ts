import type {Nullable} from '@gecut/types';

export const sanitize = <T extends Nullable<string>>(str: T): T => {
  return String(str ?? '') as NonNullable<T>;
};
