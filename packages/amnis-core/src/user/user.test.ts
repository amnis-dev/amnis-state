import { deviceStringify } from '../device';
import { userKey, userCreate } from './user';

/**
 * ============================================================
 */
test('user key should be is properly set', () => {
  expect(userKey).toEqual('user');
});

/**
 * ============================================================
 */
test('should create a user', () => {
  const user = userCreate({
    name: 'Newbie',
    password: 'passwd0',
    email: 'newbie@amnis.dev',
    devices: [deviceStringify({
      ip: '176.46.95.196',
      system: 'Windows',
    })],
  });

  expect(user).toEqual(
    expect.objectContaining({
      name: expect.any(String),
      password: expect.any(String),
      email: expect.any(String),
      devices: expect.any(Array),
    }),
  );
});
