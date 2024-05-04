import {uid} from './uid';
import {untilIdle, untilMS, untilNextFrame} from './wait/wait';

/**
 * GecutQueue class
 */
export class GecutQueue {
  /**
   * Creates a new GecutQueue instance
   * @param {string} name - The name of the queue
   * @param {('animationFrame' | 'idleCallback' | number)} delayPeriod - The delay period for the queue
   */
  constructor(name: string, delayPeriod: 'animationFrame' | 'idleCallback' | number) {
    /**
     * The name of the queue
     * @type {string}
     */
    this.name = name;

    /**
     * The delay period function
     * @type {() => Promise<unknown>}
     */
    this.delayPeriod = this.getDelayPeriodFunction(delayPeriod);
  }

  name: string;
  private delayPeriod: () => Promise<unknown>;

  /**
   * The queue map
   * @type {Map<string, Promise<unknown>>}
   */
  private queue = new Map<string, Promise<unknown>>();

  /**
   * The values map
   * @type {Map<string, unknown>}
   */
  private values = new Map<string, unknown>();

  private runningId?: string;

  /**
   * Pushes a new promise to the queue
   * @param {Promise<unknown>} promise - The promise to push
   * @param {string} [id] - The optional id for the promise
   * @returns {{ id: string }} - The id of the pushed promise
   */
  push(promise: Promise<unknown>, id?: string): {id: string} {
    id ??= uid();

    this.queue.set(
      id,
      this.waitForAllFinish()
        .then(() => this.delayPeriod())
        .then(() => {
          this.runningId = id;

          return promise;
        })
        .then((value) => {
          this.runningId = undefined;
          this.queue.delete(id!);
          this.values.set(id!, value);

          return value;
        }),
    );

    return {id};
  }

  /**
   * Gets the value of a promise
   * @param {string} id - The id of the promise
   * @returns {Promise<unknown>} - The promise value
   */
  getValue<T>(id: string): T | Promise<T> {
    if (this.values.has(id)) {
      return this.values.get(id) as T;
    }

    return (this.queue.get(id) ?? Promise.resolve(undefined)) as Promise<T>;
  }

  /**
   * Checks if a promise is running
   * @param {string} id - The id of the promise
   * @returns {boolean} - Whether the promise is running
   */
  isRunning(id: string): boolean {
    return this.runningId === id;
  }

  isFinished(id: string): boolean {
    return this.values.has(id);
  }

  /**
   * Waits for a promise to finish
   * @param {string} id - The id of the promise
   * @returns {Promise<unknown>} - The promise result
   */
  waitForFinish(id: string): Promise<unknown> {
    return this.queue.get(id) ?? Promise.resolve();
  }

  /**
   * Waits for all promises to finish
   * @returns {Promise<unknown[]>} - The promise results
   */
  waitForAllFinish(): Promise<unknown[]> {
    return Promise.all(this.queue.values());
  }

  /**
   * Gets the delay period function based on the delay period type
   * @private
   * @param {('animationFrame' | 'idleCallback' | number)} delayPeriod - The delay period type
   * @returns {() => Promise<unknown>} - The delay period function
   */
  private getDelayPeriodFunction(delayPeriod: 'animationFrame' | 'idleCallback' | number): () => Promise<unknown> {
    switch (delayPeriod) {
      case 'animationFrame':
        return untilNextFrame.bind(null);
      case 'idleCallback':
        return untilIdle.bind(null);
      default:
        return untilMS.bind(null, delayPeriod);
    }
  }
}
