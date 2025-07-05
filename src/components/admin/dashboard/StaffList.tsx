import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { Button } from '../../ui/Button';

const mockStaff = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    department: 'Cardiology',
    position: 'Senior Cardiologist',
    email: 'sarah.j@hospital.com',
    phone: '(555) 123-4567',
    status: 'active'
  },
  {
    id: '2',
    name: 'Nurse Michael Chen',
    department: 'Emergency',
    position: 'Head Nurse',
    email: 'michael.c@hospital.com',
    phone: '(555) 234-5678',
    status: 'active'
  }
];

export function StaffList() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Button variant="secondary">Filter</Button>
          <Button variant="secondary">Export</Button>
        </div>
        <Button>Add Staff Member</Button>
      </div>

      {mockStaff.map((staff) => (
        <div
          key={staff.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                <h4 className="font-semibold text-lg">{staff.name}</h4>
              </div>
              <p className="text-blue-600">{staff.position}</p>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {staff.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {staff.phone}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium
                ${staff.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
              `}>
                {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
              </span>
              <Button variant="secondary" className="text-sm">
                View Details
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}