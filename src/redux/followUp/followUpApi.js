 import {api} from '../services/api';

export const followUpApi = api.injectEndpoints({
  endpoints: builder => ({
    GetAllFollowup: builder.query({
      query: ({ Id, dateRange, status }) => { 
        console.log('from rtk ok ->',Id,dateRange,status)
        return(
          `/lead/sales/follow-up?dateRange=${dateRange}&status=${status}&salesExecutiveId=${Id}`
        )
      },
       providesTags: ['followUp'],
    }),
    AddFollowUpCall: builder.mutation({
      query: ({ id, body }) => ({
        url: `/lead/sales/follow-up/${id}`,
        method: 'POST', // Use PUT if that's what your API expects
        body,
      }),
      // Invalidate followUp tag so that any queries re-fetch updated data.
      invalidatesTags: ['followUp'],
    }),
  }),
});

export const {useGetAllFollowupQuery,useAddFollowUpCallMutation} = followUpApi;
