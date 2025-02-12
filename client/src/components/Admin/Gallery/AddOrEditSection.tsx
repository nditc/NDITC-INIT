import { Input } from "@/components/ui/input";
import React from "react";

const AddOrEditSection = () => {
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <div className="flex justify-center items-center bg-transparent ">
            <div className="bg-secondary-100 bg-opacity-20 to-gray-900 p-6 rounded-2xl shadow-lg w-4/5 md:w-3/5 lg:w-2/5">
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <h2 className="Inter text-secondary-200 text-2xl text-center lg:text-4xl font-extrabold md:text-3xl lg:mb-0 lg:mt-0 lg:text-left">
                        Edit Photo
                    </h2>

                    <Input
                        type="text"
                        name="title"
                        label="Title"
                    />
                    <Input
                        type="number"
                        name="order"
                        label="Order"
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
