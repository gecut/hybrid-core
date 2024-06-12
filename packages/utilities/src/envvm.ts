import {constantCase} from 'change-case';

type VariableType = string | number | boolean;
type VariablesTypeName = Record<string, VariableType>;

export class GecutEnvVM<T extends VariablesTypeName> {
  constructor(appName: string, variables: T) {
    this.appName = appName;
    this.variables = variables;

    this.variablesName = Object.fromEntries(
      Object.keys(variables).map((name: keyof T): [keyof T, string] => [
        name,
        constantCase(appName) + '.' + constantCase(name.toString()),
      ]),
    ) as Record<keyof T, string>;
  }

  appName: string;

  private variables: T;
  private variablesName: Record<keyof T, string>;

  get<K extends keyof T>(variableName: K): T[K] {
    const defaultValue = this.variables[variableName] as T[K];
    const value = window.localStorage.getItem(this.variablesName[variableName]);

    if (defaultValue == null) throw new Error('key not found');
    else if (value == null) return defaultValue;
    else if (typeof defaultValue === 'string') return String(value) as T[K];
    else if (typeof defaultValue === 'number') return Number(value) as T[K];
    else if (typeof defaultValue === 'boolean') return Boolean(value) as T[K];

    return defaultValue;
  }

  set<K extends keyof T>(variableName: K, value: T[K] | ((old: T[K]) => T[K])): void {
    const key = this.variablesName[variableName];

    if (typeof value === 'function') {
      const oldValue = this.get<K>(variableName);

      return window.localStorage.setItem(key as string, String(value(oldValue)));
    }

    return window.localStorage.setItem(key as string, String(value));
  }

  remove(variableName: keyof T): void {
    return window.localStorage.removeItem(this.variablesName[variableName]);
  }
}
