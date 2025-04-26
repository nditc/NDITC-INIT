"use client";
 
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";

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
  const scheduleData: DaySchedule[] = [
    {
      title: "Day 1",
      date: "2023-10-15",
      events: [
        {
          title: "Opening Ceremony",
          time: "09:00 AM",
          location: "Main Hall",
        },
        {
          title: "Workshop Session",
          time: "11:00 AM",
          location: "Room A",
        },
      ],
    },
    {
      title: "Day 2",
      date: "2023-10-16",
      events: [
        {
          title: "Keynote Speech",
          time: "10:00 AM",
          location: "Main Hall",
        },
        {
          title: "Panel Discussion",
          time: "02:00 PM",
          location: "Grand Ballroom",
        },
        {
          title: "Networking Event",
          time: "05:30 PM",
          location: "Terrace Lounge",
        },
      ],
    },
    {
      title: "Day 3",
      date: "2023-10-17",
      events: [
        {
          title: "Closing Ceremony",
          time: "04:00 PM",
          location: "Main Hall",
        },
      ],
    },
  ];
 

  return (
    <div className="min-h-screen   px-4 sm:px-6 lg:px-8 container-c mt-16 py-[81px]">
      <div className="max-w-6xl mx-auto">
        <div
          className="text-center mb-16"
        >
         <p className="title title-top mb-6">Event Schedule</p>
           
        </div>

        <div
          className="space-y-8"
        >
          {scheduleData.map((day, dayIndex) => (
            <section
              key={dayIndex} 
              className="bg-primary-600 backdrop-blur-sm rounded-xl overflow-hidden border border-secondary-700 shadow-2xl"

            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div>
                    <p className="text-2xl font-bold text-white">{day.title}</p>
                    <div className="flex items-center mt-2 text-primary-200">
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
                    <span className="inline-block bg-primary-600/20 text-primary-200 underline md:px-3 py-1 rounded-full text-sm font-medium">
                      {day.events.length} {day.events.length === 1 ? "Event" : "Events"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {day.events.map((event, eventIndex) => (
                    <div
                      key={eventIndex} 
                      className="bg-secondary-700/50 hover:bg-secondary-700 rounded-lg p-5 transition-all duration-300 border-l-4 border-primary-500"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <p className="text-xl font-semibold text-white">{event.title}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
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
      </div>
    </div>
  );
};

export default SchedulePage;