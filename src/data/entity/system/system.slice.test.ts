import { systemBase, systemCreator } from './system.js';
import {
  systemInitialState,
  systemSelectors,
  systemActions,
} from './system.slice.js';

import { storeSetup } from '../../../store.js';

/**
 * ============================================================
 */
test('system should return the initial state', () => {
  const store = storeSetup();

  expect(
    store.getState().system,
  ).toEqual(systemInitialState);
});

/**
 * ============================================================
 */
test('should handle creating a new system', () => {
  const store = storeSetup();

  const action = systemActions.create(systemCreator(systemBase()));

  store.dispatch(action);
  const entities = systemSelectors.selectAll(store.getState());
  expect(entities).toHaveLength(1);

  expect(entities[0]).toEqual(expect.objectContaining({
    name: expect.any(String),
    sessionExpires: expect.any(Number),
    $initialRoles: expect.any(Array),
  }));
});
