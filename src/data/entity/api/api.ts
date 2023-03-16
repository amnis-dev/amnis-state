import { uid } from '../../../core/index.js';
import type { Api, ApiBase, ApiCreator } from './api.types.js';

export const apiKey = 'api';

export const apiBase = (): ApiBase => ({
  reducerPath: 'unknown',
  baseUrl: '',
});

export function apiCreator(
  api: ApiCreator,
): Api {
  return {
    ...apiBase(),
    ...api,
    $id: uid(apiKey),
  };
}
