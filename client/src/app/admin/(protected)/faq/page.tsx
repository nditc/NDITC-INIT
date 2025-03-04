"use client";
import { getAllFAQ } from "@/api/faq";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import FAQAdmin from "@/components/Admin/FAQ/FAQAdmin";
import FAQForm from "@/components/Admin/FAQ/FAQForm";
import CommonTable from "@/components/Admin/Table/Table";
import FAQ from "@/components/Home/FAQ";
import ModalOverlay from "@/components/ui/ModalOverlay";
import StateContext from "@/context/StateContext";
import useAdminState from "@/hooks/useAdminState";
import useFetch from "@/hooks/useFetch";
import { isArray } from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoAdd } from "react-icons/io5";

const fields = [
  "name",
  "class",
  "address",
  "institute",
  "phone",
  "points",
  "actions",
];

const Par = () => {
  const router = useRouter();
  const faqStateArr = useAdminState();
  const [faqState, dispatch] = faqStateArr;
  const [response] = useFetch(
    {
      fn: async () => {
        return await getAllFAQ();
      },
    },
    [faqState.add, faqState.edit, faqState.delete],
  );

  return (
    <div className="min-h-screen w-full min-w-0 grow-0">
      <div className="mt-32">
        <div>
          <button
            onClick={() => router.back()}
            className="border-b border-transparent text-xl text-primary-200 hover:border-primary-200"
          >
            ← Back
          </button>
        </div>
        <h2 className="title Bebas my-2 pb-1 text-center text-4xl md:mb-4 md:mt-12 md:text-5xl lg:mb-0 lg:mt-0 lg:text-left">
          FAQS
        </h2>
        <button
          onClick={() => {
            dispatch({ type: "ADD", state: true });
          }}
          type="button"
          className="mt-5 flex cursor-pointer items-center gap-2 rounded-full md:text-xl"
        >
          <IoAdd className="box-content rounded-full bg-secondary-400 p-1" />{" "}
          Add FAQ
        </button>
        <StateContext.Provider value={faqStateArr}>
          <ModalOverlay state={faqState.add || faqState.edit}>
            <FAQForm data={response} />
          </ModalOverlay>
          <FAQAdmin FAQS={response} />
        </StateContext.Provider>
      </div>
    </div>
  );
};

export default Par;
