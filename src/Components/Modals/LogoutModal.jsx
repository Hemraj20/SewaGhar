const LogoutModal = ({ onCancel, onConfirm }) => {
    return (
        <div onClick={onCancel} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">

                <h2 className="text-xl font-semibold text-gray-900">
                    Logout
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Are you sure you want to logout?
                </p>

                <div className="mt-6 flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    );
};

export default LogoutModal;

