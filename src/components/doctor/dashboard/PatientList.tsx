import React, { useState } from 'react';
import { Calendar, Eye } from 'lucide-react';
import { Patient } from '../../../types/doctor';
import { Button } from '../../ui/Button';
import { PatientDetails } from './PatientDetails';

export function PatientList({ patients }: { patients: Patient[] }) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <div className="space-y-6">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="flex items-center gap-6 bg-white/90 p-5 rounded-2xl shadow-lg border border-blue-100 hover:shadow-2xl transition group"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-white text-2xl font-bold shadow group-hover:scale-105 transition-transform">
            {patient.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h4 className="font-extrabold text-xl text-blue-900 mb-1">
              {patient.name}
            </h4>
            <div className="flex items-center gap-4 text-blue-700 text-sm mb-1">
              <span>Age: {patient.age}</span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Last Visit: {patient.lastVisit}
              </span>
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mt-1">
              {patient.condition}
            </span>
          </div>
          <div className="flex-shrink-0">
            <Button 
              variant="secondary" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => setSelectedPatient(patient)}
            >
              <Eye className="w-4 h-4" />
              View
            </Button>
          </div>
        </div>
      ))}

      {selectedPatient && (
        <PatientDetails 
          patient={selectedPatient} 
          onClose={() => setSelectedPatient(null)} 
        />
      )}
    </div>
  );
}