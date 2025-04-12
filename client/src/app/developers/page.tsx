import DevelopersGrid from "@/components/DevelopersGrid";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../color.config";

function App() {
  return (
    <main className="max-w-screen relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />
      <DevelopersGrid />
    </main>
  );
}

export default App;
