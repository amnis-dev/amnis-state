import type {
  EntityCreator, EntityCreatorBase, EntityCreatorParams, Meta,
} from '../entity.types.js';
import type { DateJSON } from '../../../core/index.js';

/**
 * Service entity
 */
export interface Service extends EntityCreator {
  /**
   * Name of the service.
   */
  name: unknown;

  /**
   * Description of the service.
   */
  description?: string;

  /**
   * Status of the service.
   */
  status: 'offline' | 'running' | 'restarting';

  /**
   * Last checked datetime
   */
  dateChecked: DateJSON;
}

/**
 * Service properties excluding the extended entity properties.
 */
export type ServiceBase = EntityCreatorBase<Service>;

/**
 * Base properties in order to create a log.
 */
export type ServiceCreator = EntityCreatorParams<Service, 'name'>;

/**
 * Service collection meta data.
 */
export type ServiceMeta = Meta<Service>;
