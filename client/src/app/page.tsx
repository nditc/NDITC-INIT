import EventCards from "../components/Events/EventCards";
import HorizontalInfiniteScroll from "../components/ui/HorizontalInfiniteScroll";
import { SpotlightBG } from "../components/ui/Spotlight/SpotlightBG";
import Timer from "../components/Home/Timer/Timer";
import Promotional from "@/components/Home/Promotional";
import FAQ from "@/components/Home/FAQ";
import Schedule from "@/components/Home/Schedule";
import EventGrid from "@/components/Home/EventGrid";
import Contact from "@/components/Home/Contact";

export default function Home() {
  return (
    <main>
      <SpotlightBG />
      <Timer />
      <Promotional />
      <div className="GradBGDark h-full pt-16">
        <EventGrid />
        <div className="container flex flex-col gap-8 lg:flex-row">
          <FAQ />
          <Schedule />
        </div>
        <Contact />
      </div>
    </main>
  );
}
