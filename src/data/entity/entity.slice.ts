/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { StateKey } from '../../state.types.js';
import { dataActions } from '../data.actions.js';
import { dataExtraReducers, extraReducersApply } from '../data.reducers.js';
import { entityCreate, metaInitial } from './entity.js';
import { entityExtraReducers } from './entity.reducers.js';
import type {
  Entity, EntityCreator, Meta, MetaState,
} from './entity.types.js';

export type EntityCreatorMethod<C extends EntityCreator = EntityCreator> = (...args: any[]) => C;

export interface EntitySliceOptions<
  M extends Meta = Meta,
> {
  key: string;
  creator: EntityCreatorMethod;
  meta?: Partial<M>;
}

export const entitySliceCreate = <
  C extends EntityCreator,
  CB = Record<string, any>
>({
  key,
  creator,
  meta,
}: EntitySliceOptions) => {
  const adapter = createEntityAdapter<Entity<C>>({
    selectId: (entity) => entity.$id,
    sortComparer: (a, b) => a.$id.localeCompare(b.$id),
  });

  const initialState = adapter.getInitialState(
    metaInitial(meta),
  );

  let keyScoped: StateKey<C> = key as StateKey<C>;
  const keyGet = (): StateKey<C> => keyScoped;

  const slice = (scope?: string) => {
    const scopeString = scope ? `@${scope}/` : '';
    keyScoped = `${scopeString}${key}` as StateKey<C>;
    return createSlice({
      name: keyScoped,
      initialState,
      reducers: {},
      extraReducers: (builder) => {
        extraReducersApply({
          key,
          adapter,
          builder,
        }, [
          dataExtraReducers,
          entityExtraReducers,
        ]);
      },
    });
  };

  const actions = {
    create: (entity: CB) => dataActions.create({
      [keyScoped]: [entityCreate(creator(entity))],
    }),
  };

  const selectors = {
    ...adapter.getSelectors<{
      [key: StateKey<C>]: MetaState<C>
    }>((state) => state[keyScoped]),
  };

  return {
    key: keyGet,
    initialState,
    actions,
    selectors,
    slice,
  };
};
