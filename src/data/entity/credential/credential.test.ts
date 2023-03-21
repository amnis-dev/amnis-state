import { storeSetup } from '../../../store.js';
import {
  credentialCreator, credentialState, credentialBase,
} from './credential.js';

/**
 * ============================================================
 */
test('should properly set a key', () => {
  expect(credentialState.key()).toEqual('credential');
});

/**
 * ============================================================
 */
test('should create a data object', () => {
  const credential = credentialCreator({
    name: '',
    publicKey: '',
  });

  expect(credential).toEqual(
    expect.objectContaining({
      name: '',
      publicKey: '',
    }),
  );
});

/**
 * ============================================================
 */
test('should return the initial state', () => {
  const store = storeSetup();

  expect(
    store.getState()[credentialState.key()],
  ).toEqual(credentialState.initialState);
});

/**
 * ============================================================
 */
test('should handle creating a new entity', () => {
  const store = storeSetup();

  const base = credentialBase();
  const action = credentialState.actions().create(base);

  store.dispatch(action);
  const entities = credentialState.selectors().selectAll(store.getState());
  expect(entities).toHaveLength(1);

  expect(entities[0]).toEqual(expect.objectContaining(base));
});
