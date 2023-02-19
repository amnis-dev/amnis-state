/* eslint-disable no-shadow */
import type { DateNumeric } from '../../core.types.js';

/**
 * An interface for a bearer.
 */
export interface Bearer {
  /**
   * Bearer identifier.
   */
  id: string;

  /**
   * Expiration date.
   */
  exp: DateNumeric;

  /**
   * Encoded access token.
   */
  access: string;
}

/**
 * Bearer collection meta data.
 */
export type BearerMeta = Record<string, Bearer>;
