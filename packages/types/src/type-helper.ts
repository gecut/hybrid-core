export type * from 'type-fest';

/* eslint-disable @typescript-eslint/no-explicit-any */

export type Constructor<T> = new (...args: any[]) => T;

export type MaybePromise<T> = T | Promise<T>;
export type SingleOrArray<T> = T | Array<T>;

export type OmitFirstParam<F> = F extends (x: any, ...args: infer A) => infer R
  ? (...args: A) => R
  : never;

export type ArrowFunction<T = unknown> = () => T;

export type Nullable<T> = T | null | undefined;

export type ObjectBooleanize<T, BooleanType = true> = Partial<{
  [P in keyof T]: T[P] extends object ? ObjectBooleanize<T[P]> : BooleanType;
}>;

export type ObjectPartial<T, K extends ObjectBooleanize<T>> = {
  [P in keyof T]: K[P] extends true ? T[P] : undefined;
};

export type SanitizeFunction<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]: T[P] extends Function ? undefined : T[P];
};

/**
 * Object that can be JSON.stringify.
 */
export type Stringifyable =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [P: string]: Stringifyable }
  | Array<Stringifyable>;

export interface StringifyableRecord {
  [P: string]: Stringifyable;
}

export type Prop<T, K> = K extends keyof T ? T[K] : never;

export type Values<T> = T[keyof T];
export type Keys<T> = keyof T;
export type ArrayValues<T extends Readonly<Array<any>>> = T[number];
export type ArrayItems<T> = T extends Array<infer K> ? K : T;

export type UnknownRecord<T = unknown> = Record<string, T>;
