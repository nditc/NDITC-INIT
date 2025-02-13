"use client";

import React, { useReducer } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ImageContainer from "@/components/Admin/Gallery/ImageContainer";
import AddPhotosForm from "@/components/Admin/Gallery/AddPhotosForm";
import EditPhotoForm from "@/components/Admin/Gallery/EditPhotoFor";
import AddOrEditSection from "@/components/Admin/Gallery/AddOrEditSection";
import { IoAdd } from "react-icons/io5";
import ExtendedColors from "@/../color.config";
import ModalOverlay from "@/components/ui/ModalOverlay";
import { ImageAction, ImageState } from "@/types/Image";
import ImageContext from "@/context/ImageContext";

export default function Page() {
  const router = useRouter();
  const [imageState, dispatch] = useReducer(
    (prevState: ImageState, action: ImageAction) => {
      switch (action.type) {
        case "ADD":
          return { ...prevState, add: action.state };
        case "EDIT":
          return { ...prevState, edit: action.state, data: action.data };
        default:
          return { ...prevState, add: true };
      }
    },
    {
      edit: false,
      add: false,
    },
  );
  return (
    <section className="mt-32 flex min-h-screen w-full flex-col gap-6 bg-primary-650 antialiased">
      {/* Go Back Button */}
      <div>
        <button
          onClick={() => router.back()}
          className="border-b border-transparent text-xl text-primary-200 hover:border-primary-200"
        >
          ← Back
        </button>
      </div>
      <h2 className="title Bebas my-2 pb-1 text-center text-4xl md:mb-4 md:mt-12 md:text-5xl lg:mb-0 lg:mt-0 lg:text-left">
        GALLERY CONTROL
      </h2>
      <div className="flex justify-center gap-3 lg:justify-start">
        {/* <Link
            href="#"
            className="flex cursor-pointer items-center gap-2 rounded-full bg-secondary-600 py-2.5 pl-1 pr-5 before:bg-secondary-600 hover:bg-secondary-500"
          >
            <IoAdd className="box-content rounded-full bg-secondary-400 p-1" />{" "}
            Add Section
          </Link> */}
        <Link
          href="/gallery"
          className="cursor-pointer rounded-full bg-secondary-600 px-5 py-2.5 before:bg-secondary-600 hover:bg-secondary-500 sm:px-8"
        >
          Preview
        </Link>
      </div>
      <ImageContext.Provider value={[imageState, dispatch]}>
        <ImageContainer />
        {/* <AddOrEditSection /> */}
        <ModalOverlay state={imageState.add}>
          <AddPhotosForm />
        </ModalOverlay>
        <ModalOverlay state={imageState.edit}>
          <EditPhotoForm />
        </ModalOverlay>
      </ImageContext.Provider>
    </section>
  );
}
