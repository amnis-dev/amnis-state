import { nanoid } from '@reduxjs/toolkit';
import { uid } from '../../../core/index.js';
import type { Grant } from '../../grant/index.js';
import { grantCombine } from '../../grant/index.js';
import type {
  Role, RoleRoot, RoleCombo, RoleMinimal, RoleFsLimits,
} from './role.types.js';
import { entitySliceCreate } from '../entity.slice.js';

const roleKey = 'role';

export const roleRoot = (): RoleRoot => ({
  name: 'Unconfigured Role',
  description: '',
  color: '',
  fsLimits: [0, 0, 0],
  grants: [],
});

export function roleCreate(
  role: RoleMinimal,
): Role {
  return {
    ...roleRoot(),
    ...role,
    $id: uid(roleKey),
  };
}

/**
 * Combines an array of grants from a list of roles.
 */
export const roleGrantCombine = (roles: Role[]) => {
  /**
   * Concat all the grants from the roles.
   */
  const grantsRaw = roles.reduce<Grant[]>((acc, role) => {
    acc.push(...role.grants);
    return acc;
  }, []);

  /**
   * Combine the grants.
   */
  const grants = grantCombine(grantsRaw);

  return grants;
};

export function roleComboCreate(
  roles: Role[],
): RoleCombo {
  const id = nanoid();
  const $roles = roles.map((r) => r.$id);
  const grants = roleGrantCombine(roles);
  const combo: RoleCombo = [id, $roles, grants];
  return combo;
}

export function roleFsLimitsCompress(
  fsLimitsArray: RoleFsLimits[],
): RoleFsLimits {
  const fsLimitsResult = fsLimitsArray.reduce<RoleFsLimits>(
    (acc, cur) => cur.map((limit, i) => {
      if (acc[i] < 0 || limit < 0) {
        return -1;
      }
      if (limit > acc[i]) {
        return limit;
      }
      return acc[i];
    }) as RoleFsLimits,
    [0, 0, 0],
  );

  return fsLimitsResult;
}

export const roleState = entitySliceCreate({
  key: roleKey,
  create: roleCreate,
});
