import React from "react";
import { SpotlightBG } from "../../components/ui/Spotlight/SpotlightBG";
import { Spotlight } from "../../components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../color.config";

const page = () => {
  return (
    <main>
      <div className="relative flex h-screen w-full max-w-[100vw] items-center justify-center overflow-hidden">
        {" "}
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill={ExtendedColors.primary["200"]}
        />
        <h1 className="Inter GradText text-6xl font-bold md:text-7xl xl:text-8xl">
          EVENTS
        </h1>
      </div>
    </main>
  );
};

export default page;
