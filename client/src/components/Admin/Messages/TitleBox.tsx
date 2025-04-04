"use client";
import { useState } from "react";

export const TitleBox = () => {
  const [isReplied, setIsReplied] = useState("Not-Replied");

  return (
    <div className="mb-8 flex flex-col items-center justify-between gap-5 md:flex-row md:items-end">
      {/* Left Section */}
      <div>
        <button className="mx-auto mb-4 flex items-center gap-2 border-b border-current pb-0.5 text-sm uppercase text-primary-150 hover:text-secondary-200 md:mx-0">
          <span className="text-lg">&larr;</span>
          <span>BACK</span>
        </button>
        <p className="bg-gradient-to-r from-primary-400 to-secondary-200 bg-clip-text text-center text-3xl font-bold uppercase text-transparent md:text-left md:text-5xl">
          MESSAGES
        </p>
      </div>
    </div>
  );
};
