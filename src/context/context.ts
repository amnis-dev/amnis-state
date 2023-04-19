import type { SchemaObject } from 'ajv';
import type {
  Entity, EntityObjects, System,
} from '../data/index.js';
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
   * Set initial entity data.
   */
  data?: EntityObjects;

  /**
   * System handle to use for the initial system.
   */
  systemHandle?: string;
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
    data = await dataInitial(),
    emailer = emailerMemory,
    systemHandle,
  } = options;

  /**
   * Clean the store.
   */
  store.dispatch(dataActions.wipe());

  const readResult = await database.read({
    [systemSlice.key]: {},
    [apiKey]: {},
    [roleSlice.key]: {},
  });

  const systems = readResult[systemSlice.key] as Entity<System>[];
  let system = systemHandle ? systems?.find((s) => s.handle === systemHandle) : systems?.[0];

  /**
   * Initialize the system if one isn't found.
   */
  if (systems?.length === 0) {
    const createResult = await database.create(data);

    system = createResult[systemSlice.key]?.[0] as Entity<System>;

    const serviceResult: EntityObjects = {
      [systemSlice.key]: createResult[systemSlice.key],
      [roleSlice.key]: createResult[roleSlice.key],
    };
    store.dispatch(dataActions.create(serviceResult));
    store.dispatch(systemSlice.action.activeSet(system.$id));
  }

  if (!system) {
    throw new Error('Failed to read system.');
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
