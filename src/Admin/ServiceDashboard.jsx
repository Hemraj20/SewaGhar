
import { useState } from 'react';
import ServiceTable from '../Components/service/ServiceTable'
import { useDeleteServiceMutation, useGetAllServicesQuery } from '../redux/features/serviceSlice'
import DeleteModal from '../Components/Modals/DeleteModal';
import { toast } from 'react-toastify';


const ServiceDashboard = () => {
    const { data, isLoading, error } = useGetAllServicesQuery();
    const [deleteService, { isLoading: deleting, error: deleteEror }] = useDeleteServiceMutation();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [serviceId, setServiceId] = useState(null);
    const [name, setName] = useState(null);
    const handleDeleteClick = (service) => {
        setOpenDeleteModal(true),
            setServiceId(service.id);
        setName(service.name);
    }

    const handleDeleteService = async () => {
        try {
            const res = await deleteService(serviceId).unwrap();
            toast.success(res.message);
            setOpenDeleteModal(false);
            setServiceId(null);
            setName(null);
        }
        catch (err) {
            toast.error(err?.data?.message || 'failed to delete service')
        }
    }

    if (isLoading) {
        return <div className="p-6">Loading services...</div>
    }

    if (error) {
        return <div className="p-6 text-red-500">Failed to load services.</div>
    }

    const services = data?.services || []

    return (
        <>
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Services
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage all available services
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="font-semibold text-gray-700">
                            All Services
                        </h2>

                        <span className="text-sm text-gray-500">
                            {services.length} Services
                        </span>
                    </div>

                    <ServiceTable services={services} onDelete={handleDeleteClick} />


                    {services.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            No services found.
                        </div>
                    )}
                </div>
            </div>
            <div>
                {
                    openDeleteModal
                    &&
                    <DeleteModal
                        onCancel={() => setOpenDeleteModal(false)}
                        itemName={name}
                        type='service'
                        loading={isLoading}
                        onConfirm={handleDeleteService}

                    />

                }
            </div>


        </>
    )
}

export default ServiceDashboard
