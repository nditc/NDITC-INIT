 
"use client";

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
          title: "Keyndote Speech",
          time: "10:00 AM",
          location: "Main Hall",
        },
        {
          title: "Keynote Speech",
          time: "10:00 AM",
          location: "Main Hall",
        },
        {
          title: "Keynoddte Speech",
          time: "10:00 AM",
          location: "Main Hall",
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
    <div className="container-c mt-16 py-[81px]">
      <div className="mb-8">
      <p className="title title-top mb-6">Event Schedule</p>
      </div>

      <div className="space-y-12">
        {scheduleData.map((day, dayIndex) => (
          <section key={dayIndex} className="bg-primary-600/50 rounded-lg p-6 shadow-lg">
            <div className="mb-6">
              <p className="text-xl font-bold text-primary-200">{day.title}</p>
              <p className="text-primary-150">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="overflow-hidden rounded-lg border border-primary-500">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-primary-500">
                  <thead className="bg-primary-550">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-primary-150">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-primary-150">
                        Time
                      </th> 
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-primary-150">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary-500 bg-primary-600">
                    {day.events.map((event, eventIndex) => (
                      <tr key={eventIndex} className="hover:bg-primary-550/50 transition-colors">
                      <td className="whitespace-nowrap px-6 py-4 text-primary-100">
                        {event.title}
                      </td>
                        <td className="whitespace-nowrap px-6 py-4 text-primary-100">
                          {event.time}
                        </td> 
                        <td className="whitespace-nowrap px-6 py-4 text-primary-100">
                          {event.location}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;
