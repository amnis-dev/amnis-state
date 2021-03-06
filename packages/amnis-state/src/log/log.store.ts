import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { reducerMap, reducerMiddleware } from './log.reducer';

export function logStoreSetup() {
  const rootReducer = combineReducers(reducerMap);

  const logStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => (
      getDefaultMiddleware().concat(reducerMiddleware)
    ),
  });
  return logStore;
}

export default logStoreSetup;
