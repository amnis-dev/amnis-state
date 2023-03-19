import { localStorageLoadState } from '../../localstorage.js';
import type { App } from './app.types.js';

/**
 * Reducer key for the application state.
 */
export const appKey = 'app';

/**
 * Stores app data.
 */
let app: App;

/**
 * Initializes the application data.
 */
const appInitialState = (): App => {
  const appDefault: App = {
    location: '/',
    systems: {
      Local: 'http://localhost:3000/api/system',
    },
    systemDefault: 'Local',
  };

  // Load application data from localstorage.
  const appStored = localStorageLoadState<App>(appKey);

  return { ...appDefault, ...appStored };
};

/**
 * Get the application data.
 */
export const appGet = (): App => {
  if (!app) {
    app = appInitialState();
  }
  return app;
};
