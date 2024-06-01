import HorizontalInfiniteScroll from "./components/HorizontalInfiniteScroll";
import { SpotlightBG } from "./components/SpotlightBG";
import { Aurora } from "./components/aurora";

export default function Home() {
  return (
    <main className="bg-[#141028]">
      <SpotlightBG />
      <HorizontalInfiniteScroll />
    </main>
  );
}
