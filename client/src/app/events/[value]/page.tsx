import { getEvent } from "@/api/events";
import { reqImgWrapper } from "@/api/requests";
import DetailCard from "@/components/Events/DetailCard";
import PrizeCard from "@/components/Events/PrizeCard";
import { capitalCase } from "change-case";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { BsCalendarEvent } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { FiGlobe } from "react-icons/fi";
import { IoMdGift } from "react-icons/io";
import { IoPeople, IoPerson, IoTrophy } from "react-icons/io5";
import { MdEventAvailable } from "react-icons/md";

const Page = async ({ params }: { params: { value: string } }) => {
  const { result } = await getEvent(params.value);
  return (
    <div>
      {" "}
      <div className="relative flex min-h-screen w-full max-w-[100vw] items-center justify-center overflow-hidden">
        <img
          alt=""
          src={reqImgWrapper(result.image) || ""}
          className="absolute left-0 top-0 -z-10 h-full w-full opacity-25 blur-lg"
        />
        <div className="container my-24 flex flex-col sm:my-28 lg:flex-row">
          <div className="mb-4 lg:hidden">
            <Link
              href={"/events#s" + result.id}
              className="border-b border-transparent pb-1 text-xl text-primary-200 hover:border-primary-200"
            >
              ← Back
            </Link>
          </div>
          <div className="h-[40vh] lg:h-auto lg:w-[45%] lg:pr-4 xl:w-1/2">
            <img
              alt=""
              src={reqImgWrapper(result.image) || ""}
              className="h-full w-full rounded-xl shadow-lg lg:h-auto"
            />
          </div>
          <div className="flex flex-col gap-3 lg:w-[55%] lg:gap-6 lg:pl-4 xl:w-1/2">
            <div className="hidden lg:block">
              <Link
                href={"/events#s" + result.id}
                className="border-b border-transparent pb-1 text-xl text-primary-200 hover:border-primary-200"
              >
                ← Back
              </Link>
            </div>
            <h2 className="title Inter mb-4 mt-12 pb-1 text-center text-4xl font-extrabold md:text-5xl lg:mb-0 lg:mt-0 lg:text-left">
              {result.name}
            </h2>

            <div className="flex justify-center gap-3 lg:justify-start lg:gap-6">
              <div
                className={`Inter flex h-10 items-center justify-start gap-2 rounded-full bg-secondary-400/60 pl-1 pr-4 text-xl font-semibold`}
              >
                <div
                  className={`flex h-9 w-9 flex-1 items-center justify-center rounded-full bg-secondary-300 pt-1 text-lg text-white/60`}
                >
                  {result.type === "offline" ? (
                    <FaLocationDot className="-mt-1 text-xl text-white/60" />
                  ) : (
                    <FiGlobe className="-mt-1 text-xl text-white/60" />
                  )}
                </div>

                <p className="text-white/75">{capitalCase(result.type)}</p>
              </div>
              <div className="mr-2 flex items-center gap-2 text-2xl font-semibold text-white/75 lg:mr-0">
                {result.team ? (
                  <>
                    <IoPeople className="text-3xl text-primary-300" />
                    <p>Team</p>
                  </>
                ) : (
                  <>
                    <IoPerson className="text-3xl text-primary-300" />
                    <p>Solo</p>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 flex w-full flex-col items-center gap-3 sm:flex-row lg:mt-0">
              <DetailCard
                icon={
                  <MdEventAvailable className="h-14 w-14 text-primary-300" />
                }
                title={result.type === "online" ? "Deadline" : "Date"}
                text={new Date(result.date).toLocaleDateString("en-GB", {
                  dateStyle: "medium",
                })}
              />
              {result.team ? (
                <DetailCard
                  icon={<IoPeople className="h-14 w-14 text-primary-300" />}
                  title={"Members"}
                  text={`1-${result.maxMember}`}
                />
              ) : null}
            </div>
            <PrizeCard prize={result.prize} />
            <div className="my-6 flex flex-col items-center justify-center sm:flex-row lg:my-0 lg:ml-6 lg:justify-start">
              <div className="flex items-center">
                <h4 className="text-3xl text-primary-200">FEE</h4>
                <div className="mx-3 my-6 block h-1 w-1 rounded-full bg-primary-200"></div>
                <p className="Inter text-center md:text-end">
                  <span className="text-3xl font-semibold text-primary-350">
                    ৳
                  </span>{" "}
                  <span className="ml-2 text-4xl font-semibold text-white/75">
                    {result.fee === "0" ? "Free" : result.fee}
                  </span>{" "}
                </p>
              </div>
              <div className="Inter mx-4 mb-3 text-center text-4xl font-bold text-white/50">
                +
              </div>
              <div className="flex items-center gap-2">
                <IoMdGift className="text-5xl text-primary-350" />
                <p className="text-lg font-semibold leading-[1.2] text-white/75">
                  Gifts, Snacks <br></br> & Lunch
                </p>
              </div>
            </div>
            <div className="z-30 flex w-full gap-2 sm:gap-4">
              <button
                className="btn-prim Bebas flex-1 cursor-pointer rounded-full bg-primary-350 px-4 py-2.5 sm:px-8 md:text-xl"
                type="button"
              >
                Register →
              </button>
              <a
                href="#rules"
                className="btn-prim Bebas flex flex-1 cursor-pointer justify-center rounded-full bg-secondary-400 px-4 py-2.5 before:bg-secondary-600 sm:px-8 md:text-xl"
                type="button"
              >
                RULES ↓
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="GradBGDark h-full">
        <div>
          <div className="border-b border-white/10 py-10">
            <h2 className="title title-top">ABOUT EVENT</h2>
            <p className="container text-white/70">{result.description}</p>
          </div>
          <div id="rules" className="py-16">
            <h2 className="title title-top">RULES AND REGULATIONS</h2>
            <p className="container text-white/70">{result.rules}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
