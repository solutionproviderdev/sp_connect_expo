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
  }),
});

export const {useGetAllFollowupQuery} = followUpApi;
