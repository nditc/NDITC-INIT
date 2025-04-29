"use client";

import { useMemo, useState } from "react";
import {
  FiTrash2,
  FiPlus,
  FiAward,
  FiUser,
  FiMail,
  FiHome,
} from "react-icons/fi";
import { motion } from "framer-motion";
import ConfirmClose from "@/components/ConfirmClose";
import { toast } from "react-toastify";
import useFetch from "@/hooks/useFetch";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import Select from "@/components/ui/form/Select";
import Input from "@/components/ui/form/Input";
import useForm from "@/hooks/useForm";
import Loading from "@/components/ui/LoadingWhite";

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

const ResultsPage = () => {
  const [r, setR] = useState(0);

  const [iParticipants] = useFetch(
    {
      fn: async () => {
        return await fetchJSON(reqs.GET_RESULT, { credentials: "include" });
      },
    },
    [r],
  );
  const participants: Participant[] = iParticipants || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, fLoading] = useForm({
    handler: async (data) => {
      await fetchJSON(
        reqs.ADD_RESULT,
        {
          method: "POST",
          credentials: "include",
        },
        { ...data, prize: Number(data.prize) },
      );
      setIsModalOpen(false);
      setR((s) => s + 1);
    },
  });

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  const sortedParticipants = [...participants].sort((a, b) => {
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
  console.log(participants, sortedParticipants, groupedByEvent);

  const handleDelete = (id: string) => {
    toast.warning(
      <ConfirmClose
        deleteAction={async () => {
          try {
            await fetchJSON(reqs.REMOVE_RESULT + id, {
              credentials: "include",
              method: "DELETE",
            });
            toast.success("Deleted Successfully");
            setR((s) => s + 1);
          } catch (err) {
            toast.error(String(err) || "Something went wrong!");
          }
        }}
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

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const prizeColors = {
    1: "bg-primary-350/20 text-primary-350",
    2: "bg-secondary-300/20 text-secondary-300",
    3: "bg-primary-200/20 text-primary-250",
  };

  return (
    <div className="container-c mt-16 min-h-screen px-4 py-[81px] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <p className="text-3xl font-bold text-primary-150">Event Results</p>
            <p className="mt-2 text-primary-200">
              View and manage competition results
            </p>
          </div>

          <div className="mt-4 flex space-x-4 md:mt-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center rounded-md bg-primary-400 px-4 py-2 text-white transition-colors hover:bg-primary-350"
            >
              <FiPlus className="mr-2" />
              Add Result
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedByEvent).map(
            ([event, eventParticipants], index) => (
              <motion.div
                key={event}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-xl border border-primary-550 bg-primary-600 shadow-md"
              >
                <div className="bg-primary-550 px-6 py-4 text-center text-primary-150">
                  <p className="text-xl font-semibold">
                    {getEventNames[getEventValue.indexOf(event)]}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-primary-550">
                    <thead className="bg-primary-500">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-150">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-150">
                          institute
                        </th>
                        <th
                          className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-150"
                          onClick={toggleSortOrder}
                        >
                          <div className="flex items-center">
                            Prize
                            <span className="ml-1">
                              {sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-150">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary-550 bg-primary-600">
                      {eventParticipants.map((participant) => (
                        <tr
                          key={participant.id}
                          className="transition-colors hover:bg-primary-550/50"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-500">
                                <FiUser className="text-primary-200" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-primary-150">
                                  {participant.parInfo.fullName}
                                </div>
                                <div className="text-sm text-primary-200">
                                  {participant.parInfo.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center">
                              <FiHome className="mr-2 text-primary-300" />
                              <span className="text-sm text-primary-150">
                                {participant.parInfo.institute}
                              </span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {participant.prize ? (
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${prizeColors[participant.prize]}`}
                              >
                                <FiAward className="mr-1 inline" />
                                {participant.prize === 1
                                  ? "1st Place"
                                  : participant.prize === 2
                                    ? "2nd Place"
                                    : "3rd Place"}
                              </span>
                            ) : (
                              <span className="text-primary-300">No prize</span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <button
                              onClick={() => handleDelete(participant.id)}
                              className="flex items-center rounded-md bg-red-600 px-3 py-1 text-white transition-colors hover:bg-red-700"
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
            ),
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-650/90 bg-opacity-50">
            <motion.form
              ref={form}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-4 w-full max-w-xl rounded-lg border border-primary-550 bg-primary-600 p-6 shadow-xl"
            >
              <p className="mb-4 text-center text-2xl font-bold text-primary-150">
                Add Prize Winner
              </p>

              <div className="space-y-4">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <Input type="email" name="email" label="E-mail" />
                  </div>
                  <div className="w-1/2">
                    <Input type="text" name="prizeCode" label="Code No." />
                  </div>
                </div>

                <div>
                  <Select
                    name="prizeEvt"
                    labels={getEventNames}
                    values={getEventValue}
                    label="Event"
                    divClass="w-full"
                  />
                </div>

                <div>
                  <div className="flex space-x-4">
                    <Select
                      name="prize"
                      labels={["1st", "2nd", "3rd"]}
                      values={[1, 2, 3]}
                      label="Prize"
                      divClass="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md border border-primary-550 px-4 py-2 text-primary-150 hover:bg-primary-550"
                >
                  Cancel
                </button>
                <button
                  className="rounded-md bg-primary-400 px-4 py-2 text-white hover:bg-primary-450"
                  type="submit"
                >
                  {fLoading ? <Loading scale={0.6} /> : "Add Winner"}
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
