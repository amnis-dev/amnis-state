/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  EntityCreatorBase,
  EntityCreatorParams,
  Meta,
} from '../entity.types.js';
import type { UID } from '../../../core/index.js';
import type { Data } from '../../data.types.js';

/**
 * A data structure for audit information.
 */
export interface Audit extends Data {
  /**
   * Action attempted
   */
  action: string;

  /**
   * If the action was completed.
   */
  completed: boolean;

  /**
   * Input body data.
   */
  inputBody?: any;

  /**
   * Subject id of the audit.
   */
  $subject?: UID;

  /**
   * IP address of the subject.
   */
  ip?: string;

  /**
   * Location of the subject.
   */
  location?: string;
}

/**
 * Contact properties excluding the extended entity properties.
 */
export type AuditBase = EntityCreatorBase<Audit>;

/**
 * Base properties in order to create a log.
 */
export type AuditCreator = EntityCreatorParams<Audit, 'action' | 'completed'>;

/**
 * Audit collection meta data.
 */
export type AuditMeta = Meta<Audit>;
