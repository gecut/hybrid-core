/**
 * The subscriber function type definition.
 * @template T The type of the notification value.
 */
// eslint-disable-next-line no-unused-vars
export type Subscriber<T> = (value: T) => void;

/**
 * The subscription options.
 */
export interface SubscribeOptions {
  /** 🔄 Indicates whether the callback should only be invoked once. */
  once?: boolean;
  /** 🔢 The priority of the subscriber, with higher numbers meaning higher priority. */
  priority?: number;
  /** ⏸️ If true, the subscriber is initially disabled. */
  disabled?: boolean;
  /** 📤 If true, the subscriber receives the previous value immediately if available. */
  receivePrevious?: boolean;
}
