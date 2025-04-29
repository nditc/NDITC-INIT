"use client";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import WinnerDetailsPage from "@/components/Result/WinnerDetailsPage";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import useFetch from "@/hooks/useFetch";
import React from "react";
import ExtendedColors from "../../../../color.config";
import PageLoading from "@/components/PageLoading";
import Error from "@/components/Error";

const Page = ({ params }: { params: { code: string } }) => {
  const [participant, loading] = useFetch(
    {
      fn: async () => {
        return await fetchJSON(reqs.GET_RESULT + params.code, {
          credentials: "include",
        });
      },
    },
    [],
  );
  return (
    <>
      {loading ? (
        <PageLoading />
      ) : participant ? (
        <>
          <div className="mt-16">
            {" "}
            <Spotlight
              className="-top-40 left-0 md:-top-20 md:left-60"
              fill={ExtendedColors.primary["200"]}
            />
            <WinnerDetailsPage winner={participant} />
          </div>
        </>
      ) : (
        <Error msg="Certificate Code not found!" code={404} />
      )}
    </>
  );
};

export default Page;
