import { Input } from "@/components/ui/input";
import React from "react";

const AddPhotosForm = () => {
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <div className="flex justify-center items-center bg-transparent">
            <div className="bg-secondary-100 bg-opacity-20 to-gray-900 p-6 rounded-2xl shadow-lg w-4/5 md:w-3/5 lg:w-2/5">
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <h2 className="Inter text-secondary-200 text-2xl text-center lg:text-4xl font-extrabold md:text-3xl lg:mb-0 lg:mt-0 lg:text-left">
                        Add Photos
                    </h2>

                    <Input
                        type="text"
                        name="title"
                        label="Title"
                    />

                    <div className="flex gap-4">
                        <Input
                            type="text"
                            label="Type"
                            name="type"
                        />
                        <Input
                            type="number"
                            label="Order Start"
                            name="order-start"
                        />
                    </div>

                    <textarea
                        placeholder="Photo (Links):"
                        rows="8"
                        className="w-full px-6 py-4 bg-secondary-500 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    ></textarea>

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
                            className="btn-prim leading-0 bg-secondary-400 px-6 py-2 before:bg-secondary-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-prim cursor-pointer rounded-full bg-primary-350 px-6 py-2 sm:px-8  "
                        >
                            Done
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPhotosForm;
