"use client";

import CountdownCounter from "@/utils/countdownCounter";
import Tags from "./TimerTags";
import { useEffect, useState } from "react";

const Timer = () => {
  const [countdown, setCountdown] = useState<{
    months: string;
    days: string;
    hours: string;
    minutes: string;
  }>({ months: "00", days: "00", hours: "00", minutes: "00" });
  useEffect(() => {
    const Int = setInterval(() => {
      setCountdown(CountdownCounter(new Date("10-13-2024")));
    }, 1000);

    return () => {
      clearInterval(Int);
    };
  }, []);
  return (
    <section className="relative flex w-full flex-col items-center justify-center py-14 2xl:min-h-[30vh]">
      <img
        src="./Timer Text.svg"
        className="absolute right-3 top-0 w-[46%] opacity-70 md:w-fit"
        alt="Code Text"
      />
      <img
        src="./campus.jpg"
        className="absolute left-0 top-0 -z-10 h-full w-[100vw] opacity-15"
        alt="Code Text"
      />
      <h1 className="title mb-0 2xl:mb-10">ASCEND THE ASSEMBLY</h1>
      <div className="relative z-0 grid max-w-[750px] scale-75 grid-cols-2 grid-rows-2 items-end justify-items-center gap-x-6 md:grid-cols-4 md:grid-rows-none md:gap-16 lg:scale-90 2xl:scale-100">
        <div className="absolute top-0 h-1 w-full bg-[#504587]"></div>
        <Tags text="Months" rotate={2} val={countdown.months} />
        <Tags text="Days" rotate={-1} val={countdown.days} />
        <Tags text="Hours" rotate={1} val={countdown.hours} />
        <Tags text="Minutes" rotate={-2} val={countdown.minutes} />
      </div>

      {/* <div className="h-1 w-[90%] rounded-full bg-[#4E4383] md:w-[46%]"></div> */}
    </section>
  );
};

export default Timer;
