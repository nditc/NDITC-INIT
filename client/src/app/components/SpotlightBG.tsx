"use client";

import { motion } from "framer-motion";
import { Spotlight } from "./ui/Spotlight";
import { lightColor } from "@/utils/color";
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
    return <div className="w-screen h-screen" />;
  }

  return (
    <div className="md:mb-10 h-screen w-full flex items-center justify-center md:items-center md:justify-center dark:bg-[#141028] bg-white antialiased bg-grid-white/[0.02] relative overflow-hidden ">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill={lightColor}
      />
      <div className="relative flex flex-col items-center justify-center px-4 md:mt-36">
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
          className="w-[80%] md:w-fit relative z-10"
        />
        <div className="relative w-screen md:w-[70vw] h-40 flex flex-col items-center justify-center -translate-y-5">
          <motion.img
            src={stairImageURL}
            alt=""
            className="w-[70%] md:w-[60%] absolute"
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
            className="w-[83%] md:w-[75%] absolute"
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
            className="w-[95%] md:w-[90%] absolute"
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
