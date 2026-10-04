
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useGetAllVendorServicesQuery } from "../redux/features/vendorServices";

const VendorServicesDashboard = () => {
    const { data, isLoading, error } = useGetAllVendorServicesQuery();

    const posts = data?.posts || [];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <p className="text-gray-500">
                    Loading vendor services...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
                    Failed to load vendor services.
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Vendor Services
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage services provided by vendors
                    </p>
                </div>

                {/* Total Services */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-5 py-3">
                    <p className="text-xs text-gray-500">
                        Total Services
                    </p>

                    <p className="text-xl font-bold text-gray-800">
                        {data?.count || 0}
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">

                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    ID
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Vendor
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Service Name
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Description
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Location
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Price
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">
                                    Actions
                                </th>

                            </tr>
                        </thead>

                        <tbody>
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <tr
                                        key={post.id}
                                        className="border-b border-gray-100 hover:bg-gray-50"
                                    >

                                        {/* ID */}
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            #{post.id}
                                        </td>

                                        {/* Vendor */}
                                        <td className="px-6 py-4">
                                            <div>
                                                <span className="font-medium text-gray-800">
                                                    {post.vendor_name}
                                                </span>

                                                <p className="text-xs text-gray-400">
                                                    Vendor #{post.vendor_id}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Service Name */}
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-gray-800">
                                                {post.title}
                                            </span>
                                        </td>

                                        {/* Description */}
                                        <td className="px-6 py-4 max-w-md">
                                            <p className="text-sm text-gray-500 truncate">
                                                {post.description}
                                            </p>
                                        </td>

                                        {/* Location */}
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {post.location || "N/A"}
                                        </td>

                                        {/* Price */}
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-800">
                                                Rs. {post.price || "N/A"}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${post.status === "active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {post.status}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">

                                                {/* View */}
                                                <button
                                                    className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                                                    title="View"
                                                >
                                                    <Eye size={18} />
                                                </button>

                                                {/* Edit */}
                                                <button
                                                    className="p-2 rounded-lg text-green-600 hover:bg-green-50"
                                                    title="Edit"
                                                >
                                                    <Pencil size={18} />
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="px-6 py-12 text-center text-gray-500"
                                    >
                                        No vendor services found.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    );
};

export default VendorServicesDashboard;

