import { uid } from '../../../core/index.js';
import type { Profile, ProfileRoot, ProfileMinimal } from './profile.types.js';
import { entitySliceCreate } from '../entity.slice.js';
import { userState } from '../user/index.js';

const profileKey = 'profile';

export const profileRoot: ProfileRoot = {
  nameDisplay: 'Unnamed',
  $user: uid(userState.key()),
};

export function profileCreate(
  profile: ProfileMinimal,
): Profile {
  return {
    ...profileRoot,
    ...profile,
    $id: uid(profileKey),
  };
}

export const profileState = entitySliceCreate({
  key: profileKey,
  create: profileCreate,
});
