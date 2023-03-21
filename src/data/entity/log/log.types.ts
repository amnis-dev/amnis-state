import type { UID } from '../../../core/index.js';
import type { Data } from '../../data.types.js';
import type {
  EntityCreatorBase, EntityCreatorParams, Meta,
} from '../entity.types.js';
import type { User } from '../user/user.types.js';

/**
 * Log levels.
 */
export type LogLevel = 'fatal' | 'error' | 'success' | 'warn' | 'info' | 'debug';

/**
 * An entity object that contains log information.
 */
export interface Log extends Data {
  /**
   * Level of the log.
   */
  level: LogLevel;

  /**
   * Title of the log.
   */
  title: string;

  /**
   * Description of the log.
   */
  description: string;

  /**
   * System this log is from.
   */
  system: string;

  /**
   * UID to a user that invoked the log.
   */
  $invoker?: UID<User>;
}

/**
 * Base properties excluding the extended entities.
 */
export type LogBase = EntityCreatorBase<Log>;

/**
 * Base properties in order to create a log.
 */
export type LogCreator = EntityCreatorParams<Log, 'title' | 'description' | 'level'>;

/**
 * Log collection meta data.
 */
export type LogMeta = Meta<Log>;
