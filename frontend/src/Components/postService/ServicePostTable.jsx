import { Eye, Pencil, Trash2 } from 'lucide-react'
const ServicePostTable = ({ posts, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">

                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                            ID
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                            Title
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                            Description
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                            Location
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                            Budget
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                            User ID
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                            Created
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {posts.map((post) => (
                        <tr
                            key={post.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                        >

                            <td className="px-6 py-4 text-sm text-gray-500">
                                #{post.id}
                            </td>

                            <td className="px-6 py-4">
                                <span className="font-medium text-gray-800">
                                    {post.title}
                                </span>
                            </td>

                            <td className="px-6 py-4 max-w-xs">
                                <p className="text-sm text-gray-500 truncate">
                                    {post.description}
                                </p>
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-600">
                                {post.location}
                            </td>

                            <td className="px-6 py-4">
                                <span className="font-medium text-gray-800">
                                    Rs. {post.budget}
                                </span>
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500">
                                #{post.username}
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500">
                                {new Date(post.created_at).toLocaleDateString()}
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex justify-center gap-2">

                                    <button
                                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                                        title="View"
                                    >
                                        <Eye size={18} />
                                    </button>

                                    <button
                                        className="p-2 rounded-lg text-green-600 hover:bg-green-50"
                                        title="Edit"
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    <button
                                        onClick={() => onDelete(post)}
                                        className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>
        </div>

    )
}

export default ServicePostTable