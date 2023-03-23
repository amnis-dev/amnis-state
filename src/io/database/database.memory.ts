import type { UID } from '../../core/index.js';
import { uidList } from '../../core/index.js';
import { GrantScope } from '../../data/grant/index.js';
import type { DataDeleter, Entity, EntityObjects } from '../../data/index.js';
import type { Database } from './database.types.js';
import type { State } from '../../state.types.js';

/**
 * Storage type.
 */
export type MemoryStorage = State<Record<UID, Entity | undefined>>;

/**
 * Storage object for entities.
 */
let storage: MemoryStorage = {};

/**
 * Function to get memory storage.
 */
export function databaseMemoryStorage() {
  return storage;
}

/**
 * Function to clear memory storage.
 */
export function databaseMemoryClear() {
  storage = {};
}

/**
 * This database is simply an interface for a JSON object.
 * Use this database interface for testing and mocking APIs.
 */
export const databaseMemory: Database = {
  initialize: (initialStorage: MemoryStorage = {}) => {
    storage = initialStorage;
  },
  /**
   * ================================================================================
   * CREATE
   * ----------------------------------------
   */
  create: async (state) => {
    const result: EntityObjects = {};

    Object.keys(state).every((sliceKey) => {
      const col: Entity[] = state[sliceKey];
      if (!Array.isArray(col)) {
        return true;
      }
      col.every((entity) => {
        const entityId = entity.$id;
        if (!entity) {
          return true;
        }

        const storageKey = sliceKey;

        if (!storage[storageKey]) {
          storage[storageKey] = {} as Record<UID, Entity>;
        }
        if (storage[storageKey][entityId]) {
          return true;
        }
        if (!result[sliceKey]) {
          result[sliceKey] = [];
        }
        storage[storageKey][entityId] = entity;
        result[sliceKey].push(entity);
        return true;
      });
      return true;
    });

    return result;
  },
  /**
   * ================================================================================
   * READ
   * ----------------------------------------
   */
  read: async (querySlice, controls = {}) => {
    const { scope, subject } = controls;
    const result: EntityObjects = {};

    Object.keys(querySlice).every((queryStateKey) => {
      const storageKey = queryStateKey;

      /**
       * Ensure this queryStateion is within auth scope.
       */
      if (scope && !scope[queryStateKey]) {
        return true;
      }

      const query = querySlice[queryStateKey]?.$query || {};

      /**
       * Skip if the query is undefined or key doesn't exist on storage.
       */
      if (!query || !storage[storageKey]) {
        return true;
      }

      /**
       * Ensure delete-marked entities are not queryStateed by default.
       */
      if (query.delete === undefined) {
        query.delete = { $eq: false };
      }

      result[queryStateKey] = Object.values(storage[storageKey]) as Entity[];

      /**
       * Define the start index and limit.
       */
      const start = querySlice[queryStateKey].$range?.start ?? 0;
      const limit = querySlice[queryStateKey].$range?.limit ?? 20;

      /**
       * Loop through the query properties.
       */
      Object.keys(query).forEach((queryKey) => {
        const entityKey = queryKey as keyof Entity;
        const filter = query[queryKey];

        result[queryStateKey] = result[queryStateKey].filter((entity) => {
          /**
           * Check to ensure this entity is within the scope.
           * If the scope is owner only, the entity must have the owner id match the subject.
           */
          if (
            scope
            && scope[queryStateKey] === GrantScope.Owned
            && subject
            && (entity.$owner !== subject
              && !entity.$readers.includes(subject))
          ) {
            return false;
          }

          if (!filter) {
            return true;
          }

          const filterKeyLength = Object.keys(filter).length;
          let matches = 0;

          if (filter.$eq !== undefined && filter.$eq === entity[entityKey]) {
            matches += 1;
          }

          if (
            filter.$lt !== undefined
            && typeof entity[entityKey] === 'number'
            && (entity[entityKey] as unknown as number) < filter.$lt
          ) {
            matches += 1;
          }

          if (
            filter.$lte !== undefined
            && typeof entity[entityKey] === 'number'
            && (entity[entityKey] as unknown as number) <= filter.$lte
          ) {
            matches += 1;
          }

          if (
            filter.$gt !== undefined
            && typeof entity[entityKey] === 'number'
            && (entity[entityKey] as unknown as number) > filter.$gt
          ) {
            matches += 1;
          }

          if (
            filter.$gte !== undefined
            && typeof entity[entityKey] === 'number'
            && (entity[entityKey] as unknown as number) >= filter.$gte
          ) {
            matches += 1;
          }

          if (filter.$in !== undefined && filter.$in.includes(entity[entityKey])) {
            matches += 1;
          }

          return matches === filterKeyLength;
        }).slice(start, limit + start);
      });

      return true;
    });

    return result;
  },
  /**
   * ================================================================================
   * UPDATE
   * ----------------------------------------
   */
  update: async (state, controls = {}) => {
    const { scope, subject } = controls;
    const result: EntityObjects = {};

    Object.keys(state).every((sliceKey) => {
      const storageKey = sliceKey;

      /**
       * Ensure this selection is within auth scope.
       */
      if (scope && !scope[sliceKey]) {
        return true;
      }

      const col = state[sliceKey];
      if (!Array.isArray(col)) {
        return true;
      }

      col.every((entity) => {
        const entityId = entity.$id;
        if (!entity) {
          return true;
        }
        if (!storage[storageKey]) {
          return true;
        }
        const storedEntity = storage[storageKey][entityId];
        if (!storedEntity) {
          return true;
        }
        /**
         * Check to ensure this entity is within the scope.
         * If the scope is owner only, the entity must have the owner id match the subject.
         */
        if (
          scope
          && scope[sliceKey] === GrantScope.Owned
          && storedEntity.$owner !== subject
        ) {
          return false;
        }
        if (!result[sliceKey]) {
          result[sliceKey] = [];
        }
        const storedEntityNext = {
          ...storedEntity,
          ...entity,
        };
        storage[storageKey][entityId] = storedEntityNext;
        result[sliceKey].push(storedEntityNext);
        return true;
      });

      return true;
    });

    return result;
  },
  /**
   * ================================================================================
   * DELETE
   * ----------------------------------------
   */
  delete: async (state, controls = {}) => {
    const { scope, subject } = controls;
    const result: DataDeleter = {};

    Object.keys(state).every((sliceKey) => {
      const storageKey = sliceKey;

      /**
       * Ensure this selection is within auth scope.
       */
      if (scope && !scope[sliceKey]) {
        return true;
      }

      if (!storage[storageKey]) {
        return true;
      }
      const references = state[sliceKey];

      references.every((ref: UID) => {
        const storedEntity = storage[storageKey][ref];
        if (!storedEntity) {
          return true;
        }
        /**
         * Check to ensure this entity is within the scope.
         * If the scope is owner only, the entity must have the owner id match the subject.
         */
        if (
          scope
          && scope[sliceKey] === GrantScope.Owned
          && storedEntity.$owner !== subject
        ) {
          return false;
        }

        delete storage[storageKey][ref];
        if (!result[sliceKey]) {
          result[sliceKey] = uidList();
        }
        result[sliceKey].push(ref);

        return true;
      });

      return true;
    });

    return result;
  },
};

export default databaseMemory;
