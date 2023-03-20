import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { entityExtraReducers, entityReducers } from '../entity.reducers.js';
import { entitySelectors } from '../entity.selectors.js';
import { dataExtraReducers, extraReducersApply } from '../../data.reducers.js';
import { metaInitial } from '../entity.js';
import type { Entity } from '../entity.types.js';
import { contactKey } from './contact.js';
import type { Contact, ContactMeta } from './contact.types.js';

/**
 * RTK contact adapter.
 * Manages the normalized entities.
 */
export const contactAdapter = createEntityAdapter<Entity<Contact>>({
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
 * Initialized contact state with meta information.
 */
export const contactInitialState = contactAdapter.getInitialState<ContactMeta>(
  metaInitial<Contact>(),
);

/**
 * RTK Contact Slice
 */
export const contactSlice = createSlice({
  name: contactKey,
  initialState: contactInitialState,
  reducers: {
    /**
     * Common reducers and actions.
     */
    ...entityReducers<Contact>(contactKey, contactAdapter),
  },
  extraReducers: (builder) => {
    /**
     * Add common extra reducers.
     */
    extraReducersApply({
      key: contactKey,
      adapter: contactAdapter,
      builder,
      options: {
        save: {
          committed: false,
        },
      },
    }, [
      dataExtraReducers,
      entityExtraReducers,
    ]);
  },
});

/**
 * Contact redux reducer.
 */
export const contactReducer = contactSlice.reducer;

/**
 * Contact redux actions.
 */
export const contactActions = contactSlice.actions;

/**
 * Contact redux selectors.
 */
export const contactSelectors = {
  /**
   * Gets entity selectors.
   */
  ...contactAdapter.getSelectors<{
    [contactKey]: typeof contactInitialState;
  }>((state) => state[contactKey]),
  /**
   * Gets core selectors.
   */
  ...entitySelectors<Contact>(contactKey),
};

/**
 * Contact redux selector keys.
 */
export type ContactSelector = Extract<keyof typeof contactSelectors, string>;

/**
 * Export the slice as default.
 */
export default contactSlice;
