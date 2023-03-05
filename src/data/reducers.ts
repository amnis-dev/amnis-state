/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { ActionReducerMapBuilder, EntityState, EntityStateAdapter } from '@reduxjs/toolkit';
import type { State } from '../state.types.js';
import { dataActions } from './actions.js';
import type { DataEntity } from './types.js';

export function dataExtraReducers<
  D extends DataEntity,
  EA extends EntityStateAdapter<D>,
  ARMB extends ActionReducerMapBuilder<EntityState<D> & State>
>(
  key: string,
  adapter: EA,
  builder: ARMB,
) {
  builder.addCase(dataActions.create, (state, { payload }) => {
    if (payload[key] && Array.isArray(payload[key])) {
      /** @ts-ignore */
      adapter.upsertMany(state, payload[key]);
    }
  });

  builder.addCase(dataActions.update, (state, { payload }) => {
    if (payload[key] && Array.isArray(payload[key])) {
      /** @ts-ignore */
      adapter.updateMany(state, payload[key]);
    }
  });

  builder.addCase(dataActions.delete, (state, { payload }) => {
    if (payload[key] && Array.isArray(payload[key])) {
      /** @ts-ignore */
      adapter.updateMany(state, payload[key]);
    }
  });
}

export default dataExtraReducers;
