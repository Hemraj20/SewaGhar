
import { Eye, Pencil, Trash2 } from 'lucide-react'
const ServiceTable = ({ services, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                            ID
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                            Service Name
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                            Description
                        </th>

                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {services.map((service) => (
                        <tr
                            key={service.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                        >
                            <td className="px-6 py-4 text-sm text-gray-500">
                                #{service.id}
                            </td>

                            <td className="px-6 py-4">
                                <span className="font-medium text-gray-800">
                                    {service.name}
                                </span>
                            </td>

                            <td className="px-6 py-4 max-w-md">
                                <p className="text-sm text-gray-500 truncate">
                                    {service.description}
                                </p>
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
                                        onClick={() => onDelete(service)}
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

export default ServiceTable