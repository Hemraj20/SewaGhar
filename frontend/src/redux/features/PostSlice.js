import { indexSlice } from "./IndexSlice";

export const PostApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllpost: builder.query({
      query: () => ({
        url: "/post",
        method: "GET",
      }),
      providesTags: ["post"],
    }),
  }),
});
export const { useGetAllpostQuery } = PostApi;
