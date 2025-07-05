import React from 'react';
import { Calendar, Clock, User, FileText, X, CheckCircle, XCircle } from 'lucide-react';
import { Appointment } from '../../../types/doctor';
import { Button } from '../../ui/Button';

interface AppointmentDetailsProps {
  appointment: Appointment;
  onClose: () => void;
}

export function AppointmentDetails({ appointment, onClose }: AppointmentDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-900">Appointment Details</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex justify-center">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusStyles(appointment.status)}`}>
              {appointment.status === 'scheduled' && <Clock className="w-4 h-4" />}
              {appointment.status === 'completed' && <CheckCircle className="w-4 h-4" />}
              {appointment.status === 'cancelled' && <XCircle className="w-4 h-4" />}
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
          </div>
          
          {/* Appointment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard 
              icon={User} 
              title="Patient" 
              value={appointment.patientName} 
            />
            <InfoCard 
              icon={Calendar} 
              title="Date" 
              value={appointment.date} 
            />
            <InfoCard 
              icon={Clock} 
              title="Time" 
              value={appointment.time} 
            />
          </div>
          
          {/* Notes */}
          {appointment.notes && (
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <h4 className="font-semibold text-blue-800">Notes</h4>
              </div>
              <p className="text-gray-700 pl-8">{appointment.notes}</p>
            </div>
          )}
          
          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
            {appointment.status === 'scheduled' && (
              <>
                <Button className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Mark as Completed
                </Button>
                <Button variant="secondary" className="flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Cancel Appointment
                </Button>
              </>
            )}
            <Button variant="secondary" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Add Medical Record
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, value }: { icon: React.ElementType; title: string; value: string }) {
  return (
    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
      <div className="flex items-center gap-3 mb-1">
        <Icon className="w-5 h-5 text-blue-500" />
        <h4 className="font-semibold text-blue-800">{title}</h4>
      </div>
      <p className="text-gray-700 pl-8">{value}</p>
    </div>
  );
}

function getStatusStyles(status: string): string {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-700';
    case 'completed':
      return 'bg-green-100 text-green-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}