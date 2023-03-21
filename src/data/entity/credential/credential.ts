import { uid } from '../../../core/index.js';
import { entitySliceCreate } from '../entity.slice.js';
import type { Credential, CredentialBase, CredentialCreator } from './credential.types.js';

const credentialKey = 'credential';

export const credentialBase = (): CredentialBase => ({
  name: 'Unknown Credential',
  publicKey: '',
});

export const credentialCreator = (
  credential: CredentialCreator,
): Credential => ({
  ...credentialBase(),
  ...credential,
  $id: uid(credentialKey),
});

export const credentialState = entitySliceCreate({
  key: credentialKey,
  creator: credentialCreator,
});
