import { indexSlice } from "./IndexSlice";

export const serviceApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllservice: builder.query({
      query: () => ({
        url: "/service",
        method: "GET",
      }),
      providesTags: ["service"],
    }),
  }),
});
export const {useGetAllserviceQuery} = serviceApi;