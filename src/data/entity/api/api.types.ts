/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  EntityCreator, EntityCreatorBase, Meta,
} from '../entity.types.js';

/**
 * Api type
 */
export interface Api extends EntityCreator {
  /**
   * Base URL for the api.
   */
  baseUrl: string;

  /**
   * Bearer token to find for this api.
   */
  bearerId?: string;

  /**
   * Endpoints that require a signature header.
   * A value of `true` indicates all endpoints.
   */
  signature?: string[] | boolean;

  /**
   * Endpoints that require a challenge header.
   * A value of `true` indicates all endpoints.
   */
  challenge?: boolean | string[];

  /**
   * Endpoint that require an OTP header.
   * A value of `true` indicates all endpoints.
   */
  otp?: boolean | string[];
}

/**
 * Contact properties excluding the extended entity properties.
 */
export type ApiBase = EntityCreatorBase<Api>;

/**
 * Base properties in order to create a log.
 */
export type ApiCreator = Partial<Api>;

/**
 * Api collection meta data.
 */
export type ApiMeta = Meta<Api>;
