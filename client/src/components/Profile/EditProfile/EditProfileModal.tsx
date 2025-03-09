"use client";
import Input from "@/components/ui/form/Input";
import PhotoUpload from "@/components/ui/PhotoUpload";
import React, { useState } from "react";

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
  { type: "text", label: "Name", name: "name", required: true },
  { type: "email", label: "Email", name: "email", required: true },
  { type: "text", label: "Institution", name: "institution", required: true },
  { type: "number", label: "Mobile Number", name: "mobileNumber", required: true },
  { type: "text", label: "Class", name: "class", required: true },
  { type: "url", label: "Facebook Profile", name: "facebookProfile", required: true },
  { type: "text", label: "Address", name: "address", required: true },
];

const EditProfileModal = () => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto bg-primary-650 border-2 border-primary-600 rounded-lg shadow-lg p-6 space-y-6">
      <p className="text-3xl text-center font-bold text-secondary-200">Edit profile</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PhotoUpload
          name="profilePhoto"
          type="PFP"
          currentPhoto={profilePhoto}
          setCurrentPhoto={setProfilePhoto}
          divClass="md:col-span-2"
        />
        {inputFields.map((field, index) => (
          <div key={index}>
            <Input
              type={field.type}
              label={field.label}
              name={field.name}
              required={field.required}
              defaultValue={fakeData[field.name as keyof typeof fakeData]}
            />
          </div>
        ))}
        <div className="flex h-full justify-between items-center gap-2">
          <button className="px-7 md:px-9 py-3 hover:bg-red-400 text-white rounded-3xl bg-red-500">DONE ✓</button>
          <button className="px-7 md:px-9 py-3 hover:bg-green-400 text-white rounded-3xl bg-green-500">CANCEL X</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;