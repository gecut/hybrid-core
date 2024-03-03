import {InMemorySimpleCache} from './in-memory.simple';

export class InMemoryAdvancedCache<T> extends InMemorySimpleCache<T> {
  protected expiresMap: Map<string, number> = new Map();

  override set(key: string, value: T): void;
  override set(key: string, value: T, ttlMS?: number): void {
    super.set(key, value);

    if (ttlMS) {
      this.expiresMap.set(key, Math.max(0, Date.now() + ttlMS));
    }
  }

  override get(key: string): T | undefined {
    const value = super.get(key);

    if (!this.expiresMap.has(key)) return value;

    const expireTime = this.expiresMap.get(key);

    if (expireTime && expireTime > Date.now()) return value;

    this.delete(key);

    return undefined;
  }
}
