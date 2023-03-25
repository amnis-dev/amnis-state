import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '../store.js';
import type { DataState, Entity, EntityObjects } from '../data/index.js';
import { appSlice } from '../data/index.js';
import { localStorage } from '../localstorage.js';
import type { DataMetaSetter } from '../data/data.actions.js';
import { dataActions } from '../data/data.actions.js';

let localStorageInitialized = false;

/**
 * Redux middleware for loading and saving state to local storage.
 */
export const mwLocalStorage: Middleware = (store) => (next) => (action) => {
  const state = store.getState() as RootState & Record<string, any>;

  /**
   * If the data in local storage has not been initialized, do so.
   */
  if (!localStorageInitialized && state[appSlice.key].dataSave) {
    localStorageInitialized = true;

    /**
     * Load the entity data from local storage.
     */
    try {
      const dataEntities = localStorage().getItem('state-entities');
      if (dataEntities) {
        const entityObjects = JSON.parse(dataEntities) as EntityObjects;
        next(dataActions.insert(entityObjects));
      }
    } catch (e) {
      localStorage().setItem('state-entities', '{}');
    }

    /**
     * Load the entity meta data from local storage.
     */
    try {
      const dataMeta = localStorage().getItem('state-meta');
      if (dataMeta) {
        const metaObjects = JSON.parse(dataMeta) as DataMetaSetter;
        next(dataActions.meta(metaObjects));
      }
    } catch (e) {
      localStorage().setItem('state-meta', '{}');
    }
  }

  /**
   * Call the next dispatch method in the middleware chain.
   */
  const nextReturn = next(action);

  /**
   * If data save is disabled, do not save to local storage.
   */
  if (!state[appSlice.key].dataSave) {
    return nextReturn;
  }

  /**
   * Save the entity data to local storage.
   */
  (async () => {
    const entityObjects: EntityObjects = {};
    const dataMetaSetter: DataMetaSetter<Entity> = {};
    Object.keys(state).forEach((sliceKey) => {
      const sliceState = state[sliceKey];
      if (sliceState?.type !== 'entity') {
        return;
      }

      const sliceEntityState: DataState<Entity> = sliceState as DataState<Entity>;
      if (!sliceEntityState.differences) {
        return;
      }
      const $unsavedIds = Object.keys(sliceEntityState.differences);
      const unsavedEntities = $unsavedIds.map(
        ($id) => sliceEntityState.entities[$id],
      ) as Entity[];
      entityObjects[sliceKey] = unsavedEntities;
      dataMetaSetter[sliceKey] = {
        original: sliceEntityState.original,
        differences: sliceEntityState.differences,
      };
    });

    try {
      localStorage().setItem('state-entities', JSON.stringify(entityObjects));
      localStorage().setItem('state-meta', JSON.stringify(dataMetaSetter));
    } catch (e) {
      console.error('Could not save state data to LocalStorage.');
    }
  })();

  return nextReturn;
};

export default mwLocalStorage;
