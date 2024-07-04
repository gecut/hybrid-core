import {GecutLogger} from '@gecut/logger';
import debounce from '@gecut/utilities/debounce.js';

import type {SubscribeOptions, Subscriber} from '../type.js';

export abstract class Signal<T> {
  protected readonly logger: GecutLogger;
  protected readonly subscribers: Map<Subscriber<T>, Required<SubscribeOptions>>;

  constructor(name: string, loggerPrefix = 'signal') {
    this.logger = new GecutLogger(`${loggerPrefix}: ${name}`);
    this.subscribers = new Map();
  }

  protected __$value: T | undefined;
  protected __$hasDispatched = false;
  protected __$debounceConfig: false | 'AnimationFrame' | 'IdleCallback' | number = false;

  unsubscribe(callback: Subscriber<T>): void {
    this.logger.methodArgs?.('unsubscribe', {callback});
    this.subscribers.delete(callback);
  }

  subscribe(callback: Subscriber<T>, options: SubscribeOptions = {}): {unsubscribe: () => void} {
    const resolvedOptions: Required<SubscribeOptions> = {
      once: false,
      priority: 0,
      disabled: false,
      receivePrevious: false,
      ...options,
    };

    this.logger.methodArgs?.('subscribe', {callback, options: resolvedOptions});

    this.subscribers.set(callback, resolvedOptions);

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

  private __$debouncedDispatch = debounce(
    this.__$dispatch.bind(this),
    this.__$debounceConfig !== false ? this.__$debounceConfig : 0,
  );

  private __$dispatch(newValue: T): void {
    for (const [callback, options] of this.subscribers) {
      if (!options.disabled) {
        callback(newValue);
        if (options.once) {
          this.unsubscribe(callback);
        }
      }
    }
  }

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
