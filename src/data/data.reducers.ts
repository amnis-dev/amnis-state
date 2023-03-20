/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  Action,
  EntityState,
} from '@reduxjs/toolkit';
import { localStorageSaveEntities } from '../localstorage.js';
import { dataActions } from './data.actions.js';
import type {
  DataEntity, DataExtraReducers, DataExtraReducersApply, DataReducerOptions,
} from './types.js';

async function dataSave(
  { save }: DataReducerOptions,
  key: string,
  state: EntityState<DataEntity> & any,
) {
  if (save !== false) {
    const entities = Object.values(state.entities) as DataEntity[];
    if (typeof save === 'boolean') {
      /** @ts-ignore */
      localStorageSaveEntities(key, entities);
    } else {
      const entitiesFiltered = entities.filter(
        (entity) => Object.keys(save).every((saveKey) => {
          const k = saveKey as keyof DataEntity;
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
export const extraReducersApply: DataExtraReducersApply = (
  settings,
  reducers,
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
export const dataExtraReducers: DataExtraReducers = {
  cases: ({
    key,
    adapter,
    builder,
    options = { save: false },
  }) => {
    builder.addCase(dataActions.create, (state, { payload }) => {
      if (payload[key] && Array.isArray(payload[key])) {
        /** @ts-ignore */
        adapter.upsertMany(state, payload[key]);

        // Saves data if needed.
        dataSave(options, key, state);
      }
    });

    builder.addCase(dataActions.update, (state, { payload }) => {
      if (payload[key] && Array.isArray(payload[key])) {
        /** @ts-ignore */
        adapter.updateMany(state, payload[key]);

        // Saves data if needed.
        dataSave(options, key, state);
      }
    });

    builder.addCase(dataActions.delete, (state, { payload }) => {
      if (payload[key] && Array.isArray(payload[key])) {
        /** @ts-ignore */
        adapter.removeMany(state, payload[key]);

        // Saves data if needed.
        dataSave(options, key, state);
      }
    });

    builder.addCase(dataActions.wipe, (state) => {
      /** @ts-ignore */
      adapter.removeAll(state);
    });
  },

  matchers: ({
    key,
    builder,
    options = { save: false },
  }) => {
    builder.addMatcher(
      (action: Action): action is Action => action.type.startsWith(key),
      (state) => {
        // Saves data if needed.
        dataSave(options, key, state);
      },
    );
  },

};
