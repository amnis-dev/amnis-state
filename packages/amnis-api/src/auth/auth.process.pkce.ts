import type { StateCreate } from '@amnis/core/state';

import type { ApiContextMethod } from '../types';
import type { ApiAuthProcessPkce } from './auth.types';
import { apiOutput } from '../api';
import { authMicrosoft } from './auth.pkce.microsoft';
import { authTwitter } from './auth.pkce.twitter';

export const authProcessPcke: ApiContextMethod<ApiAuthProcessPkce> = (context) => (
  async (input) => {
    const { store, database } = context;
    const { body } = input;

    const output = apiOutput<StateCreate>();
    const { platform, ...pkceAuth } = body;

    switch (platform) {
      case 'microsoft': {
        const pkceOutput = await authMicrosoft(store, database, pkceAuth);
        return pkceOutput;
      }
      case 'twitter': {
        const pkceOutput = await authTwitter(store, database, pkceAuth);
        return pkceOutput;
      }
      default:
        output.status = 401; // Unauthorized
        output.json.logs.push({
          level: 'error',
          title: 'Unknown Platform',
          description: `Could not authenticate using the '${platform}' platform.`,
        });
        return output;
    }
  }
);

export default { authProcessPcke };
