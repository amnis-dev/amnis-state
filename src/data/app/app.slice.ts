import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { appInitial, appKey } from './app.js';
import type { App } from './app.types.js';
import type { RootState } from '../../store.js';

/**
 * Initialized app state with meta information.
 */
export const appInitialState: App = appInitial();

/**
 * RTK App Slice
 */
export const appSlice = createSlice({
  name: appKey,
  initialState: appInitialState,
  reducers: {
    /**
     * Navigate to a route location.
     */
    navigate: (state, action: PayloadAction<string>) => {
      state.routeLocation = action.payload;
    },
  },
});

/**
 * App redux reducer.
 */
export const appReducer = appSlice.reducer;

/**
 * App redux actions.
 */
export const appActions = appSlice.actions;

/**
 * App redux selectors.
 */
export const appSelectors = {
  /**
   * Selects the current route location.
   */
  selectRouteLocation: (state: RootState) => state[appKey].routeLocation,
};

/**
 * App redux selector keys.
 */
export type AppSelector = Extract<keyof typeof appSelectors, string>;

/**
 * Export the slice as default.
 */
export default appSlice;
