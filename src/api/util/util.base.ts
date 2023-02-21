/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch, { Headers, Request } from 'cross-fetch';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import {
  headersAuthorizationToken, headersChallenge, headersOtp, headersSignature,
} from './util.headers.js';
import { agentCredential, agentGet } from '../../agent.js';
import type { State } from '../../state.types.js';
import { apiUtilSelectApi } from './util.selectors.js';

global.Headers = Headers;
global.Request = Request;

type DynamicBaseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;
type DynamicBaseQuerySetup = (reducerPath: string, bearerId?: string) => DynamicBaseQuery;

/**
 * Gets the baseURL based on configuration.
 *
 * store is the complete redux store.
 */
export const dynamicBaseQuery: DynamicBaseQuerySetup = (
  reducerPath,
) => async (args, store, extraOptions) => {
  const apiMeta = apiUtilSelectApi(store.getState() as State, reducerPath);

  /**
   * Exception for apiAuth...
   * Set the credential to further simplify auth requests.
   */
  if (
    reducerPath === 'apiAuth'
    && typeof args !== 'string'
  ) {
    if (['login', 'reset'].includes(args.url)) {
      const agent = await agentGet();
      args.body.$credential = agent.credentialId;
    }
    if (['register', 'credential'].includes(args.url)) {
      const credential = await agentCredential();
      args.body.credential = credential;
    }
  }

  /**
   * Dynamically prepare the request query.
   */
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: apiMeta ? apiMeta.baseUrl : '',
    fetchFn: fetch,
    prepareHeaders: async (headers, api) => {
      const state = api.getState() as State;

      /**
       * Apply a bearer if needed.
       */
      if (apiMeta?.bearerId) {
        await headersAuthorizationToken(headers, store, state, apiMeta.bearerId);
      }

      /**
       * Provide a signature headers on the required requests
       */
      if (
        apiMeta?.signature
        && (apiMeta.signature === true || apiMeta.signature.includes(api.endpoint))
      ) {
        if (typeof args === 'string') {
          await headersSignature(headers, args);
        } else {
          await headersSignature(headers, args.body);
        }
      }

      /**
       * Provide challenge headers on the required requests
       */
      if (
        apiMeta?.challenge
        && (apiMeta.challenge === true || apiMeta.challenge.includes(api.endpoint))
      ) {
        await headersChallenge(headers, state);
      }

      /**
       * Provide one-time password (OTP) headers on the required requests
       */
      if (
        apiMeta?.otp
        && (apiMeta.otp === true || apiMeta.otp.includes(api.endpoint))
      ) {
        headersOtp(headers, state);
      }

      return headers;
    },
  });
  return rawBaseQuery(args, store, extraOptions);
};

export default dynamicBaseQuery;
