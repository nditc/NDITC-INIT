"use client";

import { FiAward, FiUser, FiHome, FiCalendar } from "react-icons/fi";
import { useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../color.config";
import useSettings from "@/hooks/useSettings";

interface Participant {
  id: string;
  parInfo: {
    fullName: string;
    email: string;
    institute: string;
  };
  prizeCode: string;
  prizeEvt: string;
  prize: 1 | 2 | 3 | null;
}
const ResultsPageUserView = () => {
  const [iParticipants] = useFetch(
    {
      fn: async () => {
        return await fetchJSON(reqs.GET_RESULT, { credentials: "include" });
      },
    },
    [],
  );
  const participants: Participant[] = iParticipants || [];
  const [config] = useSettings();
  const [selectedEvent, setSelectedEvent] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchInstitution, setSearchInstitution] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
 
  const filteredParticipants = participants.filter((p) => {
    const matchesEvent =
      selectedEvent === "All" || p.prizeEvt === selectedEvent;
    const matchesSearch =
      p.parInfo.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.parInfo.institute.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEvent && matchesSearch;
  });

  const filteredInstitutions = filteredParticipants.filter((p) => {
    const matchesEvent =
      selectedEvent === "All" || p.prizeEvt === selectedEvent;
    const matchesSearch = p.parInfo.institute
      .toLowerCase()
      .includes(searchInstitution.toLowerCase());
    return matchesEvent && matchesSearch;
  });

  const sortedParticipants = [...filteredInstitutions].sort((a, b) => {
    if (a.prize === null) return 1;
    if (b.prize === null) return -1;
    return sortOrder === "asc" ? a.prize - b.prize : b.prize - a.prize;
  });

  const groupedByEvent = sortedParticipants.reduce(
    (acc, participant) => {
      if (!acc[participant.prizeEvt]) {
        acc[participant.prizeEvt] = [];
      }
      acc[participant.prizeEvt].push(participant);
      return acc;
    },
    {} as Record<string, Participant[]>,
  );

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const prizeColors = {
    1: "bg-primary-350/20 text-primary-350",
    2: "bg-secondary-300/20 text-secondary-300",
    3: "bg-primary-200/20 text-primary-250",
  };
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
 
  return (
    <div>
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />
      <div className="container-c to-primary-700 mt-16 min-h-screen bg-gradient-to-b from-primary-650 px-4 py-[81px] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-4 text-3xl font-bold text-primary-150 md:text-4xl">
              Competition Results
            </p>
            <p className="mx-auto max-w-2xl text-xl text-primary-200">
              View the winners of our exciting events
            </p>
          </div>

          <div className="mx-auto mb-8 max-w-6xl rounded-lg border border-primary-550 bg-primary-600/50 p-4 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-5 md:flex-row">
              {/* Event filter */}
              <div className="flex w-full items-center">
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="w-full rounded-md border border-primary-450 bg-primary-500 px-4 py-2 text-primary-150 focus:outline-none focus:ring-2 focus:ring-primary-350"
                >
                  <option value="All">All Events</option>
                  {events &&
                    events.map((event: any) => (
                      <option key={event} value={event.value}>
                        {event.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Search filter by name or email */}
              <div className="flex w-full items-center">
                <input
                  type="text"
                  placeholder="Search by name or email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border border-primary-450 bg-primary-500 px-4 py-2 text-primary-200 placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-350"
                />
              </div>
              <div className="flex w-full items-center">
                <input
                  type="text"
                  placeholder="Search by institution"
                  value={searchInstitution}
                  onChange={(e) => setSearchInstitution(e.target.value)}
                  className="w-full rounded-md border border-primary-450 bg-primary-500 px-4 py-2 text-primary-200 placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-350"
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {config?.showResult &&  
              Object.entries(groupedByEvent).map(
                ([event, eventParticipants]) => (
                  <div
                    key={event}
                    className="overflow-hidden rounded-xl border border-primary-500 bg-primary-600/50 shadow-lg backdrop-blur-sm"
                  >
                    <div className="bg-gradient-to-r from-primary-550 to-primary-500 px-6 py-4 text-center text-primary-150">
                      <p className="text-2xl font-semibold">
                        {" "}
                        {getEventNames[getEventValue.indexOf(event)]}
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-primary-500">
                        <thead className="bg-primary-550/50">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider text-primary-150">
                              Participant
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider text-primary-150">
                              Institution
                            </th>
                            <th
                              className="cursor-pointer px-6 py-4 text-left text-sm font-medium uppercase tracking-wider text-primary-150"
                              onClick={toggleSortOrder}
                            >
                              <div className="flex items-center justify-center">
                                <FiAward className="mr-2" />
                                <span>Prize</span>
                                <span className="ml-1">
                                  {sortOrder === "asc" ? "↑" : "↓"}
                                </span>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-primary-500">
                          {eventParticipants.map((participant) => (
                            <tr
                              key={participant.id}
                              className="transition-all hover:bg-primary-550/30"
                            >
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="flex items-center">
                                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-500">
                                    <FiUser className="text-xl text-primary-200" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-lg font-medium text-primary-150">
                                      {participant.parInfo.fullName}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="flex items-center">
                                  <FiHome className="mr-2 text-lg text-primary-300" />
                                  <span className="text-primary-150">
                                    {participant.parInfo.institute}
                                  </span>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {participant.prize ? (
                                  <div className="flex justify-center">
                                    <span
                                      className={`rounded-full px-4 py-2 text-sm font-semibold ${prizeColors[participant.prize]} flex items-center`}
                                    >
                                      <FiAward className="mr-2" />
                                      {participant.prize === 1
                                        ? "1st Place"
                                        : participant.prize === 2
                                          ? "2nd Place"
                                          : "3rd Place"}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-primary-300">
                                    Participant
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ),
              )}
          </div>

          {(Object.keys(groupedByEvent).length === 0 ||
            !config?.showResult) && (
            <div className="py-12 text-center">
              <div className="mb-4 text-primary-300">
                <FiAward className="inline-block text-4xl" />
              </div>
              <p className="mb-2 text-xl font-medium text-primary-150">
                No results found
              </p>
              <p className="text-primary-200">
                {selectedEvent === "All"
                  ? "There are no participants yet."
                  : `No participants found for ${selectedEvent}.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPageUserView;
