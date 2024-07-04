import {Signal} from './_signal.js';

export class SimpleSignal<T> extends Signal<T> {
  constructor(name: string) {
    super(name, 'simple-signal');
  }

  /**
   * Notifies all subscribers with a new value.
   * @param {T} newValue - The new value to notify the subscribers with.
   */
  notify(newValue: T): void {
    this.logger.methodArgs?.('notify', {newValue});

    this.__$notify(newValue);
  }

  get nextValue(): Promise<T> {
    this.logger.method?.('nextValue');

    return this.__$untilNewNotify();
  }
}
