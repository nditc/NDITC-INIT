"use client";

import { useState } from "react";
import { FiEdit2, FiSave, FiX, FiPlus, FiTrash2 } from "react-icons/fi";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../../../color.config";
import { toast } from "react-toastify";
import fetchJSON from "@/api/fetchJSON";
import reqs from "@/api/requests";

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

const EditSchedule = () => {
  const [scheduleData, setScheduleData] = useState<DaySchedule[]>([
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
  ]);

  const [editingDayIndex, setEditingDayIndex] = useState<number | null>(null);
  const [editingEventIndex, setEditingEventIndex] = useState<number | null>(
    null,
  );
  const [editDayData, setEditDayData] = useState<Partial<DaySchedule>>({});
  const [editEventData, setEditEventData] = useState<Partial<Event>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [newEventDayIndex, setNewEventDayIndex] = useState<number | null>(null);
  const [newEventData, setNewEventData] = useState<Partial<Event>>({
    title: "",
    time: "",
    location: "",
  });

  const handleEditDay = (dayIndex: number) => {
    setEditingDayIndex(dayIndex);
    setEditDayData({ date: scheduleData[dayIndex].date });
  };

  const handleEditEvent = (dayIndex: number, eventIndex: number) => {
    setEditingEventIndex(eventIndex);
    setEditingDayIndex(dayIndex);
    setEditEventData({ ...scheduleData[dayIndex].events[eventIndex] });
  };

  const handleCancelEdit = () => {
    setEditingDayIndex(null);
    setEditingEventIndex(null);
    setEditDayData({});
    setEditEventData({});
    setNewEventDayIndex(null);
    setNewEventData({
      title: "",
      time: "",
      location: "",
    });
  };

  const handleDayChange = (field: string, value: string) => {
    setEditDayData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEventChange = (field: string, value: string) => {
    setEditEventData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNewEventChange = (field: string, value: string) => {
    setNewEventData((prev) => ({ ...prev, [field]: value }));
  };

  const saveDayEdit = () => {
    if (editingDayIndex === null) return;

    setScheduleData((prev) => {
      const newData = [...prev];
      newData[editingDayIndex] = {
        ...newData[editingDayIndex],
        ...editDayData,
      };
      return newData;
    });

    handleCancelEdit();
  };

  const saveEventEdit = () => {
    if (editingDayIndex === null || editingEventIndex === null) return;

    setScheduleData((prev) => {
      const newData = [...prev];
      newData[editingDayIndex].events[editingEventIndex] = {
        ...newData[editingDayIndex].events[editingEventIndex],
        ...editEventData,
      };
      return newData;
    });

    handleCancelEdit();
  };

  const addNewEvent = () => {
    if (newEventDayIndex === null) return;

    if (
      !newEventData.title?.trim() ||
      !newEventData.time?.trim() ||
      !newEventData.location?.trim()
    ) {
      toast.error("Please fill in all required fields (title, time, location)");
      return;
    }

    setScheduleData((prev) => {
      const newData = [...prev];
      newData[newEventDayIndex] = {
        ...newData[newEventDayIndex],
        events: [
          ...newData[newEventDayIndex].events,
          {
            title: newEventData?.title.trim(),
            time: newEventData?.time.trim(),
            location: newEventData?.location.trim(),
          },
        ],
      };
      return newData;
    });

    setNewEventData({
      title: "",
      time: "",
      location: "",
    });
    setNewEventDayIndex(null);
    setEditingDayIndex(null);
  };
  const deleteEvent = (dayIndex: number, eventIndex: number) => {
    if (editingDayIndex === dayIndex && editingEventIndex === eventIndex) {
      handleCancelEdit();
    }

    setScheduleData((prev) => {
      const newData = [...prev];
      newData[dayIndex] = {
        ...newData[dayIndex],
        events: [
          ...newData[dayIndex].events.slice(0, eventIndex),
          ...newData[dayIndex].events.slice(eventIndex + 1),
        ],
      };
      return newData;
    });

    toast.success("Event deleted successfully");
  };

  const saveAllChanges = async () => {
    setIsSaving(true);
    try {
      await fetchJSON(
        reqs.SET_PERMIT,
        {
          credentials: "include",
          method: "PATCH",
        },
        {
          permitName: "schedule",
          permitType: JSON.stringify(scheduleData),
        },
      );

      toast.success("Settings Updated!");
    } finally {
      setIsSaving(false);
    }
  };

  const startAddingEvent = (dayIndex: number) => {
    setNewEventDayIndex(dayIndex);
    setEditingDayIndex(dayIndex);
    setNewEventData({
      title: "",
      time: "",
      location: "",
    });
  };

  return (
    <div className="container-c mt-16 py-[81px]">
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <p className="text-2xl font-bold text-primary-200 md:text-3xl">
            Edit Schedule
          </p>
          <p className="mt-2 text-primary-150">
            Click on any field to edit. Press save to confirm changes.
          </p>
        </div>
        <button
          onClick={saveAllChanges}
          disabled={isSaving}
          className="mt-4 flex items-center gap-2 rounded-md bg-primary-400 px-6 py-2 font-medium text-white hover:bg-primary-500 disabled:opacity-50 md:mt-0"
        >
          {isSaving ? (
            <span className="animate-spin">↻</span>
          ) : (
            <FiSave className="inline" />
          )}
          Save All Changes
        </button>
      </div>

      {scheduleData.map((day, dayIndex) => (
        <div key={dayIndex} className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-xl font-bold text-primary-200">{day.title}</p>
              {editingDayIndex === dayIndex &&
              editingEventIndex === null &&
              newEventDayIndex === null ? (
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={editDayData.date || ""}
                    onChange={(e) => handleDayChange("date", e.target.value)}
                    className="text-primary-100 rounded border border-primary-400 bg-primary-500 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-300"
                  />
                  <button
                    onClick={saveDayEdit}
                    className="hover:text-primary-100 flex items-center gap-1 rounded bg-primary-500 px-2 py-1 text-primary-200"
                  >
                    <FiSave size={14} />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="hover:text-primary-100 flex items-center gap-1 rounded bg-primary-500 px-2 py-1 text-primary-200"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-primary-150">{day.date}</span>
                  <button
                    onClick={() => handleEditDay(dayIndex)}
                    className="hover:text-primary-100 flex items-center gap-1 rounded bg-primary-500 px-2 py-1 text-primary-200"
                  >
                    <FiEdit2 size={14} />
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => startAddingEvent(dayIndex)}
              disabled={newEventDayIndex !== null}
              className={`text-primary-50 flex items-center gap-1 rounded bg-primary-400 px-3 py-1 hover:bg-primary-500 ${
                newEventDayIndex !== null ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <FiPlus size={14} /> Add Event
            </button>
          </div>

          <div className="overflow-hidden rounded-lg border border-primary-500 bg-primary-600 shadow-lg">
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

                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-primary-150">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-500 bg-primary-600">
                  {day.events.map((event, eventIndex) => (
                    <tr
                      key={`${dayIndex}-${eventIndex}`}
                      className="transition-colors hover:bg-primary-550"
                    >
                      {editingDayIndex === dayIndex &&
                      editingEventIndex === eventIndex ? (
                        <>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editEventData.title || ""}
                              onChange={(e) =>
                                handleEventChange("title", e.target.value)
                              }
                              className="text-primary-100 w-full rounded border border-primary-400 bg-primary-500 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-300"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editEventData.time || ""}
                              onChange={(e) =>
                                handleEventChange("time", e.target.value)
                              }
                              className="text-primary-100 w-full rounded border border-primary-400 bg-primary-500 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-300"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editEventData.location || ""}
                              onChange={(e) =>
                                handleEventChange("location", e.target.value)
                              }
                              className="text-primary-100 w-full rounded border border-primary-400 bg-primary-500 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-300"
                            />
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={saveEventEdit}
                                className="hover:text-primary-100 flex items-center gap-1 rounded bg-primary-500 px-2 py-1 text-primary-200"
                              >
                                <FiSave size={14} /> Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="hover:text-primary-100 flex items-center gap-1 rounded bg-primary-500 px-2 py-1 text-primary-200"
                              >
                                <FiX size={14} /> Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="text-primary-100 whitespace-nowrap px-6 py-4">
                            {event.title}
                          </td>
                          <td className="text-primary-100 whitespace-nowrap px-6 py-4">
                            {event.time}
                          </td>
                          <td className="text-primary-100 whitespace-nowrap px-6 py-4">
                            {event.location}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() =>
                                  handleEditEvent(dayIndex, eventIndex)
                                }
                                className="hover:text-primary-100 flex items-center gap-1 rounded bg-primary-500 px-2 py-1 text-primary-200"
                              >
                                <FiEdit2 size={14} /> Edit
                              </button>
                              <button
                                onClick={() =>
                                  deleteEvent(dayIndex, eventIndex)
                                }
                                className="flex items-center gap-1 rounded bg-primary-500 px-2 py-1 text-red-300 hover:text-red-200"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {newEventDayIndex === dayIndex && (
                    <tr key="new-event" className="bg-primary-550">
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          placeholder="Event title"
                          value={newEventData.title || ""}
                          onChange={(e) =>
                            handleNewEventChange("title", e.target.value)
                          }
                          className="text-primary-100 w-full rounded border border-primary-400 bg-primary-500 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-300"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          placeholder="Time"
                          value={newEventData.time || ""}
                          onChange={(e) =>
                            handleNewEventChange("time", e.target.value)
                          }
                          className="text-primary-100 w-full rounded border border-primary-400 bg-primary-500 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-300"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          placeholder="Location"
                          value={newEventData.location || ""}
                          onChange={(e) =>
                            handleNewEventChange("location", e.target.value)
                          }
                          className="text-primary-100 w-full rounded border border-primary-400 bg-primary-500 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-300"
                        />
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={addNewEvent}
                            className="hover:text-primary-100 flex items-center gap-1 rounded bg-primary-500 px-2 py-1 text-primary-200"
                          >
                            <FiPlus size={14} /> Add
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="hover:text-primary-100 flex items-center gap-1 rounded bg-primary-500 px-2 py-1 text-primary-200"
                          >
                            <FiX size={14} /> Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditSchedule;
