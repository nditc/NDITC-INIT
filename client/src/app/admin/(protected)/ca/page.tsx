"use client";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import CommonTable from "@/components/Admin/Table/Table";
import Pagination from "@/components/Pagination";
import Loading from "@/components/ui/LoadingWhite";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const fields = [
  "name",
  "class",
  "address",
  "institute",
  "phone",
  "points",
  "actions",
];

const perPage = 20;

const CA = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [response, loading] = useFetch(
    {
      fn: async () => {
        return await fetchJSON(
          reqs.ALL_CLIENTS_ONEVENT + "cas",
          { method: "POST", credentials: "include", cache: "no-store" },
          { skip: perPage * (currentPage - 1), rowNum: perPage },
        );
      },
    },
    [currentPage],
  );
  const [totalCount] = useFetch(
    {
      fn: async () => {
        return await fetchJSON(reqs.ALL_COUNT_ONEVENT + "cas", {
          credentials: "include",
        });
      },
    },
    [],
  );
  console.log(totalCount);
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
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <Pagination
            currentPage={currentPage}
            perPage={perPage}
            onPageChange={(p: number) => {
              setCurrentPage(p);
            }}
            totalCount={totalCount}
          />
        </div>
        {loading ? (
          <div className="grid h-[60vh] w-full place-items-center">
            <Loading />
          </div>
        ) : (
          <>
            {response && (
              <CommonTable
                data={response}
                fields={fields}
                selectedEvent="none"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CA;
