import { uid } from '../../../core/index.js';
import type { Profile, ProfileBase, ProfileCreator } from './profile.types.js';
import { entitySliceCreate } from '../entity.slice.js';
import { userState } from '../user/index.js';

const profileKey = 'profile';

export const profileBase: ProfileBase = {
  nameDisplay: 'Unnamed',
  $user: uid(userState.key()),
};

export function profileCreator(
  profile: ProfileCreator,
): Profile {
  return {
    ...profileBase,
    ...profile,
    $id: uid(profileKey),
  };
}

export const profileState = entitySliceCreate<Profile, ProfileCreator>({
  key: profileKey,
  creator: profileCreator,
});
