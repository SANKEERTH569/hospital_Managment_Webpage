import React from 'react';
import { Calendar } from 'lucide-react';
import { Patient } from '../../../types/doctor';

export function PatientList({ patients }: { patients: Patient[] }) {
  return (
    <div className="space-y-4">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <div className="flex justify-between">
            <div>
              <h4 className="font-semibold text-lg">{patient.name}</h4>
              <p className="text-gray-600">Age: {patient.age}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Last Visit: {patient.lastVisit}
              </div>
              <p className="text-sm font-medium text-blue-600 mt-1">
                {patient.condition}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}