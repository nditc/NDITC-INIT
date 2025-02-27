"use client";

import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import React from "react";
import ExtendedColors from "../../../../color.config";
import { useRouter } from "next/navigation";
import { FaAngleDown } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import EventCard from "@/components/Admin/Dashboard/EventCard";

export default function Page() {
  const router = useRouter();
  return (
    <main className="max-w-screen  relative overflow-x-clip">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />
      <section className="container mt-32 flex  flex-col gap-6 bg-primary-650 antialiased">
        <div >
          <div className="flex flex-row justify-between items-center py-5 mb-10 overflow-x-hidden">
            <div className="flex flex-col md:flex-row  items-center gap-5 max-w-7xl mx-auto w-full">

              <div className="flex items-center gap-5 flex-1">
                
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
                    EVENT LIST
                    </h1>
                  </div> 
              </div>

              {/* Homepage Button */}
              <button className="bg-primary-400 hover:bg-primary-300 text-white font-bold mx-auto md:mx-0 px-6 md:px-8 py-2 md:py-3 rounded-full flex items-center gap-2 transition-all text-sm md:text-base w-auto">
                Add
                <IoAdd className="bg-white text-primary-550 box-content rounded-full p-1 text-lg md:text-xl" />
              </button>
            </div>
          </div>

          <div className="max-w-7xl  mx-auto">
       
          <EventCard
                title="Multimedia Presentation"
                date="12 May, 2024"
                location="On-site"
                type="Team"
                fee={100}
                description="Enjoy the realm of Mystery and Scarcity."
                imageUrl="https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg"
              />
              <EventCard
                title="Multimedia Presentation"
                date="12 May, 2024"
                location="On-site"
                type="Team"
                fee={0}
                description="Enjoy the realm of Mystery and Scarcity."
                imageUrl="https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg"
              /> 
              <EventCard
                title="Multimedia Presentation"
                date="12 May, 2024"
                location="On-site"
                type="Team"
                fee={100}
                description="Enjoy the realm of Mystery and Scarcity."
                imageUrl="https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg"
              />
              <EventCard
                title="Multimedia Presentation"
                date="12 May, 2024"
                location="On-site"
                type="Team"
                fee={0}
                description="Enjoy the realm of Mystery and Scarcity."
                imageUrl="https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg"
              /> 
              <EventCard
                title="Multimedia Presentation"
                date="12 May, 2024"
                location="On-site"
                type="Team"
                fee={100}
                description="Enjoy the realm of Mystery and Scarcity."
                imageUrl="https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg"
              />
              <EventCard
                title="Multimedia Presentation"
                date="12 May, 2024"
                location="On-site"
                type="Team"
                fee={0}
                description="Enjoy the realm of Mystery and Scarcity."
                imageUrl="https://aaastriping.ca/wp-content/uploads/2017/01/temp-image-300x224.jpg"
              /> 
          </div>

        </div>
      </section>
    </main>
  );
}
