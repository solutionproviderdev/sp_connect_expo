import {api} from '../services/api';

export const meetingApi = api.injectEndpoints({
  endpoints: builder => ({
    getMeetings: builder.query({
      query: ({date, userId}) =>
        `/meeting?dateRange=${date}&salesExecutiveId=${userId}`,
      providesTags: (result = []) => [
        'Meeting',
        ...result.map(({lead}) => ({type: 'Lead', id: lead._id})),
      ],
    }),
    getMeetingById: builder.query({
      query: id => `/meeting/${id}`,
      providesTags: result =>
        result
          ? [
              {type: 'Meeting', id: result._id},
              {type: 'Lead', id: result.lead._id},
              {type: 'ProjectStatus', id: result.lead._id},
              {type: 'Comment', id: result.lead._id},
            ]
          : [],
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
      invalidatesTags: (result, error, {leadId}) => [
        {type: 'Lead', id: leadId},
        {type: 'ProjectStatus', id: leadId},
        {type: 'Meeting'},
      ],
    }),
    //add comment endpoind
    addComment: builder.mutation({
      query: ({leadId, comment, images = []}) => ({
        url: `/lead/${leadId}/comments`,
        method: 'POST',
        body: {
          comment,
          images,
        },
      }),
      invalidatesTags: (result, error, {leadId}) => [
        {type: 'Lead', id: leadId},
        {type: 'Comment', id: leadId},
        {type: 'Meeting'},
      ],
    }),
    getLeadById: builder.query({
      query: leadId => `/lead/${leadId}`,
      providesTags: (result, error, leadId) => [{ type: 'Lead', id: leadId }],
    }),
  }),
});

export const {
  useGetMeetingByIdQuery,
  useAddCommentMutation,
  useGetMeetingsQuery,
  useUpdateProjectStatusMutation,
  useGetLeadByIdQuery,
} = meetingApi;
