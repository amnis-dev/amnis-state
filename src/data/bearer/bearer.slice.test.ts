import {
  bearerInitialState,
} from './bearer.slice.js';

import { storeSetup } from '../../store.js';

/**
 * ============================================================
 */
test('bearer should return the initial state', () => {
  const store = storeSetup();

  expect(
    store.getState().bearer,
  ).toEqual(bearerInitialState);
});
