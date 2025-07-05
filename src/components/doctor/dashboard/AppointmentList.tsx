import React, { useState } from 'react';
import { Calendar, Clock, User, Eye, PlusCircle, CalendarPlus } from 'lucide-react';
import { Appointment } from '../../../types/doctor';
import { Button } from '../../ui/Button';
import { AppointmentDetails } from './AppointmentDetails';
import { EmptyState } from '../../ui/EmptyState';

interface AppointmentListProps {
  appointments: Appointment[];
  onScheduleNew: () => void;
}

export function AppointmentList({ appointments, onScheduleNew }: AppointmentListProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  if (appointments.length === 0) {
    return (
      <EmptyState
        icon={CalendarPlus}
        title="No Appointments Found"
        description="There are no appointments scheduled at the moment. You can schedule a new one."
        buttonText="Schedule New Appointment"
        onButtonClick={onScheduleNew}
      />
    );
  }
  
  return (
    <div className="space-y-6">
       <div className="flex justify-end">
        <Button onClick={onScheduleNew} className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Schedule New
        </Button>
      </div>
      {selectedAppointment && (
        <AppointmentDetails 
          appointment={selectedAppointment} 
          onClose={() => setSelectedAppointment(null)} 
        />
      )}
      
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="flex items-center gap-6 bg-white/90 p-5 rounded-2xl shadow-lg border border-blue-100 hover:shadow-2xl transition group"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-white text-2xl font-bold shadow group-hover:scale-105 transition-transform">
            <User className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h4 className="font-extrabold text-xl text-blue-900 mb-1">{appointment.patientName}</h4>
            <div className="flex items-center gap-4 text-blue-700 text-sm mb-1">
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{appointment.date}</span>
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{appointment.time}</span>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
              appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
              appointment.status === 'completed' ? 'bg-green-100 text-green-700' :
              'bg-red-100 text-red-700'
            }`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
            {appointment.notes && (
              <p className="text-blue-700 mt-2 text-xs font-medium">{appointment.notes}</p>
            )}
          </div>
          <div className="flex-shrink-0">
            <Button 
              variant="secondary" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => setSelectedAppointment(appointment)}
            >
              <Eye className="w-4 h-4" />
              View
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}