import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { appGet, appKey } from './app.js';
import type { App } from './app.types.js';
import type { RootState } from '../../store.js';
import { localStorageSaveState } from '../../localstorage.js';

/**
 * Initialized app state with meta information.
 */
export const appInitialState: App = appGet();

/**
 * RTK App Slice
 */
export const appSlice = createSlice({
  name: appKey,
  initialState: appInitialState,
  reducers: {
    /**
     * Defines a possible system on the network.
     */
    systemAdd: (
      state,
      action: PayloadAction<{
        name: string,
        url: string,
        setDefault?: boolean
      }>,
    ) => {
      const { name, url, setDefault } = action.payload;
      state.systems[name] = url;

      if (!state.systemDefault || setDefault === true) {
        state.systemDefault = name;
      }

      localStorageSaveState<App>(appKey, {
        systems: state.systems,
        systemDefault: state.systemDefault,
      });
    },

    /**
     * Navigate to a route location.
     */
    navigate: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
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
   * Selects known application systems.
   */
  selectSystems: (state: RootState) => state[appKey].systems,

  /**
   * Selects the default system.
   */
  selectSystemDefault: (state: RootState) => {
    const { systems, systemDefault } = state[appKey];
    if (!systemDefault) {
      return undefined;
    }
    return systems[systemDefault];
  },

  /**
   * Selects the current route location.
   */
  selectRouteLocation: (state: RootState) => state[appKey].location,
};

/**
 * App redux selector keys.
 */
export type AppSelector = Extract<keyof typeof appSelectors, string>;

/**
 * Export the slice as default.
 */
export default appSlice;
