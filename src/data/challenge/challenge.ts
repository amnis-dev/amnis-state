import { nanoid } from '@reduxjs/toolkit';
import { dateNumeric, uid } from '../../core/index.js';
import type { Challenge } from './challenge.types.js';
import { dataSliceCreate } from '../data.slice.js';

export const challengeKey = 'challenge';

export const challengeBase = (): Omit<Challenge, '$id'> => ({
  val: nanoid(8),
  exp: dateNumeric('5m'),
});

export const challengeCreate = (
  challenge: Partial<Challenge>,
): Challenge => {
  const challangeNew: Challenge = {
    ...challengeBase(),
    ...challenge,
    $id: uid(challengeKey),
  };

  return challangeNew;
};

export const challengeState = dataSliceCreate({
  key: challengeKey,
  create: challengeCreate,
});
