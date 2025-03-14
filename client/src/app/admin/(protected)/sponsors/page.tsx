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
import { IoAdd } from "react-icons/io5";
import Sponsors from "@/components/Admin/Sponsors/Sponsors";
import AddSponsorForm from "@/components/Admin/Sponsors/AddSponsorForm";

export default function Page() {
  const router = useRouter();

  const [sponsors, setSponsors] = useState<any[] | null>(null);

  const [adminState, dispatch] = useAdminState();

  useEffect(() => {
    fetch(reqs.GET_ALL_SPONSOR, { cache: "no-store" })
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        if (!json.succeed) {
          toast.error("Error Occured!");
        }
        setSponsors(json.result);
      });
  }, [adminState.add, adminState.edit, adminState.delete]);

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
        SPONSOR CONTROL
      </h2>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <button
          onClick={() => {
            dispatch({ type: "ADD", state: true });
          }}
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-full md:text-xl"
        >
          <IoAdd className="box-content rounded-full bg-secondary-400 p-1" />{" "}
          Add Sponsor
        </button>
      </div>
      <ImageContext.Provider value={[adminState, dispatch]}>
        <Sponsors sponsors={sponsors || []} />
        {/* <AddOrEditSection /> */}
        <ModalOverlay state={adminState.add}>
          <AddSponsorForm />
        </ModalOverlay>
        {/* <ModalOverlay state={adminState.edit}>
          <EditPhotoForm />
        </ModalOverlay> */}
      </ImageContext.Provider>
    </section>
  );
}
