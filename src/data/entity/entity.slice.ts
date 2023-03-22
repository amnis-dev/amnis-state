/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
import type { ActionReducerMapBuilder, EntityState, Reducer } from '@reduxjs/toolkit';
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { UID } from '../../core/index.js';
import type { State, StateKey } from '../../state.types.js';
import { dataActions } from '../data.actions.js';
import { dataExtraReducers, extraReducersApply } from '../data.reducers.js';
import type {
  Data, DataExtraReducers, DataUpdate,
} from '../data.types.js';
import { entityCreate, metaInitial } from './entity.js';
import { entityExtraReducers } from './entity.reducers.js';
import { entitySelectors } from './entity.selectors.js';
import type { Entity, Meta, MetaState } from './entity.types.js';
import { entityActions } from './entity.actions.js';

export interface EntitySliceOptions<
  D extends Data = Data,
  C extends (minimal: any) => D = () => D,
  M extends Meta = Meta,
> {
  key: string;
  create: C;
  meta?: Partial<M>;
  reducers?: Record<string, Reducer>;
  reducerCases?: (
    builder: ActionReducerMapBuilder<EntityState<D> & State>
  ) => void;
  reducerMatchers?: (
    builder: ActionReducerMapBuilder<EntityState<D> & State>
  ) => void;
}

export const entitySliceCreate = <
  DataExtended extends Data,
  C extends (minimal: any) => DataExtended,
>({
  key,
  create,
  meta,
  reducerCases,
  reducerMatchers,
}: EntitySliceOptions<DataExtended, C>) => {
  type D = ReturnType<C>;

  if (/^[a-z0-9]+$/i.test(key) === false) {
    throw new Error(`Entity key must be alphanumeric: ${key}`);
  }

  /**
   * Create function that builds the entitiy version of the data.
   */
  const createEntity = (
    minimal: Parameters<C>[0],
    meta?: Partial<Entity>,
  ): Entity<D> => entityCreate(create(minimal), meta) as Entity<D>;

  const adapter = createEntityAdapter<Entity<D>>({
    selectId: (entity) => entity.$id,
    sortComparer: (a, b) => a.$id.localeCompare(b.$id),
  });

  const initialState = adapter.getInitialState(
    metaInitial(meta),
  );

  const keyGet = (): StateKey<D> => key;

  const customExtraReducers: DataExtraReducers<D> = {
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
      extraReducersApply<D>({
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
    insert: (insert: Entity<D>) => dataActions.create({
      [key]: [insert],
    }),
    insertMany: (inserts: Entity<D>[]) => dataActions.create({
      [key]: inserts,
    }),
    create: (minimal: Parameters<C>[0]) => dataActions.create({
      [key]: [entityCreate(create(minimal))],
    }),
    createMany: (minimals: Parameters<C>[0][]) => dataActions.create({
      [key]: minimals.map((minimal) => entityCreate(create(minimal))),
    }),
    update: (update: DataUpdate<D>) => dataActions.update({
      [key]: [update],
    }),
    updateMany: (updates: DataUpdate<D>[]) => dataActions.update({
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
      [key: StateKey<D>]: MetaState<D>
    }>((state) => state[key]),
    ...entitySelectors<D>(key),
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
    create: create as typeof create,
    createEntity,
    slice,
  };
};
