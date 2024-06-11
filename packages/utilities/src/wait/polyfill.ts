// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IndexableWindow = Record<string, any>;

const win = globalThis as IndexableWindow;

function requestAnimationFrameFallback(callback: FrameRequestCallback): ReturnType<typeof setTimeout> {
  return setTimeout(() => callback(Date.now()), 1000 / 60);
}

export const nextAnimationFrame: typeof globalThis.requestAnimationFrame =
  win['requestAnimationFrame'] ||
  win['webkitRequestAnimationFrame'] ||
  win['mozRequestAnimationFrame'] ||
  requestAnimationFrameFallback;

function requestIdleCallbackFallback(
  callback: () => void,
  options?: IdleRequestOptions,
): ReturnType<typeof setTimeout> {
  return setTimeout(callback, options?.timeout ?? 1000);
}

export const nextIdleCallback: typeof globalThis.requestIdleCallback =
  win['requestIdleCallback'] ||
  win['webkitRequestIdleCallback'] ||
  win['mozRequestIdleCallback'] ||
  requestIdleCallbackFallback;

function cancelAnimationFrameFallback(handle: number): void {
  console.log(handle);
}

export const cancelNextAnimationFrame: typeof globalThis.cancelAnimationFrame =
  win['cancelAnimationFrame'] ||
  win['webkitCancelAnimationFrame'] ||
  win['mozCancelAnimationFrame'] ||
  cancelAnimationFrameFallback;

function cancelIdleCallbackFallback(handle: number): void {
  console.log(handle);
}

export const cancelNextIdleCallback: typeof globalThis.cancelIdleCallback =
  win['cancelIdleCallback'] ||
  win['webkitCancelIdleCallback'] ||
  win['mozCancelIdleCallback'] ||
  cancelIdleCallbackFallback;

export const supported = {
  cancelIdleCallback: !!(win['cancelIdleCallback'] || win['webkitCancelIdleCallback'] || win['mozCancelIdleCallback']),
  requestIdleCallback: !!(
    win['requestIdleCallback'] ||
    win['webkitRequestIdleCallback'] ||
    win['mozRequestIdleCallback']
  ),
  cancelAnimationFrame: !!(
    win['cancelAnimationFrame'] ||
    win['webkitCancelAnimationFrame'] ||
    win['mozCancelAnimationFrame']
  ),
  requestAnimationFrame: !!(
    win['requestAnimationFrame'] ||
    win['webkitRequestAnimationFrame'] ||
    win['mozRequestAnimationFrame']
  ),
};
