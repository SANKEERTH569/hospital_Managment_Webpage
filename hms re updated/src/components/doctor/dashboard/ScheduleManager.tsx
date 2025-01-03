import React from 'react';
import { TimeSlot } from '../../../types/doctor';
import { Button } from '../../ui/Button';

export function ScheduleManager({ slots }: { slots: TimeSlot[] }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button>Add Time Slot</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.map((slot, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            <h4 className="font-semibold text-lg mb-2">{slot.day}</h4>
            <p className="text-gray-600">
              {slot.startTime} - {slot.endTime}
            </p>
            <div className="mt-4 flex space-x-2">
              <Button variant="secondary" className="text-sm">
                Edit
              </Button>
              <Button variant="secondary" className="text-sm text-red-600 hover:text-red-700">
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}