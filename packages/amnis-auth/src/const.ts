import { createHash, randomBytes } from 'crypto';
import { cryptoRandomString } from './crypto';

export const AUTH_TOKEN_SECRET = process.env.AMNIS_AUTH_TOKEN_SECRET || cryptoRandomString();
export const AUTH_SESSION_SECRET = process.env.AMNIS_AUTH_SESSION_SECRET || createHash('sha256').update(randomBytes(32)).digest('base64').substr(0, 32);
export const AUTH_TOKEN_LIFE = process.env.AMNIS_AUTH_TOKEN_LIFE || '30m'; // Access token life.
export const AUTH_SESSION_LIFE = process.env.AMNIS_AUTH_SESSION_LIFE || '1h'; // Session life.

export default { AUTH_TOKEN_SECRET, AUTH_TOKEN_LIFE, AUTH_SESSION_LIFE };
