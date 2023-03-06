/* eslint-disable @typescript-eslint/no-explicit-any */

import type { UID } from '../core/index.js';

export type DataEntity = { $id: UID, [key: string]: any };

export type DataEntityUpdate = Partial<DataEntity> & { $id: string };

export type DataCreator = { [key: string]: DataEntity[] };

export type DataUpdater = { [key: string]: DataEntityUpdate[] };

export type DataDeleter = { [key: string]: UID[] };
