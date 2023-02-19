import type {
  StateCreator, StateUpdater, StateDeleter, StateQuery,
} from '../state.types.js';

export interface Core {
  insert?: StateCreator,
  query?: StateQuery,
  modify?: StateUpdater,
  remove?: StateDeleter,
}
