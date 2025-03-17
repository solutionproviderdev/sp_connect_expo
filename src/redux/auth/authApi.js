import {api} from '../services/api';

export const meetingApi = api.injectEndpoints({
  endpoints: builder => ({
    Login: builder.mutation({
      query: credentials => {
        console.log('credentials->', credentials);
        return {url:'/users/login', method: 'POST', body: credentials};
      },
    }),
    getUserbyID: builder.query({
      query: id => `/users/${id}`,
    }),
  }),
});

export const {useLoginMutation, useGetUserbyIDQuery} = meetingApi;
