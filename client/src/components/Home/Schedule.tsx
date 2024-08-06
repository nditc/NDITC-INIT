"use client";

import React, { useState } from "react";
import DatePicker from "./Picker";

const Schedule = () => {
  const [active, setActive] = useState<number>(0);
  return (
    <div className="flex flex-1 flex-col place-items-center">
      <h2 className="title title-top mb-6">Schedule</h2>
      <DatePicker
        dates={[
          { date: "20", month: "Feb", day: "Wed" },
          { date: "21", month: "Feb", day: "Thu" },
          { date: "22", month: "Feb", day: "Fri" },
        ]}
        active={active}
        setActive={setActive}
      />
      <div className="relative mt-4 flex w-full justify-center gap-1">
        <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 rounded-full bg-primary-350"></div>
        <div className="flex flex-1 flex-col items-end text-right">
          <div className="flex h-[120px] items-center justify-end gap-3">
            <div className="ml-1 flex-1">
              <h3 className="text-3xl text-primary-200">
                09:00 <span className="text-xl opacity-80 md:text-2xl">AM</span>{" "}
                {/* -90:30 <span className="text-2xl opacity-80">AM</span> */}
              </h3>
              <p className="text-sm text-white/75 sm:text-base">
                Opening Ceremony
              </p>
            </div>
            <div className="relative h-full w-5 before:absolute before:right-0 before:top-1/2 before:h-1 before:w-5 before:-translate-y-1/2 before:bg-primary-350"></div>
          </div>
        </div>
        <div className="mt-[60px] flex flex-1 flex-col items-start text-left">
          <div className="justify-sart flex h-[120px] items-center gap-3">
            <div className="relative h-full w-5 before:absolute before:right-0 before:top-1/2 before:h-1 before:w-5 before:-translate-y-1/2 before:bg-primary-350"></div>
            <div className="ml-1 flex-1">
              <h3 className="text-3xl text-primary-200">
                09:00 <span className="text-xl opacity-80 md:text-2xl">AM</span>{" "}
                {/* -90:30 <span className="text-2xl opacity-80">AM</span> */}
              </h3>
              <p className="text-sm text-white/75 sm:text-base">
                Opening Ceremony
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
