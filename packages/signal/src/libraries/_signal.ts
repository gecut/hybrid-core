import {GecutLogger} from '@gecut/logger';
import debounce from '@gecut/utilities/debounce.js';

import type {SubscribeOptions, Subscriber} from '../type.js';

/**
 * A Signal object allows for subscribing to notifications with callbacks.
 * Since this is an abstract class, it's meant to be extended by a concrete subclass.
 * @template T The type of the value for the notifications.
 */
export abstract class Signal<T> {
  constructor(name: string, loggerPrefix = 'signal') {
    this.__$log = new GecutLogger(`${loggerPrefix}: ${name}`);
  }

  protected subscribers: {
    callback: Subscriber<T>;
    options: Required<SubscribeOptions>;
  }[] = [];

  protected __$value: T | undefined;
  protected __$hasDispatched = false;
  protected __$log: GecutLogger;
  protected __$debounceConfig: false | 'AnimationFrame' | 'IdleCallback' | number = false;

  /**
   * Unsubscribes a previously registered callback from the signal.
   * @param {Subscriber<T>} callback - The callback to unsubscribe.
   */
  unsubscribe(callback: Subscriber<T>): void {
    this.__$log.methodArgs?.('unsubscribe', {callback});

    this.subscribers = this.subscribers.filter((subscriber) => subscriber.callback !== callback);
  }

  /**
   * Subscribes to the signal.
   * @param {Subscriber<T>} callback - The callback to invoke on notification.
   * @param {SubscribeOptions} [options={}] - The subscription options.
   * @return {unknown} The `subscribe` method returns an object with a single property `unsubscribe`, which is a
   * function that can be called to unsubscribe from the subscription.
   */
  subscribe(callback: Subscriber<T>, options: SubscribeOptions = {}): {unsubscribe: () => void} {
    const resolvedOptions: Required<SubscribeOptions> = {
      once: false,
      priority: 0,
      disabled: false,
      receivePrevious: false,
      ...options,
    };

    const newSubscriber = {callback, options: resolvedOptions};

    this.__$log.methodArgs?.('subscribe', newSubscriber);

    this.subscribers.push(newSubscriber);
    this.subscribers.sort((a, b) => b.options.priority - a.options.priority);

    if (resolvedOptions.receivePrevious && this.__$hasDispatched && this.__$value && !resolvedOptions.disabled) {
      callback(this.__$value);
    }

    return {
      unsubscribe: this.unsubscribe.bind(this, callback),
    };
  }

  protected __$notify(newValue: T): void {
    this.__$hasDispatched = true;
    this.__$value = newValue;

    this.__$debouncedDispatch(newValue);
  }

  protected __$debouncedDispatch = debounce(
    this.__$dispatch.bind(this),
    this.__$debounceConfig !== false ? this.__$debounceConfig : 0,
  );
  protected __$dispatch(newValue: T): void {
    for (const subscriber of this.subscribers) {
      if (subscriber && !subscriber.options.disabled) {
        subscriber.callback(newValue);
        if (subscriber.options.once) {
          this.unsubscribe(subscriber.callback);
        }
      }
    }
  }

  /**
   * Clear current data without notify subscribers.
   */
  protected __$clear(): void {
    this.__$value = undefined;
  }

  protected __$untilNewNotify(): Promise<T> {
    return new Promise((resolve) => {
      this.subscribe(resolve, {
        once: true,
        priority: 1_000,
        receivePrevious: false,
      });
    });
  }
}
