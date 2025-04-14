import {api} from '../services/api';

export const meetingApi = api.injectEndpoints({
  endpoints: builder => ({
    Login: builder.mutation({
      query: credentials => {
        console.log('credentials->', credentials);
        return {url: '/users/login', method: 'POST', body: credentials};
      },
    }),
    getUserbyID: builder.query({
      query: id => `/users/${id}`,
    }),
    saveMobileDeviceToken: builder.mutation({
      query: ({userId, mobileDeviceToken}) => ({
        url: '/users/device-token/mobile',
        method: 'POST',
        body: {userId, mobileDeviceToken},
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserbyIDQuery,
  useSaveMobileDeviceTokenMutation,
} = meetingApi;
