"use client";

import React, { useEffect, useReducer, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageContainer from "@/components/Admin/Gallery/ImageContainer";
import AddPhotosForm from "@/components/Admin/Gallery/AddPhotosForm";
import EditPhotoForm from "@/components/Admin/Gallery/EditPhotoFor";
import ModalOverlay from "@/components/ui/ModalOverlay";
import ImageContext from "@/context/StateContext";
import reqs from "@/api/requests";
import { toast } from "react-toastify";
import useAdminState from "@/hooks/useAdminState";

export default function Page() {
  const router = useRouter();

  const [images, setImage] = useState<any[] | null>(null);

  const [imageState, dispatch] = useAdminState();

  useEffect(() => {
    fetch(reqs.ALL_GALLERY_IMG, { cache: "no-store" })
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        if (!json.succeed) {
          toast.error("Error Occured!");
        }
        setImage(json.result);
      });
  }, [imageState.add, imageState.edit, imageState.delete]);

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
        <ImageContainer images={images || []} />
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
