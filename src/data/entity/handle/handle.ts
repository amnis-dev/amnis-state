import { uid } from '../../../core/index.js';
import { entitySliceCreate } from '../entity.slice.js';
import type { Handle, HandleBase, HandleCreator } from './handle.types.js';

const handleKey = 'handle';

export const handleBase = (): HandleBase => ({
  name: '',
  $subject: uid('entity'),
});

export function handleCreator(
  handle: HandleCreator,
): Handle {
  return {
    ...handleBase,
    ...handle,
    $id: uid(handleKey),
  };
}

export const handleState = entitySliceCreate({
  key: handleKey,
  creator: handleCreator,
});
