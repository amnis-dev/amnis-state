/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  Action,
  Draft,
  PayloadAction,
} from '@reduxjs/toolkit';
import { dataActions } from './data.actions.js';
import type {
  Data,
  DataExtraReducers,
  DataReducerSettings,
} from './data.types.js';
import { diffCompare } from './entity/diff.js';
import { dataMetaInitial } from './data.meta.js';
import { localStorage } from '../localstorage.js';

/**
 * Applies a set a extra reducers to a data slice.
 */
export const extraReducersApply = <
  D extends Data,
  M extends Record<string, any> = Record<string, never>
>(
  settings: DataReducerSettings<D, M>,
  reducers: DataExtraReducers<D, M>[],
) => {
  reducers.forEach((reducer) => {
    reducer.cases(settings);
  });

  reducers.forEach((reducer) => {
    reducer.matchers(settings);
  });
};

/**
 * Common extra reducers.
 */
export const dataExtraReducers = {
  cases: <D extends Data>({
    key,
    adapter,
    builder,
  }: DataReducerSettings<D>) => {
    builder.addCase(dataActions.meta, (state, { payload }) => {
      if (!payload[key]) {
        return;
      }

      const meta = payload[key];
      Object.keys(meta).forEach((metaKey) => {
        /** @ts-ignore */
        state[metaKey] = meta[metaKey];
      });
    });

    builder.addCase(dataActions.insert, (state, { payload }) => {
      if (!payload[key] || !Array.isArray(payload[key])) {
        return;
      }
      /** @ts-ignore */
      adapter.upsertMany(state, payload[key]);

      /**
       * Remove possible original and difference data.
       */
      payload[key].forEach(({ $id }) => {
        delete state.original[$id];
        delete state.differences[$id];
      });
    });

    builder.addCase(dataActions.create, (state, { payload }) => {
      if (!payload[key] || !Array.isArray(payload[key])) {
        return;
      }
      /** @ts-ignore */
      adapter.upsertMany(state, payload[key]);

      /**
       * Remove possible original and difference data.
       */
      payload[key].forEach(({ $id }) => {
        delete state.original[$id];
        delete state.differences[$id];
      });
    });

    builder.addCase(dataActions.update, (state, { payload }) => {
      if (!payload[key] || !Array.isArray(payload[key])) {
        return;
      }
      /**
       * Maps the updates to the adapter update format.
       */
      const updates = payload[key].map((update) => {
        const { $id, ...changes } = update;

        const entity = state.entities[$id] as D | undefined;

        if (!entity) {
          return { id: $id, changes };
        }

        if (state.original[$id] === undefined) {
          state.original[$id] = { ...entity } as Draft<D>;
        }

        /**
         * Perform a diff compare.
         */
        const diffResult = diffCompare<Data>(
          { ...entity, ...changes },
          state.original[$id] as Data,
          { includeEntityKeys: false },
        );

        if (diffResult.length) {
          state.differences[$id] = diffResult as Draft<keyof D>[];
        }

        if (!diffResult.length) {
          if (state.differences[$id]) {
            delete state.differences[$id];
          }
          if (state.original[$id]) {
            delete state.original[$id];
          }
        }

        return { id: $id, changes };
      });

      /** @ts-ignore */
      adapter.updateMany(state, updates);
    });

    builder.addCase(dataActions.delete, (state, { payload }) => {
      if (!payload[key] || !Array.isArray(payload[key])) {
        return;
      }
      /** @ts-ignore */
      adapter.removeMany(state, payload[key]);
    });

    builder.addCase(dataActions.wipe, (state) => {
      /** @ts-ignore */
      adapter.removeAll(state);

      const metaDefault = dataMetaInitial<Data>();

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

  matchers: <D extends Data>({
    key,
    builder,
    options,
  }: DataReducerSettings<D>) => {
    builder.addMatcher(
      (action: Action): action is PayloadAction => action.type.startsWith('@data/'),
      (state, action) => {
        if (typeof action.payload !== 'object' || !action.payload[key]) {
          return;
        }

        if (!options?.save) {
          return;
        }

        if (!state.differences) {
          return;
        }

        const $ids = Object.keys(state.differences);

        if (!$ids.length) {
          return;
        }

        const entities = $ids.map(($id) => state.entities[$id]).filter((e) => !!e) as D[];

        const meta = {
          original: state.original,
          differences: state.differences,
        };

        localStorage().setItem(`state-${key}-meta`, JSON.stringify(meta));

        if ($ids.length === entities.length) {
          localStorage().setItem(`state-${key}-entities`, JSON.stringify(entities));
        }
      },
    );
  },

};
