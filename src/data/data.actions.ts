/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';
import type {
  DataCreator,
  DataDeleter,
  DataUpdater,
} from './data.types.js';

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
   * Wipes all entity data from the state.
   */
  wipe: createAction('@data/wipe'),
};

export default { dataActions };
