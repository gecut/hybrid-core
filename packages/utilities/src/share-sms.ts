import { isiOS } from './android-or-ios';
import { requiredBrowser } from './browser-or-node';

export default function shareSMS(phoneNumber: string, message: string) {
  requiredBrowser();

  const separator = isiOS() ? '&' : '?';

  window.open(
    `sms:${phoneNumber}${separator}body=${encodeURIComponent(message)}`,
  );
}
