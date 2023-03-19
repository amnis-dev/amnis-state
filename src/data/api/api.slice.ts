import type { EntityState } from '@reduxjs/toolkit';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { UID } from '../../core/core.types.js';
import { localStorageLoadEntities } from '../../localstorage.js';
import type { State } from '../../state.types.js';
import { dataExtraReducers } from '../data.reducers.js';
import { apiKey } from './api.js';

import type { Api, ApiMeta } from './api.types.js';

/**
 * RTK api adapter.
 * Manages the normalized entities.
 */
export const apiAdapter = createEntityAdapter<Api>({
  /**
   * Identifiers are stored in the `$id` property.
   */
  selectId: (entity) => entity.$id,

  /**
   * In this case, sorting by ID is ideal.
   */
  sortComparer: (a, b) => a.$id.localeCompare(b.$id),
});

/**
 * Initialized api state with meta information.
 */
export const apiInitialState = apiAdapter.getInitialState<ApiMeta>({});

/**
 * Load information from localstorage.
 */
localStorageLoadEntities(apiKey, apiInitialState, apiAdapter);

/**
 * RTK Api Slice
 */
export const apiSlice = createSlice({
  name: apiKey,
  initialState: apiInitialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * Add common extra reducers.
     */
    dataExtraReducers(
      apiKey,
      apiAdapter,
      builder,
      {
        save: true,
      },
    );
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
   * Selects all system apis
   */
  selectSystemApis: (state: State, systemId: UID): Api[] => {
    const slice = state[apiKey] as ApiMeta & EntityState<Api>;
    const apis = Object.values(slice.entities).filter((api) => api?.$system === systemId) as Api[];
    return apis;
  },
  /**
   * Selects a system api by its reducer path.
   */
  selectSystemApi: (state: State, $system: UID, reducerPath: string): Api | undefined => {
    const slice = state[apiKey] as ApiMeta & EntityState<Api>;
    const api = slice.entities[`${$system}${reducerPath}` as UID];
    return api;
  },
};

/**
 * Api redux selector keys.
 */
export type ApiSelector = Extract<keyof typeof apiSelectors, string>;

/**
 * Export the slice as default.
 */
export default apiSlice;
