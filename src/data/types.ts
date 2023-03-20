/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ActionReducerMapBuilder, EntityState, EntityStateAdapter } from '@reduxjs/toolkit';
import type { State } from '../state.types.js';
import type { UID } from '../core/index.js';

export type DataEntity = { $id: UID, [key: string]: any };

export type DataEntityUpdate = Partial<DataEntity> & { $id: string };

export type DataCreator = { [key: string]: DataEntity[] };

export type DataUpdater = { [key: string]: DataEntityUpdate[] };

export type DataDeleter = { [key: string]: UID[] };

export interface DataReducerOptions {
  save: boolean | Record<string, unknown>;
}

export interface DataReducerSettings<
  D extends DataEntity = DataEntity,
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

export type DataExtraReducerFunction = (settings: DataReducerSettings) => void;

export interface DataExtraReducers {
  cases: DataExtraReducerFunction;
  matchers: DataExtraReducerFunction;
}

export type DataExtraReducersApply = (
  settings: DataReducerSettings,
  reducers: DataExtraReducers[]
) => void;
