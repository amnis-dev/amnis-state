/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  Action,
  Draft,
  EntityState,
} from '@reduxjs/toolkit';
import {
  localStorageDeleteEntities,
  localStorageDeleteState,
  localStorageSaveEntities,
  localStorageSaveState,
} from '../localstorage.js';
import { dataActions } from './data.actions.js';
import type {
  Data, DataExtraReducers, DataReducerOptions, DataReducerSettings,
} from './data.types.js';
import { diffCompare } from './entity/diff.js';
import { dataMetaInitial } from './data.meta.js';

async function dataSaveEntities(
  { save }: DataReducerOptions,
  key: string,
  state: EntityState<Data> & any,
) {
  if (save !== false) {
    const entities = Object.values(state.entities) as Data[];
    if (typeof save === 'boolean') {
      /** @ts-ignore */
      localStorageSaveEntities(key, entities);
    } else {
      const entitiesFiltered = entities.filter(
        (entity) => Object.keys(save).every((saveKey) => {
          const k = saveKey as keyof Data;
          if (entity[k] !== save[k]) {
            return false;
          }
          return true;
        }),
      );

      if (entitiesFiltered.length > 0) {
        localStorageSaveEntities(key, entitiesFiltered);
      }
    }
  }
}

/**
 * Applies a set a extra reducers to a data slice.
 */
export const extraReducersApply = <
  D extends Data,
  M extends Record<string, any> = Record<string, never>
>(
  settings: DataReducerSettings<D, M>,
  reducers: DataExtraReducers<D, M>[],
) => {
  reducers.forEach((reducer) => {
    reducer.cases(settings);
  });

  reducers.forEach((reducer) => {
    reducer.matchers(settings);
  });
};

/**
 * Common extra reducers.
 */
export const dataExtraReducers = {
  cases: <D extends Data>({
    key,
    adapter,
    builder,
    options = { save: false },
  }: DataReducerSettings<D>) => {
    builder.addCase(dataActions.meta, (state, { payload }) => {
      if (!payload[key]) {
        return;
      }

      const meta = payload[key];
      Object.keys(meta).forEach((metaKey) => {
        /** @ts-ignore */
        state[metaKey] = meta[metaKey];
      });
    });

    builder.addCase(dataActions.insert, (state, { payload }) => {
      if (payload[key] && Array.isArray(payload[key])) {
        /** @ts-ignore */
        adapter.upsertMany(state, payload[key]);

        // Saves data if needed.
        dataSaveEntities(options, key, state);
      }
    });

    builder.addCase(dataActions.create, (state, { payload }) => {
      if (payload[key] && Array.isArray(payload[key])) {
        /** @ts-ignore */
        adapter.upsertMany(state, payload[key]);

        // Saves data if needed.
        dataSaveEntities(options, key, state);
      }
    });

    builder.addCase(dataActions.update, (state, { payload }) => {
      if (payload[key] && Array.isArray(payload[key])) {
        /**
         * Maps the updates to the adapter update format.
         */
        const updates = payload[key].map((update) => {
          const { $id, ...changes } = update;

          if (state.original[$id] === undefined) {
            state.original[$id] = { ...state.entities[$id] } as Draft<D>;
          }
          const entity = state.original[$id] as D | undefined;

          if (!entity) {
            return { id: $id, changes };
          }

          /**
         * Perform a diff compare.
         */
          const diffResult = diffCompare<Data>(
            { ...entity, ...changes },
            state.original[$id] as Data,
            { includeEntityKeys: false },
          );

          if (diffResult.length) {
            state.differences[$id] = diffResult as Draft<keyof D>[];
          }

          if (!diffResult.length) {
            if (state.differences[$id]) {
              delete state.differences[$id];
            }
            if (state.original[$id]) {
              delete state.original[$id];
            }
          }

          return { id: $id, changes };
        });

        /** @ts-ignore */
        adapter.updateMany(state, updates);

        /**
         * Save meta information.
         */
        if (options.save) {
          localStorageSaveState(key, {
            original: state.original,
            differences: state.differences,
          });
        }

        // Saves data if needed.
        dataSaveEntities(options, key, state);
      }
    });

    builder.addCase(dataActions.delete, (state, { payload }) => {
      if (payload[key] && Array.isArray(payload[key])) {
        /** @ts-ignore */
        adapter.removeMany(state, payload[key]);

        // Saves data if needed.
        dataSaveEntities(options, key, state);
      }
    });

    builder.addCase(dataActions.wipe, (state) => {
      /** @ts-ignore */
      adapter.removeAll(state);

      const metaDefault = dataMetaInitial<Data>();

      state.active = metaDefault.active;
      state.focused = metaDefault.focused;
      state.selection = metaDefault.selection;

      Object.keys(state.original).forEach((k) => {
        delete state.original[k as keyof typeof state.original];
      });
      Object.keys(state.differences).forEach((k) => {
        delete state.differences[k as keyof typeof state.differences];
      });

      localStorageDeleteState(key);
      localStorageDeleteEntities(key);
    });
  },

  matchers: <D extends Data>({
    key,
    builder,
    options = { save: false },
  }: DataReducerSettings<D>) => {
    builder.addMatcher(
      (action: Action): action is Action => action.type.startsWith(key),
      (state) => {
        // Saves data if needed.
        dataSaveEntities(options, key, state);
      },
    );
  },

};
