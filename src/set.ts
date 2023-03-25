import { stateReducers } from './reducers.js';
import { mwLocalStorage } from './middleware/mw.localstorage.js';

export const stateSet = {
  reducers: stateReducers,
  middleware: [
    mwLocalStorage,
  ],
};

export default stateSet;
