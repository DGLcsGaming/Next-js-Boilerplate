import type { LoginQuery, LoginResult } from '../../types/login';
import apiSlice from '../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResult, LoginQuery>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: (credentials) => ({
        url: '/auth/logout',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApiSlice;
