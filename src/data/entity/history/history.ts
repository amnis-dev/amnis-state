/* eslint-disable @typescript-eslint/no-explicit-any */
import { uid } from '../../../core/index.js';
import { GrantTask } from '../../grant/index.js';
import type { UID } from '../../../core/index.js';
import type {
  History, HistoryBase, HistoryCreator, HistoryStateMutator,
} from './history.types.js';
import { entitySliceCreate } from '../entity.slice.js';

const historyKey = 'history';

export const historyBase = (): HistoryBase => ({
  $subject: uid(historyKey, 'null'),
  task: GrantTask.None,
  mutation: null,
});

export function historyCreator(
  history: HistoryCreator,
): History {
  return {
    ...historyBase(),
    ...history,
    $id: uid(historyKey),
  };
}
/**
 * Create historic records of state mutations.
 */
export function historyMake(
  state: HistoryStateMutator,
  task: GrantTask,
): History[] {
  const histories: History[] = [];

  Object.values(state).forEach((mutators) => {
    mutators.forEach((mutation: any) => {
      const $subject: UID = typeof mutation === 'object' ? mutation?.$id : mutation;
      histories.push(historyCreator({
        $subject,
        task,
        mutation,
      }));
    });
  });

  return histories;
}

export const historyState = entitySliceCreate({
  key: historyKey,
  creator: historyCreator,
});
