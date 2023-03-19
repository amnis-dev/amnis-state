import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { entityExtraReducers, entityReducers } from '../entity.reducers.js';
import { entitySelectors } from '../entity.selectors.js';
import { dataExtraReducers } from '../../data.reducers.js';
import { metaInitial } from '../entity.js';
import type { Entity } from '../entity.types.js';
import { systemKey } from './system.js';
import type {
  System,
  SystemMeta,
} from './system.types.js';
import { localStorageLoad } from '../../../localstorage.js';

/**
 * RTK system adapter.
 * Manages the normalized entities.
 */
export const systemAdapter = createEntityAdapter<Entity<System>>({
  /**
   * Identifiers are stored in the `$id` property.
   */
  selectId: (entity) => entity.$id,

  /**
   * OPTIONAL: Sort by value other than $id.
   */
  // sortComparer: (a, b) => a.name.localeCompare(b.name),
});

/**
 * Initialized system state with meta information.
 */
export const systemInitialState = systemAdapter.getInitialState<SystemMeta>(
  metaInitial<System>(),
);

/**
 * Load system data.
 */
localStorageLoad(systemKey, systemInitialState, systemAdapter);

/**
 * RTK System Slice
 */
export const systemSlice = createSlice({
  name: systemKey,
  initialState: systemInitialState,
  reducers: {
    /**
     * Common reducers and actions.
     */
    ...entityReducers<System>(systemKey, systemAdapter),
  },
  extraReducers: (builder) => {
    /**
     * Add common extra reducers.
     */
    dataExtraReducers(
      systemKey,
      systemAdapter,
      builder,
      {
        save: true,
      },
    );

    /**
     * Required: Enables mutations from core actions.
     */
    entityExtraReducers(systemKey, systemAdapter, builder);
  },
});

/**
 * System redux reducer.
 */
export const systemReducer = systemSlice.reducer;

/**
 * System redux actions.
 */
export const systemActions = systemSlice.actions;

/**
 * System redux selectors.
 */
export const systemSelectors = {
  /**
   * Gets entity selectors.
   */
  ...systemAdapter.getSelectors<{
    [systemKey]: typeof systemInitialState;
  }>((state) => state[systemKey]),
  /**
   * Gets core selectors.
   */
  ...entitySelectors<System>(systemKey),
};

/**
 * System redux selector keys.
 */
export type SystemSelector = Extract<keyof typeof systemSelectors, string>;

/**
 * Export the slice as default.
 */
export default systemSlice;
