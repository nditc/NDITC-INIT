import React from "react";
import { IoTrophy } from "react-icons/io5";
import Separator from "@/components/ui/Separator";

const PrizeCard = ({ prize }: { prize: string }) => {
  const data = JSON.parse(prize);
  return (
    <>
      {prize !== "{}" ? (
        <div className="flex w-full basis-1/2 items-center gap-3 rounded-full bg-secondary-400/30 px-8 py-3">
          <IoTrophy className="h-14 w-14 text-primary-300" />
          <div className="align-center -mt-1 flex flex-col justify-center gap-1">
            <p className="text-sm font-medium leading-none text-primary-200 xl:text-base">
              Prize
            </p>
            <p className="text-base leading-none xl:text-xl">BDT</p>
          </div>
          <div className="h-3/4 w-[1px] bg-white/50 lg:mx-2"></div>
          <div className="align-center -mt-1 flex flex-1 flex-col items-center justify-center gap-1">
            <p className="text-sm font-medium leading-none text-primary-200 xl:text-base">
              1<sup>st</sup>
            </p>
            <p className="text-base leading-none xl:text-xl"> {data["1st"]}</p>
          </div>
          <Separator className="my-6" />

          <div className="align-center -mt-1 flex flex-1 flex-col items-center justify-center gap-1">
            <p className="text-sm font-medium leading-none text-primary-200 xl:text-base">
              2<sup>nd</sup>
            </p>
            <p className="text-base leading-none xl:text-xl"> {data["2nd"]}</p>
          </div>
          <Separator className="my-6" />

          <div className="align-center -mt-1 flex flex-1 flex-col items-center justify-center gap-1">
            <p className="text-sm font-medium leading-none text-primary-200 xl:text-base">
              3<sup>rd</sup>
            </p>
            <p className="text-base leading-none xl:text-xl xl:leading-none">
              {" "}
              {data["3rd"]}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PrizeCard;
