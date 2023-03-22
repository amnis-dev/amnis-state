import { otpBase, otpState } from './otp.js';

import { storeSetup } from '../../store.js';

/**
 * ============================================================
 */
test('otps should return the initial state', () => {
  const store = storeSetup();

  expect(
    store.getState()[otpState.key],
  ).toEqual(otpState.initialState);
});

/**
 * ============================================================
 */
test('should handle creating a new otps', () => {
  const store = storeSetup();

  const base = otpBase();
  const action = otpState.actions.create(base);

  store.dispatch(action);
  const entities = otpState.selectors.all(store.getState());
  expect(entities).toHaveLength(1);

  // expect(entities[0]).toEqual(expect.objectContaining(base));
});
