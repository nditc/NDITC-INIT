"use client";

import { motion } from "framer-motion";
import { Spotlight } from "./Spotlight";
import ExtendedColors from "../../../../color.config";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function SpotlightBG() {
  const [mounted, setMounted] = useState(false);

  const { setTheme, resolvedTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
    scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [stairs, setStairs] = useState(false);

  const stairImageURL =
    resolvedTheme === "dark" ? "/Polygon 1.svg" : "/Polygon 1 White.svg";

  if (!mounted) {
    return <div className="h-screen w-screen" />;
  }

  return (
    <div className="bg-grid-white/[0.02] relative flex h-screen w-full items-center justify-center overflow-hidden bg-white antialiased dark:bg-[#141028] md:items-center md:justify-center">
      {/* <img
        className="absolute left-0 top-0 -z-10 h-screen w-screen opacity-5"
        src="/net.png"
      ></img> */}
      <Spotlight
        className="-top-40 left-0 md:-top-40 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />
      <div className="relative z-10 mt-24 flex max-w-[500px] flex-col items-center justify-center px-4 md:mt-40">
        <motion.img
          initial={{ opacity: 0.0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          src={
            resolvedTheme === "dark" ? "/INIT_Logo.svg" : "/INIT_Logo_White.svg"
          }
          alt="Logo"
          className="relative z-10 max-h-[60vh] w-[87.5%] md:w-fit"
        />
        <div className="z-30 mt-10 flex w-full gap-2 px-8 sm:gap-4">
          <button
            className="btn-prim Bebas flex-1 cursor-pointer rounded-full bg-primary-350 px-4 py-2.5 sm:px-8 md:text-xl"
            type="button"
          >
            Register Now →
          </button>
          <button
            className="btn-prim Bebas flex-1 cursor-pointer rounded-full bg-secondary-400 px-4 py-2.5 before:bg-secondary-600 sm:px-8 md:text-xl"
            type="button"
          >
            Learn More
          </button>
        </div>
        <div className="relative flex h-40 w-screen -translate-y-5 flex-col items-center justify-center md:w-[70vw]">
          <motion.img
            src={stairImageURL}
            alt=""
            className="absolute w-[70%] md:w-[60%]"
            initial={stairs ? { opacity: 1, y: -26 } : { opacity: 0.0, y: 0 }}
            animate={{ opacity: 1, y: "-95%" }}
            transition={{
              delay: 1.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
          />
          <motion.img
            src={stairImageURL}
            alt=""
            className="absolute w-[83%] md:w-[75%]"
            initial={stairs ? { opacity: 1, y: -74 } : { opacity: 0.0, y: 0 }}
            animate={{ opacity: 1, y: "-40%" }}
            transition={{
              delay: 1.2,
              duration: 0.8,
              ease: "easeInOut",
            }}
          />
          <motion.img
            src={stairImageURL}
            alt=""
            className="absolute w-[95%] md:w-[90%]"
            initial={stairs ? { opacity: 1, y: -146 } : { opacity: 0.0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.1,
              duration: 0.8,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
}
