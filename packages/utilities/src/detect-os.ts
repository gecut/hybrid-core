export function detectOperatingSystem() {
  const userAgent = window.navigator.userAgent;

  let operatingSystem: 'windows' | 'unix' | 'linux' | 'android' | 'ios' | null = null;

  if (userAgent.indexOf('Win') != -1) {
    operatingSystem = 'windows';
  }
  else if (userAgent.indexOf('X11') != -1) {
    operatingSystem = 'unix';
  }
  else if (userAgent.indexOf('Linux') != -1) {
    operatingSystem = 'linux';
  }
  else if (userAgent.indexOf('Android') != -1) {
    operatingSystem = 'android';
  }
  else if (userAgent.indexOf('Mac') != -1 || userAgent.indexOf('iPhone') != -1) {
    operatingSystem = 'ios';
  }

  return operatingSystem;
}
