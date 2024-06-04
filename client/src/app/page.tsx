import HorizontalInfiniteScroll from "./components/HorizontalInfiniteScroll";
import { SpotlightBG } from "./components/SpotlightBG";
import Timer from "./components/Timer";

export default function Home() {
  return (
    <main>
      <SpotlightBG />
      <Timer />
      <HorizontalInfiniteScroll />
    </main>
  );
}
