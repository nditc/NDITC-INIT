"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "./ui/aurora-background";

export function Aurora() {
  return (
    <AuroraBackground>
      <div className="relative flex flex-col items-center justify-center px-4 md:mt-36">
        <motion.img
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          src="/INIT_Logo.svg"
          alt=""
        />
        <div className="flex flex-col items-center justify-center -translate-y-5">
          <motion.img
            src="/Polygon 3.svg"
            alt=""
            className="-translate-y-4"
            initial={{ opacity: 0.0, y: 256 }}
            whileInView={{ opacity: 1, y: -24 }}
            transition={{
              delay: 1.1,
              duration: 0.8,
              ease: "easeInOut",
            }}
          />
          <motion.img
            src="/Polygon 2.svg"
            alt=""
            className=""
            initial={{ opacity: 0.0, y: 144 }}
            whileInView={{ opacity: 1, y: -72 }}
            transition={{
              delay: 1.1,
              duration: 0.8,
              ease: "easeInOut",
            }}
          />
          <motion.img
            src="/Polygon 1.svg"
            alt=""
            className=""
            initial={{ opacity: 0.0, y: 0 }}
            whileInView={{ opacity: 1, y: -144 }}
            transition={{
              delay: 1.1,
              duration: 0.8,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </AuroraBackground>
  );
}
