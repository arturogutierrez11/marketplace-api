import { Injectable } from '@nestjs/common';
import { ICacheManager } from 'src/core/adapters/cache/ICacheManager';

@Injectable()
export class InMemoryCacheManager implements ICacheManager {
  private store = new Map<string, any>();

  async get(key: string): Promise<any> {
    return this.store.get(key) ?? null;
  }

  async save(key: string, data: any, ttlMs?: number): Promise<void> {
    this.store.set(key, data);

    if (ttlMs) {
      setTimeout(() => {
        this.store.delete(key);
      }, ttlMs);
    }
  }
}
