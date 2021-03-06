import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { reducerMap, reducerMiddleware } from './session.reducer';

export function sessionStoreSetup() {
  const rootReducer = combineReducers(reducerMap);

  const sessionStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => (
      getDefaultMiddleware().concat(reducerMiddleware)
    ),
  });
  return sessionStore;
}

export default sessionStoreSetup;
