import { serviceCreate, serviceState } from './service.js';

/**
 * ============================================================
 */
test('service key should be is properly set', () => {
  expect(serviceState.key).toEqual('service');
});

/**
 * ============================================================
 */
test('should create a service', () => {
  const service = serviceCreate({
    name: 'My Test Service',
  });

  expect(service).toEqual(
    expect.objectContaining({
      name: 'My Test Service',
      status: 'offline',
      dateChecked: expect.any(String),
    }),
  );
});
