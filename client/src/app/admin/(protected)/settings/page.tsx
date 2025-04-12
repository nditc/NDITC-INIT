"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SwitchCheckbox from "@/components/ui/form/SwitchCheckbox";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";
import useSettings from "@/hooks/useSettings";
import PageLoading from "@/components/PageLoading";
import ErrorC from "@/components/Error";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
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

    toast.success("Settings Updated!");
  };
  const [settings, sloading, error] = useSettings([]);

  if (sloading) {
    return <PageLoading />;
  }

  if (error) {
    return <ErrorC msg="Something went wrong!" code={500} />;
  }

  console.log(settings);

  return (
    <main className="max-w-screen relative min-h-screen overflow-hidden">
      <section className="container-c mt-32 flex flex-col gap-6 bg-primary-650 antialiased">
        <div className="w-full">
          <div className="mb-10 flex flex-row items-center justify-between overflow-x-hidden p-5">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 md:flex-row">
              <div className="flex flex-1 items-center gap-5">
                <img
                  src={"/settings.svg"}
                  className="w-16 rounded pt-1"
                  alt="Logo"
                />

                <h1 className="bg-gradient-to-r from-secondary-300 via-primary-150 to-secondary-300 bg-clip-text text-6xl text-transparent">
                  SETTINGS
                </h1>
              </div>
            </div>
          </div>

          <div className="mb-10 max-w-7xl rounded-2xl bg-gradient-to-br from-secondary-600/20 to-secondary-500/50 p-5 shadow-lg">
            <form>
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
                  </div>
                  {/* <div className="my-5 border-t border-white/10"></div> */}
                </section>
                {/* <button
                  type="submit"
                  className="mt-5 flex w-full justify-center gap-2 rounded-3xl bg-primary-400 px-7 py-3 text-white hover:bg-primary-500 sm:w-auto md:px-9"
                >
                  {loading ? <Loading scale={0.7} /> : "Update ✓"}
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
