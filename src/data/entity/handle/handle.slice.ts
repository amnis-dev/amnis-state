import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { entityExtraReducers, entityReducers } from '../entity.reducers.js';
import { entitySelectors } from '../entity.selectors.js';
import { dataExtraReducers } from '../../data.reducers.js';
import { metaInitial } from '../entity.js';
import type { Entity } from '../entity.types.js';
import { handleKey } from './handle.js';
import type { Handle, HandleMeta } from './handle.types.js';

/**
 * RTK handle adapter.
 * Manages the normalized entities.
 */
export const handleAdapter = createEntityAdapter<Entity<Handle>>({
  /**
   * Identifiers are stored in the `$id` property.
   */
  selectId: (entity) => entity.$id,

  /**
   * Sort by the handle name.
   */
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

/**
 * Initialized handle state with meta information.
 */
export const handleInitialState = handleAdapter.getInitialState<HandleMeta>(
  metaInitial<Handle>(),
);

/**
 * RTK Handle Slice
 */
export const handleSlice = createSlice({
  name: handleKey,
  initialState: handleInitialState,
  reducers: {
    /**
     * Common reducers and actions.
     */
    ...entityReducers<Handle>(handleKey, handleAdapter),
  },
  extraReducers: (builder) => {
    /**
     * Add common extra reducers.
     */
    dataExtraReducers(handleKey, handleAdapter, builder);

    /**
     * Required: Enables mutations from core actions.
     */
    entityExtraReducers(handleKey, handleAdapter, builder);
  },
});

/**
 * Handle redux reducer.
 */
export const handleReducer = handleSlice.reducer;

/**
 * Handle redux actions.
 */
export const handleActions = handleSlice.actions;

/**
 * Handle redux selectors.
 */
export const handleSelectors = {
  /**
   * Gets entity selectors.
   */
  ...handleAdapter.getSelectors<{
    [handleKey]: typeof handleInitialState;
  }>((state) => state[handleKey]),
  /**
   * Gets core selectors.
   */
  ...entitySelectors<Handle>(handleKey),
};

/**
 * Handle redux selector keys.
 */
export type HandleSelector = Extract<keyof typeof handleSelectors, string>;

/**
 * Export the slice as default.
 */
export default handleSlice;
