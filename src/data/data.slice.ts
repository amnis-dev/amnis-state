/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyAction, Selector } from '@reduxjs/toolkit';
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type {
  Data, DataExtraReducers, DataMeta, DataState, DataUpdate,
} from './data.types.js';
import type { State } from '../state.types.js';
import type { UID } from '../core/core.types.js';
import { dataExtraReducers, extraReducersApply } from './data.reducers.js';
import { dataActions } from './data.actions.js';
import { dataSelectors } from './data.selectors.js';
import { dataMetaInitial } from './data.meta.js';

export interface DataSliceOptions<
  K extends string = string,
  D extends Data = Data,
  C extends (minimal: any) => D = () => D,
  M extends Record<string, any> = object,
  A extends Record<string, AnyAction> = Record<string, AnyAction>,
  S extends Record<string, Selector> = Record<string, Selector>,
  B extends ReturnType<C> = ReturnType<C>,
> {
  key: K;
  create: C;
  meta?: M & Partial<DataMeta>;
  actions?: A;
  selectors?: S;
  reducersExtras?: DataExtraReducers<B, M>[];
}

export const dataSliceCreate = <
  M extends Record<string, any>,
  K extends string,
  DataExtended extends Data,
  C extends (minimal: any) => DataExtended,
  A extends Record<string, AnyAction>,
  S extends Record<string, Selector>,
>({
  key,
  create,
  meta,
  actions = {} as A,
  selectors = {} as S,
  reducersExtras = [],
}: DataSliceOptions<K, DataExtended, C, M, A>) => {
  type D = Data & ReturnType<C>;

  if (/^[a-z0-9]+$/i.test(key) === false) {
    throw new Error(`Data key must be alphanumeric: ${key}`);
  }

  const adapter = createEntityAdapter<D>({
    selectId: (entity) => entity.$id,
    sortComparer: (a, b) => a.$id.localeCompare(b.$id),
  });

  const initialState = adapter.getInitialState(
    dataMetaInitial(meta),
  ) as DataState<D> & M;

  const reducersExtraArray: DataExtraReducers<D, M>[] = [];
  reducersExtraArray.push(...reducersExtras);
  reducersExtraArray.push(dataExtraReducers);

  const sliceObject = createSlice({
    name: key,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      extraReducersApply<D, M>({
        key,
        adapter,
        builder,
      }, reducersExtraArray);
    },
  });
  const slice = () => sliceObject;

  /**
   * ==================================================
   * ACTIONS
   * --------------------------------------------------
   */
  const actionsObject = {
    insert: (insert: D) => dataActions.create({
      [key]: [insert],
    }),
    insertMany: (inserts: D[]) => dataActions.create({
      [key]: inserts,
    }),
    create: (minimal: Parameters<C>[0]) => dataActions.create({
      [key]: [create(minimal)],
    }),
    createMany: (minimals: Parameters<C>[0][]) => dataActions.create({
      [key]: minimals.map((minimal) => create(minimal)),
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
    activeSet: ($id: UID) => dataActions.meta({
      [key]: {
        active: $id,
      },
    }),
    activeClear: () => dataActions.meta({
      [key]: {
        active: null,
      },
    }),
    focusedSet: ($id: UID) => dataActions.meta({
      [key]: {
        focused: $id,
      },
    }),
    focusedClear: () => dataActions.meta({
      [key]: {
        focused: null,
      },
    }),
    selectionSet: ($ids: UID[]) => dataActions.meta({
      [key]: {
        selection: [...$ids],
      },
    }),
    selectionClear: () => dataActions.meta({
      [key]: {
        selection: [],
      },
    }),
    ...actions,
  };

  /**
   * ==================================================
   * SELECTORS
   * --------------------------------------------------
   */
  const selectorsAdapter = adapter.getSelectors<State>((state) => state[key]);
  const selectorsObject = {
    ids: selectorsAdapter.selectIds,
    entities: selectorsAdapter.selectEntities,
    all: selectorsAdapter.selectAll,
    total: selectorsAdapter.selectTotal,
    byId: selectorsAdapter.selectById,
    ...dataSelectors<D>(key),
    ...(selectors as S),
  };

  /**
   * ==================================================
   * RETURN
   * --------------------------------------------------
   */
  return {
    key,
    initialState,
    actions: actionsObject,
    selectors: selectorsObject,
    create: create as typeof create,
    slice,
  };
};
