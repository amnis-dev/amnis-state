import type { EntityCreatorBase, EntityCreatorParams } from '../entity.types.js';
import type { UID } from '../../../core/index.js';
import type { Data } from '../../data.types.js';

/**
 * Data for routing to a resouce.
 */
export interface Route extends Data {
  /**
   * Text to present when linking this route.
   */
  label: string;

  /**
   * Pathing string for this route.
   */
  path: string;

  /**
   * Entity ID this route points to.
   */
  $entity?: UID;

  /**
   * An icon associated with the route.
   */
  icon?: string;
}

/**
 * Route properties excluding the extended entity properties.
 */
export type RouteBase = EntityCreatorBase<Route>;

/**
 * Base properties in order to create a log.
 */
export type RouteCreator = EntityCreatorParams<Route, 'label' | 'path'>;
