import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { logOut, setCredentials } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://jsonplaceholder.typicode.com',
  credentials: 'include',
  mode: 'cors',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth?.tokens?.access?.token;
    headers.set('Accept', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    // Send refresh token to send new refresh token
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh-tokens',
        method: 'POST',
        body: {
          refreshToken: api.getState().auth?.tokens?.refresh?.token,
        },
      },
      api,
      extraOptions,
    );
    if (refreshResult?.data) {
      const { user } = api.getState().auth;
      // store the new token
      api.dispatch(
        setCredentials({
          user,
          tokens: { ...refreshResult.data },
        }),
      );
      // retry original query with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Todos'],
  endpoints: () => ({}),
});

export default apiSlice;
