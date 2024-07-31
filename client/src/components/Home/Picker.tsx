import { setStateType } from "@/types/setState";
import React, { Dispatch } from "react";

const DatePicker = ({
  dates,
  active,
  setActive,
}: {
  dates: { date: string; month: string; day: string }[];
  active: number;
  setActive: setStateType;
}) => {
  return (
    <div className="Bebas relative flex w-full max-w-[500px] items-stretch justify-center rounded-full border border-white/10">
      <div
        style={{
          transform: `translateX(${active * 100}%)`,
        }}
        className="absolute left-0 h-[100%] w-[calc(100%_/_3)] rounded-full bg-primary-450 transition"
      ></div>
      {dates.map(({ date, month, day }, index) => {
        return (
          <div
            onClick={() => {
              setActive(index);
            }}
            key={index}
            className={
              "z-10 flex shrink-0 grow-0 basis-[calc(100%_/_3)] cursor-pointer flex-col justify-center rounded-full pb-1 pl-3.5 pr-3.5 pt-2 leading-none text-primary-150/50 transition hover:text-primary-150/75 md:px-9 " +
              (active === index ? "scale-[85%]" : "scale-[75%]")
            }
          >
            <p
              className={
                "Bebas leading-0 flex w-full justify-center gap-1 text-4xl sm:text-5xl " +
                (active === index ? "text-white" : "")
              }
            >
              {date}
              <span className="mt-0.5 flex flex-col gap-0.5 align-bottom">
                <span
                  style={{ lineHeight: 1 }}
                  className={
                    "Inter text-base font-bold leading-none sm:text-xl " +
                    (active === index ? "text-primary-150" : "")
                  }
                >
                  {day}
                </span>
                <span
                  style={{ lineHeight: 1 }}
                  className={
                    "Bebas text-sm leading-none sm:text-lg " +
                    (active === index ? "text-primary-150/80" : "")
                  }
                >
                  {month}
                </span>
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DatePicker;
