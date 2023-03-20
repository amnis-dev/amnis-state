import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { entityExtraReducers, entityReducers } from '../entity.reducers.js';
import { entitySelectors } from '../entity.selectors.js';
import { dataExtraReducers, extraReducersApply } from '../../data.reducers.js';
import { metaInitial } from '../entity.js';
import type { Entity } from '../entity.types.js';
import { serviceKey } from './service.js';
import type { Service, ServiceMeta } from './service.types.js';

/**
 * RTK service adapter.
 * Manages the normalized entities.
 */
export const serviceAdapter = createEntityAdapter<Entity<Service>>({
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
 * Initialized service state with meta information.
 */
export const serviceInitialState = serviceAdapter.getInitialState<ServiceMeta>(
  metaInitial<Service>(),
);

/**
 * RTK Service Slice
 */
export const serviceSlice = createSlice({
  name: serviceKey,
  initialState: serviceInitialState,
  reducers: {
    /**
     * Common reducers and actions.
     */
    ...entityReducers<Service>(serviceKey, serviceAdapter),
  },
  extraReducers: (builder) => {
    /**
     * Add common extra reducers.
     */
    extraReducersApply({
      key: serviceKey,
      adapter: serviceAdapter,
      builder,
    }, [
      dataExtraReducers,
      entityExtraReducers,
    ]);
  },
});

/**
 * Service redux reducer.
 */
export const serviceReducer = serviceSlice.reducer;

/**
 * Service redux actions.
 */
export const serviceActions = serviceSlice.actions;

/**
 * Service redux selectors.
 */
export const serviceSelectors = {
  /**
   * Gets entity selectors.
   */
  ...serviceAdapter.getSelectors<{
    [serviceKey]: typeof serviceInitialState;
  }>((state) => state[serviceKey]),
  /**
   * Gets core selectors.
   */
  ...entitySelectors<Service>(serviceKey),
};

/**
 * Service redux selector keys.
 */
export type ServiceSelector = Extract<keyof typeof serviceSelectors, string>;

/**
 * Export the slice as default.
 */
export default serviceSlice;
