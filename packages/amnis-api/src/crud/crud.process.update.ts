/* eslint-disable @typescript-eslint/no-explicit-any */
import { authwall } from '@amnis/auth/authwall';
import { Task } from '@amnis/core/grant';
import { selectors } from '@amnis/core/selectors';
import { authScopeCreate } from '@amnis/auth/scope';
import { coreActions } from '@amnis/core/actions';
import { entityClean } from '@amnis/core/entity';
import type { State } from '@amnis/core/state';
import type { ApiContextMethod } from '../types';
import { apiOutput } from '../api';
import type { ApiCrudProcessUpdate } from './crud.types';

export const crudProcessUpdate: ApiContextMethod = (context): ApiCrudProcessUpdate => (
  async (input) => {
    const { store, database } = context;
    const { body, jwt } = input;
    const output = apiOutput();

    if (!jwt) {
      output.status = 401; // 401 Unauthorized
      output.json.logs.push({
        level: 'error',
        title: 'Unauthorized',
        description: 'Access token is invalid.',
      });
      return output;
    }

    /**
     * Get array of grants from roles in the service store.
     */
    const grants = selectors.selectRoleGrants(store.getState(), jwt.roles);

    /**
     * Filter non-granted slices on the body (which is a State type).
     */
    const stateAuthwalled = authwall(body, grants, Task.Update);

    /**
     * Clean entity properties that should not be updated.
     */
    const stateUpdateSanatizd = Object.keys(stateAuthwalled).reduce<State>((state, key) => {
      state[key] = stateAuthwalled[key].map(
        (entity: any) => entityClean(key, entity),
      ).filter((entity: any) => entity !== undefined);
      return state;
    }, {});

    /**
     * finalized state to process
     */
    const stateFinal = jwt.adm === true ? body : stateUpdateSanatizd;

    /**
     * Create an authentication scope object from the array of grant objects.
     */
    const authScope = jwt.adm === true ? undefined : authScopeCreate(grants, Task.Update);

    const result = await database.update(stateFinal, authScope, jwt.sub);

    /**
     * Add errors for denied keys.
     */
    const deniedKeys = Object.keys(body).map((sliceKey) => {
      if (typeof result[sliceKey] !== 'object' || Object.keys(result[sliceKey]).length < 1) {
        return sliceKey;
      }
      return null;
    }).filter((value) => value !== null);

    if (deniedKeys.length) {
      output.json.logs.push({
        level: 'error',
        title: 'Updates Disallowed',
        description: `Missing permissions to update the collections: ${deniedKeys.join(', ')}`,
      });
    }

    output.json.result = result;

    /**
     * Update the server store with possible changes.
     */
    store.dispatch(coreActions.update(result));

    return output;
  }
);

export default crudProcessUpdate;
