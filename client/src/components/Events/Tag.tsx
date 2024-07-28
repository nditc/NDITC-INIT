import React from "react";
import { BiDollar } from "react-icons/bi";

const Tag = ({ text }: { text: string }) => {
  return (
    <div className="bg-primary-200 flex h-6 items-center justify-start gap-2 rounded-full pl-1 pr-4">
      <div className="bg-primary-350 flex h-5 w-5 items-center justify-center rounded-full">
        <BiDollar />
      </div>
      <p>{text}</p>
    </div>
  );
};

export default Tag;
