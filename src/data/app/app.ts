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
  const isBrowser = typeof window !== 'undefined';

  const appDefault: App = {
    location: '/',
    systems: {},
    dataCompare: isBrowser,
    dataSave: isBrowser,
  };

  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
    appDefault.systems = {
      Local: 'http://localhost:3000/api/system',
    };
    appDefault.systemDefault = 'Local';
  }

  return appDefault;
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
