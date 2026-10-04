import { indexSlice } from "./indexSlice";

export const vendorApi = indexSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllVendor: builder.query({
            query: () => ({
                url: '/vendor',

            }),
            providesTags: ['vendor']
        }),
        deleteVendor: builder.mutation({
            query: (id) => ({
                url: `/vendor/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['vendor'],

        }),
    }),
});

export const {
    useGetAllVendorQuery,
    useDeleteVendorMutation,
} = vendorApi;