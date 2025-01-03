import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Appointment } from '../../../types/doctor';

export function AppointmentList({ appointments }: { appointments: Appointment[] }) {
  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-lg">{appointment.patientName}</h4>
              <div className="flex items-center text-gray-600 mt-1">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{appointment.date}</span>
                <Clock className="w-4 h-4 ml-4 mr-2" />
                <span>{appointment.time}</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
              appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
          </div>
          {appointment.notes && (
            <p className="text-gray-600 mt-2 text-sm">{appointment.notes}</p>
          )}
        </div>
      ))}
    </div>
  );
}