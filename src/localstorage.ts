import type { EntityAdapter, EntityState } from '@reduxjs/toolkit';

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
 * Loads all of part of a state from local storage.
 */
export const localStorageLoadState = <T>(key: string): Partial<T> => {
  const state = localStorage().getItem(`state-${key}`);

  if (!state) {
    return {};
  }

  try {
    const data = JSON.parse(state);
    if (!data) {
      console.error(`Could not decode '${key}' state data from LocalStorage.`);
      return {};
    }
    return data;
  } catch (e) {
    console.error(`Could not load '${key}' state data from LocalStorage.`);
  }

  return {};
};

/**
 * Saves all or pat of a state to local storage.
 */
export const localStorageSaveState = async <T>(key: string, state: Partial<T>) => {
  try {
    const encoded = JSON.stringify(state);
    localStorage().setItem(`state-${key}`, encoded);
  } catch (e) {
    console.error(`Could not save ${key} state data to LocalStorage.`);
  }
};

/**
 * Loads entities from local storage.
 */
export const localStorageLoadEntities = <T>(
  key: string,
  state: EntityState<T>,
  adapter: EntityAdapter<T>,
) => {
  const entities = localStorage().getItem(`state-entities-${key}`);

  if (entities) {
    try {
      const data = JSON.parse(entities);
      if (data) {
        adapter.upsertMany(state, data);
      } else {
        console.error(`Could not decode '${key}' entity data from LocalStorage.`);
      }
    } catch (e) {
      console.error(`Could not load '${key}' entity data from LocalStorage.`);
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
    const encoded = JSON.stringify(entities);
    localStorage().setItem(`state-entities-${key}`, encoded);
  } catch (e) {
    console.error(`Could not save ${key} data to LocalStorage.`);
  }
};
