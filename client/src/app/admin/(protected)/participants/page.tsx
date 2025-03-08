"use client";
import { getAllCategories, getAllEventwithCategories } from "@/api/events";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import CommonTable from "@/components/Admin/Table/Table";
import Pagination from "@/components/Pagination";
import Select from "@/components/ui/form/Select";
import Loading from "@/components/ui/LoadingWhite";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

const fields = ["name", "class", "address", "institute", "phone", "actions"];

const perPage = 20;

const CA = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [eventSelected, setEventSelected] = useState<null | string>(null);
  const [events, evLoading] = useFetch(
    {
      fn: async () => {
        return await fetchJSON(reqs.ALL_EVENTS_DATA, {
          credentials: "include",
        });
      },
    },
    [],
  );

  const getEvents = useCallback(
    (key: string) => {
      if (events) {
        const ev = events.filter((d: any) => {
          if (d.value === "soloPass" || d.categoryId != 1) return true;
        });

        return ev.map((d: any) => d[key]);
      }
    },
    [events],
  );

  const [response, loading] = useFetch(
    {
      fn: async () => {
        return await fetchJSON(
          reqs.ALL_CLIENTS_ONEVENT + "allPar",
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
        return await fetchJSON(reqs.ALL_COUNT_ONEVENT + "all", {
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
          PARTICPANTS
        </h2>
        <Select
          label="Event"
          values={getEvents("id")}
          labels={getEvents("name")}
        />
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
          <>{response && <CommonTable data={response} fields={fields} />}</>
        )}
      </div>
    </div>
  );
};

export default CA;
