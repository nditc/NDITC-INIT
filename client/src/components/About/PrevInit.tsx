"use client";

import React, { useState } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { BsCalendar } from "react-icons/bs";

const prevInits = [
  {
    name: "Init 1.0",
    time: "November, 2018",
    version: 1,
    description: `INIT 1.0 debuted with workshops, robotics competitions, and the first college-level Hackathon. Participants demonstrated technical skills in a high-energy environment, making the event a milestone for tech talent and innovation.`,
  },
  {
    name: "Init 2.0",
    version: 2,
    time: "September, 2019",

    description: `INIT 2.0 showcased advancing technology through events like Clash Bots, Copter Rush, and Truss Challenge. Tech enthusiasts tackled mind-bending challenges, with big prizes rewarding their efforts. The event provided a glimpse into future innovations.`,
  },
  {
    name: "Init 3.0",
    version: 3,
    time: "March, 2023",

    description: `After a long COVID-19 break, NDITC hosted INIT 3.0 with a fresh redesign. Held from March 2-4, 2023, it featured events like Spot N Go, Soccer Wheels, and Robo War. Attendees faced exciting challenges, competing for big prizes in a dynamic and engaging tech fest.`,
  },
  {
    name: "Init 4.0",
    version: 4,
    time: "May, 2024",

    description: `NDITC_INIT 4.0, hosted by NDITC, brought together innovation, coding, and creativity. This edition featured thrilling competitions, hands-on workshops, and tech talks. Participants showcased skills in programming, robotics, AI, and cybersecurity while networking with industry experts. A hub for tech enthusiasts, it shaped the future of technology.`,
  },
];

const PrevInit = () => {
  const [select, setSelect] = useState<number>(0);
  return (
    <>
      {/* <div className="container-c"> */}
      <h2 className="title title-top">PREVIOUS INIT </h2>
      {/* <div className="flex flex-col gap-10">
          <div className="grad-card w-full max-w-[450px] overflow-hidden rounded-xl shadow-md">
            <img className="h-[250px] w-full" src="/about.jpg " alt="" />
            <div className="m-8">
              <div className="flex items-center gap-3">
                <h2 className="Bebas text-4xl text-primary-150">INIT 4.0</h2>{" "}
                <div className="-mt-1 rounded-full bg-primary-450 px-3 py-1 text-base font-semibold">
                  2018
                </div>
              </div>
              <p className="mb-2 mt-2 border-l-4 border-primary-450 pl-4 text-white/65">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio
                maiores nostrum, ducimus asperiores vitae inventore perferendis
                ad itaque praesentium laudantium et alias ipsa, ut, sint dolorem
                blanditiis placeat? Tempora aperiam voluptatum praesentium?
                Consequuntur perspiciatis dolorem nemo corporis ipsum possimus,
                pariatur impedit? Dolor eius
              </p>
            </div>
          </div>
        </div> */}
      <div className="container-c flex flex-col gap-8 pb-8 md:flex-row">
        {prevInits
          .slice(0, 4)
          .map(({ version, name, description, time }, index) => (
            <div
              onMouseEnter={() => setSelect(version)}
              onMouseLeave={() => setSelect(0)}
              onClick={() => setSelect(version)}
              key={version}
              className={`group relative grid h-[450px] place-items-center overflow-hidden rounded-xl border border-white/5 bg-secondary-700 shadow-xl transition-all delay-[50ms] duration-500 ${select === version ? "md:basis-3/4" : "md:basis-1/4"} `}
            >
              <img
                className={`absolute left-0 top-0 h-full w-full transition duration-300`}
                src={`/prevInit/bg/${version}.png`}
                alt=""
              />

              <div
                className={`absolute bottom-0 right-0 z-20 flex flex-col items-center justify-center gap-1.5 bg-secondary-700/85 px-2.5 py-4 backdrop-blur-lg transition`}
              >
                {/* <img className="w-24" src="/INIT_Icon.svg" alt="" /> */}

                <p
                  className={`hover mt-1.5 text-xl font-bold transition ${select === version ? "opacity-75" : "opacity-100"} `}
                >
                  {name}
                </p>
                <p
                  className={`hover text-base text-white/80 transition ${select === version ? "opacity-75" : "opacity-100"} `}
                >
                  <BiCalendarEvent className="icn-inline" />
                  {"  "}
                  {time}
                </p>
                <p
                  className={`max-w-[625px] overflow-hidden text-center text-sm opacity-75 transition-all duration-500 ${select === version ? "max-h-[300px]" : "max-h-0"}`}
                >
                  {description}
                </p>
              </div>
            </div>
          ))}
      </div>
      {/* </div> */}
    </>
  );
};

export default PrevInit;
