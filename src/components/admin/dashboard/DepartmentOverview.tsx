import React from 'react';
import { Building2, Users, Activity } from 'lucide-react';

const mockDepartments = [
  {
    id: '1',
    name: 'Cardiology',
    staffCount: 25,
    patientCount: 45,
    occupancyRate: 85
  },
  {
    id: '2',
    name: 'Emergency',
    staffCount: 30,
    patientCount: 38,
    occupancyRate: 90
  },
  {
    id: '3',
    name: 'Pediatrics',
    staffCount: 20,
    patientCount: 32,
    occupancyRate: 75
  }
];

export function DepartmentOverview() {
  return (
    <div className="space-y-4">
      {mockDepartments.map((dept) => (
        <div
          key={dept.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Building2 className="w-5 h-5 text-blue-500 mr-2" />
              <h4 className="font-semibold text-lg">{dept.name}</h4>
            </div>
            <span className={`px-2 py-1 rounded-full text-sm
              ${dept.occupancyRate >= 90 ? 'bg-red-100 text-red-800' :
                dept.occupancyRate >= 80 ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'}`}
            >
              {dept.occupancyRate}% Occupied
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Users className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                {dept.staffCount} Staff Members
              </span>
            </div>
            <div className="flex items-center">
              <Activity className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                {dept.patientCount} Active Patients
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}