import {
  keyCreator, keyBase, keyState,
} from './key.js';
import { storeSetup } from '../../../store.js';

/**
 * ============================================================
 */
test('key key should be is properly set', () => {
  expect(keyState.key()).toEqual('key');
});

/**
 * ============================================================
 */
test('should create a key', () => {
  const base = keyBase();
  const key = keyCreator(base);

  expect(key).toMatchObject(base);
});

/**
 * ============================================================
 */
test('should return the initial state', () => {
  const store = storeSetup();

  expect(
    store.getState()[keyState.key()],
  ).toEqual(keyState.initialState);
});

/**
 * ============================================================
 */
test('should key creating a new entity', () => {
  const store = storeSetup();

  const base = keyBase();
  const action = keyState.actions().create(base);

  store.dispatch(action);
  const entities = keyState.selectors().selectAll(store.getState());
  expect(entities).toHaveLength(1);

  expect(entities[0]).toEqual(expect.objectContaining(base));
});
