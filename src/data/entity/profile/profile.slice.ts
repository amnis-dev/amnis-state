import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { coreExtraReducers, coreReducers } from '../../../reducers.js';
import { coreSelectors } from '../../../selectors.js';
import { metaInitial } from '../entity.js';
import type { Entity } from '../entity.types.js';
import { profileKey } from './profile.js';
import type { Profile, ProfileMeta } from './profile.types.js';

/**
 * RTK profile adapter.
 * Manages the normalized entities.
 */
export const profileAdapter = createEntityAdapter<Entity<Profile>>({
  /**
   * Identifiers are stored in the `$id` property.
   */
  selectId: (entity) => entity.$id,

  /**
   * Sort by the profile's display name.
   */
  sortComparer: (a, b) => a.nameDisplay.localeCompare(b.nameDisplay),
});

/**
 * Initialized profile state with meta information.
 */
export const profileInitialState = profileAdapter.getInitialState<ProfileMeta>(
  metaInitial<Profile>(),
);

/**
 * RTK Profile Slice
 */
export const profileSlice = createSlice({
  name: profileKey,
  initialState: profileInitialState,
  reducers: {
    /**
     * Common reducers and actions.
     */
    ...coreReducers<Profile>(profileKey, profileAdapter),
  },
  extraReducers: (builder) => {
    /**
     * Required: Enables mutations from core actions.
     */
    coreExtraReducers(profileKey, profileAdapter, builder);
  },
});

/**
 * Profile redux reducer.
 */
export const profileReducer = profileSlice.reducer;

/**
 * Profile redux actions.
 */
export const profileActions = profileSlice.actions;

/**
 * Profile redux selectors.
 */
export const profileSelectors = {
  /**
   * Gets entity selectors.
   */
  ...profileAdapter.getSelectors<{
    [profileKey]: typeof profileInitialState;
  }>((state) => state[profileKey]),
  /**
   * Gets core selectors.
   */
  ...coreSelectors<Profile>(profileKey),
};

/**
 * Profile redux selector keys.
 */
export type ProfileSelector = Extract<keyof typeof profileSelectors, string>;

/**
 * Export the slice as default.
 */
export default profileSlice;
