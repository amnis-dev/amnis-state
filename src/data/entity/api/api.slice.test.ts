import {
  apiInitialState,
  apiSelectors,
  apiActions,
} from './api.slice.js';

import { storeSetup } from '../../../store.js';
import { apiCreator, apiBase } from './api.js';

/**
 * ============================================================
 */
test('api should return the initial state', () => {
  const store = storeSetup();

  expect(
    store.getState().api,
  ).toEqual(apiInitialState);
});

/**
 * ============================================================
 */
test('should handle creating a new api', () => {
  const store = storeSetup();

  const action = apiActions.create(apiCreator(apiBase()));

  store.dispatch(action);
  const entities = apiSelectors.selectAll(store.getState());
  expect(entities).toHaveLength(1);

  expect(entities[0]).toEqual(expect.objectContaining(apiBase()));
});
