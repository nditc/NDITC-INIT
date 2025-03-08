"use client";

import { useEffect } from "react";

interface props {
  state: any;
  children: React.ReactNode;
}

const ModalOverlay = ({ state, children }: props) => {
  useEffect(() => {
    if (state) {
      document.querySelector("body")?.classList.add("overflow-y-hidden");
    } else {
      document.querySelector("body")?.classList.remove("overflow-y-hidden");
    }
  }, [state]);
  return (
    <div
      className={
        "fixed inset-0 z-[150] h-full w-full bg-transparent transition-all " +
        (state
          ? "opacity-100 backdrop-blur-lg"
          : "pointer-events-none opacity-0")
      }
    >
      <div
        className={
          "absolute inset-0 z-[60] h-full w-full bg-black transition-transform " +
          (state ? "opacity-40" : "pointer-events-none opacity-0")
        }
      />
      <div className="relative z-[170] mt-[10vh] flex w-full items-start justify-center">
        {children}
      </div>
    </div>
  );
};

export default ModalOverlay;
