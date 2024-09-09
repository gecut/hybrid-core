import {nextAnimationFrame, nextIdleCallback} from './polyfill.js';

export async function untilMS(delayMS: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, delayMS));
}

export async function untilNextFrame() {
  return new Promise<number>((resolve) => nextAnimationFrame(resolve));
}

export async function untilIdle() {
  return new Promise<IdleDeadline>((resolve) => nextIdleCallback(resolve));
}

export function untilEvent<T extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  eventName: T,
): Promise<HTMLElementEventMap[T]> {
  return new Promise((resolve) => element.addEventListener(eventName, resolve, {once: true, passive: true}));
}
