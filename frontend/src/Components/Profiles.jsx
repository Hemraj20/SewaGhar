
import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetMyostQuery } from "../redux/features/servicePostSlice";
import { useGetMeQuery, useLogoutMutation } from "../redux/features/userSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { indexSlice } from "../redux/features/indexSlice";



const Profile = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetMyostQuery();
    const { data: myData } = useGetMeQuery();
    const [Logout] = useLogoutMutation();
    const [showSettings, setShowSettings] = useState(false);
    const dispatch = useDispatch();

    const user = myData?.loggedUserInfo;

    const posts = data?.posts || [];
    console.log(Logout);

    const handleLogout = async () => {
        try {
            const res = await Logout().unwrap();
            dispatch(indexSlice.util.resetApiState());
            toast.success(res.message);
            localStorage.clear('user');
            navigate('/login', { replace: true });
        }
        catch (err) {
            console.log("LOGOUT ERROR:", err);
            console.log("STATUS:", err?.status);
            console.log("DATA:", err?.data);

            toast.error(err?.data?.message || 'unable to logout');
        }


    }

    return (

        <div className="min-h-screen bg-orange-100">

            <div className="px-4 pb-12 pt-6">
                <button
                    onClick={() => navigate(-1)}
                    className="group mb-4 ml-4 inline-flex items-center gap-2.5 rounded-full bg-pink-900 px-6 py-3 text-lg font-semibold text-white shadow-md shadow-blue-600/30 transition-all duration-200 hover:bg-pink-800 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-95"
                >
                    <FaArrowLeft
                        size={18}
                        className="transition-transform duration-200 group-hover:-translate-x-1"
                    />
                    Back
                </button>
                {/* Profile */}
                <section className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white">

                    {/* Settings */}
                    <div className="absolute right-5 top-5">

                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl hover:bg-slate-200"
                        >
                            <IoSettingsSharp size={30} />
                        </button>

                        {showSettings && (
                            <div className="absolute right-0 mt-2 w-32 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">

                                <button
                                    onClick={handleLogout}
                                    className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                    Logout
                                </button>

                            </div>
                        )}

                    </div>


                    <div className="px-6 py-6">

                        {/* Profile Info */}
                        <div className="flex items-center gap-4">

                            {/* Avatar */}
                            <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-slate-900 text-3xl font-bold text-white">
                                {user.username.charAt(0)}
                            </div>

                            {/* Name */}
                            <div>

                                <h1 className="text-2xl font-bold">
                                    {user.username}
                                </h1>

                                <p className="text-sm text-slate-500">
                                    {user.email}
                                </p>

                            </div>

                        </div>


                        {/* User Information */}
                        <div className="mt-5 space-y-1">

                            <p className="text-slate-600">
                                📍 {user.address}
                            </p>

                            <p className="text-sm text-slate-500">
                                📞 {user.phone}
                            </p>

                            <p className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                                {user.role}
                            </p>

                        </div>


                        {/* Stats */}
                        <div className="mt-6 flex gap-10">

                            <div>
                                <p className="text-lg font-bold">
                                    {posts?.length || 0}
                                </p>

                                <p className="text-xs text-slate-500">
                                    Posts
                                </p>
                            </div>
                        </div>

                    </div>

                </section>


                {/* Posts */}
                <main className="mx-auto mt-6 max-w-6xl">

                    <h2 className="mb-4 text-lg font-bold">
                        Your Posts
                    </h2>

                    <div className="space-y-4">

                        {posts.map((post) => (

                            <div
                                key={post.id}
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                            >

                                {/* User */}
                                <div className="mb-4 flex items-center gap-3">

                                    <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-sm font-bold text-white">
                                        {user.username.charAt(0)}
                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold">
                                            {user.username}
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            2 hours ago
                                        </p>

                                    </div>

                                </div>


                                {/* Post Content */}
                                <h3 className="text-lg font-bold">
                                    {post.title}
                                </h3>

                                <p className="mt-2 text-slate-600">
                                    {post.description}
                                </p>


                                {/* Details */}
                                <div className="mt-4 flex flex-wrap gap-2">

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                                        📍 {post.location}
                                    </span>

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                        Rs. {post.budget}
                                    </span>

                                </div>




                            </div>

                        ))}

                    </div>

                </main>

            </div>

        </div>
    );
};

export default Profile;
