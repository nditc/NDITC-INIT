import React from "react";
import { BiDollar } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";

const Tag = ({
  text,
  type,
}: {
  text: string;
  type: "fee" | "team" | "free";
}) => {
  return (
    <div
      className={`Inter flex h-7 items-center justify-start gap-2 rounded-full bg-primary-350 ${type === "free" ? "pl-4 opacity-80" : "pl-1"} pr-4 font-medium ${type === "fee" ? "bg-primary-350" : type === "free" ? "bg-secondary-400" : "bg-primary-600"}`}
    >
      {type !== "free" ? (
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full bg-primary-200 pt-1 text-sm text-primary-450/75`}
        >
          {type === "team" ? (
            <FaPeopleGroup className="-mt-1 text-base" />
          ) : (
            "৳"
          )}
        </div>
      ) : null}
      <p className="text-white/75">{text}</p>
    </div>
  );
};

export default Tag;
