import { useState } from "react";
import { useDeleteVendorMutation, useGetAllVendorQuery } from "../redux/features/vendorSlice";
import DeleteModal from "../Components/Modals/DeleteModal";
import { toast } from "react-toastify";
import VendorTable from "../Components/Vendor/VendorTable";

const Vendordashboard = () => {
    const { data, isLoading, error } = useGetAllVendorQuery();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [vendorName, setVendorName] = useState(null);
    const [deleteVendor, { isLoading: deleting, error: deleteError }] = useDeleteVendorMutation();


    const handleVendorDelete = (vendor) => {
        setSelectedVendor(vendor.id);
        setShowDeleteModal(true);
        setVendorName(vendor.name);
    }
    const removeVendor = async () => {
        try {
            const res = await deleteVendor(selectedVendor).unwrap();
            toast.success(res?.message);
            setShowDeleteModal(false);
            setSelectedVendor(null);
            setVendorName(null);
        }
        catch (err) {
            toast.error(err?.data?.message || 'unable to delete vendor');
        }
    }


    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-gray-500">Loading vendors...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl bg-red-50 p-6 text-red-600">
                Failed to load vendors.
            </div>
        );
    }

    const vendors = data?.vendors || [];

    return (
        <>
            <div className="p-6">

                {/* Header */}
                <div className="mb-6 flex items-end justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Vendors
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage all registered service vendors
                        </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 px-4 py-2">
                        <p className="text-xs text-gray-500">
                            Total Vendors
                        </p>

                        <p className="text-lg font-semibold text-gray-800">
                            {data?.count || 0}
                        </p>
                    </div>
                </div>

                <VendorTable vendors={vendors} onDelete={handleVendorDelete} />

            </div>
            <div>
                {
                    showDeleteModal
                    &&
                    <DeleteModal
                        onCancel={() => setShowDeleteModal(false)}
                        onConfirm={removeVendor}
                        itemName={vendorName}
                        loading={deleting}
                        type='vendor'

                    />
                }
            </div>
        </>
    );

};

export default Vendordashboard;
