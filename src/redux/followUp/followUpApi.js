import {api} from '../services/api';

export const followUpApi = api.injectEndpoints({
  endpoints: builder => ({
    GetAllFollowup: builder.query({
      query: Id => `/lead/sales/follow-up?salesExecutiveId=${Id}`,
      providesTags: ['followUp'],
    }),
  }),
});

export const {useGetAllFollowupQuery} = followUpApi;
