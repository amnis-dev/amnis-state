/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UID } from '../../../core/index.js';
import type {
  StateCreator, StateDeleter, StateUpdater,
} from '../../../state.types.js';
import type { GrantTask } from '../../grant/index.js';
import type {
  Data, DataRoot, DataMinimal, DataMeta,
} from '../../data.types.js';

/**
 * List of State Mutators history can log.
 */
export type HistoryStateMutator = StateCreator | StateUpdater | StateDeleter;

/**
 * Historical updates to data.
 */
export interface History extends Data {
  /**
   * The subject that was updated.
   */
  readonly $subject: UID;

  /**
   * The state task performed.
   */
  task: GrantTask;

  /**
   * The state mutation record that was performed.
   */
  mutation: any;
}

/**
 * History properties excluding the extended entity properties.
 */
export type HistoryRoot = DataRoot<History>;

/**
 * Root properties in order to create a log.
 */
export type HistoryMinimal = DataMinimal<History, '$subject' | 'task' | 'mutation'>;

/**
 * History collection meta data.
 */
export type HistoryMeta = DataMeta<History>;
