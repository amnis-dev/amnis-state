/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  Action,
  ActionReducerMapBuilder,
  EntityAdapter,
  EntityStateAdapter,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { UID } from '../../core/index.js';
import { dataActions } from '../data.actions.js';
import type { DataDeleter } from '../types.js';
import { diffCompare } from './diff.js';
import { entityActions } from './entity.actions.js';
import { entityCreate, metaInitial } from './entity.js';
import type {
  Entity, EntityCreator, EntityUpdater, MetaState,
} from './entity.types.js';

export interface MetaOptions {
  active?: boolean;
  focused?: boolean;
  selection?: boolean;
}

export interface CreatePayload<C extends EntityCreator> {
  entity: Entity<C>;
  meta?: MetaOptions;
}

/**
 * Matcher for data delete actions.
 */
function isDataDeleteAction(
  action: Action<string>,
): action is PayloadAction<DataDeleter> {
  return action.type === dataActions.delete.type;
}

/**
 * Matcher for data wipe actions.
 */
function isDataWipeAction(
  action: Action<string>,
): action is PayloadAction {
  return action.type === dataActions.wipe.type;
}

function setMeta<C extends EntityCreator>(state: MetaState<C>, ref: C['$id'], meta?: MetaOptions) {
  if (meta) {
    if (meta.active) {
      state.active = ref;
    }
    if (meta.focused) {
      state.focused = ref;
    }
    if (meta.selection) {
      state.selection.push(ref);
    }
  }
}

export function entityReducers<C extends EntityCreator>(
  key: string,
  adapter: EntityAdapter<Entity<C>>,
) {
  return {
    /**
     * Creates a new entity.
     */
    create: {
      reducer: (
        state: MetaState<C>,
        action: PayloadAction<CreatePayload<C>>,
      ) => {
        const { entity, meta } = action.payload;
        adapter.addOne(state, entity);
        setMeta(state, entity.$id, meta);
      },
      prepare: (creator: C, meta?: MetaOptions) => ({
        payload: {
          entity: entityCreate(creator),
          meta,
        },
      }),
    },

    /**
     * Creates several new entities.
     */
    createMany: {
      reducer: (
        state: MetaState<C>,
        action: PayloadAction<Entity<C>[]>,
      ) => {
        adapter.addMany(state, action.payload);
      },
      prepare: (creators: C[]) => ({
        payload: creators.map((creator) => entityCreate(creator)),
      }),
    },

    /**
     * Inserts an entity
     */
    insert: {
      reducer: (
        state: MetaState<C>,
        action: PayloadAction<CreatePayload<C>>,
      ) => {
        const { entity, meta } = action.payload;
        adapter.addOne(state, entity);
        setMeta(state, entity.$id, meta);
      },
      prepare: (entity: Entity<C>, meta?: MetaOptions) => ({
        payload: {
          entity,
          meta,
        },
      }),
    },

    /**
     * Inserts many entities
     */
    insertMany: {
      reducer: (
        state: MetaState<C>,
        action: PayloadAction<Entity<C>[]>,
      ) => {
        adapter.addMany(state, action.payload);
      },
      prepare: (entities: Entity<C>[]) => ({
        payload: entities,
      }),
    },

    /**
     * Updates an existing entity.
     */
    update: {
      reducer: (
        state: MetaState<C>,
        action: PayloadAction<EntityUpdater<C>>,
      ) => {
        const { $id, ...other } = action.payload;
        const changes = other as Entity<C>;

        const entity = adapter.getSelectors().selectById(state, $id);

        if (!entity) {
          return;
        }

        /**
         * Store the original object if it doesn't exist on state.
         */
        if (state.original[$id] === undefined) {
          state.original[$id] = entity;
        }

        /**
         * Perform a diff compare.
         */
        const diffResult = diffCompare<Entity<C>>(
          { ...entity, ...changes },
          state.original[$id] as Entity<C>,
          { includeEntityKeys: false },
        );

        if (diffResult.length === 0 && !entity.committed) {
          changes.committed = true;
        }

        if (diffResult.length > 0 && entity.committed) {
          changes.committed = false;
        }

        if (diffResult.length) {
          state.differences[$id] = diffResult;
        }

        if (!diffResult.length && state.differences[$id]) {
          delete state.differences[$id];
          delete state.original[$id];
        }

        /**
         * Update the entity.
         */
        adapter.updateOne(state, {
          id: $id,
          changes,
        });
      },
      prepare: (updater: EntityUpdater<C>) => ({ payload: updater }),
    },

    /**
     * Delete and entity from the state.
     */
    delete: {
      reducer: (
        state: MetaState<C>,
        action: PayloadAction<UID<C>>,
      ) => {
        const id = action.payload;
        adapter.removeOne(state, id);
      },
      prepare: (entityId: UID<C>) => ({ payload: entityId }),
    },

    /**
     * Sets active entity.
     */
    activeSet: (
      state: MetaState<C>,
      action: PayloadAction<UID<C>>,
    ) => {
      const id = action.payload;
      if (state.entities[id]) {
        state.active = id;
      }
    },

    /**
     * Clears active entity.
     */
    activeClear: (
      state: MetaState<C>,
    ) => {
      state.active = null;
    },

    /**
     * Sets focused entity.
     */
    focusSet: (
      state: MetaState<C>,
      action: PayloadAction<UID<C>>,
    ) => {
      const id = action.payload;
      if (state.entities[id]) {
        state.focused = id;
      }
    },

    /**
     * Clears the focus on any entity.
     */
    focusClear: (
      state: MetaState<C>,
    ) => {
      state.focused = null;
    },

    /**
     * Sets the focus on a specific entity in the set.
     */
    selectionSet: (
      state: MetaState<C>,
      action: PayloadAction<UID<C>[]>,
    ) => {
      const selection = action.payload;
      state.selection = [...selection];
    },

    /**
     * Clears entity selection.
     */
    selectionClear: (
      state: MetaState<C>,
    ) => {
      state.selection = [];
    },
  };
}

export function entityExtraReducers<
  C extends EntityCreator & { [key: string]: any },
  EA extends EntityStateAdapter<Entity<C>>,
  ARMB extends ActionReducerMapBuilder<MetaState<C>>
>(
  key: string,
  adapter: EA,
  builder: ARMB,
) {
  builder.addCase(entityActions.meta, (state, { payload }) => {
    if (!payload[key]) {
      return;
    }

    const meta = payload[key];
    Object.keys(meta).forEach((metaKey) => {
      /** @ts-ignore */
      state[metaKey] = meta[metaKey];
    });
  });

  builder.addMatcher(isDataDeleteAction, (state, { payload }) => {
    if (!payload[key]) {
      return;
    }

    if (state.active && payload[key].includes(state.active)) {
      state.active = null;
    }

    if (state.focused && payload[key].includes(state.focused)) {
      state.focused = null;
    }

    if (
      state.selection.length > 0
      && payload[key].some((id) => state.selection.includes(id as UID))
    ) {
      state.selection = state.selection.filter((selectionId: UID) => (
        payload[key].includes(selectionId)
      ));
    }
  });

  builder.addMatcher(isDataWipeAction, (state) => {
    const metaDefault = metaInitial<C>();

    state.active = metaDefault.active;
    state.focused = metaDefault.focused;
    state.selection = metaDefault.selection;

    Object.keys(state.original).forEach((k) => {
      delete state.original[k as keyof typeof state.original];
    });
    Object.keys(state.differences).forEach((k) => {
      delete state.differences[k as keyof typeof state.differences];
    });
  });
}

export default entityExtraReducers;
