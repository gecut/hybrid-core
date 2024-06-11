import {detectOperatingSystem} from './detect-os';

export function isAndroid(): boolean {
  return detectOperatingSystem() === 'android';
}
export function isiOS(): boolean {
  return detectOperatingSystem() === 'ios';
}
