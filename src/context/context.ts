import type { SchemaObject } from 'ajv';
import {
  systemKey,
  dataInitial,
  roleKey,
  systemActions,
  dataActions,
  apiKey,
} from '../data/index.js';
import type {
  IoContext,
} from '../io/index.js';
import {
  cryptoWeb,
  databaseMemory,
  filesystemMemory,
  sendMemory,
} from '../io/index.js';
import type { StateEntities } from '../state.types.js';
import { storeSetup } from '../store.js';
import { validateSetup } from './validate.js';

export interface ContextOptions extends Omit<Partial<IoContext>, 'schemas' | 'validators'> {

  /**
   * Schemas can be added by array.
   */
  schemas?: SchemaObject[];

  /**
   * Initializes with default data (if not already set)
   */
  initialize?: boolean | 'database';

  /**
   * Set initial entity data.
   */
  data?: StateEntities;
}

/**
 * Initializes a service context with optional parameters.
 */
export async function contextSetup(options: ContextOptions = {}): Promise<IoContext> {
  const {
    store = storeSetup(),
    schemas = [],
    database = databaseMemory,
    filesystem = filesystemMemory,
    crypto = cryptoWeb,
    initialize = true,
    data = await dataInitial(),
    send = sendMemory,
  } = options;

  if (initialize) {
    const readResult = await database.read({
      [systemKey]: {},
      [apiKey]: {},
      [roleKey]: {},
    });

    /**
     * Initialize the system if one isn't found.
     */
    if (!readResult[systemKey]?.length) {
      const createResult = await database.create(data);

      if (initialize === true) {
        const system = createResult[systemKey][0];
        const serviceResult: StateEntities = {
          [systemKey]: createResult[systemKey],
          [roleKey]: createResult[roleKey],
        };
        store.dispatch(dataActions.create(serviceResult));
        store.dispatch(systemActions.activeSet(system.$id));
      }
    } else if (initialize === true) {
      const system = readResult[systemKey][0];
      const serviceResult: StateEntities = {
        [systemKey]: readResult[systemKey],
        [roleKey]: readResult[roleKey],
      };
      store.dispatch(dataActions.create(serviceResult));
      store.dispatch(systemActions.activeSet(system.$id));
    }
  }

  const schemaObjects = schemas.reduce<SchemaObject>(
    (acc, schema) => {
      if (!schema?.$id) {
        throw new Error('Schema must have an $id property.');
      }
      const { $id } = schema;
      acc[$id] = schema;
      return acc;
    },
    {},
  );

  const validators = schemas ? validateSetup(schemas) : {};

  return {
    store,
    schemas: schemaObjects,
    validators,
    database,
    filesystem,
    crypto,
    send,
  };
}

export default contextSetup;
