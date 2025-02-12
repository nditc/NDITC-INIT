import Input from "@/components/ui/form/Input";
import TextArea from "@/components/ui/form/Textarea";
import ImageContext from "@/context/ImageContext";
import React, { useContext } from "react";

const AddPhotosForm = () => {
  const [, dispatch] = useContext(ImageContext) || [, () => {}];

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="bg-opacity-200 w-full max-w-[550px] rounded-2xl bg-secondary-700/80 to-gray-900 p-6 shadow-lg">
      <form className="space-y-6" onSubmit={handleFormSubmit}>
        <h2 className="Inter text-center text-2xl font-extrabold text-secondary-200 md:text-3xl lg:mb-0 lg:mt-0 lg:text-left lg:text-4xl">
          Add Photos
        </h2>

        <Input type="text" name="title" label="Title" />

        <div className="flex gap-4">
          <Input type="text" label="Type" name="type" />
          <Input type="number" label="Order Start" name="order-start" />
        </div>

        <TextArea label="Photo (Links):" rows={8} className=""></TextArea>

        <div className="text-right">
          <button
            type="button"
            className="text-sm text-primary-200 hover:underline"
          >
            Add Links
          </button>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => {
              dispatch({ type: "ADD", state: false });
            }}
            type="button"
            className="rounded-full bg-secondary-500 px-6 py-2 text-white hover:bg-red-600 focus:outline-none"
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
  );
};

export default AddPhotosForm;
