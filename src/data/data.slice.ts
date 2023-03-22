/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
import type { ActionReducerMapBuilder, EntityState, Reducer } from '@reduxjs/toolkit';
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type {
  Data, DataExtraReducers, DataMeta, DataState, DataUpdate,
} from './data.types.js';
import type { State, StateKey } from '../state.types.js';
import type { UID } from '../core/core.types.js';
import { dataExtraReducers, extraReducersApply } from './data.reducers.js';
import { dataActions } from './data.actions.js';
import { dataSelectors } from './data.selectors.js';

/**
 * Create meta information for data collections.
 */
export function metaInitial<D extends Data = Data>(
  meta: Partial<DataMeta<D>> = {},
): DataMeta<D> {
  return {
    active: null,
    focused: null,
    selection: [],
    original: {} as Record<UID, D>,
    differences: {} as Record<UID, (keyof D)[]>,
    ...meta,
  };
}

export interface DataSliceOptions<
  D extends Data = Data,
  C extends (minimal: any) => D = () => D,
  M extends DataMeta<D> = DataMeta<D>,
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

export const dataSliceCreate = <
  DataExtended extends Data,
  C extends (minimal: any) => DataExtended,
>({
  key,
  create,
  meta,
  reducerCases,
  reducerMatchers,
}: DataSliceOptions<DataExtended, C>) => {
  type D = ReturnType<C>;

  if (/^[a-z0-9]+$/i.test(key) === false) {
    throw new Error(`Data key must be alphanumeric: ${key}`);
  }

  const adapter = createEntityAdapter<D>({
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
      [key: StateKey<D>]: DataState<D>
    }>((state) => state[key]),
    ...dataSelectors<D>(key),
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
    slice,
  };
};
