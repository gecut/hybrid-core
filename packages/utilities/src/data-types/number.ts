import type {Nullable} from '@gecut/types/type-helper.js';

export const numberUtils = {
  is(value: unknown) {
    return (
      (typeof value === 'number' && isFinite(value)) ||
      (typeof value === 'string' && value.trim() !== '' && !isNaN(Number(value)))
    );
  },
  sanitizer<T extends Nullable<number>>(data: T): NonNullable<T> {
    return Number(data ?? 0) as NonNullable<T>;
  },
  clamp(min: number, current: number, max: number) {
    return Math.min(max, Math.max(min, current));
  },
  random: {
    number(max: number, min = 0): number {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min) + min);
    },
    floor(max: number, min = 0, fixed = 1): number {
      const keyNumber = fixed * 10;

      return this.number(max * keyNumber, min * keyNumber) / keyNumber;
    },
  },
};
