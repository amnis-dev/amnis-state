/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import type { Otp } from '../../data/index.js';
import type { IoOutputJson } from '../../io/io.types.js';
import type { StateDeleter, StateEntities } from '../../state.types.js';
import type {
  ApiAuthAuthenticate,
  ApiAuthCreate,
  ApiAuthCredential,
  ApiAuthLogin,
  ApiAuthLogout,
  ApiAuthOtp,
  ApiAuthPkce,
  ApiAuthRegister,
  ApiAuthVerify,
} from './auth.types.js';

export const apiAuthQueries = <T extends EndpointBuilder<any, any, any>>(builder: T) => ({

  authenticate: builder.mutation<
  IoOutputJson<StateEntities>,
  ApiAuthAuthenticate
  >({
    query: (payload) => ({
      url: 'authenticate',
      method: 'post',
      credentials: 'include',
      body: payload,
    }),
  }),

  login: builder.mutation<
  IoOutputJson<StateEntities>,
  Omit<ApiAuthLogin, '$credential'>
  >({
    query: (payload) => ({
      url: 'login',
      method: 'post',
      credentials: 'include',
      body: payload,
    }),
  }),

  logout: builder.mutation<
  IoOutputJson<StateDeleter>,
  ApiAuthLogout
  >({
    query: (payload) => ({
      url: 'logout',
      method: 'post',
      credentials: 'include',
      body: payload,
    }),
  }),

  create: builder.mutation<
  IoOutputJson<StateEntities>,
  ApiAuthCreate
  >({
    query: (payload) => ({
      url: 'create',
      method: 'post',
      credentials: 'include',
      body: payload,
    }),
  }),

  pkce: builder.mutation<
  IoOutputJson<StateEntities>,
  ApiAuthPkce
  >({
    query: (payload) => ({
      url: 'pkce',
      method: 'post',
      credentials: 'include',
      body: payload,
    }),
  }),

  register: builder.mutation<
  IoOutputJson<StateEntities>,
  Omit<ApiAuthRegister, 'credential'>
  >({
    query: (payload) => ({
      url: 'register',
      method: 'post',
      body: payload,
    }),
  }),

  credential: builder.mutation<
  IoOutputJson<StateEntities>,
  Omit<ApiAuthCredential, 'credential'>
  >({
    query: (payload) => ({
      url: 'credential',
      method: 'post',
      body: payload,
    }),
  }),

  otp: builder.mutation<
  IoOutputJson<Otp>,
  Omit<ApiAuthOtp, 'otp'>
  >({
    query: (payload) => ({
      url: 'otp',
      method: 'post',
      body: payload,
    }),
  }),

  verify: builder.mutation<
  IoOutputJson<boolean>,
  ApiAuthVerify
  >({
    query: (payload) => ({
      url: 'verify',
      method: 'post',
      body: payload,
    }),
  }),

});

export default apiAuthQueries;
