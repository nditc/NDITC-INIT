"use client";

import { useState } from "react";
import { FiTrash2, FiPlus, FiAward, FiUser, FiMail, FiHome } from "react-icons/fi";
import { motion } from "framer-motion";
import ConfirmClose from "@/components/ConfirmClose";
import { toast } from "react-toastify";

interface Participant {
  id: string;
  name: string;
  email: string;
  institution: string;
  code: string;
  event: string;
  prize: 1 | 2 | 3 | null;
}

const ResultsPage = () => {
  
  const initialParticipants: Participant[] = [
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
      event: "Robotics Competition",
      code: "ABC123",
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

  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newParticipant, setNewParticipant] = useState<Omit<Participant, "id">>({
    name: "",
    email: "",
    institution: "",
    event: "",
    code: "",
    prize: null,
  });
  const [selectedEvent, setSelectedEvent] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  
  const events = Array.from(new Set(participants.map(p => p.event)));

  
  const filteredParticipants = selectedEvent === "All" 
    ? participants 
    : participants.filter(p => p.event === selectedEvent);

  
  const sortedParticipants = [...filteredParticipants].sort((a, b) => {
    if (a.prize === null) return 1;
    if (b.prize === null) return -1;
    return sortOrder === "asc" ? a.prize - b.prize : b.prize - a.prize;
  });

  
  const groupedByEvent = sortedParticipants.reduce((acc, participant) => {
    if (!acc[participant.event]) {
      acc[participant.event] = [];
    }
    acc[participant.event].push(participant);
    return acc;
  }, {} as Record<string, Participant[]>);

  const handleDelete = (id: string) => {
    toast.warning(
      <ConfirmClose
        deleteAction={() => setParticipants(participants.filter(p => p.id !== id))}
        closeToast={() => toast.dismiss("close?")}
      />,
      {
        autoClose: false,
        position: "bottom-center",
        closeButton: false,
        toastId: "close?",
      },
    );
  };
  const handleAddParticipant = () => {
    const newId = (participants.length + 1).toString();
    setParticipants([...participants, { ...newParticipant, id: newId }]);
    setIsModalOpen(false);
    setNewParticipant({
      name: "",
      email: "",
      institution: "",
      code: "",
      event: "",
      prize: null,
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const prizeColors = {
    1: "bg-primary-350/20 text-primary-350",
    2: "bg-secondary-300/20 text-secondary-300",
    3: "bg-primary-200/20 text-primary-250",
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 container-c mt-16 py-[81px]"> 
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <p className="text-3xl font-bold text-primary-150">Event Results</p>
            <p className="text-primary-200 mt-2">View and manage competition results</p>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="bg-primary-600 border border-primary-450 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-350 text-primary-150"
            >
              <option value="All">All Events</option>
              {events.map((event) => (
                <option key={event} value={event}>
                  {event}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center bg-primary-400 hover:bg-primary-350 text-white px-4 py-2 rounded-md transition-colors"
            >
              <FiPlus className="mr-2" />
              Add Result
            </button>
          </div>
        </div>

        
        <div className="space-y-8">
          {Object.entries(groupedByEvent).map(([event, eventParticipants]) => (
            <motion.div 
              key={event}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-primary-600 rounded-xl shadow-md overflow-hidden border border-primary-550"
            >
              <div className="bg-primary-550 text-primary-150 px-6 py-4 text-center">
                <p className="text-xl font-semibold">{event}</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-primary-550">
                  <thead className="bg-primary-500">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-primary-150 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-primary-150 uppercase tracking-wider">
                        Institution
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-primary-150 uppercase tracking-wider cursor-pointer"
                        onClick={toggleSortOrder}
                      >
                        <div className="flex items-center">
                          Prize
                          <span className="ml-1">
                            {sortOrder === "asc" ? "↑" : "↓"}
                          </span>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-primary-150 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-primary-600 divide-y divide-primary-550">
                    {eventParticipants.map((participant) => (
                      <tr key={participant.id} className="hover:bg-primary-550/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
                              <FiUser className="text-primary-200" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-primary-150">
                                {participant.name}
                              </div>
                              <div className="text-sm text-primary-200">
                                {participant.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiHome className="text-primary-300 mr-2" />
                            <span className="text-sm text-primary-150">
                              {participant.institution}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {participant.prize ? (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${prizeColors[participant.prize]}`}>
                              <FiAward className="inline mr-1" />
                              {participant.prize === 1 ? "1st Place" : participant.prize === 2 ? "2nd Place" : "3rd Place"}
                            </span>
                          ) : (
                            <span className="text-primary-300">No prize</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDelete(participant.id)}
                            className="text-white bg-red-600 hover:bg-red-700 flex items-center px-3 py-1 rounded-md transition-colors"
                          >
                            <FiTrash2 className="mr-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </div>

        
        {isModalOpen && (
         <div className="fixed inset-0 bg-primary-650/90 bg-opacity-50 flex items-center justify-center z-50">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="bg-primary-600 rounded-lg mx-4 shadow-xl max-w-xl w-full p-6 border border-primary-550 "
         >
           <p className="text-2xl text-center  font-bold mb-4 text-primary-150">Add Prize Winner</p>
       
           <div className="space-y-4">
             
             <div className="flex space-x-4">
               <div className="w-1/2">
                 <label className="block text-sm font-medium text-primary-200 mb-1">Name</label>
                 <input
                   type="text"
                   value={newParticipant.name}
                   onChange={(e) => setNewParticipant({...newParticipant, name: e.target.value})}
                   className="w-full bg-primary-500 border border-primary-550 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-350 text-primary-150"
                 />
               </div>
               <div className="w-1/2">
                 <label className="block text-sm font-medium text-primary-200 mb-1">Email</label>
                 <input
                   type="email"
                   value={newParticipant.email}
                   onChange={(e) => setNewParticipant({...newParticipant, email: e.target.value})}
                   className="w-full bg-primary-500 border border-primary-550 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-350 text-primary-150"
                 />
               </div>
             </div>
       
             
             <div className="flex space-x-4">
               <div className="w-1/2">
                 <label className="block text-sm font-medium text-primary-200 mb-1">Institution</label>
                 <input
                   type="text"
                   value={newParticipant.institution}
                   onChange={(e) => setNewParticipant({...newParticipant, institution: e.target.value})}
                   className="w-full bg-primary-500 border border-primary-550 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-350 text-primary-150"
                 />
               </div>
               <div className="w-1/2">
                 <label className="block text-sm font-medium text-primary-200 mb-1">Code</label>
                 <input
                   type="text"
                   value={newParticipant.code}
                   onChange={(e) => setNewParticipant({...newParticipant, code: e.target.value})}
                   className="w-full bg-primary-500 border border-primary-550 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-350 text-primary-150"
                 />
               </div>
             </div>
       
             
             <div>
               <label className="block text-sm font-medium text-primary-200 mb-1">Event</label>
               <select
                 value={newParticipant.event}
                 onChange={(e) => setNewParticipant({...newParticipant, event: e.target.value})}
                 className="w-full bg-primary-500 border border-primary-550 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-350 text-primary-150"
               >
                 <option value="">Select an event</option>
                 {events.map((event) => (
                   <option key={event} value={event}>
                     {event}
                   </option>
                 ))}
               </select>
             </div>
       
             
             <div>
               <label className="block text-sm font-medium text-primary-200 mb-1">Prize</label>
               <div className="flex space-x-4">
                 {[1, 2, 3].map((prize) => (
                   <button
                     key={prize}
                     onClick={() => setNewParticipant({...newParticipant, prize: prize as 1 | 2 | 3})}
                     className={`flex-1 py-2 rounded-md border ${
                       newParticipant.prize === prize
                         ? "bg-primary-400 border-primary-350 text-white"
                         : "border-primary-550 hover:bg-primary-550 text-primary-150"
                     }`}
                   >
                     {prize === 1 ? "1st Place" : prize === 2 ? "2nd Place" : "3rd Place"}
                   </button>
                 ))}
               </div>
             </div>
           </div>
       
           <div className="mt-6 flex justify-end space-x-3">
             <button
               onClick={() => setIsModalOpen(false)}
               className="px-4 py-2 border border-primary-550 rounded-md text-primary-150 hover:bg-primary-550"
             >
               Cancel
             </button>
             <button
               onClick={handleAddParticipant}
               disabled={!newParticipant.name || !newParticipant.event || !newParticipant.prize}
               className={`px-4 py-2 rounded-md text-white ${
                 !newParticipant.name || !newParticipant.event || !newParticipant.prize
                   ? "bg-primary-450 cursor-not-allowed"
                   : "bg-primary-400 hover:bg-primary-350"
               }`}
             >
               Add Winner
             </button>
           </div>
         </motion.div>
       </div>
       
        )}
      </div>
    </div>
  );
};

export default ResultsPage;