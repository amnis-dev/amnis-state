/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
import type { ActionReducerMapBuilder, EntityState, Reducer } from '@reduxjs/toolkit';
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { UID } from '../../core/index.js';
import type { State, StateKey } from '../../state.types.js';
import { dataActions } from '../data.actions.js';
import { dataExtraReducers, extraReducersApply } from '../data.reducers.js';
import type { Data, DataExtraReducers, DataUpdate } from '../data.types.js';
import { entityCreate, metaInitial } from './entity.js';
import { entityExtraReducers } from './entity.reducers.js';
import { entitySelectors } from './entity.selectors.js';
import type { Entity, Meta, MetaState } from './entity.types.js';
import { entityActions } from './entity.actions.js';

export type EntityCreatorMethod<C extends Data = Data> = (...args: any[]) => C;

export interface EntitySliceOptions<
  C extends Data = Data,
  M extends Meta = Meta,
> {
  key: string;
  creator: EntityCreatorMethod;
  meta?: Partial<M>;
  reducers?: Record<string, Reducer>;
  reducerCases?: (
    builder: ActionReducerMapBuilder<EntityState<C> & State>
  ) => void;
  reducerMatchers?: (
    builder: ActionReducerMapBuilder<EntityState<C> & State>
  ) => void;
}

export const entitySliceCreate = <
  C extends Data,
  CB = Record<string, any>
>({
  key,
  creator,
  meta,
  reducerCases,
  reducerMatchers,
}: EntitySliceOptions) => {
  if (/^[a-z0-9]+$/i.test(key) === false) {
    throw new Error(`Entity key must be alphanumeric: ${key}`);
  }

  const adapter = createEntityAdapter<Entity<C>>({
    selectId: (entity) => entity.$id,
    sortComparer: (a, b) => a.$id.localeCompare(b.$id),
  });

  const initialState = adapter.getInitialState(
    metaInitial(meta),
  );

  const keyGet = (): StateKey<C> => key;

  const customExtraReducers: DataExtraReducers = {
    cases: ({ builder }) => {
      if (!reducerCases) return;
      reducerCases(builder);
    },
    matchers: ({ builder }) => {
      if (!reducerMatchers) return;
      reducerMatchers(builder);
    },
  };

  const sliceObject = createSlice({
    name: key,
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
        customExtraReducers,
      ]);
    },
  });
  const slice = () => sliceObject;

  /**
   * ==================================================
   * ACTIONS
   * --------------------------------------------------
   */
  const actionsCreate = () => ({
    insert: (insert: Entity<C>) => dataActions.create({
      [key]: [insert],
    }),
    insertMany: (inserts: Entity<C>[]) => dataActions.create({
      [key]: inserts,
    }),
    create: (create: CB) => dataActions.create({
      [key]: [entityCreate(creator(create))],
    }),
    createMany: (creates: CB[]) => dataActions.create({
      [key]: creates.map((create) => entityCreate(creator(create))),
    }),
    update: (update: DataUpdate<C>) => dataActions.update({
      [key]: [update],
    }),
    updateMany: (updates: DataUpdate<C>[]) => dataActions.update({
      [key]: updates,
    }),
    delete: ($id: UID) => dataActions.delete({
      [key]: [$id],
    }),
    deleteMany: ($ids: UID[]) => dataActions.delete({
      [key]: $ids,
    }),
    activeSet: ($id: UID) => entityActions.meta({
      [key]: {
        active: $id,
      },
    }),
    activeClear: () => entityActions.meta({
      [key]: {
        active: null,
      },
    }),
    focusedSet: ($id: UID) => entityActions.meta({
      [key]: {
        focused: $id,
      },
    }),
    focusedClear: () => entityActions.meta({
      [key]: {
        focused: null,
      },
    }),
    selectionSet: ($ids: UID[]) => entityActions.meta({
      [key]: {
        selection: [...$ids],
      },
    }),
    selectionClear: () => entityActions.meta({
      [key]: {
        selection: [],
      },
    }),
  });

  const actionsObject = actionsCreate();
  const actions = () => actionsObject;

  /**
   * ==================================================
   * SELECTORS
   * --------------------------------------------------
   */
  const selectorsCreate = () => ({
    ...adapter.getSelectors<{
      [key: StateKey<C>]: MetaState<C>
    }>((state) => state[key]),
    ...entitySelectors<C>(key),
  });

  const selectorObject = selectorsCreate();
  const selectors = () => selectorObject;

  /**
   * ==================================================
   * RETURN
   * --------------------------------------------------
   */
  return {
    key: keyGet,
    initialState,
    actions,
    selectors,
    slice,
  };
};
