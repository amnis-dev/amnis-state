import { apiKey, apiCreator } from './api.js';

/**
 * ============================================================
 */
test('api key should be is properly set', () => {
  expect(apiKey).toEqual('api');
});

/**
 * ============================================================
 */
test('should create a api', () => {
  const api = apiCreator({
    reducerPath: 'apiSys',
    baseUrl: '/api/sys',
  });

  expect(api).toEqual(
    expect.objectContaining({
      reducerPath: 'apiSys',
      baseUrl: '/api/apiSys',
    }),
  );
});
