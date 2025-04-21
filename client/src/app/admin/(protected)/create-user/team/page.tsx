"use client";

import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import Input from "@/components/ui/form/Input";
import useForm from "@/hooks/useForm";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useMemo, useState } from "react";
import PhotoUpload from "@/components/ui/PhotoUpload";
import Loading from "@/components/ui/LoadingWhite";
import ExtendedColors from "../../../../../../color.config";

import EventInput from "@/components/Admin/AddPar/EventInput";
import RouteSwitch from "@/components/ui/RouteSwitch";
import TeamInput from "@/components/Events/Register/TeamInput";
import useFetch from "@/hooks/useFetch";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import Select from "@/components/ui/form/Select";
import { CLASSES } from "@/data/classes";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  roll: number;
  group: number;
  profilePicture: string | null;
}

const UserManagement = () => {
  const [selectedEvent, setSelectedEvent] = useState<number>(0);
  const [r, sr] = useState(0);

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
            d.team
          )
            return true;
        });

        return ev.map((d: any) => d["value"]);
      }
    }, [events]) || [];

  const getEventFiltered =
    useMemo(() => {
      if (events) {
        const ev = events.filter((d: any) => {
          if (
            (d.value === "soloPass" || d.categoryId != 1) &&
            d.submission === "{}" &&
            d.team
          )
            return true;
        });

        return ev;
      }
    }, [events]) || [];

  const getEventNames =
    useMemo(() => {
      if (events) {
        const ev = events.filter((d: any) => {
          if (
            (d.value === "soloPass" || d.categoryId != 1) &&
            d.submission === "{}" &&
            d.team
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

  const [form, loading] = useForm(
    {
      handler: async (data) => {
        const response = await fetchJSON(
          reqs.ADMIN_PAR_REG,
          {
            credentials: "include",
            method: "POST",
          },
          data,
        );
        await fetchJSON(
          reqs.ADMIN_TEAM_EVENT,
          {
            credentials: "include",
            method: "POST",
          },
          { ...data, eventName: data.eventName },
        );

        return { success: true };
      },
      formData: true,
      populate: ["members"],
      successMsg: "Team created successfully!",
      onSuccess: () => {
        sr((_) => _ + 1); // force refresh comp
      },
    },
    [getEventNames],
  );
  return (
    <div className="container-c mt-16 gap-20 py-[81px] md:flex-row">
      <div>
        <RouteSwitch
          options={[
            { label: "Solo", path: "/admin/create-user/solo" },
            { label: "Team", path: "/admin/create-user/team" },
          ]}
        />
      </div>
      <div className="mt-16 flex w-full flex-1 flex-col items-center justify-center">
        <div className="flex w-full items-center justify-center gap-1.5 text-center">
          <AiOutlineUserAdd className="text-primary h-16 w-16 text-primary-150" />
          <div className="flex flex-col items-start justify-start gap-0.5">
            <p className="text-lg font-semibold text-primary-200">
              Admin Panel
            </p>
            <p className="GradText Bebas text-5xl">TEAM Creation</p>
          </div>
        </div>
        <p className="mb-5 text-center text-white/80">
          Create and manage manager accounts with the required information.
        </p>

        <form className="mb-10 grid w-full grid-cols-1 gap-5" ref={form}>
          <div className="flex w-full flex-col gap-5">
            <Input
              label="Full Name"
              name="fullName"
              id="name"
              type="text"
              divClass="md:col-span-2"
              required
            />
            <Input
              name="eventName"
              type="text"
              divClass="hidden"
              value={getEventValue[selectedEvent]}
              hidden
            />
            <div className="flex flex-col gap-4 md:flex-row">
              <Input
                label="Email"
                name="email"
                id="email"
                type="email"
                divClass="w-full flex-1"
                required
              />
              <Input
                label="Phone"
                name="phone"
                id="phone"
                type="text"
                divClass="w-full flex-1"
                required
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <Select
                values={CLASSES}
                name="className"
                label="Class"
                divClass="w-full flex-1"
              />
              <Input
                label="Institute"
                name="institute"
                id="institute"
                placeholder="Institution Name"
                type="text"
                divClass="w-full flex-1"
              />
            </div>
            <Select
              label="Event"
              values={[...getEventValue]}
              labels={[...getEventNames]}
              name={`event`}
              onChange={(_, idx) => {
                setSelectedEvent(idx || 0);
              }}
            />

            {events ? (
              <TeamInput
                data={getEventFiltered[selectedEvent]}
                forceRefresh={r}
              />
            ) : null}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={
                "btn-prim Bebas inline-flex items-center gap-1 py-2.5 pr-8 text-center text-xl tracking-wide " +
                (loading ? "pl-6" : "pl-8")
              }
            >
              {loading && <Loading scale={0.6} />}
              Create Participant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserManagement;
