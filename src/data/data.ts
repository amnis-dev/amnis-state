import type { Data, DataOrder } from './data.types.js';

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

/**
 * Orders an array of data objects by the given order object.
 */
export const dataOrder = <D extends Data>(data: D[], order: DataOrder = {}): D[] => {
  const { key = '$id', direction = 'asc' } = order;
  const sorted = [...data].sort((a, b) => {
    const aKey = a[key as keyof Data];
    const bKey = b[key as keyof Data];
    const aVal = typeof aKey === 'string' ? aKey.toLowerCase() : aKey;
    const bVal = typeof bKey === 'string' ? bKey.toLowerCase() : bKey;
    if (aVal < bVal) {
      return direction === 'asc' ? -1 : 1;
    }
    if (aVal > bVal) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  return sorted;
};
