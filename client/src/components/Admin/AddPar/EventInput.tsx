import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import Input from "@/components/ui/form/Input";
import Select from "@/components/ui/form/Select";
import Separator from "@/components/ui/Separator";
import useFetch from "@/hooks/useFetch";
import React, { useEffect, useMemo, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaUserSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const EventInput = ({ forceRefresh }: { forceRefresh?: any }) => {
  const [eventCount, setEventCount] = useState([0]);

  const addEvent = () => {
    setEventCount((s) => {
      return [...s, Math.random()];
    });
  };

  const removeEvent = (i: number) => {
    setEventCount((s) => {
      let n = [...s];
      n.splice(i, 1);
      return n;
    });
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
          if (
            (d.value === "soloPass" || d.categoryId != 1) &&
            d.submission === "{}" &&
            !d.team
          )
            return true;
        });

        return ev.map((d: any) => d["value"]);
      }
    }, [events]) || [];

  const getEventNames =
    useMemo(() => {
      if (events) {
        const ev = events.filter((d: any) => {
          if (
            (d.value === "soloPass" || d.categoryId != 1) &&
            d.submission === "{}" &&
            !d.team
          )
            return true;
        });

        return ev.map(
          (d: any) =>
            d["name"] +
            (d["submission"] !== "{}" ? " - 🔗 Submission" : "") +
            (d["team"] ? " - 👥 Team" : "") +
            (d["paid"] ? " - 💵 " + d.fee : ""),
        );
      }
    }, [events]) || [];
  useEffect(() => {
    setEventCount([0]);
  }, [forceRefresh]);
  return (
    <>
      {/* <Input name="CteamName" label={"Team Name"} required /> */}
      <div className="my-2 flex items-center justify-center gap-4 text-lg">
        <span className="text-primary-150">Events</span>
        <Separator />
        <button
          onClick={addEvent}
          type="button"
          className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm transition hover:bg-secondary-600 md:text-lg"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-secondary-400">
            <BiPlus />
          </span>
          Add Event
        </button>
      </div>
      {eventCount.length >= 1 ? (
        <div className="flex flex-col gap-4">
          {eventCount.map((t, i) => {
            return (
              <div key={t} className="relative">
                <Select
                  label="Event"
                  values={[...getEventValue]}
                  labels={[...getEventNames]}
                  name={`events_${i}`}
                />
                <button
                  onClick={() => removeEvent(i)}
                  type="button"
                  className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2 px-2 py-3 text-lg transition"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-red-600 hover:bg-red-400">
                    <BiMinus />
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl bg-secondary-500 px-2 py-8 text-center text-white/80 opacity-85">
          <span>
            <FaUserSlash className="mb-1 inline" /> No event added yet.
          </span>
        </div>
      )}
    </>
  );
};

export default EventInput;
