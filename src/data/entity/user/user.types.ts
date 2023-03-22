import type {
  DateJSON, Email, Password, UIDList,
} from '../../../core/index.js';
import type { Permit } from '../permit/index.js';
import type { Credential } from '../credential/index.js';
import type { Role } from '../role/index.js';
import type { HandleName } from '../handle/index.js';
import type {
  Data, DataMeta, DataMinimal, DataRoot,
} from '../../data.types.js';

/**
 * Data associated to a User.
 */
export interface User extends Data {
  /**
   * Handle for the user.
   */
  handle: HandleName;

  /**
   * A hashed value of the users password.
   */
  password?: Password;

  /**
   * If this account is locked from being authenticated.
   * @default false
   */
  locked: boolean;

  /**
   * Email address for user account related purposes.
   */
  email?: Email;

  /**
   * If the user email is verified.
   */
  emailVerified?: boolean;

  /**
   * Phone number for user account related purposes.
   * @maxLength 24
   */
  phone?: string;

  /**
   * If the user phone number is verified.
   */
  phoneVerified?: boolean;

  /**
   * If this is an administrative account.
   */
  admin?: boolean;

  /**
   * Date-time of last login.
   */
  logged?: DateJSON;

  /**
   * Credentials this user has registered.
   * @default []
   */
  $credentials: UIDList<Credential>;

  /**
   * Roles this user has been given.
   * @default []
   */
  $roles: UIDList<Role>;

  /**
   * Special-case permits this user has been bestowed.
   * @default []
   */
  $permits: UIDList<Permit>;
}

/**
 * User properties excluding the extended entity properties.
 */
export type UserRoot = DataRoot<User>;

/**
  * User base properties for creation.
  */
export type UserMinimal = DataMinimal<User, 'handle'>;

/**
 * User collection meta data.
 */
export type UserMeta = DataMeta<User>;
