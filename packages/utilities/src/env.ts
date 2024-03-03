import { isBrowser } from './browser-or-node';

type EnvReturn<T extends 'string' | 'number'> = T extends 'number'
  ? number
  : string;

export function env<T extends 'string' | 'number', K extends EnvReturn<T>>(
  name: keyof typeof process.env,
  defaultValue: K,
  type: T,
): K {
  if (isBrowser()) return defaultValue;

  const environment = process.env[name];

  if (environment == null) return defaultValue;

  if (type === 'number') {
    return +environment as K;
  }

  return environment as K;
}
