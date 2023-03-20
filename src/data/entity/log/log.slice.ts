import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { entityExtraReducers, entityReducers } from '../entity.reducers.js';
import { entitySelectors } from '../entity.selectors.js';
import { dataExtraReducers, extraReducersApply } from '../../data.reducers.js';
import { metaInitial } from '../entity.js';
import type { Entity } from '../entity.types.js';
import { logKey } from './log.js';
import type { Log, LogMeta } from './log.types.js';

/**
 * RTK log adapter.
 * Manages the normalized entities.
 */
export const logAdapter = createEntityAdapter<Entity<Log>>({
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
 * Initialized log state with meta information.
 */
export const logInitialState = logAdapter.getInitialState<LogMeta>(
  metaInitial<Log>(),
);

/**
 * RTK Log Slice
 */
export const logSlice = createSlice({
  name: logKey,
  initialState: logInitialState,
  reducers: {
    /**
     * Common reducers and actions.
     */
    ...entityReducers<Log>(logKey, logAdapter),
  },
  extraReducers: (builder) => {
    /**
     * Add common extra reducers.
     */
    extraReducersApply({
      key: logKey,
      adapter: logAdapter,
      builder,
    }, [
      dataExtraReducers,
      entityExtraReducers,
    ]);
  },
});

/**
 * Log redux reducer.
 */
export const logReducer = logSlice.reducer;

/**
 * Log redux actions.
 */
export const logActions = logSlice.actions;

/**
 * Log redux selectors.
 */
export const logSelectors = {
  /**
   * Gets entity selectors.
   */
  ...logAdapter.getSelectors<{
    [logKey]: typeof logInitialState;
  }>((state) => state[logKey]),
  /**
   * Gets core selectors.
   */
  ...entitySelectors<Log>(logKey),
};

/**
 * Log redux selector keys.
 */
export type LogSelector = Extract<keyof typeof logSelectors, string>;

/**
 * Export the slice as default.
 */
export default logSlice;
