"use client";

import { useState } from 'react';
import { FiEdit2, FiSave, FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Spotlight } from "@/components/ui/Spotlight/Spotlight"; 
import ExtendedColors from '../../../color.config';
import { toast } from 'react-toastify';

interface Event {
  title: string;
  time: string;
  location: string;
  description?: string;
}

interface DaySchedule {
  title: string;
  date: string;
  events: Event[];
}

const EditSchedule = () => { 
  const [scheduleData, setScheduleData] = useState<DaySchedule[]>([
    {
      title: 'Day 1',
      date: '2023-10-15',
      events: [
        {
          title: 'Opening Ceremony',
          time: '09:00 AM',
          location: 'Main Hall',
          description: 'Welcome event for all participants'
        },
        {
          title: 'Workshop Session',
          time: '11:00 AM',
          location: 'Room A',
          description: 'Interactive workshop'
        }
      ]
    },
    {
      title: 'Day 2',
      date: '2023-10-16',
      events: [
        {
          title: 'Keyndote Speech',
          time: '10:00 AM',
          location: 'Main Hall',
          description: 'Featured speaker presentation'
        },
        {
          title: 'Keynote Speech',
          time: '10:00 AM',
          location: 'Main Hall',
          description: 'Featured speaker presentation'
        },
        {
          title: 'Keynoddte Speech',
          time: '10:00 AM',
          location: 'Main Hall',
          description: 'Featured speaker presentation'
        },
      ]
    },
    {
      title: 'Day 3',
      date: '2023-10-17',
      events: [
        {
          title: 'Closing Ceremony',
          time: '04:00 PM',
          location: 'Main Hall',
          description: 'Final remarks and awards'
        }
      ]
    }
  ]);

  const [editingDayIndex, setEditingDayIndex] = useState<number | null>(null);
  const [editingEventIndex, setEditingEventIndex] = useState<number | null>(null);
  const [editDayData, setEditDayData] = useState<Partial<DaySchedule>>({});
  const [editEventData, setEditEventData] = useState<Partial<Event>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [newEventDayIndex, setNewEventDayIndex] = useState<number | null>(null);
  const [newEventData, setNewEventData] = useState<Partial<Event>>({
    title: '',
    time: '',
    location: '',
    description: ''
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
      title: '',
      time: '',
      location: '',
      description: ''
    });
  };

  const handleDayChange = (field: string, value: string) => {
    setEditDayData(prev => ({ ...prev, [field]: value }));
  };

  const handleEventChange = (field: string, value: string) => {
    setEditEventData(prev => ({ ...prev, [field]: value }));
  };

  const handleNewEventChange = (field: string, value: string) => {
    setNewEventData(prev => ({ ...prev, [field]: value }));
  };

  const saveDayEdit = () => {
    if (editingDayIndex === null) return;
    
    setScheduleData(prev => {
      const newData = [...prev];
      newData[editingDayIndex] = {
        ...newData[editingDayIndex],
        ...editDayData
      };
      return newData;
    });
    
    handleCancelEdit();
  };

  const saveEventEdit = () => {
    if (editingDayIndex === null || editingEventIndex === null) return;
    
    setScheduleData(prev => {
      const newData = [...prev];
      newData[editingDayIndex].events[editingEventIndex] = {
        ...newData[editingDayIndex].events[editingEventIndex],
        ...editEventData
      };
      return newData;
    });
    
    handleCancelEdit();
  };

  const addNewEvent = () => {
    if (newEventDayIndex === null) return;
    
    
    if (!newEventData.title?.trim() || !newEventData.time?.trim() || !newEventData.location?.trim()) {
      toast.error('Please fill in all required fields (title, time, location)');
      return;
    }

    setScheduleData(prev => {
      const newData = [...prev];
      newData[newEventDayIndex] = {
        ...newData[newEventDayIndex],
        events: [
          ...newData[newEventDayIndex].events,
          {
            title: newEventData?.title.trim(),
            time: newEventData?.time.trim(),
            location: newEventData?.location.trim(),
            description: newEventData?.description?.trim() || ''
          }
        ]
      };
      return newData;
    });
    
    
    setNewEventData({
      title: '',
      time: '',
      location: '',
      description: ''
    });
    setNewEventDayIndex(null);
    setEditingDayIndex(null);
  };
  const deleteEvent = (dayIndex: number, eventIndex: number) => { 
    if (editingDayIndex === dayIndex && editingEventIndex === eventIndex) {
      handleCancelEdit();
    }
  
    setScheduleData(prev => {
      const newData = [...prev];
      newData[dayIndex] = {
        ...newData[dayIndex],
        events: [
          ...newData[dayIndex].events.slice(0, eventIndex),
          ...newData[dayIndex].events.slice(eventIndex + 1)
        ]
      };
      return newData;
    });
     
    toast.success('Event deleted successfully');
  };

  const saveAllChanges = async () => {
    setIsSaving(true);
    try { 
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saved data:', scheduleData);
      toast.success('Schedule updated successfully!');
    } finally {
      setIsSaving(false);
    }
  };

  const startAddingEvent = (dayIndex: number) => {
    setNewEventDayIndex(dayIndex);
    setEditingDayIndex(dayIndex);
    setNewEventData({
      title: '',
      time: '',
      location: '',
      description: ''
    });
  };

  return (
    <main className="bg-grid-white/[0.02] relative min-h-screen w-full overflow-hidden bg-primary-650 antialiased md:mb-10 md:items-center md:justify-start">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />

      <div className="container-c py-[81px] mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-primary-200">Edit Schedule</p>
            <p className="text-primary-150 mt-2">
              Click on any field to edit. Press save to confirm changes.
            </p>
          </div>
          <button
            onClick={saveAllChanges}
            disabled={isSaving}
            className="mt-4 md:mt-0 px-6 py-2 bg-primary-400 hover:bg-primary-500 text-white rounded-md flex items-center gap-2 disabled:opacity-50 font-medium"
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
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <p className="text-xl font-bold text-primary-200">{day.title}</p>
                {editingDayIndex === dayIndex && editingEventIndex === null && newEventDayIndex === null ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={editDayData.date || ''}
                      onChange={(e) => handleDayChange('date', e.target.value)}
                      className="border border-primary-400 rounded px-2 py-1 bg-primary-500 text-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300"
                    />
                    <button
                      onClick={saveDayEdit}
                      className="text-primary-200 hover:text-primary-100 flex items-center gap-1 bg-primary-500 px-2 py-1 rounded"
                    >
                      <FiSave size={14} />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-primary-200 hover:text-primary-100 flex items-center gap-1 bg-primary-500 px-2 py-1 rounded"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-primary-150">{day.date}</span>
                    <button
                      onClick={() => handleEditDay(dayIndex)}
                      className="text-primary-200 hover:text-primary-100 flex items-center gap-1 bg-primary-500 px-2 py-1 rounded"
                    >
                      <FiEdit2 size={14} />
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => startAddingEvent(dayIndex)}
                disabled={newEventDayIndex !== null}
                className={`flex items-center gap-1 px-3 py-1 bg-primary-400 hover:bg-primary-500 text-primary-50 rounded ${
                  newEventDayIndex !== null ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FiPlus size={14} /> Add Event
              </button>
            </div>

            <div className="bg-primary-600 rounded-lg shadow-lg overflow-hidden border border-primary-500">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-primary-500">
                  <thead className="bg-primary-550">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-primary-150 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-primary-150 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-primary-150 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-primary-150 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-primary-150 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-primary-600 divide-y divide-primary-500">
                    {day.events.map((event, eventIndex) => (
                      <tr key={`${dayIndex}-${eventIndex}`} className="hover:bg-primary-550 transition-colors">
                        {editingDayIndex === dayIndex && editingEventIndex === eventIndex ? (
                          <>
                            <td className="px-6 py-4">
                              <input
                                type="text"
                                value={editEventData.title || ''}
                                onChange={(e) => handleEventChange('title', e.target.value)}
                                className="border border-primary-400 rounded px-2 py-1 w-full bg-primary-500 text-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <input
                                type="text"
                                value={editEventData.time || ''}
                                onChange={(e) => handleEventChange('time', e.target.value)}
                                className="border border-primary-400 rounded px-2 py-1 w-full bg-primary-500 text-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <input
                                type="text"
                                value={editEventData.location || ''}
                                onChange={(e) => handleEventChange('location', e.target.value)}
                                className="border border-primary-400 rounded px-2 py-1 w-full bg-primary-500 text-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <input
                                type="text"
                                value={editEventData.description || ''}
                                onChange={(e) => handleEventChange('description', e.target.value)}
                                className="border border-primary-400 rounded px-2 py-1 w-full bg-primary-500 text-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={saveEventEdit}
                                  className="text-primary-200 hover:text-primary-100 flex items-center gap-1 bg-primary-500 px-2 py-1 rounded"
                                >
                                  <FiSave size={14} /> Save
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="text-primary-200 hover:text-primary-100 flex items-center gap-1 bg-primary-500 px-2 py-1 rounded"
                                >
                                  <FiX size={14} /> Cancel
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-primary-100">
                              {event.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-primary-100">
                              {event.time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-primary-100">
                              {event.location}
                            </td>
                            <td className="px-6 py-4 text-primary-100">
                              {event.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={() => handleEditEvent(dayIndex, eventIndex)}
                                  className="text-primary-200 hover:text-primary-100 flex items-center gap-1 bg-primary-500 px-2 py-1 rounded"
                                >
                                  <FiEdit2 size={14} /> Edit
                                </button>
                                <button
                                  onClick={() => deleteEvent(dayIndex, eventIndex)}
                                  className="text-red-300 hover:text-red-200 flex items-center gap-1 bg-primary-500 px-2 py-1 rounded"
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
                            value={newEventData.title || ''}
                            onChange={(e) => handleNewEventChange('title', e.target.value)}
                            className="border border-primary-400 rounded px-2 py-1 w-full bg-primary-500 text-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            placeholder="Time"
                            value={newEventData.time || ''}
                            onChange={(e) => handleNewEventChange('time', e.target.value)}
                            className="border border-primary-400 rounded px-2 py-1 w-full bg-primary-500 text-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            placeholder="Location"
                            value={newEventData.location || ''}
                            onChange={(e) => handleNewEventChange('location', e.target.value)}
                            className="border border-primary-400 rounded px-2 py-1 w-full bg-primary-500 text-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            placeholder="Description"
                            value={newEventData.description || ''}
                            onChange={(e) => handleNewEventChange('description', e.target.value)}
                            className="border border-primary-400 rounded px-2 py-1 w-full bg-primary-500 text-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={addNewEvent}
                              className="text-primary-200 hover:text-primary-100 flex items-center gap-1 bg-primary-500 px-2 py-1 rounded"
                            >
                              <FiPlus size={14} /> Add
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-primary-200 hover:text-primary-100 flex items-center gap-1 bg-primary-500 px-2 py-1 rounded"
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
    </main>
  );
};

export default EditSchedule;