const DeleteModal = ({
    itemName,
    loading,
    onCancel,
    onConfirm,
    type = ''
}) => {

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={onCancel}
        >
            <div
                className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold text-gray-800">
                    Delete User
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-gray-700">
                        {itemName}
                    </span>
                    <span className="ml-2 font-semibold text-green-400">
                        {type}
                    </span>

                    ?
                </p>

                <p className="mt-1 text-sm text-red-500">
                    This action cannot be undone.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                    >
                        No, Keep It
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Yes, Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;