import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setState, setStateApi } from './set.js';

/**
 * Configures a default store.
 */
export function storeSetup() {
  const rootReducer = combineReducers({ ...setState.reducers, ...setStateApi.reducers });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => (
      getDefaultMiddleware().concat([...setState.middleware, ...setStateApi.middleware])
    ),
  });

  return store;
}

export const store = storeSetup();

export type RootState = ReturnType<typeof store.getState>;

export default storeSetup;
