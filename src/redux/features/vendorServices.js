import { indexSlice } from "./indexSlice";

export const vendorServiceApi = indexSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllVendorServices: builder.query({
            query: () => ({
                url: '/vendor/service'
            }),
            providesTags: ['vendor services']
        }),
    })
})

export const { useGetAllVendorServicesQuery } = vendorServiceApi;