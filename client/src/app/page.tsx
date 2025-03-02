import { SpotlightBG } from "../components/ui/Spotlight/SpotlightBG";
import Timer from "../components/Home/Timer/Timer";
import Promotional from "@/components/Home/Promotional";
import Schedule from "@/components/Home/Schedule";
import EventGrid from "@/components/Home/EventGrid";
import Contact from "@/components/Home/Contact";
import FAQCont from "@/components/Home/FAQCont";

export default async function Home() {
  return (
    <main>
      <SpotlightBG />
      <Timer />
      <Promotional />
      <div className="GradBGDark h-full pt-16">
        <EventGrid />
        <div className="container-c flex flex-col gap-8 lg:flex-row">
          <FAQCont />
          <Schedule />
        </div>
        <Contact />
      </div>
    </main>
  );
}
