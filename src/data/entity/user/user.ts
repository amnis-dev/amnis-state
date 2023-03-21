import type { LogCreator } from '../log/index.js';
import { regexEmail, uid } from '../../../core/index.js';
import type { User, UserBase, UserCreator } from './user.types.js';
import { entitySliceCreate } from '../entity.slice.js';

const userKey = 'user';

export const userBase = (): UserBase => ({
  handle: 'unknown_user',
  locked: false,
  $credentials: [],
  $roles: [],
  $permits: [],
});

/**
 * User validation method.
 */
export function userCheck(user: User): LogCreator[] {
  const logs: LogCreator[] = [];

  if (user.email && !regexEmail.test(user.email)) {
    logs.push({
      title: 'Invalid User Email',
      description: 'User email address is not structured properly.',
      level: 'error',
    });
  }

  return logs;
}

/**
 * User creation.
 */
export function userCreator(
  user: UserCreator,
): User {
  return {
    ...userBase(),
    ...user,
    $id: uid(userKey),
  };
}

export const userState = entitySliceCreate({
  key: userKey,
  creator: userCreator,
});
