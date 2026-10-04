import React from 'react'

const Postcard = ({ posts }) => {
    return (
        <div className="space-y-4">

            {posts.map((post) => (
                <div
                    key={post.id}
                    className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition"
                >

                    {/* User */}
                    <div className="flex items-center gap-3 mb-4">

                        <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600 hover:cursor-pointer">
                            {post.username?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900">
                                {post.username}
                            </h3>

                            <p className="text-sm text-gray-500">
                                {new Date(post.created_at).toLocaleDateString()}
                            </p>
                        </div>

                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                        {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-4">
                        {post.description}
                    </p>

                    {/* Post Details */}
                    <div className="flex flex-wrap gap-2 mb-4">

                        <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1.5 rounded-lg">
                            📍 {post.location}
                        </span>

                        <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1.5 rounded-lg">
                            💰 Rs. {post.budget}
                        </span>

                    </div>

                    {/* Bottom Action */}
                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">

                        <button className="text-sm font-medium text-gray-500 hover:text-blue-600 transition">
                            View Post
                        </button>

                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition">
                            Contact
                        </button>

                    </div>

                </div>
            ))}

        </div>

    )
}

export default Postcard