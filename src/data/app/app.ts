import type { App } from './app.types.js';

/**
 * Stores app data.
 */
let app: App;

/**
 * Initializes the application data.
 */
const appInitialize = (): App => {
  const appNext: App = {
    routeLocation: '/',
  };
  return appNext;
};

/**
 * Get the application data.
 */
export const appGet = (): App => {
  if (!app) {
    app = appInitialize();
  }
  return app;
};

/**
 * Reducer key for the application state.
 */
export const appKey = 'app';
