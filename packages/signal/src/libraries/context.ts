import {Signal} from './_signal.js';

export class ContextSignal<T> extends Signal<T> {
  constructor(name: string, debounce: false | 'AnimationFrame' | 'IdleCallback' | number = false) {
    super(name, 'context');

    this.__$debounceConfig = debounce;
  }

  async requireValue(): Promise<T> {
    const value = this.__$value ?? (await this.__$untilNewNotify());

    this.__$log.methodFull?.('requireValue', {}, value);

    return value;
  }

  functionalValue(func: (value: T | undefined) => T) {
    return (this.value = func(this.value));
  }

  /**
   * Get context value.
   *
   * @return {T | undefined} undefined if context not set before or expired.
   */
  get value(): T | undefined {
    this.__$log.methodFull?.('getValue', {}, this.__$value);

    return this.__$value;
  }

  /**
   * The function sets a value and notifies any subscribers.
   * @param {T} value - The parameter "value" is of type T, which means it can be any type.
   */
  set value(value: T) {
    this.__$log.methodArgs?.('setValue', {value});

    this.__$notify(value);
  }

  /**
   * The "expire" function clears a cache.
   */
  expire(): void {
    this.__$log.method?.('expire');

    super.__$clear();
  }

  /**
   * The function "untilChange" returns a promise that resolves when a change is notified.
   *
   * @return {Promise<T>} The `untilChange()` function is returning a Promise of type `T`.
   */
  untilChange(): Promise<T> {
    this.__$log.method?.('untilChange');

    return this.__$untilNewNotify();
  }

  renotify() {
    this.__$log.method?.('renotify');

    const value = this.value;

    if (this.__$hasDispatched) {
      this.value = value as T;
    }
  }
}
