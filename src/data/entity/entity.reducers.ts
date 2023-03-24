/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  Action,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { UID } from '../../core/index.js';
import { dataActions } from '../data.actions.js';
import type {
  Data,
  DataDeleter,
  DataReducerSettings,
  DataUpdater,
} from '../data.types.js';
import type {
  Entity,
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

export const entityExtraReducers = {

  cases: () => { /** noop */ },

  matchers: <D extends Data>({
    key,
    builder,
  }: DataReducerSettings<D>) => {
    /**
     * Data updates
     */
    builder.addMatcher(isDataUpdateAction, (state, { payload }) => {
      if (!payload[key]) {
        return;
      }

      payload[key].forEach((update) => {
        const { $id } = update;
        const entity = state.entities[$id] as Entity | undefined;

        if (!entity) {
          return;
        }

        const diffResult = state.differences[$id] ?? [];

        if (diffResult.length === 0 && !entity.committed) {
          entity.committed = true;
        }

        if (diffResult.length > 0 && entity.committed) {
          entity.committed = false;
        }
      });
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
  },
};
