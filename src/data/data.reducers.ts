/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  ActionReducerMapBuilder, EntityState, EntityStateAdapter,
} from '@reduxjs/toolkit';
import { localStorageSaveEntities } from '../localstorage.js';
import type { State } from '../state.types.js';
import { dataActions } from './data.actions.js';
import type { DataEntity } from './types.js';

export interface DataReducerOptions<T> {
  save: boolean | Record<keyof T, unknown>;
}

async function dataSave<D>(
  { save }: DataReducerOptions<D>,
  key: string,
  state: EntityState<D> & any,
) {
  if (save !== false) {
    const entities = Object.values(state.entities) as D[];
    if (typeof save === 'boolean') {
      /** @ts-ignore */
      localStorageSaveEntities(key, entities);
    } else {
      const entitiesFiltered = entities.filter(
        (entity) => Object.keys(save).every((saveKey) => {
          const k = saveKey as keyof D;
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

export function dataExtraReducers<
  D extends DataEntity,
  EA extends EntityStateAdapter<D>,
  ARMB extends ActionReducerMapBuilder<EntityState<D> & State>
>(
  key: string,
  adapter: EA,
  builder: ARMB,
  options: DataReducerOptions<D> = { save: false },
) {
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

  /**
   * TODO: Refactor to organize cases and matchers.
   */
  // builder.addMatcher(
  //   (action: Action): action is Action => action.type.startsWith(key),
  //   (state) => {
  //     // Saves data if needed.
  //     dataSave(options, key, state);
  //   },
  // );
}

export default dataExtraReducers;
