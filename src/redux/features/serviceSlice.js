import { indexSlice } from "./indexSlice";


export const serviceApi = indexSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllServices: builder.query({
            query: () => ({
                url: '/service/'
            }),
            providesTags: ['service'],
        }),
        deleteService: builder.mutation({
            query: (id) => ({
                url: `/service/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['service']
        }),


    })

})

export const { useGetAllServicesQuery, useDeleteServiceMutation } = serviceApi;