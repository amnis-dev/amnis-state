/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Dictionary, EntityState } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import type { State } from '../../state.types.js';
import type { UID } from '../../core/index.js';
import type {
  Data,
  DataRoot,
  DataUpdater,
} from '../data.types.js';
import type { Entity, MetaState } from './entity.types.js';
import type { Bearer } from '../bearer/bearer.types.js';
import type { Key } from './key/key.types.js';
import type { Role } from './role/role.types.js';
import type { Grant } from '../grant/grant.types.js';

/**
 * Creates a slice selector.
 */
const genSelectSlice = <C extends Data>(sliceKey: string) => (state: State) => {
  const slice = state[sliceKey] as MetaState<C>;

  if (!slice?.entities) {
    return undefined;
  }

  return slice;
};

/**
 * Creates an entity dictionary selector.
 */
const genSelectEntities = <E extends Entity>(sliceKey: string) => (state: State) => (
  genSelectSlice<E>(sliceKey)(state)?.entities ?? ({} as Dictionary<E>)
);

/**
 * Creates an original entity dictionary selector.
 */
const genSelectOriginals = <E extends Entity>(sliceKey: string) => (state: State) => (
  genSelectSlice<E>(sliceKey)(state)?.original ?? ({} as Record<UID<E>, E>)
);

/**
 * Creates an original entity dictionary selector.
 */
const genSelectDifferences = <E extends Entity>(sliceKey: string) => (state: State) => (
  genSelectSlice<E>(sliceKey)(state)?.differences ?? ({} as Record<UID<E>, (keyof E)[]>)
);

/**
 * Creates an active id selector.
 */
const genSelectActiveId = <E extends Entity>(sliceKey: string) => (state: State) => (
  genSelectSlice<E>(sliceKey)(state)?.active ?? null
);

/**
 * Creates a focused id selector.
 */
const genSelectFocusedId = <E extends Entity>(sliceKey: string) => (state: State) => (
  genSelectSlice<E>(sliceKey)(state)?.focused ?? null
);

/**
 * Creates a selected ids selector.
 */
const genSelectSelectionIds = <E extends Entity>(sliceKey: string) => (state: State) => (
  genSelectSlice<E>(sliceKey)(state)?.selection ?? []
);

/**
 * Selects the focused entity on a slice (if one is active).
 */
const genSelectActive = <E extends Entity = Entity>(sliceKey: string) => createSelector(
  genSelectActiveId<E>(sliceKey),
  genSelectEntities<E>(sliceKey),
  (activeId, entities): E | undefined => {
    if (!activeId) {
      return undefined;
    }

    const entity = entities?.[activeId] as E;

    if (!entity) {
      return undefined;
    }

    return entity;
  },
);

export const selectActive = <E extends Entity>(
  state: State, sliceKey: string,
) => genSelectActive<E>(sliceKey)(state);

/**
 * Selects the focused entity on a slice (if one is active).
 */
const genSelectFocused = <E extends Entity = Entity>(sliceKey: string) => createSelector(
  genSelectFocusedId<E>(sliceKey),
  genSelectEntities<E>(sliceKey),
  (focusedId, entities): E | undefined => {
    if (!focusedId) {
      return undefined;
    }

    const entity = entities?.[focusedId] as E;

    if (!entity) {
      return undefined;
    }

    return entity;
  },
);

export const selectFocused = <E extends Entity>(
  state: State, sliceKey: string,
) => genSelectFocused<E>(sliceKey)(state);

/**
 * Selects the focused entity on a slice (if one is active).
 */
const genSelectSelection = <E extends Entity = Entity>(
  sliceKey: string,
) => createSelector(
  genSelectSelectionIds<E>(sliceKey),
  genSelectEntities<E>(sliceKey),
  (selectionIds, entities) => {
    const selections = selectionIds.map((selected) => entities[selected]) as E[];

    return selections;
  },
);

export const selectSelection = <E extends Entity>(
  state: State, sliceKey: string,
) => genSelectSelection<E>(sliceKey)(state);

export interface EntityDifference<C extends Data> {
  original: Entity<C> | undefined;
  current: Entity<C> | undefined;
  changes: DataRoot<C>;
  updater: DataUpdater<C>;
  keys: (keyof Entity<C>)[];
}

/**
 * Selects an object to differentiate local updates.
 */
const genSelectDifference = <C extends Data = Data>(
  sliceKey: string,
) => createSelector(
  [
    (state, id) => id,
    genSelectDifferences<Entity<C>>(sliceKey),
    genSelectOriginals<Entity<C>>(sliceKey),
    genSelectEntities<Entity<C>>(sliceKey),
  ],
  (
    id,
    diffRecords,
    originalRecords,
    entities,
  ): EntityDifference<C> => {
    const current = entities[id] as Entity<C> | undefined;
    const original = originalRecords[id as UID] as Entity<C> | undefined;
    const diffRecord = diffRecords[id as UID];
    const keys = diffRecord ? [...diffRecord as (keyof Entity<C>)[]] : [] as (keyof Entity<C>)[];

    const changes = keys.reduce<DataRoot<C>>((acc, k) => {
      /** @ts-ignore */
      acc[k] = current[k];
      return acc;
    }, {} as DataRoot<C>);
    const updater = { $id: id, ...changes };

    return {
      original: original ? { ...original } : undefined,
      current: current ? { ...current } : undefined,
      changes,
      updater,
      keys,
    };
  },
);

/**
 * Selects a bearer for a given api reducer name.
 */
export function selectBearer(state: State, id: string): Bearer | undefined {
  const bearerSlice = state.bearer as EntityState<Bearer>;

  if (bearerSlice === undefined) {
    return undefined;
  }

  const bearerEntity = bearerSlice.entities[id];

  return bearerEntity;
}

/**
 * Selects a public key from the crypto slice.
 */
export function selectKey(state: State, $id: string): string | undefined {
  const slice = state.key as EntityState<Key>;

  if (!slice?.entities) {
    return undefined;
  }

  if (!slice) {
    return undefined;
  }

  const keyObject = Object.values(slice.entities).find(
    (entity) => (entity?.$id === $id),
  );

  return keyObject?.value;
}

/**
 * Selects a list of Grants based on an array of role references.
 */
export function selectRoleGrants(state: State, roleRefs: UID<Role>[]): Grant[] {
  const grants: Grant[] = [];

  const roleSlice = genSelectSlice<Role>('role')(state);

  if (!roleSlice) {
    return grants;
  }

  roleRefs.forEach((roleRef) => {
    const role = roleSlice.entities[roleRef];
    if (!role) {
      return;
    }

    grants.push(...role.grants);
  });

  return grants;
}

export interface CoreSelectors<C extends Data> {
  selectActive: (state: State) => Entity<C> | undefined,
  selectFocused: (state: State) => Entity<C> | undefined,
  selectSelection: (state: State) => Entity<C>[],
  selectDifference: (state: State, $id: UID) => EntityDifference<C>,
}

/**
 * Create the selector utility object.
 */
export function entitySelectors<C extends Data>(sliceKey: string): CoreSelectors<C> {
  return {
    selectActive: genSelectActive<Entity<C>>(sliceKey),
    selectFocused: genSelectFocused<Entity<C>>(sliceKey),
    selectSelection: genSelectSelection<Entity<C>>(sliceKey),
    selectDifference: genSelectDifference<C>(sliceKey),
  };
}
