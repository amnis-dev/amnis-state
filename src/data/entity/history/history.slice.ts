import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { apiExtraReducers } from '../../../api.reducers.js';
import { coreExtraReducers, coreReducers } from '../../../reducers.js';
import { coreSelectors } from '../../../selectors.js';
import { metaInitial } from '../entity.js';
import type { Entity } from '../entity.types.js';
import { historyKey } from './history.js';
import type { HistoryMeta, History } from './history.types.js';

/**
 * RTK history adapter.
 * Manages the normalized entities.
 */
export const historyAdapter = createEntityAdapter<Entity<History>>({
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
 * Initialized history state with meta information.
 */
export const historyInitialState = historyAdapter.getInitialState<HistoryMeta>(
  metaInitial<History>(),
);

/**
 * RTK History Slice
 */
export const historySlice = createSlice({
  name: historyKey,
  initialState: historyInitialState,
  reducers: {
    /**
     * Common reducers and actions.
     */
    ...coreReducers<History>(historyKey, historyAdapter),
  },
  extraReducers: (builder) => {
    /**
     * Required: Enables mutations from core actions.
     */
    coreExtraReducers(historyKey, historyAdapter, builder);
    /**
     * Required: Enables mutations from api requests.
     */
    apiExtraReducers(historyKey, historyAdapter, builder);
  },
});

/**
 * History redux reducer.
 */
export const historyReducer = historySlice.reducer;

/**
 * History redux actions.
 */
export const historyActions = historySlice.actions;

/**
 * History redux selectors.
 */
export const historySelectors = {
  /**
   * Gets entity selectors.
   */
  ...historyAdapter.getSelectors<{
    [historyKey]: typeof historyInitialState;
  }>((state) => state[historyKey]),
  /**
   * Gets core selectors.
   */
  ...coreSelectors<History>(historyKey),
};

/**
 * History redux selector keys.
 */
export type HistorySelector = Extract<keyof typeof historySelectors, string>;

/**
 * Export the slice as default.
 */
export default historySlice;
