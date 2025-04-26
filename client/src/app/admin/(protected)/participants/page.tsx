"use client";
import { getAllCategories, getAllEventwithCategories } from "@/api/events";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import { downloadJSONtoXLSX } from "@/api/utilapi";
import CommonTable from "@/components/Admin/Table/Table";
import ErrorC from "@/components/Error";
import Pagination from "@/components/Pagination";
import Select from "@/components/ui/form/Select";
import Loading from "@/components/ui/LoadingWhite";
import useFetch from "@/hooks/useFetch";
import { parseConditionalJSON } from "@/utils/JSONparse";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const fieldsDefault = ["name", "class", "institute", "actions"];

const perPage = 50;

const CA = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;
  const eventSelected = searchParams.get("event") || "allPar";

  const [r, _s] = useState(1);
  const refreshPage = useCallback(() => {
    _s((x) => x + 1);
  }, []);

  const [events, evLoading] = useFetch(
    {
      fn: async () => {
        return await fetchJSON(reqs.ALL_EVENTS_DATA, {
          credentials: "include",
        });
      },
    },
    [r],
  );

  const getEventValue = useMemo(() => {
    if (events) {
      const ev = events.filter((d: any) => {
        if (d.value === "soloPass" || d.categoryId != 1) return true;
      });

      return ev.map((d: any) => d["value"]);
    }
  }, [events]);

  const getEventNames = useMemo(() => {
    if (events) {
      const ev = events.filter((d: any) => {
        if (d.value === "soloPass" || d.categoryId != 1) return true;
      });

      return ev.map(
        (d: any) =>
          d["name"] +
          (d["submission"] !== "{}" ? " - 🔗 Submission" : "") +
          (d["team"] ? " - 👥 Team" : "") +
          (d["paid"] ? " - 💵 Paid" : ""),
      );
    }
  }, [events]);

  const getEventsDataByValue = useMemo(() => {
    const ret: any = [];
    if (events) {
      events.forEach((val: any) => {
        ret[val.value] = val;
      });
    }
    return ret;
  }, [events]);

  // cmnt

  const [response, loading] = useFetch(
    {
      fn: async (ev) => {
        // cmnt
        return await fetchJSON(
          reqs.ALL_CLIENTS_ONEVENT + ev,
          { method: "POST", credentials: "include", cache: "no-store" },
          { skip: perPage * (currentPage - 1), rowNum: perPage },
        );
      },
      params: [eventSelected],
    },
    [currentPage, eventSelected, r, path],
  );

  const [totalCount] = useFetch(
    {
      fn: async () => {
        return await fetchJSON(reqs.ALL_COUNT_ONEVENT + eventSelected, {
          credentials: "include",
        });
      },
    },
    [eventSelected],
  );

  useEffect(() => {
    if (!evLoading) {
      if (currentPage <= 0 || currentPage > Math.ceil(totalCount / perPage)) {
        router.replace(`?event=${encodeURIComponent(eventSelected)}&page=${1}`);
      } else if (
        !getEventsDataByValue[eventSelected] &&
        eventSelected !== "allPar"
      ) {
        router.replace(`?event=allPar&page=${1}`);
      }
    }
  }, [
    currentPage,
    getEventsDataByValue,
    router,
    totalCount,
    evLoading,
    eventSelected,
  ]);

  const fields = useMemo(() => {
    const ret = [...fieldsDefault];
    if (
      getEventsDataByValue &&
      eventSelected !== "allPar" &&
      getEventsDataByValue[eventSelected]
    ) {
      const evt = getEventsDataByValue[eventSelected];
      if (evt.paid) {
        ret.push("payment verification");
      }

      if (evt.submission !== "{}") {
        ret.push("submission");
      }

      if (evt.team) {
        ret.push("Member Count");
        ret.push("Members Name");
        ret.push("Members Email");
      }
    }
    return ret;
  }, [eventSelected, getEventsDataByValue]);

  const downloadExcel = async () => {
    const resp = await fetchJSON(
      reqs.ALL_CLIENTS_ONEVENT + eventSelected,
      {
        method: "POST",
        credentials: "include",
        cache: "no-store",
      },
      { skip: 0, rowNum: totalCount + 5 },
    );
    if (resp?.result) {
      (resp?.result as any[]).forEach((obj, idx) => {
        const _ = (field: string, targetfield?: string) => {
          const d = parseConditionalJSON(obj[field])[eventSelected];
          resp.result[idx][targetfield || field] = d === undefined ? "-" : d;

          targetfield && delete resp.result[idx][field];
        };

        if (eventSelected !== "allPar") {
          _("SubLinks");
          _("SubNames");
          _("fee");
          _("teamName");
          _("transactionID");
          _("transactionNum");
          _("paidEvent", "paymentVerified");
        }

        const members = parseConditionalJSON(obj.members) as any[];

        if (members) {
          resp.result[idx].membersEmail = members
            ?.map((o) => o.email)
            ?.join(",");
          resp.result[idx].membersName = members
            ?.map((o) => o.fullName)
            ?.join(",");
        }

        delete resp.result[idx].members;
      });
      await downloadJSONtoXLSX(resp?.result, "PartDoc");
    }
  };
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
        <div className="mb-6 flex justify-center gap-3 lg:justify-start">
          <button
            type="button"
            onClick={() => {
              refreshPage();
            }}
            className="cursor-pointer rounded-full bg-secondary-600 px-5 py-2.5 before:bg-secondary-600 hover:bg-secondary-500 sm:px-8"
          >
            Refresh
          </button>
        </div>
        <button
          onClick={async () => {
            toast.promise(downloadExcel, {
              pending: "Generating Excel...",
              success: "Excel generation success!",
              error: "Something went error!",
            });
          }}
          className="mb-4 cursor-pointer rounded-full bg-secondary-600 px-5 py-2.5 before:bg-secondary-600 hover:bg-secondary-500 sm:px-8"
        >
          Download Excel
        </button>
        {events && (
          <Select
            label="Event"
            values={["allPar", ...getEventValue]}
            labels={["All Events", ...getEventNames]}
            defaultValue={eventSelected}
            onChange={(val) => {
              router.replace(`?event=${encodeURIComponent(val)}`);
            }}
          />
        )}
        <div className="my-3 flex flex-col items-center gap-4 md:flex-row">
          <Pagination
            currentPage={currentPage}
            perPage={perPage}
            onPageChange={(p: number) => {
              router.replace(
                `?event=${encodeURIComponent(eventSelected)}&page=${p}`,
              );
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
                selectedEvent={eventSelected}
                refreshPage={refreshPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CA;
