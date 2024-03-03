export function isBrowser(): boolean {
  return typeof window === 'object';
}

export function requiredBrowser(): boolean {
  const _isBrowser = isBrowser();

  if (_isBrowser !== true) {
    throw new Error('requiredBrowser');
  }

  return _isBrowser;
}

export function isNode(): boolean {
  return typeof process === 'object';
}

export function requiredNode(): boolean {
  const _isNode = isNode();

  if (_isNode !== true) {
    throw new Error('requiredNode');
  }

  return _isNode;
}
