"use client";

import { useState } from 'react';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { Spotlight } from "@/components/ui/Spotlight/Spotlight"; 
import ExtendedColors from '../../../color.config';

const EditSchedule = () => { 
  const [scheduleData, setScheduleData] = useState<any[]>([
    {
      id: '1',
      title: 'Opening Ceremony',
      date: '2023-10-15',
      time: '09:00 AM',
      location: 'Main Hall', 
      description: 'Welcome event for all participants'
    }, 
    {
      id: '2',
      title: 'Opening Ceremony',
      date: '2023-10-15',
      time: '09:00 AM',
      location: 'Main Hall', 
      description: 'Welcome event for all participants'
    }, 
    {
      id: '4',
      title: 'Opening Ceremony',
      date: '2023-10-15',
      time: '09:00 AM',
      location: 'Main Hall', 
      description: 'Welcome event for all participants'
    }, 
    {
      id: '3',
      title: 'Opening Ceremony',
      date: '2023-10-15',
      time: '09:00 AM',
      location: 'Main Hall', 
      description: 'Welcome event for all participants'
    }, 
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (id: string) => {
    setEditingId(id);
    const itemToEdit = scheduleData.find(item => item.id === id);
    if (itemToEdit) {
      setEditData({ ...itemToEdit });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!editingId) return;
    
    setIsSaving(true);
    try { 
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setScheduleData(prev =>
        prev.map(item =>
          item.id === editingId ? { ...item, ...editData } : item
        )
      );
      setEditingId(null);
      setEditData({});
    } finally {
      setIsSaving(false);
    }
  };

  const saveAllChanges = async () => {
    setIsSaving(true);
    try { 
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saved data:', scheduleData);
      alert('Changes saved successfully!');
    } finally {
      setIsSaving(false);
    }
  };
 
  const getAllKeys = () => {
    const keys = new Set<string>();
    scheduleData.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== 'id') keys.add(key);
      });
    });
    return Array.from(keys);
  };

  const renderCell = (item: any, key: string) => {
    if (editingId === item.id) {
      return (
        <input
          type="text"
          value={editData[key] || ''}
          onChange={(e) => handleChange(key, e.target.value)}
          className="border border-primary-400 rounded px-2 py-1 w-full bg-primary-500 text-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300"
        />
      );
    }
    return (
      <div 
        onClick={() => handleEdit(item.id)} 
        className="cursor-pointer text-primary-100 hover:text-primary-50"
      >
        {item[key]}
      </div>
    );
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

        <div className="bg-primary-600 rounded-lg shadow-lg overflow-hidden border border-primary-500">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-primary-500">
              <thead className="bg-primary-550">
                <tr>
                  {getAllKeys().map(key => (
                    <th 
                      key={key} 
                      className="px-6 py-3 text-left text-sm font-medium text-primary-150 uppercase tracking-wider"
                    >
                      {key.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-sm font-medium text-primary-150 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-primary-600 divide-y divide-primary-500">
                {scheduleData.map((item) => (
                  <tr key={item.id} className="hover:bg-primary-550 transition-colors">
                    {getAllKeys().map(key => (
                      <td key={`${item.id}-${key}`} className="px-6 py-4 whitespace-nowrap">
                        {renderCell(item, key)}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingId === item.id ? (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="text-primary-200 hover:text-primary-100 flex items-center gap-1 disabled:opacity-50 bg-primary-500 px-3 py-1 rounded"
                          >
                            <FiSave /> Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-primary-200 hover:text-primary-100 flex items-center gap-1 bg-primary-500 px-3 py-1 rounded"
                          >
                            <FiX /> Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="text-primary-200 hover:text-primary-100 flex items-center gap-1 bg-primary-500 px-3 py-1 rounded"
                        >
                          <FiEdit2 /> Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditSchedule;