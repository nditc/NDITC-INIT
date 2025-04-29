import React from "react";
import EventCards from "./EventCards";
import categoryIcons from "@/data/categoryIcons";
import { PiSignIn } from "react-icons/pi";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoMdGift } from "react-icons/io";
import { ImSpoonKnife } from "react-icons/im";
import Separator from "@/components/ui/Separator";
import Link from "next/link";
import { LuUtensils } from "react-icons/lu";

type SegmentProps = {
  events: any[];
};

const SoloPass = ({ events }: SegmentProps) => {
  return (
    <div
      id="s1"
      className="relative w-full border-y border-primary-150/10 bg-gradient-to-r from-primary-650/50 to-secondary-600/50 pt-12"
    >
      <div className="soloPassBg absolute left-0 top-0 -z-10 h-4/5 w-3/4"></div>
      <div className="container-c relative z-20">
        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          <div className="text-center md:text-left">
            <h2 className="Inter mb-2 text-3xl font-bold text-primary-150 md:text-4xl">
              <span className="text-primary-350">Solo</span> Pass
              {React.createElement(categoryIcons[0], {
                className:
                  "icn-inline text-primary-350 mx-3 text-4xl  -rotate-45",
              })}
            </h2>
            <p className="max-w-[450px] text-primary-150/70 md:text-lg">
              Get Solo Pass to get access to exclusive events, gifts and meals
            </p>
          </div>
          <div className="my-6 block h-1 w-1 rounded-full bg-primary-200 md:hidden"></div>
          <div className="">
            <p className="Inter text-center md:text-end">
              <span className="text-3xl font-semibold text-primary-400">৳</span>{" "}
              <span className="text-4xl font-semibold text-white/75">100</span>{" "}
              <span className="text-2xl text-gray-400">only</span>
            </p>
            <div className="flex gap-2">
              <Link
                href="/register/event/soloPass"
                className="btn-prim leading-0 mt-2 px-6 pb-2.5 pt-2 text-sm"
              >
                Register <PiSignIn className="icn-inline" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto my-6 block h-1 w-1 rounded-full bg-primary-200 md:hidden"></div>

        <h2 className="title Inter my-8 text-3xl font-bold md:text-4xl">
          Exclusive Events
        </h2>
        <div className="gap-4 grid-fluid-fit-[290px] sm:grid-fluid-fit-[350px]">
          {(events || []).slice(1, events.length).map((data, index) => {
            return (
              <EventCards
                key={data.id}
                type="event"
                data={data}
                className="bg-primary-600 shadow-md"
              />
            );
          })}
        </div>
        <div className="Inter text-center text-7xl font-bold text-white/50">
          +
        </div>
        <div className="mt-8">
          <div className="flex scale-75 flex-wrap items-center justify-center gap-8 xl:scale-100">
            <div className="flex items-center gap-4">
              <IoMdGift className="text-8xl text-primary-350" />
              <p className="text-2xl font-semibold text-white/75">Gifts</p>
            </div>
            <Separator className="my-6" />
            <div className="flex items-center gap-4">
              <IoFastFoodOutline className="text-8xl text-primary-350" />
              <p className="text-2xl font-semibold text-white/75">Snacks</p>
            </div>
            <Separator className="my-6" />
            <div className="flex items-center gap-4">
              <LuUtensils className="text-8xl text-primary-350" />
              <p className="text-2xl font-semibold text-white/75">Lunch</p>
            </div>
          </div>
          <div
            style={{ transform: "perspective(5em) rotateX(25deg)" }}
            className="h-16 w-full bg-gradient-to-t from-primary-250/10 to-primary-600/10"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SoloPass;
