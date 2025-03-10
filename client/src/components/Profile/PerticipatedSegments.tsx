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
import EventCardProfile from "./EventCardProfile";

const ParticipatedSegments: React.FC = () => {
  const userData = useContext(UserContext);

  return (
    <div className="my-10">
      <ProfileTitle title="Participated Events" />

      {isArray(userData.clientEvents) &&
      userData.clientEvents.slice(2).length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(isArray(userData.clientEvents)
            ? userData.clientEvents.slice(2)
            : []
          ).map((name: any, index: number) => (
            <EventCardProfile name={name} index={index} key={name} />
          ))}
        </div>
      ) : (
        <div className="mt-4 grid h-32 min-h-32 w-full place-items-center rounded-2xl bg-gradient-to-tl from-primary-550 to-primary-600 p-5 text-center text-white/60">
          You haven't participated in any event yet.
        </div>
      )}
    </div>
  );
};

export default ParticipatedSegments;
