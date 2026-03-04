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
                  Know About INIT 6.0
                </h2>
                <div className="w-[90vw] rounded-lg bg-gradient-to-br from-secondary-600 to-secondary-700 p-10 shadow-md md:w-[65vw] lg:w-[50vw]">
                  Welcome to the future of play and possibility, where algorithms hum like engines of imagination, and every spark of curiosity becomes a prototype for tomorrow. INIT 6.0 fuses code, craft, and competition into a living lab: think lightning-fast programming duels, AI showdowns that rethink intelligence, and robotics arenas where metal and mind collaborate.
                  This is more than a festival. It’s a creative ecosystem where mentors, hackers, artists, and gamers collide to build, battle, and birth the next big thing. Bring your code, your controller, your camera, and your courage. At INIT 6.0, innovation is contagious, creativity is currency, and every click, command, and creation rewrites what’s possible...

                </div>
              </div>
              <div className="self-end">
                <h2 className="title my-2 text-right text-primary-200/80">
                  Fest Protocols
                </h2>
                <div className="w-[90vw] self-end rounded-lg bg-secondary-600 p-10 text-left shadow-md md:w-[65vw] lg:w-[50vw]">
                  <ul className="ml-4 list-[circle] marker:text-primary-150">
                    <li>
                      {" "}
                      Everyone must report to Notre Dame College premises at a
                      specified time.
                    </li>
                    <li> Guardians are allowed. </li>
                    <li>
                      {" "}
                      DRESS CODE: Participants: ID Card (Mandatory), Institution
                      Uniform preferred.
                    </li>
                    <li>
                      {" "}
                      In case your institution didn't provide an ID Card,
                      Institution Uniform is mandatory. Public Notice
                    </li>
                    <li>
                      {" "}
                      Smoking, drugs and narcotics usage are strictly
                      prohibited. Anyone in possession of such items will be
                      immediately banned and may be subjected to legal actions
                    </li>
                    <li>
                      Sharp objects, firearms, spying tools or any other item
                      that may be detrimental to public safety and privacy will
                      be immediately confiscated and may be subjected to legal
                      actions if necessary
                    </li>
                    <li>
                      {" "}
                      No form of harassment, eve-teasing, defamatory behavior,
                      provocations, sexual/intimate acts are allowed.
                    </li>
                    <li>
                      {" "}
                      The participants must comply with the fest organizers and
                      executives.
                    </li>
                    <li>
                      {" "}
                      Everyone must keep their possessions under
                      self-supervision. The executives/organizers will not be
                      held responsible for any lost possessions.
                    </li>
                    <li>
                      {" "}
                      Failure to comply with brought fest protocols will result
                      in disqualification and an immediate ban from the fest.
                    </li>
                    <li>
                      {" "}
                      University students are restricted to participating only
                      in robotics events at INIT 6.0.
                    </li>
                  </ul>
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
