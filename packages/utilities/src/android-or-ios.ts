import {detectOperatingSystem} from './detect-os.js';

export function isAndroid(): boolean {
  return detectOperatingSystem() === 'android';
}
export function isiOS(): boolean {
  return detectOperatingSystem() === 'ios';
}
