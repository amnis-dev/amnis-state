import { logSlice } from './log';

export const reducerMap = {
  [logSlice.name]: logSlice.reducer,
};

export const reducerMiddleware = [];

export default { reducerMap, reducerMiddleware };
