import React from "react";

const AddOrEditSection = () => {
    const handleFormSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div className="flex justify-center items-center bg-transparent">
            <div className="bg-secondary-100 bg-opacity-20 to-gray-900 p-6 rounded-2xl shadow-lg">
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <h2 className="Inter text-secondary-200 text-2xl text-center lg:text-4xl font-extrabold md:text-3xl lg:mb-0 lg:mt-0 lg:text-left">
                        Edit Photo
                    </h2>

                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full rounded-full px-6 py-4 bg-secondary-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                        type="number"
                        placeholder="Order"
                        className="w-full rounded-full px-6 py-4 bg-secondary-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />


                    <div className="text-right">
                        <button
                            type="button"
                            className="text-sm text-primary-200 hover:underline"
                        >
                            Add Links
                        </button>
                    </div>

                    <div className="flex justify-end mt-4 gap-5">
                        <button
                            type="button"
                            className="px-6 py-2 bg-secondary-500 rounded-full text-white hover:bg-primary-400 focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-secondary-500 rounded-full text-white hover:bg-primary-400 focus:outline-none"
                        >
                            Done
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddOrEditSection;
