"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SwitchCheckbox from "@/components/ui/form/SwitchCheckbox";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import useSettings from "@/hooks/useSettings";
import PageLoading from "@/components/PageLoading";
import ErrorC from "@/components/Error";
import { toast } from "react-toastify";
import Input from "@/components/ui/form/Input";
import useForm from "@/hooks/useForm";

import Loading from "@/components/ui/LoadingWhite";

export default function Page() {
  const router = useRouter();

  const [rerender, setrerender] = useState<number>(0);
  const [settings, sloading, error] = useSettings([rerender]);

  const [form, loadingUpdate] = useForm({
    handler: async (data) => {
      await fetchJSON(
        reqs.EDIT_EVENT_SETTING + "1", // Assuming ID is 1
        {
          credentials: "include",
          method: "PUT",
        },
        {
          ...settings,
          ...data,
        },
      );
      setrerender((s) => ++s);
      router.refresh();
    },
    successMsg: "Settings Updated Successfully!",
  });

  const handlePermit = async (e: any) => {
    await fetchJSON(
      reqs.SET_PERMIT,
      {
        credentials: "include",
        method: "PATCH",
      },
      {
        permitName: e.currentTarget.name,
        permitType: e.currentTarget.checked,
      },
    );

    toast.success("Permission Updated!");
  };

  if (sloading) {
    return <PageLoading />;
  }

  if (error) {
    return <ErrorC msg="Something went wrong!" code={500} />;
  }

  // cmnt

  return (
    <main className="max-w-screen relative min-h-screen overflow-hidden">
      <section className="container-c mt-32 flex flex-col gap-6 bg-primary-650 antialiased">
        <div className="w-full">
          <div className="mb-10 flex flex-row items-center justify-between overflow-x-hidden p-5">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 md:flex-row">
              <div className="flex flex-1 items-center gap-5">
                <img
                  src={"/settings.svg"}
                  className="w-16 rounded pt-1 grayscale"
                  alt="Logo"
                />

                <h1 className="bg-gradient-to-r from-secondary-300 via-primary-150 to-secondary-300 bg-clip-text text-6xl text-transparent">
                  SETTINGS
                </h1>
              </div>
            </div>
          </div>

          <div className="mb-10 max-w-7xl rounded-2xl bg-gradient-to-br from-secondary-600/20 to-secondary-500/50 p-5 shadow-lg">
            <div className="mx-auto w-full max-w-6xl p-5">
              {/* Timeline Section */}
              <section className="mt-5 w-full">
                {/* <div className="my-5 border-t border-white/10"></div> */}
                <div className="flex flex-col gap-5">
                  <SwitchCheckbox
                    label={"Registration Status"}
                    name="parRegPermit"
                    onChange={handlePermit}
                    defaultChecked={settings?.parRegPermit}
                  />
                  <SwitchCheckbox
                    label="CA Application Status"
                    name="caRegPermit"
                    onChange={handlePermit}
                    defaultChecked={settings?.caRegPermit}
                  />
                  <SwitchCheckbox
                    label="Club Partner Application Status"
                    name="cpartnerRegPermit"
                    onChange={handlePermit}
                    defaultChecked={settings?.cpartnerRegPermit}
                  />
                  <SwitchCheckbox
                    label="Result Status"
                    name="showResult"
                    onChange={handlePermit}
                    defaultChecked={settings?.showResult}
                  />
                  <SwitchCheckbox
                    label="Schedule Status"
                    name="showSchedule"
                    onChange={handlePermit}
                    defaultChecked={settings?.showSchedule}
                  />{" "}
                </div>
                {/* <div className="my-5 border-t border-white/10"></div> */}
              </section>

              <form ref={form} className="mt-10 grid gap-5">
                <h2 className="text-3xl text-secondary-200">
                  Messenger Group Links
                </h2>
                <Input
                  label="CA Messenger Group Link"
                  name="caGroupLink"
                  defaultValue={settings?.caGroupLink}
                  placeholder="Enter CA messenger group link"
                />
                <Input
                  label="Campus Partner Messenger Group Link"
                  name="cpartnerGroupLink"
                  defaultValue={settings?.cpartnerGroupLink}
                  placeholder="Enter Campus Partner messenger group link"
                />
                <div className="text-right">
                  <button
                    type="submit"
                    className="btn-prim Bebas inline-flex items-center gap-1 py-2.5 pl-8 pr-8 text-center text-xl tracking-wide"
                  >
                    {loadingUpdate ? <Loading scale={0.7} /> : "Update Links"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
