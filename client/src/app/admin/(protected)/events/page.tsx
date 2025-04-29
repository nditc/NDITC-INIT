import React from "react";
import { IoAdd } from "react-icons/io5";
import { getAllEventwithCategories } from "@/api/events";
import EventSegmentAdmin from "@/components/Events/EventSegmentAdmin";
import Link from "next/link";

export default async function Page() {
  const { result } = await getAllEventwithCategories();
  // cmnt
  return (
    <main className="max-w-screenw-full relative overflow-hidden">
      <section className="mt-32 flex w-full flex-col gap-6 bg-primary-650 antialiased">
        <div>
          <div className="flex flex-row items-center justify-between overflow-x-hidden py-5">
            <div className="flex w-full flex-col items-center gap-5 md:flex-row">
              <div className="flex flex-1 items-center gap-5">
                <div className="flex flex-col">
                  <div></div>
                  <h1 className="mt-3 bg-gradient-to-r from-secondary-300 via-primary-150 to-secondary-300 bg-clip-text text-4xl text-transparent md:text-5xl xl:text-6xl">
                    EVENT LIST
                  </h1>
                </div>
              </div>

              {/* Homepage Button */}
              <Link
                href="/admin/events/new"
                className="mx-auto flex w-auto items-center gap-2 rounded-full bg-primary-400 px-6 py-2 text-sm font-bold text-white transition-all hover:bg-primary-300 md:mx-0 md:px-8 md:py-3 md:text-base"
              >
                Add
                <IoAdd className="box-content rounded-full bg-white p-1 text-lg text-primary-550 md:text-xl" />
              </Link>
            </div>
          </div>
          {((result as any[]) || []).map((data, index) => {
            return (
              <EventSegmentAdmin
                key={index}
                name={data.name}
                description={data.description}
                events={data.events}
                index={index}
                id={data.id}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
