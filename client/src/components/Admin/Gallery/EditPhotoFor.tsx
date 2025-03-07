import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import Input from "@/components/ui/form/Input";
import ImageContext from "@/context/StateContext";
import useForm from "@/hooks/useForm";

import React, { useContext } from "react";

const EditPhotoForm = () => {
  const [imgState, dispatch] = useContext(ImageContext) || [, () => {}];

  const [form, formLoading] = useForm(
    {
      handler: async (data) => {
        const res = await fetchJSON(
          reqs.UPDATE_GALLERY_IMG + data?.id,
          {
            method: "PATCH",
            credentials: "include",
          },
          data,
        );

        return res;
      },
      successMsg: "You successfully edited the Picture!",
      onSuccess(resp) {
        dispatch({ type: "EDIT", state: false, data: null });
      },
    },
    [imgState?.data],
  );
  return (
    <div className="bg-opacity-200 w-full max-w-[550px] rounded-2xl bg-secondary-700/80 to-gray-900 p-6 shadow-lg">
      <form className="space-y-6" ref={form}>
        <h2 className="Inter text-center text-2xl font-extrabold text-secondary-200 md:text-3xl lg:mb-0 lg:mt-0 lg:text-left lg:text-4xl">
          Edit Photo
        </h2>

        <div className="space-y-4">
          <Input name="id" value={imgState?.data?.id} hidden />
          <Input
            type="number"
            label="Rows"
            name="rows"
            defaultValue={imgState?.data?.rows || ""}
            autoFocus
          />
          <Input
            type="number"
            label="Cols"
            name="cols"
            defaultValue={imgState?.data?.cols || ""}
            autoFocus
          />
          <Input
            type="number"
            label="Order Start"
            name="order"
            defaultValue={imgState?.data?.order || ""}
            autoFocus
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "EDIT", state: false, data: null });
            }}
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

export default EditPhotoForm;
