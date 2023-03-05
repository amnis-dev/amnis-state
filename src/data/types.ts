/* eslint-disable @typescript-eslint/no-explicit-any */

export type DataEntity = { $id: string, [key: string]: any };

export type DataEntityUpdate = Partial<DataEntity> & { $id: string };

export type DataCreator = { [key: string]: DataEntity };

export type DataUpdater = { [key: string]: DataEntityUpdate };

export type DataDeleter = { [key: string]: string };
