import { uid } from '../../../core/index.js';
import { entitySliceCreate } from '../entity.slice.js';
import type { Key } from './key.types.js';

const keyKey = 'key';

export const keyBase = (): Key => ({
  $id: uid(keyKey),
  name: 'Unknown Key',
  format: 'raw',
  wrapped: false,
  value: '',
});

export function keyCreator(
  key: Key,
): Key {
  return {
    ...keyBase(),
    ...key,
  };
}

export const keyState = entitySliceCreate({
  key: keyKey,
  creator: keyCreator,
});
