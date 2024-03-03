import { isNode } from './browser-or-node';
import { parseJson } from './parse-json';

function get<T>(name: string, defaultValue: T): T {
  if (isNode()) return defaultValue;

  const value = localStorage.getItem(name);

  if (value == null || value === 'null' || value === 'undefined') {
    return defaultValue;
  }

  return parseJson(value) ?? defaultValue;
}

function set<T>(name: string, value: T): void {
  if (isNode()) return;

  if (value == null) {
    return localStorage.removeItem(name);
  }
  localStorage.setItem(name, JSON.stringify(value));
}

export default {
  get,
  set,
};
