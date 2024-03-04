import { Signal } from './_signal.js';

export class ContextSignal<T> extends Signal<T> {
  constructor(name: string) {
    super(name, 'context');
  }

  /**
   * Get context value.
   *
   * @return {T | undefined} undefined if context not set before or expired.
   */
  getValue(): T | undefined {
    this.log.methodFull?.('getValue', {}, this.value);

    return this.value;
  }

  /**
   * The function sets a value and notifies any subscribers.
   * @param {T} value - The parameter "value" is of type T, which means it can be any type.
   */
  setValue(value: T): void {
    this.log.methodArgs?.('setValue', { value });

    super.__$notify(value);
  }

  /**
   * The "expire" function clears a cache.
   */
  expire(): void {
    this.log.method?.('expire');

    super.__$clear();
  }

  /**
   * The function "untilChange" returns a promise that resolves when a change is notified.
   *
   * @return {Promise<T>} The `untilChange()` function is returning a Promise of type `T`.
   */
  untilChange(): Promise<T> {
    this.log.method?.('untilChange');

    return super.__$untilNewNotify();
  }

  renotify() {
    this.log.method?.('renotify');

    const value = this.getValue();

    if (value) {
      this.setValue(value);
    }
  }
}
