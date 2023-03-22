/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EntityState } from '@reduxjs/toolkit';
import type { UID, UIDList, DateJSON } from '../../core/index.js';
import type { Data } from '../data.types.js';

/**
 * An abstract interface that can only be formed from an entity creator object.
 */
export type Entity<C extends Data = Data> = C & {
  /**
   * UID for this entity.
   * @default ""
   */
  readonly $id: UID<C>;

  /**
   * Creation date string.
   * @default ""
   */
  readonly created: DateJSON;

  /**
   * Updated date string.
   * @default ""
   */
  updated: DateJSON;

  /**
   * Flag to determine if the entity has been committed to storage.
   * @default false
   */
  committed: boolean;

  /**
   * Flag to determine if this entity is new/has never been not created in storage yet.
   * @default true
   */
  new: boolean;

  /**
   * If this entity is marked to be deleted.
   * @default false
   */
  delete: boolean;

  /**
   * Entity that owns this data.
   */
  $owner: UID;

  /**
   * Possible user id creator of the entity.
   */
  $creator: UID;

  /**
   * Entities that can observe this data.
   * Pseudo-owners of this data, but only as a reader.
   */
  $readers: UIDList;
};

/**
 * Meta information for an entity collection.
 */
export interface Meta<C extends Data = Data> {
  /**
   * The entity id referencing the active entity.
   */
  active: UID<C> | null;

  /**
    * The id representing a focused entity.
    */
  focused: UID<C> | null;

  /**
   * List of ids considered to be selected.
   */
  selection: UID<C>[];

  /**
   * Record of original entity data since last updated from the api.
   */
  original: Record<UID<C>, Entity<C> | undefined>;

  /**
   * Property differences between current and original entities.
   */
  differences: Record<UID<C>, (keyof Entity<C>)[] | undefined>
}

/**
 * An entity state.
 */
export type MetaState<C extends Data = Data> = EntityState<Entity<C>> & Meta<C>;
