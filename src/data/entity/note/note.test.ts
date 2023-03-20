import { storeSetup } from '../../../store.js';
import {
  noteKey,
  noteCreator,
  noteBase,
  noteState,
} from './note.js';

/**
 * ============================================================
 */
test('note key should be is properly set', () => {
  expect(noteKey).toEqual('note');
});

/**
 * ============================================================
 */
test('should create a note', () => {
  const note = noteCreator(noteBase);

  expect(note).toEqual(
    expect.objectContaining(noteBase),
  );
});

/**
 * ============================================================
 */
test('note should return the initial state', () => {
  const store = storeSetup();

  expect(
    store.getState().note,
  ).toEqual(noteState.initialState);
});

/**
 * ============================================================
 */
test('should handle creating a new note', () => {
  const store = storeSetup();

  const action = noteState.actions.create(noteCreator(noteBase));

  store.dispatch(action);
  const entities = noteState.selectors.selectAll(store.getState());
  expect(entities).toHaveLength(1);

  expect(entities[0]).toEqual(expect.objectContaining(noteBase));
});
