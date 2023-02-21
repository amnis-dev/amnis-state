import type { EntityState } from '@reduxjs/toolkit';
import type {
  Api, Bearer, Otp, OtpMeta,
} from '../../data/index.js';
import type { State } from '../../state.types.js';

type PossibleSlice<T, M = Record<string, never>> = EntityState<T> & M | undefined;

/**
 * Attempt to select an api object from an unknown state.
 */
export const apiUtilSelectApi = (
  state: State,
  apiId: string,
): Api | undefined => {
  const slice = state.bearer as PossibleSlice<Api>;

  if (!slice) {
    return undefined;
  }

  return slice.entities[apiId];
};

/**
 * Attempt to select a bearer object from an unknown state.
 */
export const apiUtilSelectBearer = (
  state: State,
  bearerId: string,
): Bearer | undefined => {
  const slice = state.bearer as PossibleSlice<Bearer>;

  if (!slice) {
    return undefined;
  }

  return slice.entities[bearerId];
};

/**
 * Attempt to select the latest one-time password (OTP) object from an unknown state.
 */
export const apiUtilSelectLatestOtp = (
  state: State,
): Otp | undefined => {
  const slice = state.otp as PossibleSlice<Otp, OtpMeta>;

  if (!slice) {
    return undefined;
  }

  if (!slice.latest) {
    return undefined;
  }

  return slice.entities[slice.latest];
};
