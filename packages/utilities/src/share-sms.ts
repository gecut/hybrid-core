import {isiOS} from './android-or-ios.js';
import {requiredBrowser} from './browser-or-node.js';

export default function shareSMS(phoneNumber: string, message: string) {
  requiredBrowser();

  const separator = isiOS() ? '&' : '?';

  window.open(`sms:${phoneNumber}${separator}body=${encodeURIComponent(message)}`);
}
