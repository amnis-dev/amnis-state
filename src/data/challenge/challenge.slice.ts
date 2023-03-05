import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, Action } from '@reduxjs/toolkit';
import type { Challenge, ChallengeMeta } from './challenge.types.js';
import { challengeBase, challengeCreate, challengeKey } from './challenge.js';
import type { UID } from '../../core/index.js';
import { dateNumeric } from '../../core/index.js';
import { dataExtraReducers } from '../reducers.js';

/**
 * Matcher for any challenge action.
 */
function isChallengeAction(
  action: Action,
): action is Action {
  return action.type.startsWith(challengeKey);
}

/**
 * RTK challenge adapter.
 * Manages the normalized entities.
 */
export const challengeAdapter = createEntityAdapter<Challenge>({
  /**
   * Identifiers are stored in the `$id` property.
   */
  selectId: (challenge) => challenge.$id,

  /**
   * OPTIONAL: Sort by value other than $id.
   */
  // sortComparer: (a, b) => a.name.localeCompare(b.name),
});

/**
 * Initialized challenge state with meta information.
 */
export const challengeInitialState = challengeAdapter.getInitialState<ChallengeMeta>({
  otps: [],
});

/**
 * RTK Challenge Slice
 */
export const challengeSlice = createSlice({
  name: challengeKey,
  initialState: challengeInitialState,
  reducers: {
    create: (state, action: PayloadAction<Partial<Challenge>>) => {
      challengeAdapter.addOne(state, challengeCreate(action.payload));
    },
    insert: (state, action: PayloadAction<Partial<Challenge> & { $id: Challenge['$id'] }>) => {
      challengeAdapter.addOne(
        state,
        {
          ...challengeBase(),
          ...action.payload,
          $id: action.payload.$id,
        },
      );
    },
    delete: (state, action: PayloadAction<UID>) => {
      challengeAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    /**
     * Add common extra reducers.
     */
    dataExtraReducers(challengeKey, challengeAdapter, builder);

    /**
     * Match any challenge action.
     */
    builder.addMatcher(isChallengeAction, (state) => {
      /**
       * Clean up any expired challenges.
       */
      const now = dateNumeric();
      const expiredIds = Object.values(state.entities)
        .filter((e) => e !== undefined && e.exp <= now)
        .map((e) => e?.$id) as UID<Challenge>[];

      challengeAdapter.removeMany(state, expiredIds);
    });
  },
});

/**
 * Challenge redux reducer.
 */
export const challengeReducer = challengeSlice.reducer;

/**
 * Challenge redux actions.
 */
export const challengeActions = challengeSlice.actions;

/**
 * Challenge redux selectors.
 */
export const challengeSelectors = {
  /**
   * Gets entity selectors.
   */
  ...challengeAdapter.getSelectors<{
    [challengeKey]: typeof challengeInitialState;
  }>((state) => state[challengeKey]),
};

/**
 * Challenge redux selector keys.
 */
export type ChallengeSelector = Extract<keyof typeof challengeSelectors, string>;

/**
 * Export the slice as default.
 */
export default challengeSlice;
