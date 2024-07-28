import ExtendedColors from "../../../color.config";
import { Spotlight } from "../../components/ui/Spotlight/Spotlight";

const page = () => {
  return (
    <div>
      <main>
        <div className="relative flex h-screen w-full max-w-[100vw] items-center justify-center overflow-hidden">
          {" "}
          {/* <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60"
            fill={ExtendedColors.primary["200"]}
          /> */}
          <img
            src="/about.jpg"
            className="absolute left-0 top-0 -z-10 h-screen w-full object-cover opacity-25 blur-sm"
          />
          <h1 className="Inter GradText text-6xl font-bold md:text-7xl xl:text-8xl">
            ABOUT US
          </h1>
        </div>
        <div className="tech-bg py-10">
          <div className="container">
            <h2 className="title">Know About INIT 4.0</h2>
            <div className="flex flex-col gap-10">
              <div className="bg-secondary-600 w-[90vw] rounded-lg p-10 shadow-md md:w-[65vw] lg:w-[50vw]">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio
                maiores nostrum, ducimus asperiores vitae inventore perferendis
                ad itaque praesentium laudantium et alias ipsa, ut, sint dolorem
                blanditiis placeat? Tempora aperiam voluptatum praesentium?
                Consequuntur perspiciatis dolorem nemo corporis ipsum possimus,
                pariatur impedit? Dolor eius iusto quo, adipisci nisi inventore
                aperiam eos.
              </div>
              <div className="bg-secondary-600 w-[90vw] self-end rounded-lg p-10 text-right shadow-md md:w-[65vw] lg:w-[50vw]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit repellat voluptatum, a, praesentium deleniti, quo
                tempore corrupti placeat quaerat maiores quisquam vitae sed
                laudantium animi eius labore soluta distinctio laborum et.
                Aliquid dolor saepe cupiditate magni asperiores aut ullam
                maiores facere assumenda sapiente, quidem ab, libero eos
                voluptatum, et veritatis?
              </div>
            </div>
          </div>
        </div>

        <div className="GradBGDark bg-opacity-15 py-10">
          <div className="container">
            <h2 className="title">PREVIOUS INIT</h2>
            <div className="flex flex-col gap-10">
              <div className="bg-secondary-600 w-[90vw] rounded-lg p-10 shadow-md md:w-[65vw] lg:w-[50vw]">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio
                maiores nostrum, ducimus asperiores vitae inventore perferendis
                ad itaque praesentium laudantium et alias ipsa, ut, sint dolorem
                blanditiis placeat? Tempora aperiam voluptatum praesentium?
                Consequuntur perspiciatis dolorem nemo corporis ipsum possimus,
                pariatur impedit? Dolor eius iusto quo, adipisci nisi inventore
                aperiam eos.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
