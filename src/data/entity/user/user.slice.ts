import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { coreExtraReducers, coreReducers } from '../../../reducers.js';
import { coreSelectors } from '../../../selectors.js';
import { metaInitial } from '../entity.js';
import type { Entity } from '../entity.types.js';
import { userKey } from './user.js';
import type { User, UserMeta } from './user.types.js';

/**
 * RTK user adapter.
 * Manages the normalized entities.
 */
export const userAdapter = createEntityAdapter<Entity<User>>({
  /**
   * Identifiers are stored in the `$id` property.
   */
  selectId: (entity) => entity.$id,

  /**
   * Sort by the user's handle.
   */
  sortComparer: (a, b) => a.handle.localeCompare(b.handle),
});

/**
 * Initialized user state with meta information.
 */
export const userInitialState = userAdapter.getInitialState<UserMeta>(
  metaInitial<User>(),
);

/**
 * RTK User Slice
 */
export const userSlice = createSlice({
  name: userKey,
  initialState: userInitialState,
  reducers: {
    /**
     * Common reducers and actions.
     */
    ...coreReducers<User>(userKey, userAdapter),
  },
  extraReducers: (builder) => {
    /**
     * Required: Enables mutations from core actions.
     */
    coreExtraReducers(userKey, userAdapter, builder);
  },
});

/**
 * User redux reducer.
 */
export const userReducer = userSlice.reducer;

/**
 * User redux actions.
 */
export const userActions = userSlice.actions;

/**
 * User redux selectors.
 */
export const userSelectors = {
  /**
   * Gets entity selectors.
   */
  ...userAdapter.getSelectors<{
    [userKey]: typeof userInitialState;
  }>((state) => state[userKey]),
  /**
   * Gets core selectors.
   */
  ...coreSelectors<User>(userKey),
};

/**
 * User redux selector keys.
 */
export type UserSelector = Extract<keyof typeof userSelectors, string>;

/**
 * Export the slice as default.
 */
export default userSlice;
