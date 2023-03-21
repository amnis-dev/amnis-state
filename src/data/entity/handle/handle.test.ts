import { uid } from '../../../index.js';
import { storeSetup } from '../../../store.js';
import {
  handleCreator, handleState, handleBase,
} from './handle.js';

/**
 * ============================================================
 */
test('should properly set a key', () => {
  expect(handleState.key()).toEqual('handle');
});

/**
 * ============================================================
 */
test('should create a data object', () => {
  const $subject = uid('entity');
  const handle = handleCreator({
    $subject,
    name: '',
  });

  expect(handle).toEqual(
    expect.objectContaining({
      $id: expect.any(String),
      $subject,
      name: '',
    }),
  );
});

/**
 * ============================================================
 */
test('should return the initial state', () => {
  const store = storeSetup();

  expect(
    store.getState()[handleState.key()],
  ).toEqual(handleState.initialState);
});

/**
 * ============================================================
 */
test('should handle creating a new entity', () => {
  const store = storeSetup();

  const base = handleBase();
  const action = handleState.actions().create(base);

  store.dispatch(action);
  const entities = handleState.selectors().selectAll(store.getState());
  expect(entities).toHaveLength(1);

  expect(entities[0]).toEqual(expect.objectContaining(base));
});
