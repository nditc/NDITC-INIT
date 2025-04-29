"use client";

import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import ExtendedColors from "../../../color.config";
import useSettings from "@/hooks/useSettings";
import PageLoading from "@/components/PageLoading";
import Loading from "@/components/ui/LoadingWhite";

interface Event {
  title: string;
  time: string;
  location: string;
}

interface DaySchedule {
  title: string;
  date: string;
  events: Event[];
}

const SchedulePage = () => {
  const [settings, sloading, error] = useSettings([]);
  const schedule: any[] = JSON.parse(settings?.schedule || "{}");
  return (
    <div className="container-c mt-16 min-h-screen px-4 py-[81px] sm:px-6 lg:px-8">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="title title-top Bebas mb-6">Event Schedule</p>
        </div>

        {settings ? (
          <div className="space-y-8">
            {schedule.map((day, dayIndex) => (
              <section
                key={dayIndex}
                className="overflow-hidden rounded-xl border border-secondary-700 bg-primary-600 shadow-2xl backdrop-blur-sm"
              >
                <div className="p-6 sm:p-8">
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {day.title}
                      </p>
                      <div className="mt-2 flex items-center text-primary-200">
                        <FiCalendar className="mr-2" />
                        <span>
                          {new Date(day.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <span className="inline-block rounded-full bg-primary-600/20 py-1 text-sm font-medium text-primary-200 underline md:px-3">
                        {day.events.length}{" "}
                        {day.events.length === 1 ? "Event" : "Events"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {(day.events as any[]).map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className="rounded-lg border-l-4 border-primary-500 bg-secondary-700/50 p-5 transition-all duration-300 hover:bg-secondary-700"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="mb-4 md:mb-0">
                            <p className="text-xl font-semibold text-white">
                              {event.title}
                            </p>
                          </div>
                          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
                            <div className="flex items-center text-primary-200">
                              <FiClock className="mr-2 text-secondary-400" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-primary-200">
                              <FiMapPin className="mr-2 text-primary-400" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        ) : sloading ? (
          <div className="grid min-h-screen w-full max-w-full place-items-center">
            <Loading />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SchedulePage;
