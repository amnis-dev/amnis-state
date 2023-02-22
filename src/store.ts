import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setState, setApi } from './set.js';

/**
 * Configures a default store.
 */
export function storeSetup() {
  const rootReducer = combineReducers({ ...setState.reducers, ...setApi.reducers });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => (
      getDefaultMiddleware().concat([...setState.middleware, ...setApi.middleware])
    ),
  });

  return store;
}

export const store = storeSetup();

export type RootState = ReturnType<typeof store.getState>;

export default storeSetup;
