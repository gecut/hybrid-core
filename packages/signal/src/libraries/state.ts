import {Signal} from './_signal.js';

/**
 * A signal that stores a context value of type T.
 *
 * This signal extends the basic {@link Signal} class and adds features specific to context values.
 *
 * @template T - The type of the context value.
 */
export class GecutState<T> extends Signal<T> {
  /**
   * Creates a new ContextSignal instance.
   *
   * @param {string} name - The name of the signal.
   * @param {false | 'AnimationFrame' | 'IdleCallback' | number} [debounce=false] - The debounce configuration.
   */
  constructor(name: string, debounce: false | 'AnimationFrame' | 'IdleCallback' | number = 'AnimationFrame') {
    super(name, 'state');

    this.__$debounceConfig = debounce;
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
}
