/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
import type { ActionReducerMapBuilder, EntityState } from '@reduxjs/toolkit';
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { UID } from '../../core/index.js';
import type { State, StateKey } from '../../state.types.js';
import { dataActions } from '../data.actions.js';
import { dataExtraReducers, extraReducersApply } from '../data.reducers.js';
import type { DataExtraReducers } from '../data.types.js';
import { entityCreate, metaInitial } from './entity.js';
import { entityExtraReducers } from './entity.reducers.js';
import { entitySelectors } from './entity.selectors.js';
import type {
  Entity, EntityCreator, Meta, MetaState,
} from './entity.types.js';

export type EntityCreatorMethod<C extends EntityCreator = EntityCreator> = (...args: any[]) => C;

export interface EntitySliceOptions<
  C extends EntityCreator = EntityCreator,
  M extends Meta = Meta,
> {
  key: string;
  creator: EntityCreatorMethod;
  meta?: Partial<M>;
  reducerCases?: (
    builder: ActionReducerMapBuilder<EntityState<C> & State>
  ) => void;
  reducerMatchers?: (
    builder: ActionReducerMapBuilder<EntityState<C> & State>
  ) => void;
}

export const entitySliceCreate = <
  C extends EntityCreator,
  CB = Record<string, any>
>({
  key,
  creator,
  meta,
  reducerCases,
  reducerMatchers,
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

  const slice = (scope?: string) => {
    const scopeString = scope ? `@${scope}/` : '@/';
    keyScoped = `${scopeString}${key}` as StateKey<C>;
    return createSlice({
      name: keyScoped,
      initialState,
      reducers: {},
      extraReducers: (builder) => {
        extraReducersApply({
          key: keyScoped,
          adapter,
          builder,
        }, [
          dataExtraReducers,
          entityExtraReducers,
          customExtraReducers,
        ]);
      },
    });
  };

  /**
   * ==================================================
   * ACTIONS
   * --------------------------------------------------
   */
  const actionsCreate = () => ({
    insert: (insert: Entity<C>) => dataActions.create({
      [keyScoped]: [insert],
    }),
    insertMany: (inserts: Entity<C>[]) => dataActions.create({
      [keyScoped]: inserts,
    }),
    create: (create: CB) => dataActions.create({
      [keyScoped]: [entityCreate(creator(create))],
    }),
    createMany: (creates: CB[]) => dataActions.create({
      [keyScoped]: creates.map((create) => entityCreate(creator(create))),
    }),
    update: (update: Partial<C> & { $id: UID}) => dataActions.update({
      [keyScoped]: [update],
    }),
    updateMany: (updates: (Partial<C> & { $id: UID})[]) => dataActions.update({
      [keyScoped]: updates,
    }),
    delete: ($id: UID) => dataActions.delete({
      [keyScoped]: [$id],
    }),
    deleteMany: ($ids: UID[]) => dataActions.delete({
      [keyScoped]: $ids,
    }),
  });

  let actionsObject = actionsCreate();

  let actionsKeyLast = keyScoped;
  const actions = () => {
    if (actionsKeyLast !== keyScoped) {
      actionsObject = actionsCreate();
      actionsKeyLast = keyScoped;
    }
    return actionsObject;
  };

  /**
   * ==================================================
   * SELECTORS
   * --------------------------------------------------
   */
  const selectorsCreate = () => ({
    ...adapter.getSelectors<{
      [key: StateKey<C>]: MetaState<C>
    }>((state) => state[keyScoped]),
    ...entitySelectors<C>(keyScoped),
  });

  let selectorObject = selectorsCreate();

  let selectorsKeyLast = keyScoped;
  const selectors = () => {
    if (selectorsKeyLast !== keyScoped) {
      selectorObject = selectorsCreate();
      selectorsKeyLast = keyScoped;
    }
    return selectorObject;
  };

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
