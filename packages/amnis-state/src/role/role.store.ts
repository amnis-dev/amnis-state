import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { reducerMap, reducerMiddleware } from './role.reducer';

export function roleStoreSetup() {
  const rootReducer = combineReducers(reducerMap);

  const roleStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => (
      getDefaultMiddleware().concat(reducerMiddleware)
    ),
  });
  return roleStore;
}

export default roleStoreSetup;
