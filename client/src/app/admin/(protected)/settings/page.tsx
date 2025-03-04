"use client";

import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import React from "react";
import ExtendedColors from "../../../../../color.config";
import { useRouter } from "next/navigation";
import { FaAngleDown } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import Sponsors from "@/components/Admin/Settings/Sponsors";

export default function Page() {
  const router = useRouter();
  return (
    <main className="max-w-screen relative overflow-x-clip">
      <section className="container-c mt-32 flex flex-col gap-6 bg-primary-650 antialiased">
        <div className="w-full">
          <div className="mb-10 flex flex-row items-center justify-between overflow-x-hidden p-5">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 md:flex-row">
              <div className="flex flex-1 items-center gap-5">
                <img
                  src={"/settings.svg"}
                  className="w-20 rounded pt-1"
                  alt="Logo"
                />
                <div className="flex flex-col self-stretch">
                  <div className="flex flex-col">
                    <div>
                      <button
                        onClick={() => router.back()}
                        className="border-b border-transparent text-xl text-primary-200 hover:border-primary-200"
                      >
                        ← Back
                      </button>
                    </div>
                    <h1 className="mt-3 bg-gradient-to-r from-secondary-300 via-primary-150 to-secondary-300 bg-clip-text text-7xl text-transparent">
                      SETTINGS
                    </h1>
                  </div>
                </div>
              </div>

              {/* Homepage Button */}
              <button
                onClick={() => router.push("/")}
                className="group flex items-center justify-center rounded-lg border-2 border-primary-400 bg-transparent px-10 py-3 text-2xl font-bold text-white transition-all hover:bg-primary-400"
              >
                Homepage
                <FaAngleDown className="ml-2 w-5 transition-transform group-hover:rotate-180" />
              </button>
            </div>
          </div>

          <div className="mb-10 max-w-7xl rounded-2xl bg-gradient-to-br from-secondary-600/20 to-secondary-500/50 p-5 shadow-lg">
            <div className="mx-auto w-full max-w-6xl p-5">
              {/* Logo Section */}
              <section className="w-full">
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center justify-between gap-10">
                    <p className="text-2xl font-bold">
                      Event Logo (Hero Section)
                    </p>
                    <div className="max-w-full text-right">
                      <div className="h-28 w-72 max-w-full bg-gray-300"></div>
                      <button className="text-text-primary-350 mt-3 cursor-pointer border-none bg-transparent hover:underline">
                        Change Logo
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Timeline Section */}
              <section className="mt-5 w-full">
                <div className="my-5 border-t border-white/10"></div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-baseline justify-between">
                    <time className="text-lg">Event Start Date</time>
                    <div className="w-60 border-t border-white"></div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <time className="text-lg">Event End Date</time>
                    <div className="w-60 border-t border-white"></div>
                  </div>
                </div>
                <div className="my-5 border-t border-white/10"></div>
              </section>

              {/* Timeline Content */}
              <section className="mt-5 flex flex-wrap items-center justify-between gap-5">
                <p className="text-2xl font-bold">
                  Event Timeline (Hero Section)
                </p>

                <div className="max-w-full text-right">
                  <div className="h-28 w-72 max-w-full bg-gray-300"></div>
                  <button className="mt-3 cursor-pointer border-none bg-transparent text-primary-350 hover:underline">
                    Change Timeline
                  </button>
                </div>
              </section>
            </div>
          </div>

          {/* Countdown Section */}

          <div className="mb-10 max-w-7xl rounded-2xl bg-gradient-to-r from-secondary-600/20 to-secondary-500/50 p-5 shadow-lg">
            <div className="flex flex-col items-center justify-between gap-5 p-5 md:flex-row">
              <p className="text-2xl font-medium">Event Countdown</p>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                {["Days", "Hours", "Minutes", "Seconds"].map((unit) => (
                  <div key={unit} className="flex flex-col items-center">
                    <span className="rounded-lg border-2 border-white/70 px-5 py-3 text-3xl font-light">
                      00
                    </span>
                    <span className="mt-2 text-sm text-white/80">{unit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 flex justify-center gap-5">
              <button className="rounded-full bg-secondary-100 px-10 py-2 font-bold text-white transition-all hover:bg-secondary-400">
                Start/Stop
              </button>
              <button className="rounded-full bg-primary-400 px-10 py-2 font-bold text-white transition-all hover:bg-primary-300">
                Reset
              </button>
            </div>
          </div>

          {/* Sponsors Section */}
          <Sponsors />
        </div>
      </section>
    </main>
  );
}
