import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { entityExtraReducers, entityReducers } from '../entity.reducers.js';
import { entitySelectors } from '../entity.selectors.js';
import { dataExtraReducers, extraReducersApply } from '../../data.reducers.js';
import { metaInitial } from '../entity.js';
import type { Entity } from '../entity.types.js';
import { noteKey } from './note.js';
import type { Note, NoteMeta } from './note.types.js';

/**
 * RTK note adapter.
 * Manages the normalized entities.
 */
export const noteAdapter = createEntityAdapter<Entity<Note>>({
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
 * Initialized note state with meta information.
 */
export const noteInitialState = noteAdapter.getInitialState<NoteMeta>(
  metaInitial<Note>(),
);

/**
 * RTK Note Slice
 */
export const noteSlice = createSlice({
  name: noteKey,
  initialState: noteInitialState,
  reducers: {
    /**
     * Common reducers and actions.
     */
    ...entityReducers<Note>(noteKey, noteAdapter),
  },
  extraReducers: (builder) => {
    /**
     * Add common extra reducers.
     */
    extraReducersApply({
      key: noteKey,
      adapter: noteAdapter,
      builder,
    }, [
      dataExtraReducers,
      entityExtraReducers,
    ]);
  },
});

/**
 * Note redux reducer.
 */
export const noteReducer = noteSlice.reducer;

/**
 * Note redux actions.
 */
export const noteActions = noteSlice.actions;

/**
 * Note redux selectors.
 */
export const noteSelectors = {
  /**
   * Gets entity selectors.
   */
  ...noteAdapter.getSelectors<{
    [noteKey]: typeof noteInitialState;
  }>((state) => state[noteKey]),
  /**
   * Gets core selectors.
   */
  ...entitySelectors<Note>(noteKey),
};

/**
 * Note redux selector keys.
 */
export type NoteSelector = Extract<keyof typeof noteSelectors, string>;

/**
 * Export the slice as default.
 */
export default noteSlice;
