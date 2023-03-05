import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { coreExtraReducers, coreReducers } from '../../../reducers.js';
import { coreSelectors } from '../../../selectors.js';
import { metaInitial } from '../entity.js';
import type { Entity } from '../entity.types.js';
import { systemKey } from './system.js';
import type {
  System,
  SystemMeta,
} from './system.types.js';

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
 * RTK System Slice
 */
export const systemSlice = createSlice({
  name: systemKey,
  initialState: systemInitialState,
  reducers: {
    /**
     * Common reducers and actions.
     */
    ...coreReducers<System>(systemKey, systemAdapter),
  },
  extraReducers: (builder) => {
    /**
     * Required: Enables mutations from core actions.
     */
    coreExtraReducers(systemKey, systemAdapter, builder);
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
  ...coreSelectors<System>(systemKey),
};

/**
 * System redux selector keys.
 */
export type SystemSelector = Extract<keyof typeof systemSelectors, string>;

/**
 * Export the slice as default.
 */
export default systemSlice;
