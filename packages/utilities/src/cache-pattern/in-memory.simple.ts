export class InMemorySimpleCache<T> {
  protected cache: Record<string, T> = {};
  protected keysMap: Map<string, boolean> = new Map();

  get(key: string): T | undefined {
    return this.cache[key];
  }

  set(key: string, value: T): void {
    this.cache[key] = value;
    this.keysMap.set(key, true);
  }

  delete(key: string): void {
    if (this.cache[key]) {
      delete this.cache[key];
      this.keysMap.delete(key);
    }
  }

  clearAll(): void {
    this.cache = {};
    this.keysMap.clear();
  }

  has(key: string): boolean {
    return this.keysMap.has(key);
  }

  size(): number {
    return this.keysMap.size;
  }
}
  