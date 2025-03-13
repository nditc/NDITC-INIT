import PrevInit from "@/components/About/PrevInit";

const page = () => {
  return (
    <div>
      <main>
        <div className="relative flex h-[60vh] w-full max-w-[100vw] items-center justify-center overflow-hidden">
          {/* <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60"
            fill={ExtendedColors.primary["200"]}
          /> */}
          <img
            alt=""
            src="/about.jpg"
            className="absolute left-0 top-0 -z-10 h-screen w-full opacity-25 blur-sm"
          />
          <h1 className="Inter GradText text-center text-6xl font-bold md:text-7xl 2xl:text-8xl">
            ABOUT US
          </h1>
        </div>
        <div className="tech-bg pt-10">
          <div className="container-c pb-10">
            {/* <h2 className="title">Know About INIT 4.0</h2> */}
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="title my-2 text-left text-primary-200/80">
                  Know About INIT 5.0
                </h2>
                <div className="w-[90vw] rounded-lg bg-gradient-to-br from-secondary-600 to-secondary-700 p-10 shadow-md md:w-[65vw] lg:w-[50vw]">
                  INIT 5.0 is going to be the fifth annual edition of the
                  extravagant fest hosted by Notre Dame Information Technology
                  Club. Every year during the midst of May, the battle for
                  technological greatness puts on new colors, a bragging right
                  for those who thrive for their immense knowledge and skill in
                  the technological world. It’s also the perfect opportunity for
                  those who want to experience the wonders of the modern world
                  where every stroke of keys tells the story of glory, where
                  every cutting-edge of logic, the witchcraft of
                  problem-solving, the swerve of flashy robots and gamers’ sweat
                  reign supreme. Settle in for this 3-day long epic experience
                  and see Beyond the Horizon…
                </div>
              </div>
              <div className="self-end">
                <h2 className="title my-2 text-right text-primary-200/80">
                  Rules and Regulations
                </h2>
                <div className="w-[90vw] self-end rounded-lg bg-secondary-600 p-10 text-right shadow-md md:w-[65vw] lg:w-[50vw]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit repellat voluptatum, a, praesentium deleniti,
                  quo tempore corrupti placeat quaerat maiores quisquam vitae
                  sed laudantium animi eius labore soluta distinctio laborum et.
                  Aliquid dolor saepe cupiditate magni asperiores aut ullam
                  maiores facere assumenda sapiente, quidem ab, libero eos
                  voluptatum, et veritatis? Lorem, ipsum dolor sit amet
                  consectetur adipisicing elit. Odio maiores nostrum, ducimus
                  asperiores vitae inventore perferendis ad itaque praesentium
                  laudantium et alias ipsa, ut, sint dolorem blanditiis placeat?
                  Tempora aperiam voluptatum praesentium? Consequuntur
                  perspiciatis dolorem nemo corporis ipsum possimus, pariatur
                  impedit? Dolor eius iusto quo, adipisci nisi inventore aperiam
                  eos.
                </div>
              </div>
            </div>
          </div>
          <PrevInit />
        </div>
      </main>
    </div>
  );
};

export default page;
