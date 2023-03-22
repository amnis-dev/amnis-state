/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ActionReducerMapBuilder, EntityState, EntityStateAdapter } from '@reduxjs/toolkit';
import type { State } from '../state.types.js';
import type { UID } from '../core/index.js';

export type Data = { $id: UID };

/**
 * The root of an extended data object.
 */
export type DataRoot<D extends Data> = Omit<D, '$id'>;

/**
 * Minimal amount of information required to create a new extended data object.
 */
export type DataMinimal<
  D extends Data,
  K extends keyof D,
> = Pick<D, K> & Omit<Partial<D>, K>;

/**
 * An update definition for an extended data object.
 */
export type DataUpdate<D extends Data = Data> = Partial<D> & { $id: string };

/**
 * A collection of extended data objects to create.
 */
export type DataCreator<D extends Data = Data> = { [key: string]: D[] };

/**
 * A collection of extended data objects to update.
 */
export type DataUpdater<D extends Data = Data> = { [key: string]: DataUpdate<D>[] };

/**
 * A collection of extended data objects to delete.
 */
export type DataDeleter = { [key: string]: UID[] };

export interface DataReducerOptions {
  save: boolean | Record<string, unknown>;
}

export interface DataReducerSettings<
  D extends Data = Data,
  EA extends EntityStateAdapter<D> = EntityStateAdapter<D>,
  ARMB extends ActionReducerMapBuilder<
  EntityState<D> & State
  > = ActionReducerMapBuilder<EntityState<D> & State>,
> {
  key: string;
  adapter: EA;
  builder: ARMB;
  options?: DataReducerOptions;
}

export type DataExtraReducerFunction<D extends Data = Data> = (
  settings: DataReducerSettings<D>
) => void;

export interface DataExtraReducers<D extends Data = Data> {
  cases: DataExtraReducerFunction<D>;
  matchers: DataExtraReducerFunction<D>;
}

export type DataExtraReducersApply<D extends Data = Data> = (
  settings: DataReducerSettings<D>,
  reducers: DataExtraReducers<D>[]
) => void;

/**
 * Meta information for data collections.
 */
export interface DataMeta<D extends Data = Data> {
  /**
   * The entity id referencing the active entity.
   */
  active: UID | null;

  /**
   * The id representing a focused entity.
   */
  focused: UID | null;

  /**
   * List of ids considered to be selected.
   */
  selection: UID[];

  /**
   * Record of original entity data since last updated from the api.
   */
  original: Record<UID, D>;

  /**
   * Property differences between current and original entities.
   */
  differences: Record<UID, (keyof D)[] | undefined>
}

/**
 * Reducer state for data collections.
 */
export type DataState<D extends Data = Data> = EntityState<D> & DataMeta<D>;
