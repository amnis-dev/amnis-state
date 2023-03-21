/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  Action,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { UID } from '../../core/index.js';
import { localStorageSaveState } from '../../localstorage.js';
import { dataActions } from '../data.actions.js';
import type {
  Data,
  DataDeleter,
  DataExtraReducers,
  DataUpdater,
} from '../data.types.js';
import { diffCompare } from './diff.js';
import { entityActions } from './entity.actions.js';
import { metaInitial } from './entity.js';
import type {
  Entity, MetaState,
} from './entity.types.js';

export interface MetaOptions {
  active?: boolean;
  focused?: boolean;
  selection?: boolean;
}

export interface CreatePayload<C extends Data> {
  entity: Entity<C>;
  meta?: MetaOptions;
}

/**
 * Matcher for data update actions.
 */
function isDataUpdateAction(
  action: Action<string>,
): action is PayloadAction<DataUpdater<Entity>> {
  return action.type === dataActions.update.type;
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

export const entityExtraReducers: DataExtraReducers = {

  cases: ({
    key,
    builder,
  }) => {
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
  },

  matchers: ({
    key,
    builder,
    options = { save: false },
  }) => {
    /**
     * Save meta data
     */
    builder.addMatcher(
      (action: Action): action is Action => action.type.startsWith(key),
      (state) => {
        if (!options.save) {
          return;
        }

        const stateMeta = state as MetaState<Data>;

        localStorageSaveState(key, {
          original: stateMeta.original,
          differences: stateMeta.differences,
        });
      },
    );

    /**
     * Data updates
     */
    builder.addMatcher(isDataUpdateAction, (state, { payload }) => {
      if (!payload[key]) {
        return;
      }

      payload[key].forEach((update) => {
        const { $id, ...changes } = update;
        const entity = state.original[$id] as Entity | undefined;

        if (!entity) {
          return;
        }

        /**
         * Perform a diff compare.
         */
        const diffResult = diffCompare<Entity>(
          { ...entity, ...changes },
          state.original[$id] as Entity,
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
      });

      if (options.save) {
        localStorageSaveState(key, {
          original: state.original,
          differences: state.differences,
        });
      }
    });

    /**
     * Data deletes
     */
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
      const metaDefault = metaInitial<Entity>();

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
  },
};
