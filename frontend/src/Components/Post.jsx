import { useState } from "react";
import { useCreatePostMutation, useGetAllPostsQuery } from "../redux/features/servicePostSlice";
import PostModal from "./Modals/PostModal";
import { toast } from "react-toastify";
import Postcard from "./PostCard/Postcard";

const Posts = () => {
    const { data, isLoading, error } = useGetAllPostsQuery();
    const [CreatePost, { isLoading: posting, error: postError }] = useCreatePostMutation();
    const [openPostModal, setOpenPostModal] = useState(false);

    const handlePostService = async (data) => {
        try {
            const res = await CreatePost(data).unwrap();
            toast.success(res.message);
            setOpenPostModal(false);
        }
        catch (err) {
            toast.error(err?.data?.message || 'Unable to post')
        }
    }
    if (isLoading) {
        return (
            <div className="min-h-screen bg-orange-50 flex items-center justify-center">
                <p className="text-gray-500">Loading posts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-orange-50 flex items-center justify-center">
                <p className="text-red-500">Failed to load posts.</p>
            </div>
        );
    }

    const posts = data?.posts || [];

    return (
        <>
            <div className="min-h-screen bg-orange-50 py-8 px-4">
                <div className="max-w-5xl mx-auto">

                    {/* SewaX Header */}
                    <div className="mb-8 flex items-center justify-between">

                        <div>
                            <div className="flex items-center gap-2">

                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                    Sewa<span className="text-blue-600">X</span>
                                </h1>

                                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600">
                                    Feed
                                </span>

                            </div>

                            <p className="mt-1 text-gray-500">
                                See what people are looking for around you.
                            </p>
                        </div>

                        {/* Create Post */}
                        <div className="relative group">

                            <button
                                onClick={() => setOpenPostModal(true)}
                                className="w-12 h-12 rounded-full bg-blue-600 text-white text-2xl shadow-md hover:bg-blue-700 hover:scale-105 transition-all flex items-center justify-center">
                                +
                            </button>

                            <div className="absolute right-0 top-14 whitespace-nowrap bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                Create your own post
                            </div>

                        </div>

                    </div>

                    {/* Search */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <Postcard posts={posts} />
                </div>
            </div>
            <div>
                {
                    openPostModal
                    &&
                    <PostModal
                        onCancel={() => setOpenPostModal(false)}
                        onConfirm={handlePostService}

                    />
                }
            </div>
        </>
    );
};

export default Posts;