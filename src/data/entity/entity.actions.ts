/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';
import { stateEntitiesCreate } from '../../state.js';
import type { StateCreator } from '../../state.types.js';
import { dataActions } from '../data.actions.js';
import type { Data } from '../data.types.js';
import type { Meta } from './entity.types.js';

export type MetaSetter = Record<string, Partial<Meta<Data>>>;

export const entityActions = {
  /**
   * Batch creates entities.
   */
  create: createAction('@data/create', (stateCreate: StateCreator) => (dataActions.create(
    stateEntitiesCreate(stateCreate),
  ))),

  /**
   * Batch set meta information for entities.
   */
  meta: createAction('@entity/meta', (metaSetter: MetaSetter) => ({ payload: metaSetter })),
};

export default entityActions;
