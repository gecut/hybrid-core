export class InMemorySimpleCache<T> {
  constructor(maxSize?: number) {
    if (maxSize && maxSize > 0) {
      this.maxSize = maxSize;
    }
  }

  protected memory = new Map<string, T>();
  protected maxSize = -1;

  get(key: string): T | undefined {
    return this.memory.get(key);
  }

  set(key: string, value: T): void {
    this.memory.set(key, value);

    if (this.maxSize > 0 && this.size >= this.maxSize) {
      const firstKey = this.memory.keys().next();

      if (!firstKey.done) {
        this.delete(firstKey.value);
      }
    }
  }

  delete(key: string): boolean {
    return this.memory.delete(key);
  }

  clearAll(): void {
    this.memory.clear();
  }

  has(key: string): boolean {
    return this.memory.has(key);
  }

  get size(): number {
    return this.memory.size;
  }
}
