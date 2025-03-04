import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import Input from "@/components/ui/form/Input";
import TextArea from "@/components/ui/form/Textarea";
import Loading from "@/components/ui/LoadingWhite";
import PhotoUpload from "@/components/ui/PhotoUpload";
import ImageContext from "@/context/StateContext";
import useForm from "@/hooks/useForm";
import { isArray } from "lodash";
import React, { useContext, useRef, useState } from "react";
import { CgAlbum } from "react-icons/cg";

const FAQForm = ({ data }: { data: any }) => {
  const [s, dispatch] = useContext(ImageContext) || [, () => {}];

  const [form, formLoading] = useForm(
    {
      handler: async (data, formData) => {
        console.log(data);
        if (data.add === "true") {
          await fetchJSON(
            reqs.ADD_FAQ,
            {
              method: "POST",
              credentials: "include",
            },
            data,
          );
        } else {
          await fetchJSON(
            reqs.EDIT_FAQ + data.id,
            {
              method: "PUT",
              credentials: "include",
            },
            data,
          );
        }
      },
      successMsg: "You successfully edited FAQ!",
      formData: true,
      onSuccess(resp) {
        dispatch({ type: "ADD", state: false });
        dispatch({ type: "EDIT", state: false });
      },
    },
    [s],
  );

  return (
    <div className="bg-opacity-200 max-h-[100vh] w-full max-w-[550px] overflow-y-auto rounded-2xl bg-secondary-700/80 to-gray-900 p-6 shadow-lg">
      <form className="space-y-6" ref={form}>
        <h2 className="Inter text-center text-2xl font-extrabold text-secondary-200 md:text-3xl lg:mb-0 lg:mt-0 lg:text-left lg:text-4xl">
          {s?.add ? "Add" : "Edit"} FAQ
        </h2>

        <div className="space-y-4">
          <Input name="add" value={String(s?.add)} hidden />
          <Input name="id" value={s?.edit ? s?.data?.id : ""} hidden />
          <Input
            label="Order"
            name="order"
            type="number"
            defaultValue={Number(
              s?.edit
                ? s?.data?.order
                : isArray(data) && data[data.length - 1].order + 1,
            )}
          />
          <TextArea
            label="Question"
            name="ques"
            rows={4}
            defaultValue={s?.edit ? s?.data?.question : ""}
          />
          <TextArea
            label="Answer"
            name="ans"
            rows={4}
            defaultValue={s?.edit ? s?.data?.answer : ""}
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => {
              dispatch({ type: "ADD", state: false });
              dispatch({ type: "EDIT", state: false });
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
            {formLoading ? <Loading /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FAQForm;
