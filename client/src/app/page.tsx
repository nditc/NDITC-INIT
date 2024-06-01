import HorizontalInfiniteScroll from "./components/HorizontalInfiniteScroll";
import { SpotlightBG } from "./components/SpotlightBG";
import Timer from "./components/Timer";

export default function Home() {
  return (
    <main className="dark:bg-[#141028]">
      <SpotlightBG />
      <Timer />
      <HorizontalInfiniteScroll />
    </main>
  );
}
