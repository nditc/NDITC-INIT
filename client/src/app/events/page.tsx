import React from "react";
import { SpotlightBG } from "../../components/ui/Spotlight/SpotlightBG";
import { Spotlight } from "../../components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../color.config";
import { getAllEventwithCategories } from "@/api/events";
import EventSegment from "@/components/Events/EventSegment";
import SoloPass from "@/components/Events/SoloPass";
import categoryIcons from "@/data/categoryIcons";
import TriangleBottom from "@/components/ui/TriangleBottom";
import Link from "next/link";

const page = async () => {
  const { result } = await getAllEventwithCategories();
  return (
    <main className="max-w-[100vw] overflow-x-hidden">
      <div className="relative flex h-screen w-full max-w-[100vw] flex-col items-center justify-center gap-6 overflow-hidden">
        <img
          alt=""
          src="/ev_hero.png"
          className="absolute left-0 top-0 -z-10 h-screen w-full opacity-25 blur-sm"
        />
        <h1 className="Inter GradText mt-10 text-6xl font-bold md:text-7xl xl:text-8xl">
          EVENTS
        </h1>
        <p className="line-clamp-3 w-1/2 min-w-[280px] text-center text-lg text-white/50">
          Register for amazing event exclusive to INIT. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Est neque expedita officia fugit
          assumenda delectus sint possimus facilis quam iure.
        </p>
        <h1 className="mb-2 mt-4 text-4xl text-primary-250">OUR SEGMENTS</h1>
        <div className="flex max-w-[18.5rem] flex-wrap justify-center gap-4 sm:max-w-[22rem]">
          {((result as any[]) || []).map((data, index) => {
            return (
              <Link
                href={"/events/#s" + data.id}
                className="rouded-full group relative block"
                key={index}
              >
                <div className="grid aspect-square h-14 w-14 -rotate-[12deg] cursor-pointer place-items-center rounded-full bg-primary-500/45 text-3xl text-primary-150 transition hover:bg-primary-500/75 group-hover:rotate-[360deg] sm:h-16 sm:w-16 sm:text-4xl">
                  {React.createElement(categoryIcons[index])}
                </div>
                <div className="absolute -top-[100%] left-1/2 grid h-[60px] w-[120px] origin-bottom -translate-x-1/2 scale-0 place-items-center rounded-lg bg-primary-550 p-2 text-center text-sm text-white/75 transition group-hover:scale-100">
                  {data.name}
                  <TriangleBottom />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="GradBGDark">
        <SoloPass events={((result as any[]) || [])[0].events} />
        {((result as any[]) || [])
          .slice(1, result.length + 1)
          .map((data, index) => {
            return (
              <EventSegment
                key={index}
                name={data.name}
                description={data.description}
                events={data.events}
                index={index + 1}
                id={data.id}
              />
            );
          })}
      </div>
    </main>
  );
};

export default page;
