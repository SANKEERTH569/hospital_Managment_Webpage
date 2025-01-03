import React from 'react';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';

export function ScheduleView() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto mt-12">
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-blue-700 flex items-center">
            <FaCalendarAlt className="mr-3" /> Schedule View
          </h2>
          <p className="text-gray-600">Manage staff schedules efficiently</p>
        </header>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-3 px-6 text-left text-gray-700">Day</th>
              <th className="py-3 px-6 text-left text-gray-700">Time</th>
            </tr>
          </thead>
          <tbody>
            {[
              { day: 'Monday', time: '9:00 AM - 5:00 PM' },
              { day: 'Tuesday', time: '10:00 AM - 4:00 PM' },
              { day: 'Wednesday', time: '8:00 AM - 3:00 PM' },
              { day: 'Thursday', time: '9:00 AM - 5:00 PM' },
              { day: 'Friday', time: '10:00 AM - 4:00 PM' },
            ].map((schedule, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-6 border-b border-gray-200">{schedule.day}</td>
                <td className="py-3 px-6 border-b border-gray-200 flex items-center">
                  <FaClock className="mr-2 text-blue-500" /> {schedule.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
