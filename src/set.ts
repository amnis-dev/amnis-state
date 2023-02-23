import type { Middleware, Reducer, Slice } from '@reduxjs/toolkit';
import { slices } from './slices.js';
import { apiAuth, apiCrud } from './api/index.js';

type ReducerMap<S> = {
  [N in keyof S]: S[N] extends Slice ? S[N]['reducer'] : never;
}

const reducerSlices = Object.keys(slices).reduce((obj, key) => {
  const sliceKey = key as keyof typeof slices;
  obj[sliceKey] = slices[sliceKey].reducer;
  return obj;
}, {} as Record<string, Reducer>) as ReducerMap<typeof slices>;

const reducerApi = {
  [apiAuth.reducerPath]: apiAuth.reducer,
  [apiCrud.reducerPath]: apiCrud.reducer,
};

export interface Set<R> {
  reducers: R;
  middleware: Middleware[];
}

export const setState: Set<typeof reducerSlices> = {
  reducers: reducerSlices,
  middleware: [],
};

export const setStateApi: Set<typeof reducerApi> = {
  reducers: reducerApi,
  middleware: [
    apiAuth.middleware,
    apiCrud.middleware,
  ],
};
