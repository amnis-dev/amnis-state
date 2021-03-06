import type { StateCreate } from '@amnis/core/state';
import type { Token } from '@amnis/core/token';
import { System } from '@amnis/core/system';
import { profileCheck, profileCreate } from '@amnis/core/profile';
import { userCheck, userCreate } from '@amnis/core/user';
import { sessionEncode } from '@amnis/auth/session';
import type { Database } from '@amnis/db/types';
import type { LogBaseCreate } from '@amnis/core/log';

import { apiOutput } from '../api';
import { ApiOutput } from '../types';
import { sessionGenerate, tokenGenerate } from './auth.utility';

/**
 * Options when processsing a registration.
 */
interface RegisterOptions {
  nameDisplay?: string;
  email?: string;
  password?: string;
  createSession?: boolean;
  withTokens?: boolean;
  otherTokens?: Token[];
}

/**
 * Create an API Outputs registering an account.
 */
export async function register(
  database: Database,
  system: System | undefined,
  username: string,
  options: RegisterOptions,
): Promise<ApiOutput<StateCreate>> {
  const {
    password, nameDisplay, createSession, withTokens, otherTokens,
  } = options;
  const output = apiOutput<StateCreate>();
  const logs: LogBaseCreate[] = [];

  if (!system) {
    output.status = 503; // Service Unavailable
    output.json.logs.push({
      level: 'error',
      title: 'Service Unavailable',
      description: 'The service has not been configured to handle this request.',
    });
    return output;
  }

  const user = userCreate({
    name: username,
    password: password || null,
    email: options.email,
    $roles: [...system.$initialRoles],
  });

  user.$owner = user.$id;

  logs.push(...userCheck(user));

  const profile = profileCreate({
    $user: user.$id,
    nameDisplay: nameDisplay || username,
  });
  profile.$owner = user.$id;

  logs.push(...profileCheck(profile));

  /**
   * If there were issues with the creations, there'll be logs.
   */
  if (logs.length > 0) {
    output.status = 400; // Bad Request
    output.json.logs = logs;
    return output;
  }

  const insertion: StateCreate = {
    user: [user],
    profile: [profile],
  };

  /**
   * StateCreate newly created user and profile into the database.
   */
  const resultDbCreate = await database.create(insertion, { user: 'global', profile: 'global' });
  output.json.result = resultDbCreate;

  /**
   * Create a session entity if needed.
   */
  if (createSession === true) {
    const session = sessionGenerate(user, profile);
    session.$owner = user.$id;
    output.json.result.session = [session];
    output.cookies.authSession = sessionEncode(session);
  }

  /**
   * Return tokens
   */
  if (withTokens === true) {
    output.json.tokens = [tokenGenerate(user)];

    if (otherTokens?.length) {
      output.json.tokens.push(...otherTokens);
    }
  }

  output.json.logs.push({
    level: 'success',
    title: 'Registration Successful',
    description: 'A new account has been created.',
  });

  return output;
}

export default { register };
