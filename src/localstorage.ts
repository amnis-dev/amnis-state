import type { EntityAdapter, EntityState } from '@reduxjs/toolkit';
import { base64JsonDecode, base64JsonEncode } from './core/index.js';

/**
 * Mocked memeory version of LocalStorage in case a form doesn't exist.
 */
class LocalStorageMemory {
  store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem(key: keyof typeof this.store) {
    return this.store[key] || null;
  }

  setItem(key: keyof typeof this.store, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: keyof typeof this.store) {
    delete this.store[key];
  }
}

let localStorageLocal: LocalStorageMemory | Storage | undefined;

export const localStorage = (): LocalStorageMemory | Storage => {
  if (!localStorageLocal) {
    if (typeof window === 'undefined') {
      localStorageLocal = new LocalStorageMemory();
    } else {
      localStorageLocal = window.localStorage;
    }
  }

  return localStorageLocal;
};

/**
 * Loads entities from local storage.
 */
export const localStorageLoad = <T>(
  key: string,
  state: EntityState<T>,
  adapter: EntityAdapter<T>,
) => {
  const entities = localStorage().getItem(`state-entities-${key}`);

  if (entities) {
    try {
      const data = base64JsonDecode<T[]>(entities);
      if (data) {
        adapter.upsertMany(state, data);
      } else {
        console.error(`Could not decode '${key}' data from LocalStorage.`);
      }
    } catch (e) {
      console.error(`Could not load '${key}' data from LocalStorage.`);
    }
  }
};

/**
 * Saves entities to local storage.
 */
export const localStorageSaveEntities = async <T>(
  key: string,
  entities: T[],
) => {
  try {
    const encoded = base64JsonEncode(entities);
    localStorage().setItem(`state-entities-${key}`, encoded);
  } catch (e) {
    console.error(`Could not save ${key} data to LocalStorage.`);
  }
};
