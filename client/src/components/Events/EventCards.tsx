"use client";

import React, { useLayoutEffect, useRef } from "react";
import {
  FaExternalLinkAlt,
  FaQuestionCircle,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { PiSignIn } from "react-icons/pi";
import Tag from "./Tag";
import { BsQuestionCircle } from "react-icons/bs";
import { TbMessageCircleQuestion } from "react-icons/tb";
import { CgCalendar } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import Tags from "../Home/Timer/TimerTags";
import { separateLastWord } from "@/utils/xstring";

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

  //useEffects
  useLayoutEffect(() => {
    window.addEventListener("mousemove", mouseTrackedLightEffect);
    return () => {
      window.removeEventListener("mousemove", mouseTrackedLightEffect);
    };
  }, []);

  return (
    <div
      onMouseDown={onClickLightEffect}
      onMouseUp={resetOnClickLightEffect}
      onMouseLeave={resetOnClickLightEffect}
      className={
        "relative z-10 h-[330px] w-full overflow-hidden rounded-xl " + className
      }
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
        src="/event.png"
        className="absolute -bottom-[90px] -right-[100px] -z-10 h-full w-3/4 rotate-[16deg] rounded-xl object-cover opacity-15"
        alt=""
      />

      {/* Inside  */}
      <div
        ref={contDivRef}
        className="EventCardGrad relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-white/10 p-8 align-bottom transition"
      >
        <div className="mb-2 flex w-full items-start justify-between gap-3">
          {type === "segment" ? icon : null}

          <div className="flex items-center gap-3">
            <FaExternalLinkAlt className="opacity-15" />
          </div>

          {/* tags */}
          {type === "event" ? <Tag text="Hello" /> : null}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="Inter max-w-[200px] text-3xl font-bold text-primary-150">
            {firstPart} <span className="text-primary-350">{lastPart}</span>
          </h3>

          {type === "event" ? (
            <div className="my-1 flex gap-3">
              <p className="flex items-center gap-1">
                <CgCalendar className="text-xl text-primary-350/80" />
                <span className="text-sm text-primary-150/80">
                  12 May, 2022
                </span>
              </p>
              <p className="flex items-center gap-1">
                <FaLocationDot className="text-xl text-primary-350/80" />
                <span className="text-sm text-primary-150/80">Online</span>
              </p>
            </div>
          ) : null}

          <p className="max-w-[280px] text-sm text-primary-150 opacity-70">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
            sapiente.
          </p>
          <div>
            <button className="btn-prim leading-0 mt-2 px-8 pb-2.5 pt-1.5 opacity-80">
              Register <PiSignIn className="icn-inline" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCards;
