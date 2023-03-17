import type { App } from './app.types.js';

/**
 * Reducer key for the application state.
 */
export const appKey = 'app';

/**
 * Initializes the application state.
 */
export const appInitial = (): App => {
  const app: App = {
    routeLocation: '/',
  };
  return app;
};
