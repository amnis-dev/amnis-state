import {
  apiInitialState,
} from './api.slice.js';

import { storeSetup } from '../../store.js';

/**
 * ============================================================
 */
test('api should return the initial state', () => {
  const store = storeSetup();

  expect(
    store.getState().api,
  ).toEqual(apiInitialState);
});
