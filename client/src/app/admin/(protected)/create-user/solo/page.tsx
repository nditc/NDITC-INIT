"use client";

import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import Input from "@/components/ui/form/Input";
import useForm from "@/hooks/useForm";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useState } from "react";
import PhotoUpload from "@/components/ui/PhotoUpload";
import Loading from "@/components/ui/LoadingWhite";
import ExtendedColors from "../../../../../../color.config";
import EventInput from "@/components/Admin/AddPar/EventInput";
import RouteSwitch from "@/components/ui/RouteSwitch";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import Select from "@/components/ui/form/Select";
import { CLASSES } from "@/data/classes";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [r, sr] = useState(0);
  const [form, loading] = useForm({
    handler: async (data) => {
      const response = await fetchJSON(
        reqs.ADMIN_PAR_REG,
        {
          credentials: "include",
          method: "POST",
        },
        data,
      );
      if (data?.events) {
        (data?.events as string[]).forEach(async (ev) => {
          await fetchJSON(
            reqs.ADMIN_SINGLE_EVENT,
            {
              credentials: "include",
              method: "POST",
            },
            { ...data, eventName: ev },
          );
        });
      }
      return response;
    },
    formData: true,
    populate: ["events"],
    successMsg: "Participant created successfully!",
    onSuccess: () => {
      router.refresh();
      sr((_) => _ + 1); // force refresh comp
    },
  });

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
            <p className="GradText Bebas text-5xl">User Creation</p>
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

            <EventInput forceRefresh={r} />
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
