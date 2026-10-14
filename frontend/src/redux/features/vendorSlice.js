import { indexSlice } from "./IndexSlice";

export const VendorApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllvendor: builder.query({
      query: () => ({
        url: "/vendor",
        method: "GET",
      }),
      providesTags: ["vendor"],
    }),
  }),
});
export const { useGetAllvendorQuery } = VendorApi;
