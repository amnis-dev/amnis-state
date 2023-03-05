import type { PayloadAction } from '@reduxjs/toolkit';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { bearerKey } from './bearer.js';

import type { Bearer, BearerMeta } from './bearer.types.js';

/**
 * RTK bearer adapter.
 * Manages the normalized entities.
 */
export const bearerAdapter = createEntityAdapter<Bearer>({
  /**
   * Identifiers are stored in the `$id` property.
   */
  selectId: (entity) => entity.id,

  /**
   * In this case, sorting by ID is ideal.
   */
  sortComparer: (a, b) => a.id.localeCompare(b.id),
});

/**
 * Initialized bearer state with meta information.
 */
export const bearerInitialState = bearerAdapter.getInitialState<BearerMeta>({});

type BearerUpdater = {id: string} & Partial<Omit<Bearer, 'id'>>;

/**
 * RTK Bearer Slice
 */
export const bearerSlice = createSlice({
  name: bearerKey,
  initialState: bearerInitialState,
  reducers: {
    wipe(state) {
      bearerAdapter.removeAll(state);
    },
    update(state, action: PayloadAction<BearerUpdater>) {
      const { id, ...changes } = action.payload;
      bearerAdapter.updateOne(state, {
        id,
        changes,
      });
    },
    updateMany(state, action: PayloadAction<BearerUpdater[]>) {
      const updaters = action.payload.map((updater) => {
        const { id, ...changes } = updater;
        return { id, changes };
      });
      bearerAdapter.updateMany(state, updaters);
    },
  },
  // extraReducers: (builder) => {
  // },
});

/**
 * Bearer redux reducer.
 */
export const bearerReducer = bearerSlice.reducer;

/**
 * Bearer redux actions.
 */
export const bearerActions = bearerSlice.actions;

/**
 * Bearer redux selectors.
 */
export const bearerSelectors = {
  /**
   * Gets entity selectors.
   */
  ...bearerAdapter.getSelectors<{
    [bearerKey]: typeof bearerInitialState;
  }>((state) => state[bearerKey]),
};

/**
 * Bearer redux selector keys.
 */
export type BearerSelector = Extract<keyof typeof bearerSelectors, string>;

/**
 * Export the slice as default.
 */
export default bearerSlice;
