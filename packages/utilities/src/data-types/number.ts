import type {Nullable} from '@gecut/types/type-helper.js';

export const isNumber = (value: unknown): boolean => {
  return (
    (typeof value === 'number' && isFinite(value)) ||
    (typeof value === 'string' && value.trim() !== '' && !isNaN(Number(value)))
  );
};

export const sanitizeNumber = <T extends Nullable<number>>(data: T): NonNullable<T> => {
  return Number(data ?? 0) as NonNullable<T>;
};

export const clamp = (min: number, current: number, max: number): number => {
  return Math.min(max, Math.max(min, current));
};

export const randomNumber = (max: number, min = 0): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
};

export const randomFloor = (max: number, min = 0, fixed = 1): number => {
  const keyNumber = fixed * 10;

  return randomNumber(max * keyNumber, min * keyNumber) / keyNumber;
};
