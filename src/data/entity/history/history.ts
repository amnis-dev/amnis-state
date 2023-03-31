/* eslint-disable @typescript-eslint/no-explicit-any */
import { uid } from '../../../core/index.js';
import { GrantTask } from '../../grant/index.js';
import type { UID } from '../../../core/index.js';
import type {
  History, HistoryRoot, HistoryMinimal, HistoryStateMutator,
} from './history.types.js';
import { entitySliceCreate } from '../entity.slice.js';

const historyKey = 'history';

export const historyRoot = (): HistoryRoot => ({
  $link: uid(historyKey, 'null'),
  task: GrantTask.None,
  mutation: null,
});

export function historyCreate(
  history: HistoryMinimal,
): History {
  return {
    ...historyRoot(),
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
      const $link: UID = typeof mutation === 'object' ? mutation?.$id : mutation;
      histories.push(historyCreate({
        $link,
        task,
        mutation,
      }));
    });
  });

  return histories;
}

export const historySlice = entitySliceCreate({
  key: historyKey,
  create: historyCreate,
});
