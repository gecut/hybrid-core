import {
  nextAnimationFrame,
  nextIdleCallback,
  cancelNextAnimationFrame,
  cancelNextIdleCallback,
  supported,
} from './wait/polyfill.js';

/**
 * The `debounce` function takes a function and a delay as arguments and returns a new function that
 * delays the execution of the original function until a certain amount of time has passed without any
 * further invocations.
 * @param func - The `func` parameter is a function that takes in any number of arguments of type
 * `Args` and returns a value of type `Return`.
 * @param {number} delay - The `delay` parameter is a number that represents the time in milliseconds
 * to wait before invoking the `func` function.
 * @returns The debounce function returns a new function that will execute the provided function (func)
 * after a specified delay (delay) has passed.
 *
 * @example
 * ```ts
 * // Example usage
 * function handleInput(value: string) {
 *   console.log(`Input value: ${value}`);
 *
 *   return value;
 * }
 *
 * const debouncedHandleInput = debounce(handleInput, 500);
 *
 * // Simulating user input
 * debouncedHandleInput('First input');
 * debouncedHandleInput('Second input');
 * debouncedHandleInput('Third input');
 *
 * // Only the last input will be logged after a delay of 500ms
 * ```
 */
export default function debounce<Args extends unknown[], Return>(
  func: (...args: Args) => Return,
  delay: number | 'AnimationFrame' | 'IdleCallback',
): (...args: Args) => void {
  if (delay === 'AnimationFrame' && supported.requestAnimationFrame && supported.cancelAnimationFrame) {
    let timerId: number;

    return (...args: Args) => {
      cancelNextAnimationFrame(timerId);

      timerId = nextAnimationFrame(() => func(...args));
    };
  }
  else if (delay === 'IdleCallback' && supported.requestIdleCallback && supported.cancelIdleCallback) {
    let timerId: number;

    return (...args: Args) => {
      cancelNextIdleCallback(timerId);

      timerId = nextIdleCallback(() => func(...args));
    };
  }
  else {
    let timerId: NodeJS.Timeout;

    if (typeof delay !== 'number') {
      delay = 0;
    }

    return (...args: Args) => {
      clearTimeout(timerId);

      timerId = setTimeout(() => func(...args), delay as number);
    };
  }
}
