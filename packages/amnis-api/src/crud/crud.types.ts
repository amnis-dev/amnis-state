/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  StateDelete,
  StateCreate,
  StateUpdate,
  StateQuery,
} from '@amnis/core/state';
import type { Database } from '@amnis/db/types';
import type { Store } from '@reduxjs/toolkit';
import type {
  ApiProcess,
  ApiProcesses,
  ApiQuery,
} from '../types';

/**
 * Api Handler configurations
 */
export interface ApiCrudProcessesParams {
  store: Store;
  database: Database;
  schemas?: any[],
  definitions?: {
    create?: string,
    read?: string,
    update?: string,
    delete?: string,
  },
  noauth?: boolean;
}

/**
 * API object containing request queries.
 */
export interface ApiCrudQueries {
  create: ApiQuery;
  read: ApiQuery;
  update: ApiQuery;
  delete: ApiQuery;
}

/**
 * Create process.
 */
export type ApiCrudProcessCreate = ApiProcess<StateCreate, StateCreate>;

/**
 * Read process.
 */
export type ApiCrudProcessRead = ApiProcess<StateQuery, StateCreate>;

/**
 * Update process.
 */
export type ApiCrudProcessUpdate = ApiProcess<StateUpdate, StateCreate>;

/**
 * Delete process.
 */
export type ApiCrudProcessDelete = ApiProcess<StateDelete, StateDelete>;

/**
 * API object containing response handlers.
 */
export interface ApiCrudProcesses extends ApiProcesses {
  create: ApiCrudProcessCreate;
  read: ApiCrudProcessRead;
  update: ApiCrudProcessUpdate;
  delete: ApiCrudProcessDelete;
}
