import { indexSlice } from "./indexSlice";

export const postApi = indexSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: () => ({
                url: '/post/'
            }),
            providesTags: ['post']
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/post/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['post']
        }),
        createPost: builder.mutation({
            query: (data) => ({
                url: `/post/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['post']
        }),

    })
})
export const {
    useGetAllPostsQuery,
    useDeletePostMutation,
    useCreatePostMutation

} = postApi; 