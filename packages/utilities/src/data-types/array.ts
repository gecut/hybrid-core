import {Nullable} from '@gecut/types';
import {randomNumber} from './number';

export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

export const sanitize = <T extends unknown[]>(array: T): T =>
  array.filter((item, index) => array.indexOf(item) === index) as T;

export const range = (count: number): number[] => Array.from({length: count}, (_, i) => i + 1);

export const joinString = (separator = ' ', ...values: Nullable<unknown>[]): string =>
  values.map(String).join(separator);

export const choose = <T>(arr: T[]): T => arr[randomNumber(arr.length - 1)];
