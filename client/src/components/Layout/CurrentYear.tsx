"use client";

const CurrentYear = () => {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();

  return (
    <span className="absolute bottom-3 left-3 mt-7 text-xs text-zinc-400 sm:text-center md:text-xs">
      © {currentYear}{" "}
      <a href="/" className="hover:underline">
        NDITC™
      </a>
      . All Rights Reserved.
    </span>
  );
};

export default CurrentYear;
