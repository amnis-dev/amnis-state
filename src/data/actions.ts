/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';
import type {
  DataCreator,
  DataDeleter,
  DataUpdater,
} from './types.js';

export const dataActions = {
  /**
   * Batch creates entities.
   */
  create: createAction<DataCreator>('@data/create'),

  /**
   * Batch updates entities.
   */
  update: createAction<DataUpdater>('@data/update'),

  /**
   * Batch deletes entities.
   */
  delete: createAction<DataDeleter>('@data/delete'),

  /**
   * Wipes all data from the state.
   *
   * TODO: Implement this.
   */
  // wipe: createAction('@data/wipe'),
};

export default { dataActions };
