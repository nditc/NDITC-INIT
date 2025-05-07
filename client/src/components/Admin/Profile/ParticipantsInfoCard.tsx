"use client";
import useSettings from "@/hooks/useSettings";
import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { TbCoinTaka } from "react-icons/tb";

const ParticipantsInfoCard = () => {
  const [settings, loading] = useSettings();
  const eventCounts = JSON.parse(settings?.eventCountBooth || "{}");
  return (
    <div className="min-h-96 rounded-2xl bg-primary-550 px-2 py-10 text-center text-white shadow-lg md:px-16">
      <div className="inline-flex items-center gap-4 rounded-full bg-secondary-400 py-2 pl-2 pr-5 text-xl font-bold">
        <span className="rounded-full bg-secondary-600 p-3">
          <IoPeople className="text-3xl text-primary-300" />
        </span>
        <span> Booth Participants Info</span>
      </div>
      <div className="ml-10 inline-flex items-center gap-4 rounded-full bg-secondary-400 py-2 pl-2 pr-5 text-xl font-bold">
        <span className="rounded-full bg-secondary-600 p-3">
          <TbCoinTaka className="text-3xl text-primary-300" />
        </span>

        <span>{settings?.totalIncome}</span>
      </div>
      {!loading && settings ? (
        <div className="mt-10">
          <div className="max-h-[75vh] space-y-24 overflow-y-auto px-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-3">
            <div>
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {Object.keys(eventCounts).map((i) => (
                  <li
                    className="flex justify-between gap-8 border-b border-secondary-100/50 py-3 text-xl text-white md:border-b-2"
                    key={i}
                  >
                    <span className="text-white/75">{i}</span>
                    <span className="font-bold">{eventCounts[i]}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div>
              <p className="text-center text-3xl font-bold text-primary-300">
                Olympiads
              </p>
              <ul>
                {[1, 2, 3, 4, 5].map((i) => (
                  <li
                    className="flex justify-between border-b-2 border-secondary-100 py-7 text-2xl font-bold text-white"
                    key={i}
                  >
                    <span>Poster Design </span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
          <div></div>
        </div>
      ) : null}
    </div>
  );
};

export default ParticipantsInfoCard;
