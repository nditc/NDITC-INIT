"use client";

import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import useFetch from "@/hooks/useFetch";
import { useMemo } from "react";
import { FiAward, FiUser, FiHome } from "react-icons/fi";

interface Winner {
  id: string;
  parInfo: {
    fullName: string;
    email: string;
    institute: string;
    image: string;
  };
  prizeCode: string;
  prizeEvt: string;
  prize: 1 | 2 | 3 | null;
}

const WinnerDetailsPage = ({ winner }: { winner: Winner }) => {
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
  const getEventValue =
    useMemo(() => {
      if (events) {
        const ev = events.filter((d: any) => {
          if (d.value !== "soloPass") return true;
        });

        return ev.map((d: any) => d["value"]);
      }
    }, [events]) || [];

  const getEventNames =
    useMemo(() => {
      if (events) {
        const ev = events.filter((d: any) => {
          if (d.value !== "soloPass") return true;
        });

        return ev.map((d: any) => d["name"]);
      }
    }, [events]) || [];

  const prizeColors = {
    1: "bg-primary-350 text-primary-650",
    2: "bg-secondary-300 text-primary-650",
    3: "bg-primary-250 text-primary-650",
  };

  const prizeLabels = {
    1: {
      full: "1st Prize Winner",
      short: "1st",
    },
    2: {
      full: "2nd Prize Winner",
      short: "2nd",
    },
    3: {
      full: "3rd Prize Winner",
      short: "3rd",
    },
  };

  return (
    <div className="min-h-screen bg-primary-650 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="my-5 text-center">
          <div className="mb-2 text-xl font-medium text-primary-150">
            Achievement Recognized
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-primary-550 bg-primary-600 shadow-lg">
          <div className="flex flex-col items-center gap-6 bg-primary-550 p-6 md:flex-row md:p-8">
            <div className="relative">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-primary-400 bg-primary-500">
                {winner.parInfo.image ? (
                  <img
                    src={winner.parInfo.image}
                    alt={winner.parInfo.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FiUser className="h-16 w-16 text-primary-200" />
                )}
              </div>
            </div>

            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-primary-150 md:text-3xl">
                {winner.parInfo.fullName}
              </div>
              <div className="mt-2 flex items-center justify-center text-primary-200 md:justify-start">
                <FiHome className="mr-2" />
                <div>{winner.parInfo.institute}</div>
              </div>
            </div>
          </div>

          <div className="p-3 md:p-8">
            <div className="mb-6 border-b border-primary-550 pb-2 text-lg font-semibold text-primary-150">
              Winning Segment
            </div>

            <div className="grid gap-4">
              <div className="flex items-center justify-between rounded-lg border border-primary-500 bg-primary-600 p-4">
                <div className="text-primary-150">
                  {getEventNames[getEventValue.indexOf(winner.prizeEvt)]}
                </div>
                {winner.prize && (
                  <div
                    className={`${prizeColors[winner.prize]} flex items-center rounded-full px-4 py-2 font-semibold`}
                  >
                    <FiAward className="mr-2" />
                    <>
                      <span className="hidden sm:inline">
                        {prizeLabels[winner.prize].full}
                      </span>
                      <span className="inline sm:hidden">
                        {prizeLabels[winner.prize].short}
                      </span>
                    </>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerDetailsPage;
