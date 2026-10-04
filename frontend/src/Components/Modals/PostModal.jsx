import { useState } from "react";

const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

const PostModal = ({ onCancel, onConfirm }) => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        budget: ''

    });
    const handleChange = (e) => {

        setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }))
    }
    return (
        <div
            onClick={onCancel}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-white shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Create a post
                        </h2>
                        <p className="text-sm text-gray-500">
                            Tell people what service you need.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-xl text-gray-400 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onConfirm(formData);
                }} className="space-y-4 p-6">

                    {/* Title */}
                    <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Need a plumber"
                            className={inputClass}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Describe the service you need..."
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    {/* Location + Budget */}
                    <div className="grid grid-cols-2 gap-3">

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Kathmandu"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
                                Budget
                            </label>

                            <input
                                type="number"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                min="0"
                                placeholder="3000"
                                className={inputClass}
                            />
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">

                        <button
                            type="button"
                            onClick={onCancel}
                            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            Create Post
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default PostModal;