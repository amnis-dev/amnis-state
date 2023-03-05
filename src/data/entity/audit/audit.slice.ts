import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { coreExtraReducers, coreReducers } from '../../../reducers.js';
import { coreSelectors } from '../../../selectors.js';
import { metaInitial } from '../entity.js';
import type { Entity } from '../entity.types.js';
import { auditKey } from './audit.js';
import type { Audit, AuditMeta } from './audit.types.js';

/**
 * RTK audit adapter.
 * Manages the normalized entities.
 */
export const auditAdapter = createEntityAdapter<Entity<Audit>>({
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
 * Initialized audit state with meta information.
 */
export const auditInitialState = auditAdapter.getInitialState<AuditMeta>(
  metaInitial<Audit>(),
);

/**
 * RTK Audit Slice
 */
export const auditSlice = createSlice({
  name: auditKey,
  initialState: auditInitialState,
  reducers: {
    /**
     * Common reducers and actions.
     */
    ...coreReducers<Audit>(auditKey, auditAdapter),
  },
  extraReducers: (builder) => {
    /**
     * Required: Enables mutations from core actions.
     */
    coreExtraReducers(auditKey, auditAdapter, builder);
    /**
     * Required: Enables mutations from api requests.
     */
    // apiExtraReducers(auditKey, auditAdapter, builder);
  },
});

/**
 * Audit redux reducer.
 */
export const auditReducer = auditSlice.reducer;

/**
 * Audit redux actions.
 */
export const auditActions = auditSlice.actions;

/**
 * Audit redux selectors.
 */
export const auditSelectors = {
  /**
   * Gets entity selectors.
   */
  ...auditAdapter.getSelectors<{
    [auditKey]: typeof auditInitialState;
  }>((state) => state[auditKey]),
  /**
   * Gets core selectors.
   */
  ...coreSelectors<Audit>(auditKey),
};

/**
 * Audit redux selector keys.
 */
export type AuditSelector = Extract<keyof typeof auditSelectors, string>;

/**
 * Export the slice as default.
 */
export default auditSlice;
