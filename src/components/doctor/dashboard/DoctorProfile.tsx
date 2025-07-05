import React from 'react';
import { Mail, Award, Clock, Calendar } from 'lucide-react';
import { DoctorProfile as DoctorProfileType } from '../../../types/doctor';

export function DoctorProfile({ doctor }: { doctor: DoctorProfileType }) {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-xl">
          <span className="text-5xl font-bold text-white">{doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}</span>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-2">Dr. {doctor.firstName} {doctor.lastName}</h2>
          <p className="text-xl text-blue-600 font-medium mb-4">{doctor.specialty}</p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {doctor.qualifications.map((qualification, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {qualification}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contact & Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">{doctor.email}</span>
            </div>
          </div>
        </div>
        <div className="bg-white/80 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Experience</h3>
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-blue-500" />
            <span className="text-gray-700">{doctor.experience}</span>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-white/80 p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Working Hours</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {doctor.availableSlots.map((slot, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-blue-800">{slot.day}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700">{slot.startTime} - {slot.endTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Patients" value={doctor.patients.length} color="bg-gradient-to-br from-blue-400 to-blue-600" />
        <StatCard title="Appointments" value={doctor.appointments.length} color="bg-gradient-to-br from-green-400 to-green-600" />
        <StatCard title="Medical Records" value={doctor.medicalRecords.length} color="bg-gradient-to-br from-purple-400 to-purple-600" />
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className={`p-6 rounded-2xl shadow-lg ${color} text-white`}>
      <h3 className="text-lg font-semibold opacity-90 mb-2">{title}</h3>
      <span className="text-3xl font-extrabold">{value}</span>
    </div>
  );
}