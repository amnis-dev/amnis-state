import { storeSetup } from '../../../store.js';
import {
  auditCreator, auditState, auditBase,
} from './audit.js';

/**
 * ============================================================
 */
test('audit key should be is properly set', () => {
  expect(auditState.key()).toEqual('audit');
});

/**
 * ============================================================
 */
test('should create a audit', () => {
  const audit = auditCreator({
    action: 'Testing',
    completed: true,
  });

  expect(audit).toEqual(
    expect.objectContaining({
      action: 'Testing',
      completed: true,
    }),
  );
});

/**
 * ============================================================
 */
test('should return the initial state', () => {
  const store = storeSetup();

  expect(
    store.getState()[auditState.key()],
  ).toEqual(auditState.initialState);
});

/**
 * ============================================================
 */
test('should handle creating a new entity', () => {
  const store = storeSetup();

  const base = auditBase();
  const action = auditState.actions().create(base);

  store.dispatch(action);
  const entities = auditState.selectors().selectAll(store.getState());
  expect(entities).toHaveLength(1);

  expect(entities[0]).toEqual(expect.objectContaining(base));
});
