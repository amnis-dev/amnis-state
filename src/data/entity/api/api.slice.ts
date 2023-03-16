import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { entityExtraReducers, entityReducers } from '../entity.reducers.js';
import { entitySelectors } from '../entity.selectors.js';
import { dataExtraReducers } from '../../data.reducers.js';
import { metaInitial } from '../entity.js';
import type { Entity } from '../entity.types.js';
import { apiKey } from './api.js';
import type { Api, ApiMeta } from './api.types.js';

/**
 * RTK api adapter.
 * Manages the normalized entities.
 */
export const apiAdapter = createEntityAdapter<Entity<Api>>({
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
 * Initialized api state with meta information.
 */
export const apiInitialState = apiAdapter.getInitialState<ApiMeta>(
  metaInitial<Api>(),
);

/**
 * RTK Api Slice
 */
export const apiSlice = createSlice({
  name: apiKey,
  initialState: apiInitialState,
  reducers: {
    /**
     * Common reducers and actions.
     */
    ...entityReducers<Api>(apiKey, apiAdapter),
  },
  extraReducers: (builder) => {
    /**
     * Add common extra reducers.
     */
    dataExtraReducers(apiKey, apiAdapter, builder);

    /**
     * Required: Enables mutations from core actions.
     */
    entityExtraReducers(apiKey, apiAdapter, builder);
    /**
     * Required: Enables mutations from api requests.
     */
    // apiExtraReducers(apiKey, apiAdapter, builder);
  },
});

/**
 * Api redux reducer.
 */
export const apiReducer = apiSlice.reducer;

/**
 * Api redux actions.
 */
export const apiActions = apiSlice.actions;

/**
 * Api redux selectors.
 */
export const apiSelectors = {
  /**
   * Gets entity selectors.
   */
  ...apiAdapter.getSelectors<{
    [apiKey]: typeof apiInitialState;
  }>((state) => state[apiKey]),
  /**
   * Gets core selectors.
   */
  ...entitySelectors<Api>(apiKey),
};

/**
 * Api redux selector keys.
 */
export type ApiSelector = Extract<keyof typeof apiSelectors, string>;

/**
 * Export the slice as default.
 */
export default apiSlice;
