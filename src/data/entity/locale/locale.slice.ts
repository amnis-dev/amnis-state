import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { entityExtraReducers, entityReducers } from '../entity.reducers.js';
import { entitySelectors } from '../entity.selectors.js';
import { dataExtraReducers, extraReducersApply } from '../../data.reducers.js';
import { metaInitial } from '../entity.js';
import type { Entity } from '../entity.types.js';
import { localeKey } from './locale.js';
import type { Locale, LocaleMeta } from './locale.types.js';

/**
 * RTK locale adapter.
 * Manages the normalized entities.
 */
export const localeAdapter = createEntityAdapter<Entity<Locale>>({
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
 * Initialized locale state with meta information.
 */
export const localeInitialState = localeAdapter.getInitialState<LocaleMeta>(
  metaInitial<Locale>(),
);

/**
 * RTK Locale Slice
 */
export const localeSlice = createSlice({
  name: localeKey,
  initialState: localeInitialState,
  reducers: {
    /**
     * Common reducers and actions.
     */
    ...entityReducers<Locale>(localeKey, localeAdapter),
  },
  extraReducers: (builder) => {
    /**
     * Add common extra reducers.
     */
    extraReducersApply({
      key: localeKey,
      adapter: localeAdapter,
      builder,
    }, [
      dataExtraReducers,
      entityExtraReducers,
    ]);
  },
});

/**
 * Locale redux reducer.
 */
export const localeReducer = localeSlice.reducer;

/**
 * Locale redux actions.
 */
export const localeActions = localeSlice.actions;

/**
 * Locale redux selectors.
 */
export const localeSelectors = {
  /**
   * Gets entity selectors.
   */
  ...localeAdapter.getSelectors<{
    [localeKey]: typeof localeInitialState;
  }>((state) => state[localeKey]),
  /**
   * Gets core selectors.
   */
  ...entitySelectors<Locale>(localeKey),
};

/**
 * Locale redux selector keys.
 */
export type LocaleSelector = Extract<keyof typeof localeSelectors, string>;

/**
 * Export the slice as default.
 */
export default localeSlice;
