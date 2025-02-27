import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import Input from "@/components/ui/form/Input";
import TextArea from "@/components/ui/form/Textarea";
import Loading from "@/components/ui/LoadingWhite";
import ImageContext from "@/context/ImageContext";
import useForm from "@/hooks/useForm";
import React, { useContext, useRef, useState } from "react";
import { CgAlbum } from "react-icons/cg";

const AddPhotosForm = () => {
  const [, dispatch] = useContext(ImageContext) || [, () => {}];
  const pfpRef = useRef<HTMLInputElement>(null);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>();
  const [form, formLoading] = useForm({
    handler: async (data, formData) => {
      const res = await fetchJSON(
        reqs.ADD_GALLERY_IMG,
        {
          method: "POST",
          credentials: "include",
        },
        formData,
        true,
      );

      return res;
    },
    successMsg: "You successfully edited Picture!",
    formData: true,
    onSuccess(resp) {
      setCurrentPhoto(null);
      dispatch({ type: "ADD", state: false });
    },
  });

  return (
    <div className="bg-opacity-200 max-h-[100vh] w-full max-w-[550px] overflow-y-auto rounded-2xl bg-secondary-700/80 to-gray-900 p-6 shadow-lg">
      <form className="space-y-6" ref={form}>
        <h2 className="Inter text-center text-2xl font-extrabold text-secondary-200 md:text-3xl lg:mb-0 lg:mt-0 lg:text-left lg:text-4xl">
          Add Photos
        </h2>

        <div className="space-y-4">
          <Input type="number" label="Rows" name="rows" />
          <Input type="number" label="Cols" name="cols" />
          <Input type="number" label="Order Start" name="order" />
        </div>

        <div className="row-start-1 mx-1 md:col-span-2 md:row-span-2 lg:col-span-1">
          <input
            className="h-full w-full"
            type="file"
            accept="image/png, image/jpeg"
            hidden
            ref={pfpRef}
            onChange={(e) => {
              if (e.target.files) {
                if (e.target.files.length > 0) {
                  setCurrentPhoto(URL.createObjectURL(e.target.files[0]));
                }
              }
            }}
            name="gallery"
          />
          <button
            type="button"
            onClick={() => {
              if (pfpRef && pfpRef.current) {
                pfpRef.current.click();
              }
            }}
            className="border-primary flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary-200/50 bg-gradient-to-r from-secondary-500 to-secondary-600 p-5 text-center text-sm hover:border-primary-200 hover:from-secondary-400 hover:to-secondary-500"
          >
            {currentPhoto ? (
              <img
                src={currentPhoto}
                className="mb-2 max-h-[180px] w-full max-w-[300px] rounded-xl bg-black"
                alt=""
              />
            ) : (
              <CgAlbum className="h-9 w-9 text-primary-150" />
            )}
            <p>Upload Gallery Pic</p>
            <p className="text-white/50">JPG/PNG, 1 MB</p>
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
            {formLoading ? <Loading /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPhotosForm;
