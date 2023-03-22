import type { Meta } from '../entity.types.js';
import type { DateJSON } from '../../../core/index.js';
import type { Data, DataRoot, DataMinimal } from '../../data.types.js';

/**
 * Service entity
 */
export interface Service extends Data {
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
export type ServiceRoot = DataRoot<Service>;

/**
 * Root properties in order to create a log.
 */
export type ServiceMinimal = DataMinimal<Service, 'name'>;

/**
 * Service collection meta data.
 */
export type ServiceMeta = Meta<Service>;
