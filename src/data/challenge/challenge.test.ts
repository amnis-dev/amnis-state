import { challengeBase, challengeCreate, challengeState } from './challenge.js';

import { storeSetup } from '../../store.js';

/**
 * ============================================================
 */
test('challenges should return the initial state', () => {
  const store = storeSetup();

  expect(
    store.getState()[challengeState.key],
  ).toEqual(challengeState.initialState);
});

/**
 * ============================================================
 */
test('should handle creating a new challenges', () => {
  const store = storeSetup();

  const action = challengeState.actions.create(challengeCreate(challengeBase()));

  store.dispatch(action);
  const entities = challengeState.selectors.all(store.getState());
  expect(entities).toHaveLength(1);

  expect(entities[0]).toEqual(expect.objectContaining({
    exp: expect.any(Number),
  }));
});
