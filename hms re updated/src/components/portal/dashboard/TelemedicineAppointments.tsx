import React, { useState } from 'react';
import { FiClock, FiUser, FiCheckCircle, FiXCircle } from 'react-icons/fi';

export function TelemedicineAppointments() {
  const [appointments, setAppointments] = useState([
    { id: 1, date: '2024-12-18', time: '10:00 AM', doctor: 'Dr. John Smith', status: 'Confirmed' },
    { id: 2, date: '2024-12-20', time: '02:00 PM', doctor: 'Dr. Jane Doe', status: 'Pending' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const toggleModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(!modalVisible);
  };

  const updateStatus = (id, newStatus) => {
    setAppointments(appointments.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  return (
    <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 p-8 rounded-lg shadow-lg w-full max-w-5xl mx-auto">
      <h4 className="text-3xl font-bold text-white text-center mb-6">Telemedicine Appointments</h4>
      
      <div className="space-y-6">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <FiClock size={24} color="gray" />
                <div className="flex flex-col">
                  <span className="text-xl font-semibold text-gray-800">{appointment.date}</span>
                  <span className="text-sm text-gray-600">{appointment.time}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <FiUser size={24} color="gray" />
                <span className="text-lg font-medium text-gray-800">{appointment.doctor}</span>
              </div>

              <div className="flex items-center space-x-4">
                {appointment.status === 'Confirmed' ? (
                  <FiCheckCircle size={24} color="green" />
                ) : (
                  <FiXCircle size={24} color="red" />
                )}
                <span className={`text-sm font-semibold ${appointment.status === 'Confirmed' ? 'text-green-600' : 'text-red-600'}`}>
                  {appointment.status}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => toggleModal(appointment)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  View Details
                </button>
                <button
                  onClick={() => updateStatus(appointment.id, 'Confirmed')}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Confirm
                </button>
                <button
                  onClick={() => updateStatus(appointment.id, 'Cancelled')}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Details Modal */}
      {modalVisible && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h5 className="text-2xl font-semibold text-gray-800 mb-4">Appointment Details</h5>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Date:</strong> {selectedAppointment.date}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Time:</strong> {selectedAppointment.time}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Doctor:</strong> {selectedAppointment.doctor}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Status:</strong> {selectedAppointment.status}
            </p>

            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => setModalVisible(false)}
              >
                Close
              </button>
              <button
                onClick={() => {
                  updateStatus(selectedAppointment.id, 'Completed');
                  setModalVisible(false);
                }}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
              >
                Mark as Completed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
