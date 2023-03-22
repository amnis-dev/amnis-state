import { uid } from '../../../core/index.js';
import { entitySliceCreate } from '../entity.slice.js';
import type { Log, LogRoot, LogMinimal } from './log.types.js';

const logKey = 'log';

export const logRoot: LogRoot = {
  level: 'debug',
  title: 'Untitled Log',
  description: 'This log has no description.',
  system: 'System',
};

/**
 * Creates a log entry.
 */
export function logCreate(log: LogMinimal): Log {
  return {
    ...logRoot,
    ...log,
    $id: uid(logKey),
  };
}

export const logState = entitySliceCreate({
  key: logKey,
  create: logCreate,
});
