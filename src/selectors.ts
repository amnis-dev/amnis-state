import type { UID } from './core/core.types.js';
import type { DataState, Entity, User } from './data/index.js';
import { systemSlice, userSlice } from './data/index.js';
import type { RootState } from './store.js';

const isUserAdmin = (state: RootState, $userId: UID<User>): boolean => {
  const user = userSlice.select.byId(state, $userId);

  if (!user) {
    return false;
  }

  const systemActive = systemSlice.select.active(state);

  if (!systemActive) {
    return false;
  }

  if (user.$roles.includes(systemActive.$adminRole)) {
    return true;
  }

  return false;
};

const isUserExec = (state: RootState, $userId: UID<User>): boolean => {
  const user = userSlice.select.byId(state, $userId);

  if (!user) {
    return false;
  }

  const systemActive = systemSlice.select.active(state);

  if (!systemActive) {
    return false;
  }

  if (user.$roles.includes(systemActive.$execRole)) {
    return true;
  }

  return false;
};

const isUserActiveAdmin = (state: RootState): boolean => {
  const userActive = userSlice.select.active(state);

  if (!userActive) {
    return false;
  }

  return isUserAdmin(state, userActive.$id);
};

const isUserActiveExec = (state: RootState): boolean => {
  const userActive = userSlice.select.active(state);

  if (!userActive) {
    return false;
  }

  return isUserExec(state, userActive.$id);
};

const unsavedEntities = (state: RootState): Entity[] => {
  const entities = Object.values(state).reduce<Entity[]>((acc, slice) => {
    if (slice?.type !== 'entity' || slice?.differences === undefined) {
      return acc;
    }
    const sliceEntity = slice as DataState<Entity>;

    const unsaved = Object.keys(sliceEntity.differences)
      .map(($id) => sliceEntity.entities[$id])
      .filter((entity) => !!entity) as Entity[];

    acc.push(...unsaved);
    return acc;
  }, [] as Entity[]);
  return entities;
};

export const stateSelect = {
  isUserAdmin,
  isUserExec,
  isUserActiveAdmin,
  isUserActiveExec,
  unsavedEntities,
};

export default stateSelect;
