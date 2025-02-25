"use client";

import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import React from "react";
import ExtendedColors from "../../../../color.config";
import { useRouter } from "next/navigation";
import { FaAngleDown } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";

export default function Page() {
  const router = useRouter();
  return (
    <main className="max-w-screen relative overflow-x-clip">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />
      <section className="container mt-32 flex  flex-col gap-6 bg-primary-650 antialiased">
        <div >
          <div className="flex flex-row justify-between items-center p-5 mb-10 overflow-x-hidden">
            <div className="flex flex-col md:flex-row  items-center gap-5 max-w-7xl mx-auto w-full">

              <div className="flex items-center gap-5 flex-1">
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
                    <h1 className="text-7xl bg-gradient-to-r from-secondary-300  via-primary-150 to-secondary-300 bg-clip-text text-transparent mt-3">
                      SETTINGS
                    </h1>
                  </div>
                </div>
              </div>

              {/* Homepage Button */}
              <button
                onClick={() => router.push('/')}
                className="flex group items-center justify-center bg-transparent border-2 border-primary-400 text-white font-bold text-2xl px-10 py-3 rounded-lg hover:bg-primary-400 transition-all"
              >
                Homepage
                <FaAngleDown className="w-5 ml-2 transition-transform group-hover:rotate-180" />
              </button>
            </div>
          </div>

          <div className="max-w-7xl   bg-gradient-to-br from-secondary-600/20 to-secondary-500/50 rounded-2xl shadow-lg p-5 mb-10">
            <div className="w-full max-w-6xl mx-auto p-5">
              {/* Logo Section */}
              <section className="w-full">
                <div className="flex flex-col">
                  <div className="flex justify-between items-center flex-wrap gap-10">
                    <p className="text-2xl font-bold">Event Logo (Hero Section)</p>
                    <div className="text-right max-w-full">
                      <div className="w-72 h-28 bg-gray-300  max-w-full">

                      </div>
                      <button className="text-text-primary-350   mt-3 bg-transparent border-none cursor-pointer hover:underline">
                        Change Logo
                      </button>
                    </div>
                  </div>

                </div>
              </section>

              {/* Timeline Section */}
              <section className="w-full mt-5">
                <div className="border-t border-white/10 my-5"></div>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-baseline">
                    <time className="text-lg">Event Start Date</time>
                    <div className="w-60 border-t border-white"></div>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <time className="text-lg">Event End Date</time>
                    <div className="w-60 border-t border-white"></div>
                  </div>
                </div>
                <div className="border-t border-white/10 my-5"></div>
              </section>

              {/* Timeline Content */}
              <section className="flex flex-wrap justify-between items-center gap-5 mt-5">
                <p className="text-2xl font-bold">Event Timeline (Hero Section)</p>
                 
                <div className="text-right max-w-full">
                      <div className="w-72 h-28 bg-gray-300  max-w-full">

                      </div>
                      <button className="text-primary-350   mt-3 bg-transparent border-none cursor-pointer hover:underline">
                      Change Timeline
                      </button>
                    </div>
              </section>
            </div>
          </div>

          {/* Countdown Section */}
          
          <div className="max-w-7xl bg-gradient-to-r from-secondary-600/20 to-secondary-500/50 rounded-2xl shadow-lg p-5 mb-10">
            <div className="flex justify-between md:flex-row flex-col gap-5 items-center p-5">
              <p className="text-2xl font-medium">Event Countdown</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {["Days", "Hours", "Minutes", "Seconds"].map((unit) => (
                  <div key={unit} className="flex flex-col items-center">
                    <span className="text-3xl font-light border-2 border-white/70 rounded-lg px-5 py-3">
                      00
                    </span>
                    <span className="text-sm text-white/80 mt-2">{unit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-5 mt-10">
              <button className="bg-secondary-100  text-white font-bold px-10 py-2 rounded-full hover:bg-secondary-400 transition-all">
                Start/Stop
              </button>
              <button className="bg-primary-400 text-white font-bold px-10 py-2 rounded-full hover:bg-primary-300 transition-all">
                Reset
              </button>
            </div>
          </div>

          {/* Sponsors Section */}
          <div className="max-w-7xl bg-gradient-to-br from-secondary-600/20 to-secondary-500/50 rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-10">
            <p className="text-xl md:text-2xl font-bold  mx-auto md:mx-0">Sponsors</p>
            <button className="bg-primary-400 hover:bg-primary-300 text-white font-bold mx-auto md:mx-0 px-6 md:px-8 py-2 md:py-3 rounded-full flex items-center gap-2 transition-all text-sm md:text-base w-auto">
              Add
              <IoAdd className="bg-white text-primary-550 box-content rounded-full p-1 text-lg md:text-xl" />
            </button>
          </div>
          
          <div className="mt-8 md:mt-14 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-10">
              <div className="flex mx-auto md:mx-0 flex-col md:flex-row items-start gap-4 md:gap-5">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/08b2affc9f34db02e12501e58c1a9f2cab900fc28b7c544220a495a6e1c75324?placeholderIfAbsent=true&apiKey=58fe75c70cbc4db68554bc2ed919fb77"
                  alt="Legit Banda Logo"
                  className="w-24 mx-auto md:mx-0 md:w-32 lg:w-36 rounded-lg"
                />
                <div className="flex flex-col gap-1 md:gap-2">
                  <p className="text-lg md:text-xl lg:text-2xl font-semibold mx-auto md:mx-0">Engagement Partner</p>
                  <p className="text-base md:text-lg opacity-70 mx-auto md:mx-0">Legit Banda</p>
                  <a
                    href="https://www.thelegitbanda.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-200 mx-auto md:mx-0 hover:underline text-sm md:text-base"
                  >
                    thelegitbanda.com
                  </a>
                </div>
              </div>
              <div className="flex gap-2 mx-auto md:mx-0 md:gap-3">
                <button className="p-1 md:p-2 rounded-lg hover:bg-white/10 transition-all">
                  <FiEdit className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button className="p-1 md:p-2 rounded-lg hover:bg-red-500/20 transition-all">
                  <MdDelete className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
          
        </div>
      </section>
    </main>
  );
}
