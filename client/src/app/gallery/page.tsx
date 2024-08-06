// import { lightColor } from "../../../color.config";
import ExtendedColors from "../../../color.config";
import { Spotlight } from "../../components/ui/Spotlight/Spotlight";

const page = () => {
  return (
    <main className="bg-grid-white/[0.02] relative flex h-screen w-full items-center justify-center overflow-hidden bg-white antialiased dark:bg-[#141028] md:mb-10 md:items-center md:justify-center">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />
    </main>
  );
};

export default page;
