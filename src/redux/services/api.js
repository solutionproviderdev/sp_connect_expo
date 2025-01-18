import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.68.130/api',

    prepareHeaders: async (headers, {getState}) => {
      let token = getState().auth.token;
      if (!token) {
        token = await AsyncStorage.getItem('token');
      }

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getMeetings: builder.query({
      query: ({date,userId}) => `/meeting?dateRange=${date}&salesExecutiveId=${userId}`,
    }),
     getMeetingById: builder.query({
      query: id => `/meeting/${id}`,
    }),
    getUserbyID: builder.query({
      query: id => `/users/${id}`,

    }),
  }),
});

export const {useLoginMutation, useGetMeetingsQuery, useGetMeetingByIdQuery, useGetUserbyIDQuery} =
  api;
   