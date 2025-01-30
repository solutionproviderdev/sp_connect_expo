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
  tagTypes: ['Meeting', 'ProjectStatus', 'Comment', 'Lead'],

  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getMeetings: builder.query({
      query: ({date, userId}) =>
        `/meeting?dateRange=${date}&salesExecutiveId=${userId}`,
      providesTags: (result = []) => [
        'Meeting',
        ...result.map(({ lead }) => ({ type: 'Lead', id: lead._id }))
      ]
    }),
    getMeetingById: builder.query({
      query: id => `/meeting/${id}`,
      providesTags: (result) => 
        result ? [
          { type: 'Meeting', id: result._id },
          { type: 'Lead', id: result.lead._id },
          { type: 'ProjectStatus', id: result.lead._id },
          { type: 'Comment', id: result.lead._id }
        ] : []
     }),
    getUserbyID: builder.query({
      query: id => `/users/${id}`,
    }),
    //update project status endpoind
    updateProjectStatus: builder.mutation({
      query: ({leadId, projectStatus}) => ({
        url: `/lead/${leadId}`,
        method: 'PUT',
        body: {
          projectStatus,
        },
      }),
      invalidatesTags: (result, error, { leadId }) => [
        { type: 'Lead', id: leadId },
        { type: 'ProjectStatus', id: leadId },
        { type: 'Meeting' }
      ]

    }),
    //add comment endpoind
    addComment: builder.mutation({
      query: ({ leadId, comment, images = [] }) => ({
        url: `/lead/${leadId}/comments`,
        method: 'POST',
        body: {
          comment,
          images,
        },
      }),
      invalidatesTags: (result, error, { leadId }) => [
        { type: 'Lead', id: leadId },
        { type: 'Comment', id: leadId },
        { type: 'Meeting' }
      ]

    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeetingsQuery,
  useGetMeetingByIdQuery,
  useGetUserbyIDQuery,
  useUpdateProjectStatusMutation,
  useAddCommentMutation
} = api;
