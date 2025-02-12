import Input from "@/components/ui/form/Input";

import React from "react";

const AddOrEditSection = () => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="flex items-center justify-center bg-transparent">
      <div className="w-4/5 rounded-2xl bg-secondary-100 bg-opacity-20 to-gray-900 p-6 shadow-lg md:w-3/5 lg:w-2/5">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <h2 className="Inter text-center text-2xl font-extrabold text-secondary-200 md:text-3xl lg:mb-0 lg:mt-0 lg:text-left lg:text-4xl">
            Edit Photo
          </h2>

          <Input type="text" name="title" label="Title" />
          <Input type="number" name="order" label="Order" />

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-primary-200 hover:underline"
            >
              Add Links
            </button>
          </div>

          <div className="mt-4 flex justify-end gap-5">
            <button
              type="button"
              className="rounded-full bg-secondary-500 px-6 py-2 text-white hover:bg-primary-400 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-secondary-500 px-6 py-2 text-white hover:bg-primary-400 focus:outline-none"
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
