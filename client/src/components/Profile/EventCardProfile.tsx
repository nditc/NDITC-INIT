import React, { useContext, useState } from "react";
import ProfileTitle from "./ProfileTitle";
import { FaCalendar, FaExternalLinkAlt, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { TiTick } from "react-icons/ti";
import UserContext from "@/context/UserContext";
import { isArray } from "lodash";
import fetchJSON from "@/api/fetchJSON";
import reqs, { reqImgWrapper } from "@/api/requests";
import useFetch from "@/hooks/useFetch";
import { getEventKey } from "@/api/events";
import Loading from "../ui/LoadingWhite";
import { TbCoinTakaFilled } from "react-icons/tb";
import EventContext from "@/context/EventContext";
import { BsPeople } from "react-icons/bs";

const EventCardProfile = ({ name, index }: { name: string; index: number }) => {
  const userData = useContext(UserContext);
  const events = useContext(EventContext);

  const [teamData] = useFetch(
    {
      fn: async () => {
        if (events[name].team) {
          return await fetchJSON(
            reqs.FIND_TEAM_INFO + userData.ParEvent.teamName[name],
            {
              credentials: "include",
            },
          );
        }
      },
    },
    [events],
  );

  return (
    <div
      key={index}
      className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-tl from-secondary-700 to-primary-600 p-7 text-white backdrop-blur-md"
    >
      <img
        src={reqImgWrapper(events[name].image) || ""}
        className="absolute -bottom-[50px] -right-[100px] -z-10 h-full w-3/4 rotate-[16deg] rounded-xl opacity-15"
        alt=""
      />
      <div className="grid h-full">
        <div className="flex flex-col gap-2">
          <p className="text-center text-2xl font-semibold text-primary-150 md:text-left">
            {events[name].name}
          </p>
          {events[name].paid ? (
            <div className="flex items-center justify-start gap-2 text-white/80">
              Payment Verification:
              <div
                className={`inline-flex rounded-full py-1 pl-2 pr-3 text-xs font-semibold text-white ${
                  userData.ParEvent.paidEvent[name] === 1
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                <div className="mx-auto flex items-center gap-1">
                  <TbCoinTakaFilled className="h-4 w-4" />
                  <span>
                    {userData.ParEvent.paidEvent[name] ? "Cofirmed" : "Pending"}
                  </span>
                </div>
              </div>
            </div>
          ) : null}
          {events[name].submission !== "{}" ? (
            <div className="flex items-center justify-start gap-2 text-white/80">
              Submission:
              {JSON.parse(events[name].submission)
                .name.split("&&&&")
                .map((n: any, i: number) => {
                  return (
                    <Link
                      key={i}
                      className="text-xs text-primary-300 hover:underline md:text-sm"
                      target="_blank"
                      href={userData.ParEvent.SubLinks[name].split("&&&&")[i]}
                    >
                      {n} <FaExternalLinkAlt className="icn-inline" />
                    </Link>
                  );
                })}
            </div>
          ) : null}
          {events[name].team && teamData ? (
            <>
              <div className="items-center justify-start gap-2 text-white/80">
                <div className="text-bold text-lg text-primary-150">
                  {"  "}
                  {userData.ParEvent.teamName[name]}
                </div>
                <ul className="ml-1 list-inside list-[circle] break-all marker:text-primary-150">
                  <li key={index}>
                    {userData.fullName} -{" "}
                    <span className="text-sm text-primary-200">Leader</span>
                  </li>
                  {JSON.parse(teamData.members).map(
                    (memData: any, index: number) => {
                      return <li key={index}>{memData.fullName}</li>;
                    },
                  )}
                </ul>
              </div>
            </>
          ) : null}
        </div>

        <div className="mt-4 flex justify-between gap-2 self-end justify-self-end">
          <Link
            href={"/events/" + name}
            className="rounded-full bg-primary-400 px-6 py-2.5 text-sm text-white transition hover:bg-primary-450"
          >
            About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCardProfile;
