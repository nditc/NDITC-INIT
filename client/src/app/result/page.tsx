"use client";

import { FiAward, FiUser, FiHome, FiCalendar } from "react-icons/fi";
import { useState } from "react";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../color.config";

interface Participant {
  id: string;
  name: string;
  email: string;
  institution: string;
  code: string;
  event: string;
  prize: 1 | 2 | 3 | null;
}

const ResultsPageUserView = () => {
  const participants: Participant[] = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@university.edu",
      institution: "Tech University",
      code: "ABC123",
      event: "Robotics Competition",
      prize: 1,
    },
    {
      id: "2",
      name: "Sarah Williams",
      email: "sarah@college.edu",
      institution: "State College",
      code: "ABC123",
      event: "Hackathon",
      prize: 2,
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael@institute.edu",
      institution: "Science Institute",
      code: "ABC123",
      event: "Robotics Competition",
      prize: 3,
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@university.edu",
      institution: "Tech University",
      code: "ABC123",
      event: "Debate Championship",
      prize: 1,
    },
  ];

  const [selectedEvent, setSelectedEvent] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchInstitution, setSearchInstitution] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Available events for select dropdown
  const events = Array.from(new Set(participants.map((p) => p.event)));

  // Filter participants by selected event and search query

  const filteredParticipants = participants.filter((p) => {
    const matchesEvent = selectedEvent === "All" || p.event === selectedEvent;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEvent && matchesSearch;
  });

  const filteredInstitutions = filteredParticipants.filter((p) => {
    const matchesEvent = selectedEvent === "All" || p.event === selectedEvent;
    const matchesSearch = p.institution
      .toLowerCase()
      .includes(searchInstitution.toLowerCase());
    return matchesEvent && matchesSearch;
  });

  // Sort participants by prize
  const sortedParticipants = [...filteredInstitutions].sort((a, b) => {
    if (a.prize === null) return 1;
    if (b.prize === null) return -1;
    return sortOrder === "asc" ? a.prize - b.prize : b.prize - a.prize;
  });

  // Group participants by event
  const groupedByEvent = sortedParticipants.reduce(
    (acc, participant) => {
      if (!acc[participant.event]) {
        acc[participant.event] = [];
      }
      acc[participant.event].push(participant);
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

  return (
    <div className="container-c to-primary-700 mt-16 min-h-screen bg-gradient-to-b from-primary-650 px-4 py-[81px] sm:px-6 lg:px-8">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />
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
                {events.map((event) => (
                  <option key={event} value={event}>
                    {event}
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
          {Object.entries(groupedByEvent).map(([event, eventParticipants]) => (
            <div
              key={event}
              className="overflow-hidden rounded-xl border border-primary-500 bg-primary-600/50 shadow-lg backdrop-blur-sm"
            >
              <div className="bg-gradient-to-r from-primary-550 to-primary-500 px-6 py-4 text-center text-primary-150">
                <p className="text-2xl font-semibold">{event}</p>
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
                                {participant.name}
                              </div>
                              <div className="text-sm text-primary-300">
                                {participant.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <FiHome className="mr-2 text-lg text-primary-300" />
                            <span className="text-primary-150">
                              {participant.institution}
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
          ))}
        </div>

        {Object.keys(groupedByEvent).length === 0 && (
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
  );
};

export default ResultsPageUserView;
