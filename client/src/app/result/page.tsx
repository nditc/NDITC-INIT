"use client";

import { FiAward, FiUser, FiHome, FiCalendar } from "react-icons/fi"; 
import { useState } from "react";

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
  const events = Array.from(new Set(participants.map(p => p.event)));

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
    const matchesSearch =
      p.institution.toLowerCase().includes(searchInstitution.toLowerCase())
    return matchesEvent && matchesSearch;
  });


  // Sort participants by prize
  const sortedParticipants = [...filteredInstitutions].sort((a, b) => {
    if (a.prize === null) return 1;
    if (b.prize === null) return -1;
    return sortOrder === "asc" ? a.prize - b.prize : b.prize - a.prize;
  });

  // Group participants by event
  const groupedByEvent = sortedParticipants.reduce((acc, participant) => {
    if (!acc[participant.event]) {
      acc[participant.event] = [];
    }
    acc[participant.event].push(participant);
    return acc;
  }, {} as Record<string, Participant[]>);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const prizeColors = {
    1: "bg-primary-350/20 text-primary-350",
    2: "bg-secondary-300/20 text-secondary-300",
    3: "bg-primary-200/20 text-primary-250",
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 container-c mt-16 py-[81px] bg-gradient-to-b from-primary-650 to-primary-700">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <p className="text-3xl md:text-4xl font-bold text-primary-150 mb-4">
            Competition Results
          </p>
          <p className="text-xl text-primary-200 max-w-2xl mx-auto">
            View the winners of our exciting events
          </p>
        </div>

        <div className="bg-primary-600/50 backdrop-blur-sm rounded-lg p-4 mb-8 border border-primary-550 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-5 items-center">
            {/* Event filter */}
            <div className="flex items-center w-full"> 
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full bg-primary-500 border border-primary-450 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-350 text-primary-150"
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
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-primary-500 border border-primary-450 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-350 text-primary-200 placeholder-primary-200"
              />
            </div>
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Search by institution"
                value={searchInstitution}
                onChange={(e) => setSearchInstitution(e.target.value)}
                className="w-full bg-primary-500 border border-primary-450 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-350 text-primary-200 placeholder-primary-200"
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedByEvent).map(([event, eventParticipants]) => (
            <div key={event} className="bg-primary-600/50 backdrop-blur-sm rounded-xl overflow-hidden border border-primary-500 shadow-lg">
              <div className="bg-gradient-to-r from-primary-550 to-primary-500 text-primary-150 px-6 py-4 text-center">
                <p className="text-2xl font-semibold">{event}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-primary-500">
                  <thead className="bg-primary-550/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-primary-150 uppercase tracking-wider">
                        Participant
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-primary-150 uppercase tracking-wider">
                        Institution
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-sm font-medium text-primary-150 uppercase tracking-wider cursor-pointer"
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
                      <tr key={participant.id} className="hover:bg-primary-550/30 transition-all">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center">
                              <FiUser className="text-primary-200 text-xl" />
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiHome className="text-primary-300 mr-2 text-lg" />
                            <span className="text-primary-150">
                              {participant.institution}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {participant.prize ? (
                            <div className="flex justify-center">
                              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${prizeColors[participant.prize]} flex items-center`}>
                                <FiAward className="mr-2" />
                                {participant.prize === 1 ? "1st Place" : participant.prize === 2 ? "2nd Place" : "3rd Place"}
                              </span>
                            </div>
                          ) : (
                            <span className="text-primary-300">Participant</span>
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
          <div className="text-center py-12">
            <div className="text-primary-300 mb-4">
              <FiAward className="inline-block text-4xl" />
            </div>
            <p className="text-xl font-medium text-primary-150 mb-2">
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
