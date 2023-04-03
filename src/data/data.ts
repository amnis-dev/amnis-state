import type { Data } from './data.types.js';

/**
 * Attempts to obtain a human readable name for the given data object.
 * The ID slice key is returned if no name can be found.
 */
export const dataName = <D extends Data & Record<string, any>>(data: D): string => {
  const name = data.name || data.title || data.label || data.handle || data.nameDisplay || data.$id.split(':')[0];
  return name;
};

/**
 * Converts a camel case string to a human readable title case string.
 */
export const dataCamelToTitle = (str: string): string => {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};
