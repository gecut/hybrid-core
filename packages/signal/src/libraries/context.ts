import {Signal} from './_signal.js';

/**
 * A signal that stores a context value of type T.
 *
 * This signal extends the basic {@link Signal} class and adds features specific to context values.
 *
 * @template T - The type of the context value.
 */
export class ContextSignal<T> extends Signal<T> {
  /**
   * Creates a new ContextSignal instance.
   *
   * @param {string} name - The name of the signal.
   * @param {false | 'AnimationFrame' | 'IdleCallback' | number} [debounce=false] - The debounce configuration.
   */
  constructor(name: string, debounce: false | 'AnimationFrame' | 'IdleCallback' | number = false) {
    super(name, 'context');

    this.__$debounceConfig = debounce;
  }

  /**
   * Requires the current value of the signal, waiting for it to be available if necessary.
   *
   * @return {Promise<T>} A promise that resolves with the current value of the signal.
   */
  async requireValue(): Promise<T> {
    const value = this.__$value ?? (await this.__$untilNewNotify());

    this.logger.methodFull?.('requireValue', {}, value);

    return value;
  }

  /**
   * Applies a function to the current value of the signal and sets the result as the new value.
   *
   * @param {(value: T | undefined) => T} func - The function to apply to the current value.
   * @return {T} The new value of the signal.
   */
  functionalValue(func: (value: T | undefined) => T): T {
    return (this.value = func(this.value));
  }

  /**
   * Gets the current value of the signal.
   *
   * @return {T | undefined} The current value of the signal, or undefined if it has not been set or has expired.
   */
  get value(): T | undefined {
    this.logger.methodFull?.('getValue', {}, this.__$value);

    return this.__$value;
  }

  /**
   * Sets a new value for the signal and notifies any subscribers.
   *
   * @param {T} value - The new value to set.
   */
  set value(value: T) {
    this.logger.methodArgs?.('setValue', {value});

    this.__$notify(value);
  }

  /**
   * Clears the cache of the signal.
   */
  expire(): void {
    this.logger.method?.('expire');

    super.__$clear();
  }

  /**
   * Returns a promise that resolves when the signal changes.
   *
   * @return {Promise<T>} A promise that resolves with the new value of the signal when it changes.
   */
  untilChange(): Promise<T> {
    this.logger.method?.('untilChange');

    return this.__$untilNewNotify();
  }

  /**
   * Renotifies any subscribers with the current value of the signal.
   */
  renotify() {
    this.logger.method?.('renotify');

    const value = this.value;

    if (this.__$hasDispatched) {
      this.value = value as T;
    }
  }
}
