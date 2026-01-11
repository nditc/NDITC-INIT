"use client";

import { useMemo, useState } from "react";
import {
  FiTrash2,
  FiPlus,
  FiAward,
  FiUser,
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
import Link from "next/link";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  /* -------------------- AUTO CODE GENERATOR -------------------- */
  const generatePrizeCode = () => {
    return "INIT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  /* -------------------- FETCH RESULTS -------------------- */
  const [iParticipants] = useFetch(
    {
      fn: async () => {
        return await fetchJSON(reqs.GET_RESULT, { credentials: "include" });
      },
    },
    [r],
  );

  const participants: Participant[] = iParticipants || [];

  /* -------------------- FETCH EVENTS -------------------- */
  const [events] = useFetch(
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
      if (!events) return [];
      return events
        .filter((d: any) => d.value !== "soloPass")
        .map((d: any) => d.value);
    }, [events]) || [];

  const getEventNames =
    useMemo(() => {
      if (!events) return [];
      return events
        .filter((d: any) => d.value !== "soloPass")
        .map((d: any) => d.name);
    }, [events]) || [];

  /* -------------------- FORM HANDLER -------------------- */
  const [form, fLoading] = useForm({
    handler: async (data) => {
      await fetchJSON(
        reqs.ADD_RESULT,
        {
          method: "POST",
          credentials: "include",
        },
        {
          ...data,
          prize: Number(data.prize),
          prizeCode: generatePrizeCode(),
        },
      );

      setIsModalOpen(false);
      setR((s) => s + 1);
    },
  });

  /* -------------------- SORT & GROUP -------------------- */
  const sortedParticipants = [...participants].sort((a, b) => {
    if (a.prize === null) return 1;
    if (b.prize === null) return -1;
    return sortOrder === "asc" ? a.prize - b.prize : b.prize - a.prize;
  });

  const groupedByEvent = sortedParticipants.reduce(
    (acc, participant) => {
      if (!acc[participant.prizeEvt]) acc[participant.prizeEvt] = [];
      acc[participant.prizeEvt].push(participant);
      return acc;
    },
    {} as Record<string, Participant[]>,
  );

  /* -------------------- DELETE -------------------- */
  const handleDelete = (id: string) => {
    toast.warning(
      <ConfirmClose
        deleteAction={async () => {
          await fetchJSON(reqs.REMOVE_RESULT + id, {
            credentials: "include",
            method: "DELETE",
          });
          toast.success("Deleted Successfully");
          setR((s) => s + 1);
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

  const prizeColors = {
    1: "bg-primary-350/20 text-primary-350",
    2: "bg-secondary-300/20 text-secondary-300",
    3: "bg-primary-200/20 text-primary-250",
  };

  /* ====================================================== */

  return (
    <div className="container-c mt-16 min-h-screen px-4 py-[81px]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex justify-between">
          <div>
            <p className="text-3xl font-bold text-primary-150">Event Results</p>
            <p className="mt-2 text-primary-200">
              View and manage competition results
            </p> 
            
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center rounded-md bg-primary-400 px-4 py-2 text-white"
          >
            <FiPlus className="mr-2" /> Add Result
          </button>
        </div>

        {Object.entries(groupedByEvent).map(([event, list]) => (
          <div
            key={event}
            className="mb-8 overflow-hidden rounded-xl border border-primary-550 bg-primary-600"
          >
            <div className="bg-primary-550 py-4 text-center text-xl font-semibold text-primary-150">
              {getEventNames[getEventValue.indexOf(event)]}
            </div>

            <table className="min-w-full divide-y divide-primary-550">
              <thead className="bg-primary-500">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-primary-150">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-primary-150">
                    Institute
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-primary-150">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-primary-150">
                    Prize
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-primary-550">
                {list.map((p) => (
                  <tr key={p.id}>
                    <td className="px-6 py-4 text-primary-150">
                      {p.parInfo.fullName}
                    </td>

                    <td className="px-6 py-4 text-primary-150">
                      {p.parInfo.institute}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded bg-primary-500/40 px-3 py-1 font-mono text-xs text-primary-150">
                        {p.prizeCode}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {p.prize && (
                        <span
                          className={`rounded-full px-3 py-1 text-xs ${prizeColors[p.prize]}`}
                        >
                          <FiAward className="mr-1 inline" />
                          {p.prize}ᵗʰ Place
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="rounded bg-red-600 px-3 py-1 text-white"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* ---------------- MODAL ---------------- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <motion.form
              ref={form}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-xl rounded-lg bg-primary-600 p-6"
            >
              <p className="mb-4 text-center text-2xl font-bold text-primary-150">
                Add Prize Winner
              </p>

              <Input type="email" name="email" label="E-mail" />

              <Select
                name="prizeEvt" 
                labels={getEventNames}
                values={getEventValue}
                label="Event"
                divClass="my-4"
              />

              <Select
                name="prize"
                labels={["1st", "2nd", "3rd"]}
                values={[1, 2, 3]}
                label="Prize"
              />

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded border border-secondary-400 px-4 py-2 text-primary-150"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded bg-primary-400 px-4 py-2 text-white"
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
