"use client";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import CommonTable from "@/components/Admin/Table/Table";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const fields = [
  "name",
  "class",
  "address",
  "institute",
  "phone",
  "points",
  "actions",
];

const CA = () => {
  const router = useRouter();
  const [response] = useFetch(
    {
      fn: async () => {
        return await fetchJSON(
          reqs.ALL_CLIENTS_ONEVENT + "cas",
          { method: "POST", credentials: "include", cache: "no-store" },
          { skip: 0, rowNum: 10 },
        );
      },
    },
    [],
  );
  console.log(response);
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
          CA APPLICANTS
        </h2>
        {response && <CommonTable data={response} fields={fields} />}
      </div>
    </div>
  );
};

export default CA;
