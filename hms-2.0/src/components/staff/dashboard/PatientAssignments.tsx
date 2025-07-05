import React from 'react';
import { FaUserMd, FaUserNurse, FaClipboardList } from 'react-icons/fa';

export function PatientAssignments() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 flex items-center">
        <FaClipboardList className="mr-2" /> Patient Assignments
      </h2>
      <p className="text-gray-600 mb-6">
        Manage and view the assignments of patients to staff members. Ensure each patient receives the proper care and attention by assigning them to the right healthcare professionals.
      </p>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-100">
            <th className="border border-gray-300 px-6 py-3 text-left text-gray-700">Patient Name</th>
            <th className="border border-gray-300 px-6 py-3 text-left text-gray-700">Assigned Staff</th>
            <th className="border border-gray-300 px-6 py-3 text-left text-gray-700">Status</th>
            <th className="border border-gray-300 px-6 py-3 text-left text-gray-700">Room</th>
            <th className="border border-gray-300 px-6 py-3 text-left text-gray-700">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 px-6 py-4">John Doe</td>
            <td className="border border-gray-300 px-6 py-4 flex items-center">
              <FaUserMd className="text-blue-500 mr-2" /> Dr. Smith
            </td>
            <td className="border border-gray-300 px-6 py-4">
              <span className="bg-green-100 text-green-600 py-1 px-3 rounded-full">Active</span>
            </td>
            <td className="border border-gray-300 px-6 py-4">205</td>
            <td className="border border-gray-300 px-6 py-4">Requires special diet</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 px-6 py-4">Jane Roe</td>
            <td className="border border-gray-300 px-6 py-4 flex items-center">
              <FaUserNurse className="text-blue-500 mr-2" /> Nurse Taylor
            </td>
            <td className="border border-gray-300 px-6 py-4">
              <span className="bg-yellow-100 text-yellow-600 py-1 px-3 rounded-full">Pending</span>
            </td>
            <td className="border border-gray-300 px-6 py-4">301</td>
            <td className="border border-gray-300 px-6 py-4">Allergic to penicillin</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
