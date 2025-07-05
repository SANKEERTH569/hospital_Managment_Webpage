import React from 'react';
import { User, Calendar, Clock, FileText, Activity, X } from 'lucide-react';
import { Patient } from '../../../types/doctor';
import { Button } from '../../ui/Button';

interface PatientDetailsProps {
  patient: Patient;
  onClose: () => void;
}

export function PatientDetails({ patient, onClose }: PatientDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-900">Patient Details</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Patient Header */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900">{patient.name}</h3>
              <p className="text-gray-600">{patient.age} years old</p>
            </div>
          </div>
          
          {/* Patient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard 
              icon={Activity} 
              title="Medical Condition" 
              value={patient.condition} 
            />
            <InfoCard 
              icon={Calendar} 
              title="Last Visit" 
              value={patient.lastVisit} 
            />
            {patient.nextAppointment && (
              <InfoCard 
                icon={Clock} 
                title="Next Appointment" 
                value={patient.nextAppointment} 
              />
            )}
          </div>
          
          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
            <Button className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Appointment
            </Button>
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
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-blue-500" />
        <h4 className="font-semibold text-blue-800">{title}</h4>
      </div>
      <p className="text-gray-700 pl-8">{value}</p>
    </div>
  );
}