import type { SchemaObject } from 'ajv';
import type { EntityObjects } from '../data/index.js';
import {
  dataInitial,
  dataActions,
  apiKey,
  systemSlice,
  roleSlice,
} from '../data/index.js';
import type {
  IoContext,
} from '../io/index.js';
import {
  cryptoWeb,
  databaseMemory,
  filesystemMemory,
  emailerMemory,
} from '../io/index.js';
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
  data?: EntityObjects;
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
    emailer = emailerMemory,
  } = options;

  /**
   * Clean the store.
   */
  store.dispatch(dataActions.wipe());

  if (initialize) {
    const readResult = await database.read({
      [systemSlice.key]: {},
      [apiKey]: {},
      [roleSlice.key]: {},
    });

    /**
     * Initialize the system if one isn't found.
     */
    if (!readResult[systemSlice.key]?.length) {
      const createResult = await database.create(data);

      if (initialize === true) {
        const system = createResult[systemSlice.key][0];
        const serviceResult: EntityObjects = {
          [systemSlice.key]: createResult[systemSlice.key],
          [roleSlice.key]: createResult[roleSlice.key],
        };
        store.dispatch(dataActions.create(serviceResult));
        store.dispatch(systemSlice.action.activeSet(system.$id));
      }
    } else if (initialize === true) {
      const system = readResult[systemSlice.key][0];
      const serviceResult: EntityObjects = {
        [systemSlice.key]: readResult[systemSlice.key],
        [roleSlice.key]: readResult[roleSlice.key],
      };
      store.dispatch(dataActions.create(serviceResult));
      store.dispatch(systemSlice.action.activeSet(system.$id));
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
    emailer,
  };
}

export default contextSetup;
