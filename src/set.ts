import type { Middleware, Reducer, Slice } from '@reduxjs/toolkit';
import { stateSlices } from './slices.js';

type ReducerMap<S> = {
  [N in keyof S]: S[N] extends Slice ? S[N]['reducer'] : never;
}

export interface Set<R = Record<string, Reducer>> {
  reducers: R;
  middleware: Middleware[];
}

const reducers = Object.keys(stateSlices).reduce((obj, key) => {
  const sliceKey = key as keyof typeof stateSlices;
  obj[sliceKey] = stateSlices[sliceKey].reducer;
  return obj;
}, {} as Record<string, Reducer>) as ReducerMap<typeof stateSlices>;

export const stateSet = {
  reducers,
  middleware: [],
};

export default stateSet;
