"use client";
import fetchJSON from "@/api/fetchJSON";
import reqs, { reqImgWrapper } from "@/api/requests";
import Input from "@/components/ui/form/Input";
import Select from "@/components/ui/form/Select";
import Loading from "@/components/ui/LoadingWhite";
import PhotoUpload from "@/components/ui/PhotoUpload";
import UserContext from "@/context/UserContext";
import { CLASSES } from "@/data/classes";
import useForm from "@/hooks/useForm";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

// Fake data
const fakeData = {
  name: "Tasneem Sahat",
  email: "mdsahat6397@gmail.com",
  institution: "Notre Dame College",
  mobileNumber: "01xxxxxxxxx",
  class: "11",
  facebookProfile: "https://www.facebook.com/",
  address: "lorem ipsum dolor sit amet",
};

const inputFields = [
  { type: "text", label: "Name", name: "fullName", required: true },
  { type: "text", label: "Class", name: "className", required: true },
  { type: "text", label: "Institution", name: "institute", required: true },
  {
    type: "number",
    label: "Mobile Number",
    name: "phone",
    required: true,
  },
  {
    type: "url",
    label: "Facebook Profile",
    name: "fb",
    required: true,
  },
  { type: "text", label: "Address", name: "address", required: true },
];

const EditProfileModal = ({
  editEventHandler,
}: {
  editEventHandler: () => void;
}) => {
  const Router = useRouter();
  const userData = useContext(UserContext);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(
    reqImgWrapper(userData.image),
  );
  const [form, loading] = useForm({
    handler: async (data, formData) => {
      await fetchJSON(
        reqs.PROFILE_EDIT,
        {
          method: "PATCH",
          credentials: "include",
        },
        { ...data, email: userData.email },
      );

      if (formData && (formData.get("participants") as File).name !== "") {
        await fetchJSON(
          reqs.PARTICIPANT_IMG_EDIT,
          {
            method: "PATCH",
            credentials: "include",
          },
          formData,
          true,
        );
      }

      editEventHandler();
      window.location.reload();
    },
    formData: true,
    successMsg: "Profile Edit Successful!",
  });
  return (
    <div className="mx-auto max-h-[80vh] w-full max-w-2xl space-y-6 overflow-y-auto rounded-xl border-primary-550 bg-primary-650 p-6 pb-10 text-white/80 shadow-lg">
      <p className="text-center text-3xl font-bold text-secondary-200">
        Edit profile
      </p>
      {/*Intentionally kept in reverse order so that name field appears before photo upload field */}
      <form className="flex flex-col-reverse gap-6" ref={form}>
        <Input name={"id"} value={userData.id} hidden />
        <div className="flex h-full w-full flex-col items-center justify-end gap-2 sm:flex-row">
          <button
            onClick={() => {
              editEventHandler();
              setProfilePhoto(reqImgWrapper(userData.image));
              form.current?.reset();
            }}
            type="button"
            className="w-full rounded-3xl bg-red-500 px-7 py-3 text-white hover:bg-red-400 sm:w-auto md:px-9"
          >
            Cancel X
          </button>
          <button
            type="submit"
            className="flex w-full justify-center gap-2 rounded-3xl bg-primary-400 px-7 py-3 text-white hover:bg-primary-500 sm:w-auto md:px-9"
          >
            {loading ? <Loading /> : "Done ✓"}
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {inputFields.map((field, index) => (
            <div key={index}>
              {field.name !== "className" ? (
                <Input
                  type={field.type}
                  label={field.label}
                  name={field.name}
                  required={field.required}
                  defaultValue={userData[field.name]}
                />
              ) : (
                <Select
                  values={CLASSES}
                  name="className"
                  label="Class"
                  divClass="md:col-span-2"
                  required
                />
              )}
            </div>
          ))}
        </div>

        <PhotoUpload
          name="participants"
          type="PFP"
          currentPhoto={profilePhoto}
          setCurrentPhoto={setProfilePhoto}
          divClass="col-start-1 row-start-1md:col-span-2"
        />
      </form>
    </div>
  );
};

export default EditProfileModal;
