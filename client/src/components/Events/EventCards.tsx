"use client";

import React, { useLayoutEffect, useRef } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { PiSignIn } from "react-icons/pi";
import Tag from "./Tag";

import { CgCalendar } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";

import { separateLastWord } from "@/utils/xstring";
import { capitalCase } from "change-case";
import _ from "lodash";
import Link from "next/link";
import { IoIosGlobe } from "react-icons/io";
import { FiGlobe } from "react-icons/fi";
import { reqImgWrapper } from "@/api/requests";
import { useRouter } from "next/navigation";

const DummyData = {
  title: "CICADA 3301",
  desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, sapiente.",
  action: "Register",
  eventId: "",
};

type props = {
  className?: string;
  icon?: React.ReactNode;
  data?: any;
  type?: "segment" | "event";
};

const EventCards = ({ className, icon, data, type }: props) => {
  // Hooks
  const movingDivRef = useRef<HTMLDivElement>(null);
  const contDivRef = useRef<HTMLDivElement>(null);
  const clickDivRef = useRef<HTMLDivElement>(null);
  const Router = useRouter();

  //Data Manipulation
  const [firstPart, lastPart] = separateLastWord(data?.name || "Cicada 3301");

  // Functions
  const mouseTrackedLightEffect = (e: any) => {
    if (movingDivRef.current && contDivRef.current && clickDivRef.current) {
      movingDivRef.current.style.left =
        e.clientX - contDivRef.current.getBoundingClientRect().left - 10 + "px";
      movingDivRef.current.style.top =
        e.clientY - contDivRef.current.getBoundingClientRect().top - 10 + "px";
    }
  };
  const onClickLightEffect = (e: any) => {
    if (movingDivRef.current && contDivRef.current && clickDivRef.current) {
      clickDivRef.current.style.left =
        e.clientX - contDivRef.current.getBoundingClientRect().left - 10 + "px";
      clickDivRef.current.style.top =
        e.clientY - contDivRef.current.getBoundingClientRect().top - 10 + "px";
      clickDivRef.current.style.transform = "scale(10)";
    }
  };
  const resetOnClickLightEffect = (e: any) => {
    clickDivRef.current && (clickDivRef.current.style.transform = "scale(0)");
  };

  let link = "/";

  if (type === "segment") {
    link = "/events/#s" + data.id;
  } else {
    link = "/events/" + data.value;
  }

  //useEffects
  useLayoutEffect(() => {
    window.addEventListener("mousemove", mouseTrackedLightEffect);
    return () => {
      window.removeEventListener("mousemove", mouseTrackedLightEffect);
    };
  }, []);
  console.log(data);

  return (
    <div
      onMouseDown={onClickLightEffect}
      onMouseUp={resetOnClickLightEffect}
      onMouseLeave={resetOnClickLightEffect}
      className={
        "relative z-20 h-[330px] w-full overflow-hidden rounded-xl " + className
      }
      onClick={(e) => {
        e.stopPropagation();
        Router.push(link);
      }}
    >
      {/* Some Blank Divs for Cool Effects */}

      <div
        ref={movingDivRef}
        className="pointer-events-none absolute -left-[1000] -top-[1000] z-50 h-32 w-32 scale-[4] rounded-full bg-gradient-radial from-primary-150/15 to-[transparent] blur-xl transition"
      ></div>
      <div
        ref={clickDivRef}
        className="pointer-events-none absolute -left-[1000] -top-[1000] z-50 h-32 w-32 scale-0 rounded-full bg-gradient-radial from-primary-150/15 to-[transparent] transition"
      ></div>
      {/* Backdrop Image */}
      <img
        src={reqImgWrapper(data.image) || ""}
        className="absolute -bottom-[90px] -right-[100px] -z-10 h-full w-3/4 rotate-[16deg] rounded-xl opacity-15"
        alt=""
      />
      {/* Inside  */}
      <div
        ref={contDivRef}
        className="EventCardGrad relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-white/10 p-6 align-bottom transition xsm:p-8"
      >
        <div className="mb-2 flex w-full items-start justify-between gap-3">
          {type === "segment" ? icon : null}
          <div className="flex items-center gap-3">
            <FaExternalLinkAlt className="opacity-15" />
          </div>
          {/* tags */}
          {type === "event" ? (
            <div className="flex gap-2">
              {data.fee === "0" ? (
                <Tag text={"Free"} type={"free"} />
              ) : data.fee ? (
                <Tag text={data.fee} type={"fee"} />
              ) : null}
              {data.team ? <Tag text={"Team"} type={"team"} /> : null}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          {/*Title */}
          <h3 className="Inter w-[max(200px,_40%)] text-2xl font-bold text-primary-150 sm:text-3xl">
            {firstPart} <span className="text-primary-350">{lastPart}</span>
          </h3>

          {/* Date & Location */}
          {type === "event" ? (
            <div className="my-1 flex gap-3">
              <p className="flex items-center gap-1">
                <CgCalendar className="text-xl text-primary-350/80" />
                <span className="text-sm text-primary-150/80">
                  {new Date(data.date).toLocaleDateString("en-GB", {
                    dateStyle: "medium",
                  })}
                </span>
              </p>
              <p className="flex items-center gap-1">
                {data.type === "offline" ? (
                  <FaLocationDot className="text-xl text-primary-350/80" />
                ) : (
                  <FiGlobe className="text-xl text-primary-350/80" />
                )}
                <span className="text-sm font-semibold text-primary-150/80">
                  {capitalCase(data.type)}
                </span>
              </p>
            </div>
          ) : null}

          {/*Description */}
          <p className="line-clamp-2 w-[max(250px,_50%)] text-sm text-primary-150 opacity-70">
            {data.description}
          </p>

          {/*Buttons (If component type is event then we eill show the Register Button.) */}
          <div className="z-10 flex w-full gap-2 xsm:w-auto xsm:gap-3">
            {type === "event" ? (
              <Link
                prefetch={false}
                href={`/register/event/${data.value}`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="btn-prim leading-0 mt-2 w-full basis-[50%] px-4 pb-2.5 pt-2 text-sm xsm:basis-[150px] xsm:px-6"
              >
                {_.isEmpty(JSON.parse(data.submission)) // This Line checks if submission is on
                  ? "Register"
                  : "Submit"}{" "}
                <PiSignIn className="icn-inline" />
              </Link>
            ) : null}
            <Link
              href={link}
              className={
                "btn-prim leading-0 mt-2 basis-[50%] px-5 pb-2.5 pt-2 text-sm xsm:basis-[150px] xsm:px-6 " +
                (type === "event"
                  ? "bg-secondary-400 before:bg-secondary-500"
                  : "")
              }
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCards;
