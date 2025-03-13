import {api} from '../services/api';

export const meetingApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserbyID: builder.query({
      query: id => `/users/${id}`,
    }),
  }),
});

export const {useLoginMutation, useGetUserbyIDQuery} = meetingApi;
