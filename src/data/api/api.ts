/* eslint-disable no-bitwise */
import type { UID } from '../../index.js';
import { dataSliceCreate } from '../data.slice.js';
import type {
  Api, ApiCreator,
} from './api.types.js';

export const apiKey = 'api';

export function apiCreate(
  api: ApiCreator,
): Api {
  const apiNew: Api = {
    $id: `${api?.$system}${api.reducerPath}` as UID,
    ...api,
  };

  return apiNew;
}

export const apiState = dataSliceCreate({
  key: apiKey,
  create: apiCreate,
});
